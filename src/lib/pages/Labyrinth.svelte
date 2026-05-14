<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // ---------- Render target ----------
  const W = 320;
  const H = 200;
  const HUD_H = 40;
  const VIEW_H = H - HUD_H;
  const HALF_VIEW_H = VIEW_H >> 1;
  const FOV = Math.PI / 2.6;
  const HALF_FOV = FOV / 2;

  // ---------- Maze ----------
  const CELLS_W = 9;
  const CELLS_H = 9;
  const MAP_W = CELLS_W * 2 + 1;
  const MAP_H = CELLS_H * 2 + 1;

  const TILE_EMPTY = 0;
  const TILE_WALL = 1;
  const TILE_EXIT = 2;

  let map = new Uint8Array(MAP_W * MAP_H);
  const zbuffer = new Float32Array(W);

  // ---------- Player ----------
  let px = 1.5;
  let py = 1.5;
  let pa = 0;
  let pHealth = 100;
  let kills = 0;
  let totalEnemies = 0;
  let elapsedSec = 0;
  let exitCellX = 1;
  let exitCellY = 1;

  // ---------- Game state ----------
  type GameState = 'idle' | 'playing' | 'paused' | 'won' | 'dead';
  let state: GameState = 'idle';
  let muzzleFlash = 0;
  let damageFlash = 0;
  let messageText = '';
  let messageTime = 0;

  // ---------- Enemies ----------
  type Enemy = {
    x: number;
    y: number;
    hp: number;
    alive: boolean;
    hitFlash: number;
    bob: number;
  };
  let enemies: Enemy[] = [];

  // ---------- Input ----------
  const keys = new Set<string>();
  let mouseLook = 0;
  let pointerLocked = false;

  // ---------- DOM / canvas ----------
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let imageData: ImageData;
  let pixels32: Uint32Array;

  // ---------- Audio ----------
  let audioCtx: AudioContext | null = null;
  function ensureAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {
        audioCtx = null;
      }
    }
    return audioCtx;
  }
  function beep(freq: number, durMs: number, type: OscillatorType = 'square', vol = 0.05) {
    const ac = ensureAudio();
    if (!ac) return;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, ac.currentTime);
    g.gain.setValueAtTime(vol, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + durMs / 1000);
    o.connect(g).connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + durMs / 1000);
  }
  function shootSound() {
    beep(880, 60, 'square', 0.04);
    setTimeout(() => beep(220, 80, 'sawtooth', 0.05), 30);
  }
  function hitSound() {
    beep(140, 90, 'square', 0.06);
  }
  function damageSound() {
    beep(80, 220, 'sawtooth', 0.08);
  }
  function winSound() {
    beep(523, 120, 'square', 0.06);
    setTimeout(() => beep(659, 120, 'square', 0.06), 120);
    setTimeout(() => beep(784, 240, 'square', 0.06), 240);
  }

  // ---------- Color helpers (little-endian RGBA -> Uint32) ----------
  function rgb(r: number, g: number, b: number): number {
    return (255 << 24) | ((b & 0xff) << 16) | ((g & 0xff) << 8) | (r & 0xff);
  }
  function shade(color: number, mul: number): number {
    const r = Math.max(0, Math.min(255, Math.floor((color & 0xff) * mul)));
    const g = Math.max(0, Math.min(255, Math.floor(((color >> 8) & 0xff) * mul)));
    const b = Math.max(0, Math.min(255, Math.floor(((color >> 16) & 0xff) * mul)));
    return (255 << 24) | (b << 16) | (g << 8) | r;
  }

  // ---------- Maze generation (recursive backtracker) ----------
  function generateMap() {
    map.fill(TILE_WALL);
    const visited = new Uint8Array(CELLS_W * CELLS_H);
    type Cell = [number, number];
    const stack: Cell[] = [[0, 0]];
    visited[0] = 1;
    map[1 * MAP_W + 1] = TILE_EMPTY;

    while (stack.length) {
      const top = stack[stack.length - 1];
      const cx = top[0];
      const cy = top[1];
      const opts: { dx: number; dy: number }[] = [];
      if (cx > 0 && !visited[cy * CELLS_W + (cx - 1)]) opts.push({ dx: -1, dy: 0 });
      if (cx < CELLS_W - 1 && !visited[cy * CELLS_W + (cx + 1)]) opts.push({ dx: 1, dy: 0 });
      if (cy > 0 && !visited[(cy - 1) * CELLS_W + cx]) opts.push({ dx: 0, dy: -1 });
      if (cy < CELLS_H - 1 && !visited[(cy + 1) * CELLS_W + cx]) opts.push({ dx: 0, dy: 1 });
      if (!opts.length) {
        stack.pop();
        continue;
      }
      const o = opts[Math.floor(Math.random() * opts.length)];
      const nx = cx + o.dx;
      const ny = cy + o.dy;
      const wx = cx * 2 + 1 + o.dx;
      const wy = cy * 2 + 1 + o.dy;
      map[wy * MAP_W + wx] = TILE_EMPTY;
      map[(ny * 2 + 1) * MAP_W + (nx * 2 + 1)] = TILE_EMPTY;
      visited[ny * CELLS_W + nx] = 1;
      stack.push([nx, ny]);
    }

    // Carve a few extra openings to add loops
    for (let i = 0; i < 10; i++) {
      const cx = Math.floor(Math.random() * (CELLS_W - 2)) + 1;
      const cy = Math.floor(Math.random() * (CELLS_H - 2)) + 1;
      if (Math.random() < 0.5) map[(cy * 2 + 1) * MAP_W + (cx * 2 + 2)] = TILE_EMPTY;
      else map[(cy * 2 + 2) * MAP_W + (cx * 2 + 1)] = TILE_EMPTY;
    }

    // BFS to find farthest cell from start; place exit there.
    const dist = new Int32Array(MAP_W * MAP_H).fill(-1);
    dist[1 * MAP_W + 1] = 0;
    const q: number[] = [1 * MAP_W + 1];
    let far = 1 * MAP_W + 1;
    while (q.length) {
      const c = q.shift()!;
      const cy = Math.floor(c / MAP_W);
      const cx = c - cy * MAP_W;
      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx <= 0 || ny <= 0 || nx >= MAP_W - 1 || ny >= MAP_H - 1) continue;
        if (map[ny * MAP_W + nx] === TILE_WALL) continue;
        const ni = ny * MAP_W + nx;
        if (dist[ni] !== -1) continue;
        dist[ni] = dist[c] + 1;
        if (dist[ni] > dist[far]) far = ni;
        q.push(ni);
      }
    }
    exitCellY = Math.floor(far / MAP_W);
    exitCellX = far - exitCellY * MAP_W;
    map[exitCellY * MAP_W + exitCellX] = TILE_EXIT;
  }

  function spawnEnemies(count: number) {
    enemies = [];
    let placed = 0;
    let tries = 0;
    while (placed < count && tries < 800) {
      tries++;
      const cx = Math.floor(Math.random() * CELLS_W);
      const cy = Math.floor(Math.random() * CELLS_H);
      const x = cx * 2 + 1.5;
      const y = cy * 2 + 1.5;
      const dx = x - px;
      const dy = y - py;
      // Don't spawn too close to the player or on the exit
      if (dx * dx + dy * dy < 25) continue;
      if (Math.floor(x) === exitCellX && Math.floor(y) === exitCellY) continue;
      enemies.push({ x, y, hp: 2, alive: true, hitFlash: 0, bob: Math.random() * Math.PI * 2 });
      placed++;
    }
    totalEnemies = enemies.length;
  }

  function resetGame() {
    generateMap();
    px = 1.5;
    py = 1.5;
    pa = 0;
    pHealth = 100;
    kills = 0;
    elapsedSec = 0;
    spawnEnemies(8);
    muzzleFlash = 0;
    damageFlash = 0;
    messageText = '';
    messageTime = 0;
  }

  // ---------- Wall texture (procedural brick) ----------
  function wallTexel(u: number, v: number, side: number, isExit: boolean, t: number): number {
    if (isExit) {
      // Glowing portal — pulsing magenta/cyan stripes
      const stripe = Math.sin((v * 24 + t * 6) * 1.0);
      const r = 60 + Math.floor(stripe * 80 + 80);
      const g = 30 + Math.floor(Math.sin(v * 18 + t * 4) * 60 + 80);
      const b = 220 + Math.floor(Math.sin(v * 30 - t * 3) * 30);
      return rgb(Math.min(255, r), Math.min(255, g), Math.min(255, b));
    }
    const tu = u * 64;
    const tv = v * 64;
    const row = Math.floor(tv / 16);
    const offset = (row & 1) * 16;
    const inMortarH = Math.floor(tv) % 16 === 0;
    const inMortarV = (Math.floor(tu + offset) % 32) === 0;
    if (inMortarH || inMortarV) {
      return side === 1 ? rgb(22, 22, 26) : rgb(34, 34, 40);
    }
    // Pseudo-noise brick variation
    const n = Math.abs(Math.sin(Math.floor(tu / 32) * 12.9 + row * 78.2)) * 0.35 + 0.75;
    const baseR = 138 * n;
    const baseG = 70 * n;
    const baseB = 54 * n;
    const sideMul = side === 1 ? 0.72 : 1.0;
    return rgb(
      Math.floor(baseR * sideMul),
      Math.floor(baseG * sideMul),
      Math.floor(baseB * sideMul),
    );
  }

  // ---------- Floor / ceiling texture ----------
  function floorTexel(fx: number, fy: number): number {
    const tx = Math.floor(fx * 8);
    const ty = Math.floor(fy * 8);
    const checker = ((tx + ty) & 1) === 0;
    const n = Math.abs(Math.sin(tx * 12.9898 + ty * 78.233)) * 0.4 + 0.6;
    if (checker) {
      return rgb(Math.floor(48 * n), Math.floor(48 * n), Math.floor(56 * n));
    }
    return rgb(Math.floor(34 * n), Math.floor(34 * n), Math.floor(40 * n));
  }
  function ceilTexel(fx: number, fy: number): number {
    const tx = Math.floor(fx * 4);
    const ty = Math.floor(fy * 4);
    const grid = Math.floor(fx * 4) !== Math.floor((fx + 0.04) * 4) || Math.floor(fy * 4) !== Math.floor((fy + 0.04) * 4);
    const n = Math.abs(Math.sin(tx * 31.7 + ty * 47.1)) * 0.2 + 0.18;
    if (grid) return rgb(Math.floor(32 * n + 12), Math.floor(28 * n + 10), Math.floor(40 * n + 14));
    return rgb(Math.floor(20 * n + 6), Math.floor(18 * n + 5), Math.floor(28 * n + 8));
  }

  // ---------- Enemy sprite (procedural imp / floating eye) ----------
  function enemyTexel(u: number, v: number, hpRatio: number, flash: number): number {
    const cx = u - 0.5;
    const cy = v - 0.45;
    const body = (cx * cx) / 0.18 + (cy * cy) / 0.22;
    if (body > 1.0) return 0; // transparent
    if (flash > 0.01 && Math.random() < flash) return rgb(255, 240, 220);
    // Eyes
    const eyeY = -0.05;
    const eyeOff = 0.16;
    const eyeR = 0.0045;
    const dl = (cx + eyeOff) * (cx + eyeOff) + (cy - eyeY) * (cy - eyeY);
    const dr = (cx - eyeOff) * (cx - eyeOff) + (cy - eyeY) * (cy - eyeY);
    if (dl < eyeR || dr < eyeR) {
      const flicker = 0.85 + Math.sin(performance.now() * 0.02) * 0.15;
      return rgb(Math.floor(255 * flicker), Math.floor(220 * flicker), 60);
    }
    // Mouth (jagged)
    if (cy > 0.12 && Math.abs(cx) < 0.18) {
      const teeth = Math.sin(cx * 60) > 0;
      if (cy > 0.18 && teeth) return rgb(230, 230, 220);
      return rgb(20, 5, 8);
    }
    // Body shading (darker outline)
    const baseR = 150 - 80 * (1 - hpRatio);
    const baseG = 28;
    const baseB = 36;
    if (body > 0.85) return rgb(50, 8, 14);
    const shadeV = 1.0 - body * 0.35;
    return rgb(Math.floor(baseR * shadeV), Math.floor(baseG * shadeV), Math.floor(baseB * shadeV));
  }

  // ---------- Collision ----------
  function isWall(mx: number, my: number): boolean {
    if (mx < 0 || my < 0 || mx >= MAP_W || my >= MAP_H) return true;
    return map[my * MAP_W + mx] === TILE_WALL;
  }
  function tryMove(nx: number, ny: number) {
    const pad = 0.18;
    if (!isWall(Math.floor(nx + pad * Math.sign(nx - px || 1)), Math.floor(py))) {
      if (!isWall(Math.floor(nx - pad), Math.floor(py)) && !isWall(Math.floor(nx + pad), Math.floor(py))) {
        px = nx;
      }
    }
    if (!isWall(Math.floor(px), Math.floor(ny + pad * Math.sign(ny - py || 1)))) {
      if (!isWall(Math.floor(px), Math.floor(ny - pad)) && !isWall(Math.floor(px), Math.floor(ny + pad))) {
        py = ny;
      }
    }
  }

  // ---------- Raycast (DDA) ----------
  type RayHit = {
    dist: number;
    side: number;
    tile: number;
    hitU: number;
    mapX: number;
    mapY: number;
  };
  function castRay(originX: number, originY: number, dirX: number, dirY: number): RayHit {
    let mapX = Math.floor(originX);
    let mapY = Math.floor(originY);
    const deltaX = Math.abs(1 / (dirX || 1e-9));
    const deltaY = Math.abs(1 / (dirY || 1e-9));
    let stepX: number, sideX: number, stepY: number, sideY: number;
    if (dirX < 0) {
      stepX = -1;
      sideX = (originX - mapX) * deltaX;
    } else {
      stepX = 1;
      sideX = (mapX + 1.0 - originX) * deltaX;
    }
    if (dirY < 0) {
      stepY = -1;
      sideY = (originY - mapY) * deltaY;
    } else {
      stepY = 1;
      sideY = (mapY + 1.0 - originY) * deltaY;
    }
    let side = 0;
    for (let i = 0; i < 64; i++) {
      if (sideX < sideY) {
        sideX += deltaX;
        mapX += stepX;
        side = 0;
      } else {
        sideY += deltaY;
        mapY += stepY;
        side = 1;
      }
      if (mapX < 0 || mapY < 0 || mapX >= MAP_W || mapY >= MAP_H) {
        return { dist: 64, side, tile: TILE_WALL, hitU: 0, mapX, mapY };
      }
      const tile = map[mapY * MAP_W + mapX];
      if (tile !== TILE_EMPTY) {
        const dist = side === 0 ? sideX - deltaX : sideY - deltaY;
        let hitU: number;
        if (side === 0) {
          hitU = originY + dist * dirY;
        } else {
          hitU = originX + dist * dirX;
        }
        hitU -= Math.floor(hitU);
        if ((side === 0 && stepX > 0) || (side === 1 && stepY < 0)) {
          hitU = 1 - hitU;
        }
        return { dist, side, tile, hitU, mapX, mapY };
      }
    }
    return { dist: 64, side, tile: TILE_WALL, hitU: 0, mapX, mapY };
  }

  // ---------- Visibility check (simpler stepped LOS) ----------
  function hasLOS(ax: number, ay: number, bx: number, by: number): boolean {
    const dx = bx - ax;
    const dy = by - ay;
    const d = Math.hypot(dx, dy);
    const steps = Math.ceil(d * 4);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const x = ax + dx * t;
      const y = ay + dy * t;
      if (isWall(Math.floor(x), Math.floor(y))) return false;
    }
    return true;
  }

  // ---------- Render frame ----------
  function render(t: number) {
    // Clear the framebuffer so any uncovered rows fall back to true black
    pixels32.fill(rgb(0, 0, 0));

    const cosA = Math.cos(pa);
    const sinA = Math.sin(pa);
    // camera plane is perpendicular to dir
    const planeLen = Math.tan(HALF_FOV);
    const planeX = -sinA * planeLen;
    const planeY = cosA * planeLen;

    // ----- Floor / ceiling cast -----
    // For each scan line below horizon, compute world coordinates and sample
    const horizon = HALF_VIEW_H;
    const posZ = 0.5 * VIEW_H;
    for (let y = horizon + 1; y < VIEW_H; y++) {
      const p = y - horizon;
      const rowDist = posZ / p;
      const rayDirX0 = cosA - planeX;
      const rayDirY0 = sinA - planeY;
      const rayDirX1 = cosA + planeX;
      const rayDirY1 = sinA + planeY;
      const stepX = (rowDist * (rayDirX1 - rayDirX0)) / W;
      const stepY = (rowDist * (rayDirY1 - rayDirY0)) / W;
      let fx = px + rowDist * rayDirX0;
      let fy = py + rowDist * rayDirY0;
      const fade = Math.max(0.25, 1 - rowDist / 9);
      const rowOffsetFloor = y * W;
      const ceilingY = horizon - p;
      const rowOffsetCeil = ceilingY * W;
      for (let x = 0; x < W; x++) {
        pixels32[rowOffsetFloor + x] = shade(floorTexel(fx, fy), fade);
        if (ceilingY >= 0 && ceilingY < VIEW_H) {
          pixels32[rowOffsetCeil + x] = shade(ceilTexel(fx, fy), fade * 0.85);
        }
        fx += stepX;
        fy += stepY;
      }
    }

    // ----- Walls -----
    for (let x = 0; x < W; x++) {
      const camX = (2 * x) / W - 1;
      const rayDirX = cosA + planeX * camX;
      const rayDirY = sinA + planeY * camX;
      const hit = castRay(px, py, rayDirX, rayDirY);
      const perpDist = Math.max(0.0001, hit.dist);
      zbuffer[x] = perpDist;
      const lineH = Math.floor(VIEW_H / perpDist);
      let drawStart = -lineH / 2 + HALF_VIEW_H;
      let drawEnd = lineH / 2 + HALF_VIEW_H;
      if (drawStart < 0) drawStart = 0;
      if (drawEnd >= VIEW_H) drawEnd = VIEW_H - 1;
      const isExit = hit.tile === TILE_EXIT;
      const fade = isExit ? 1.0 : Math.max(0.2, 1 - perpDist / 12);
      const top = -lineH / 2 + HALF_VIEW_H;
      for (let y = drawStart; y <= drawEnd; y++) {
        const v = (y - top) / lineH;
        const tex = wallTexel(hit.hitU, v, hit.side, isExit, t);
        pixels32[y * W + x] = shade(tex, fade);
      }
    }

    // ----- Sprites (enemies) -----
    // Sort enemies by distance descending
    const visible = enemies
      .filter((e) => e.alive)
      .map((e) => ({ e, d: (e.x - px) * (e.x - px) + (e.y - py) * (e.y - py) }))
      .sort((a, b) => b.d - a.d);

    const invDet = 1.0 / (planeX * sinA - cosA * planeY);
    for (const { e } of visible) {
      const sx = e.x - px;
      const sy = e.y - py;
      const transformX = invDet * (sinA * sx - cosA * sy);
      const transformY = invDet * (-planeY * sx + planeX * sy);
      if (transformY <= 0.05) continue;
      const screenX = Math.floor((W / 2) * (1 + transformX / transformY));
      const spriteH = Math.abs(Math.floor(VIEW_H / transformY));
      const spriteW = spriteH;
      const bobOffset = Math.floor(Math.sin(t * 4 + e.bob) * 3);
      const verticalOffset = Math.floor(spriteH * 0.05);
      const spriteTop = -spriteH / 2 + HALF_VIEW_H + verticalOffset + bobOffset;
      const spriteLeft = -spriteW / 2 + screenX;
      const drawStartY = Math.max(0, Math.floor(spriteTop));
      const drawEndY = Math.min(VIEW_H - 1, Math.floor(spriteTop + spriteH));
      const drawStartX = Math.max(0, Math.floor(spriteLeft));
      const drawEndX = Math.min(W - 1, Math.floor(spriteLeft + spriteW));
      const hpRatio = Math.max(0, Math.min(1, e.hp / 2));
      const fade = Math.max(0.3, 1 - transformY / 10);
      for (let stripe = drawStartX; stripe <= drawEndX; stripe++) {
        if (transformY > zbuffer[stripe]) continue;
        const u = (stripe - spriteLeft) / spriteW;
        for (let y = drawStartY; y <= drawEndY; y++) {
          const v = (y - spriteTop) / spriteH;
          const tex = enemyTexel(u, v, hpRatio, e.hitFlash);
          if (tex === 0) continue;
          pixels32[y * W + stripe] = shade(tex, fade);
        }
      }
    }

    // ----- Damage / muzzle vignette overlays -----
    if (damageFlash > 0.01) {
      const intensity = Math.min(0.6, damageFlash);
      for (let y = 0; y < VIEW_H; y++) {
        for (let x = 0; x < W; x++) {
          const cx = (x - W / 2) / (W / 2);
          const cy = (y - VIEW_H / 2) / (VIEW_H / 2);
          const r2 = cx * cx + cy * cy;
          if (r2 < 0.6) continue;
          const v = Math.min(1, (r2 - 0.6) * 2) * intensity;
          const i = y * W + x;
          const c = pixels32[i];
          const cr = c & 0xff;
          const cg = (c >> 8) & 0xff;
          const cb = (c >> 16) & 0xff;
          pixels32[i] = rgb(
            Math.min(255, Math.floor(cr * (1 - v) + 220 * v)),
            Math.floor(cg * (1 - v)),
            Math.floor(cb * (1 - v)),
          );
        }
      }
    }
    if (muzzleFlash > 0.01) {
      const intensity = Math.min(0.5, muzzleFlash);
      for (let y = 0; y < VIEW_H; y++) {
        for (let x = 0; x < W; x++) {
          const cx = (x - W / 2) / (W / 2);
          const cy = (y - VIEW_H / 2) / (VIEW_H / 2);
          const r2 = cx * cx + cy * cy;
          if (r2 > 0.7) continue;
          const v = (1 - r2 / 0.7) * intensity;
          const i = y * W + x;
          const c = pixels32[i];
          const cr = c & 0xff;
          const cg = (c >> 8) & 0xff;
          const cb = (c >> 16) & 0xff;
          pixels32[i] = rgb(
            Math.min(255, Math.floor(cr + 220 * v)),
            Math.min(255, Math.floor(cg + 180 * v)),
            Math.min(255, Math.floor(cb + 80 * v)),
          );
        }
      }
    }

    // ----- Crosshair -----
    if (state === 'playing') {
      const ccx = W >> 1;
      const ccy = VIEW_H >> 1;
      const ch = rgb(255, 80, 80);
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue;
        pixels32[ccy * W + (ccx + i)] = ch;
        pixels32[(ccy + i) * W + ccx] = ch;
      }
    }

    // ----- HUD strip -----
    const hudTop = VIEW_H;
    const bg = rgb(18, 8, 12);
    const accent = rgb(180, 30, 30);
    for (let y = hudTop; y < H; y++) {
      const rowOff = y * W;
      for (let x = 0; x < W; x++) {
        // top border line
        if (y === hudTop) {
          pixels32[rowOff + x] = accent;
          continue;
        }
        // subtle stripes
        const stripe = ((x + y) & 7) === 0 ? rgb(28, 14, 18) : bg;
        pixels32[rowOff + x] = stripe;
      }
    }
    // health bar
    const hbX = 8;
    const hbY = hudTop + 10;
    const hbW = 100;
    const hbH = 12;
    drawRect(hbX - 1, hbY - 1, hbW + 2, hbH + 2, rgb(80, 80, 90));
    drawRect(hbX, hbY, hbW, hbH, rgb(36, 36, 44));
    const hpW = Math.max(0, Math.floor((pHealth / 100) * hbW));
    const hpColor = pHealth > 60 ? rgb(60, 200, 90) : pHealth > 30 ? rgb(220, 180, 40) : rgb(220, 50, 50);
    drawRect(hbX, hbY, hpW, hbH, hpColor);
    // text labels (drawn via overlay 2d ops below since pixel font would balloon code)

    // ----- Mini-map (top-right) -----
    const miniCell = 3;
    const miniW = MAP_W * miniCell;
    const miniH = MAP_H * miniCell;
    const miniX = W - miniW - 4;
    const miniY = 4;
    for (let my = 0; my < MAP_H; my++) {
      for (let mx = 0; mx < MAP_W; mx++) {
        const tile = map[my * MAP_W + mx];
        let c: number;
        if (tile === TILE_WALL) c = rgb(80, 60, 50);
        else if (tile === TILE_EXIT) c = rgb(180, 80, 220);
        else c = rgb(20, 18, 24);
        drawRect(miniX + mx * miniCell, miniY + my * miniCell, miniCell, miniCell, c);
      }
    }
    // border
    drawRectOutline(miniX - 1, miniY - 1, miniW + 2, miniH + 2, rgb(180, 30, 30));
    // player dot
    const ppx = miniX + Math.floor(px * miniCell);
    const ppy = miniY + Math.floor(py * miniCell);
    drawRect(ppx - 1, ppy - 1, 3, 3, rgb(255, 230, 80));
    // enemies
    for (const e of enemies) {
      if (!e.alive) continue;
      const ex = miniX + Math.floor(e.x * miniCell);
      const ey = miniY + Math.floor(e.y * miniCell);
      drawRect(ex, ey, 2, 2, rgb(220, 50, 60));
    }
  }

  function drawRect(x: number, y: number, w: number, h: number, color: number) {
    const x0 = Math.max(0, x);
    const y0 = Math.max(0, y);
    const x1 = Math.min(W, x + w);
    const y1 = Math.min(H, y + h);
    for (let yy = y0; yy < y1; yy++) {
      const off = yy * W;
      for (let xx = x0; xx < x1; xx++) pixels32[off + xx] = color;
    }
  }
  function drawRectOutline(x: number, y: number, w: number, h: number, color: number) {
    drawRect(x, y, w, 1, color);
    drawRect(x, y + h - 1, w, 1, color);
    drawRect(x, y, 1, h, color);
    drawRect(x + w - 1, y, 1, h, color);
  }

  // ---------- Game logic ----------
  function shoot() {
    if (state !== 'playing') return;
    muzzleFlash = 0.5;
    shootSound();
    // Hit closest enemy roughly in front
    const dirX = Math.cos(pa);
    const dirY = Math.sin(pa);
    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      if (!e.alive) continue;
      const sx = e.x - px;
      const sy = e.y - py;
      const proj = sx * dirX + sy * dirY;
      if (proj <= 0) continue;
      const perp = Math.abs(sx * -dirY + sy * dirX);
      // generous hitbox that scales with distance
      if (perp > 0.45 + proj * 0.05) continue;
      const d = Math.hypot(sx, sy);
      // wall block check via zbuffer column at center
      const col = W >> 1;
      if (d > zbuffer[col] + 0.1) continue;
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    if (bestIdx >= 0) {
      const e = enemies[bestIdx];
      e.hp -= 1;
      e.hitFlash = 0.6;
      if (e.hp <= 0) {
        e.alive = false;
        kills++;
        beep(400, 80, 'triangle', 0.05);
        setTimeout(() => beep(180, 160, 'sawtooth', 0.06), 60);
      } else {
        hitSound();
      }
    }
  }

  function updateEnemies(dt: number) {
    for (const e of enemies) {
      if (!e.alive) continue;
      e.hitFlash = Math.max(0, e.hitFlash - dt * 4);
      const dx = px - e.x;
      const dy = py - e.y;
      const d = Math.hypot(dx, dy);
      // Damage on contact
      if (d < 0.7) {
        if (state === 'playing') {
          pHealth -= dt * 22;
          damageFlash = Math.min(1, damageFlash + dt * 1.2);
          if (Math.random() < dt * 1.5) damageSound();
        }
        continue;
      }
      // Chase if visible / nearby
      if (d < 9 && hasLOS(e.x, e.y, px, py)) {
        const speed = 1.4;
        const nx = e.x + (dx / d) * speed * dt;
        const ny = e.y + (dy / d) * speed * dt;
        // basic wall avoidance
        if (!isWall(Math.floor(nx), Math.floor(e.y))) e.x = nx;
        if (!isWall(Math.floor(e.x), Math.floor(ny))) e.y = ny;
      }
    }
  }

  function checkWin() {
    const cx = Math.floor(px);
    const cy = Math.floor(py);
    if (cx === exitCellX && cy === exitCellY) {
      state = 'won';
      releasePointer();
      winSound();
    }
  }

  // ---------- Main loop ----------
  let raf = 0;
  let lastTime = 0;
  function loop(now: number) {
    raf = requestAnimationFrame(loop);
    if (!ctx) return;
    const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0;
    lastTime = now;

    if (state === 'playing') {
      elapsedSec += dt;
      // Movement
      const moveSpeed = 3.0;
      const turnSpeed = 2.4;
      const cosA = Math.cos(pa);
      const sinA = Math.sin(pa);
      let mx = 0;
      let my = 0;
      if (keys.has('w') || keys.has('arrowup')) {
        mx += cosA;
        my += sinA;
      }
      if (keys.has('s') || keys.has('arrowdown')) {
        mx -= cosA;
        my -= sinA;
      }
      if (keys.has('a')) {
        mx += -sinA * -1;
        my += cosA * -1;
      }
      if (keys.has('d')) {
        mx += -sinA;
        my += cosA;
      }
      if (keys.has('arrowleft')) pa -= turnSpeed * dt;
      if (keys.has('arrowright')) pa += turnSpeed * dt;
      const ml = Math.hypot(mx, my);
      if (ml > 0) {
        mx /= ml;
        my /= ml;
        tryMove(px + mx * moveSpeed * dt, py + my * moveSpeed * dt);
      }
      // Mouse look (consumed each frame)
      if (mouseLook !== 0) {
        pa += mouseLook * 0.0025;
        mouseLook = 0;
      }
      updateEnemies(dt);
      checkWin();
      if (pHealth <= 0) {
        pHealth = 0;
        state = 'dead';
        releasePointer();
        beep(120, 600, 'sawtooth', 0.08);
      }
    }

    muzzleFlash = Math.max(0, muzzleFlash - dt * 3);
    damageFlash = Math.max(0, damageFlash - dt * 1.5);

    render(now / 1000);
    ctx.putImageData(imageData, 0, 0);

    // overlay text on canvas (HUD labels) — done via 2D context after putImageData
    drawHudText();
  }

  function drawHudText() {
    const c = ctx;
    c.save();
    c.font = 'bold 10px "DM Mono", ui-monospace, monospace';
    c.textBaseline = 'middle';
    c.fillStyle = '#ffd1d1';
    const y = VIEW_H + 16;
    c.fillText('HP', 8, y - 9);
    c.fillStyle = '#ffe7c0';
    c.textAlign = 'left';
    c.fillText(`KILLS ${kills}/${totalEnemies}`, 120, y);
    c.fillText(`TIME ${formatTime(elapsedSec)}`, 200, y);
    // flavor at bottom
    c.fillStyle = '#7a5a5a';
    c.font = '8px "DM Mono", ui-monospace, monospace';
    c.fillText('REACH THE PURPLE PORTAL', 8, VIEW_H + 32);
    c.restore();
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  }

  // ---------- Pointer lock ----------
  function requestPointer() {
    if (!canvas) return;
    canvas.requestPointerLock?.();
  }
  function releasePointer() {
    if (typeof document !== 'undefined' && document.exitPointerLock) {
      try {
        document.exitPointerLock();
      } catch {
        /* ignore */
      }
    }
  }
  function onPointerLockChange() {
    pointerLocked = document.pointerLockElement === canvas;
    if (!pointerLocked && state === 'playing') {
      state = 'paused';
    }
  }

  // ---------- Event handlers ----------
  function onKeyDown(e: KeyboardEvent) {
    const k = e.key.toLowerCase();
    if (state === 'playing' && (k === 'w' || k === 'a' || k === 's' || k === 'd' || k.startsWith('arrow'))) {
      e.preventDefault();
    }
    keys.add(k);
    if (k === 'escape') {
      if (state === 'playing') {
        state = 'paused';
        releasePointer();
      }
    }
    if (k === 'r' && (state === 'won' || state === 'dead')) {
      startGame();
    }
  }
  function onKeyUp(e: KeyboardEvent) {
    keys.delete(e.key.toLowerCase());
  }
  function onMouseMove(e: MouseEvent) {
    if (state !== 'playing' || !pointerLocked) return;
    mouseLook += e.movementX || 0;
  }
  function onMouseDown(e: MouseEvent) {
    if (state === 'idle' || state === 'paused' || state === 'won' || state === 'dead') return;
    if (e.button === 0) shoot();
  }

  function startGame() {
    if (state === 'idle' || state === 'won' || state === 'dead') {
      resetGame();
    }
    state = 'playing';
    ensureAudio();
    requestPointer();
    lastTime = 0;
  }
  function resumeGame() {
    state = 'playing';
    requestPointer();
    lastTime = 0;
  }

  // ---------- Lifecycle ----------
  onMount(() => {
    ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.imageSmoothingEnabled = false;
    imageData = ctx.createImageData(W, H);
    pixels32 = new Uint32Array(imageData.data.buffer);
    pixels32.fill(rgb(8, 6, 10));
    generateMap();
    spawnEnemies(8);
    raf = requestAnimationFrame(loop);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('pointerlockchange', onPointerLockChange);
  });

  onDestroy(() => {
    cancelAnimationFrame(raf);
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('pointerlockchange', onPointerLockChange);
    }
    releasePointer();
    if (audioCtx) {
      try {
        audioCtx.close();
      } catch {
        /* ignore */
      }
    }
  });
</script>

<svelte:head>
  <title>The Labyrinth | HostVerna</title>
  <meta
    name="description"
    content="A small Doom-style raycasted shooter hidden inside hostverna.com. Find the portal, survive the imps, escape the maze."
  />
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="laby-page">
  <header class="laby-header">
    <a class="back-link" href="/robots.txt" aria-label="Back to robots.txt">
      <span class="arrow" aria-hidden="true">&larr;</span>
      <span>/robots.txt</span>
    </a>
    <h1 class="laby-title">THE LABYRINTH</h1>
    <span class="laby-tag">v0.1 — built in a chat with an AI at 11pm</span>
  </header>

  <main class="laby-stage">
    <div class="screen">
      <canvas
        bind:this={canvas}
        width={W}
        height={H}
        on:mousedown={onMouseDown}
        on:click={() => {
          if (state === 'idle') startGame();
          else if (state === 'paused') resumeGame();
        }}
      ></canvas>

      {#if state === 'idle'}
        <div class="overlay">
          <div class="overlay-card">
            <h2>Enter the labyrinth</h2>
            <p class="lead">
              Procedurally generated maze. Find the glowing purple portal. Don't let the imps eat you.
            </p>
            <ul class="controls">
              <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> &middot; move</li>
              <li><kbd>Mouse</kbd> &middot; look</li>
              <li><kbd>Click</kbd> &middot; fire</li>
              <li><kbd>Esc</kbd> &middot; pause / release cursor</li>
            </ul>
            <button type="button" class="play-btn" on:click={startGame}>CLICK TO PLAY</button>
            <p class="note">Best with a mouse + keyboard. Audio is on.</p>
          </div>
        </div>
      {:else if state === 'paused'}
        <div class="overlay">
          <div class="overlay-card">
            <h2>Paused</h2>
            <p class="lead">Cursor released. Click resume to dive back in.</p>
            <div class="overlay-actions">
              <button type="button" class="play-btn" on:click={resumeGame}>RESUME</button>
              <button
                type="button"
                class="ghost-btn"
                on:click={() => {
                  state = 'idle';
                  resetGame();
                }}
              >
                NEW MAZE
              </button>
              <a class="ghost-btn link" href="/robots.txt">QUIT TO /robots.txt</a>
            </div>
          </div>
        </div>
      {:else if state === 'dead'}
        <div class="overlay dead">
          <div class="overlay-card">
            <h2>YOU DIED</h2>
            <p class="lead">The imps got you. Probably should've shot back faster.</p>
            <p class="stats">
              Kills: <strong>{kills}</strong> / {totalEnemies} &middot; Time: <strong>{formatTime(elapsedSec)}</strong>
            </p>
            <div class="overlay-actions">
              <button type="button" class="play-btn" on:click={startGame}>TRY AGAIN</button>
              <a class="ghost-btn link" href="/robots.txt">BACK TO /robots.txt</a>
            </div>
          </div>
        </div>
      {:else if state === 'won'}
        <div class="overlay won">
          <div class="overlay-card">
            <h2>YOU ESCAPED</h2>
            <p class="lead">The portal swallowed you whole and spit you back out into reality.</p>
            <p class="stats">
              Kills: <strong>{kills}</strong> / {totalEnemies} &middot; Time: <strong>{formatTime(elapsedSec)}</strong>
            </p>
            <div class="overlay-actions">
              <button type="button" class="play-btn" on:click={startGame}>RUN IT AGAIN</button>
              <a class="ghost-btn link" href="/robots.txt">BACK TO /robots.txt</a>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <div class="hint-row">
      <span><kbd>WASD</kbd> move</span>
      <span><kbd>Mouse</kbd> look</span>
      <span><kbd>Click</kbd> fire</span>
      <span><kbd>Esc</kbd> pause</span>
      <span><kbd>R</kbd> restart on death/win</span>
    </div>
  </main>

  <footer class="laby-footer">
    <span>Made by HostVerna for no reason at all.</span>
    <a class="back-link footer-back" href="/robots.txt">Back to /robots.txt &rarr;</a>
  </footer>
</div>

<style>
  :global(html[data-labyrinth='true']),
  :global(body[data-labyrinth='true']) {
    background: #07060a;
  }

  .laby-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at 50% 0%, rgba(180, 30, 30, 0.18), transparent 60%),
      radial-gradient(circle at 50% 100%, rgba(80, 30, 120, 0.18), transparent 60%),
      #07060a;
    color: #eadccf;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    display: flex;
    flex-direction: column;
  }

  .laby-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(180, 30, 30, 0.35);
    background: rgba(20, 8, 12, 0.6);
    backdrop-filter: blur(6px);
  }

  .laby-title {
    margin: 0;
    font-family: 'Space Grotesk', 'DM Mono', ui-monospace, monospace;
    font-size: clamp(18px, 3vw, 26px);
    letter-spacing: 0.18em;
    font-weight: 700;
    color: #ff5454;
    text-shadow: 0 0 10px rgba(255, 60, 60, 0.4), 0 0 24px rgba(255, 60, 60, 0.2);
  }

  .laby-tag {
    font-size: 11px;
    color: #6f5b5b;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #ffb8b8;
    text-decoration: none;
    font-size: 13px;
    letter-spacing: 0.05em;
    padding: 8px 12px;
    border: 1px solid rgba(255, 80, 80, 0.4);
    border-radius: 6px;
    background: rgba(40, 10, 14, 0.6);
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

  .back-link:hover {
    background: rgba(80, 18, 22, 0.8);
    border-color: #ff7373;
    color: #fff;
  }

  .back-link .arrow {
    font-size: 16px;
    line-height: 1;
  }

  .laby-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 24px 16px 8px;
  }

  .screen {
    position: relative;
    width: min(960px, 100%);
    aspect-ratio: 320 / 200;
    background: #000;
    border: 1px solid rgba(180, 30, 30, 0.45);
    box-shadow:
      0 0 0 4px #0a0509,
      0 0 60px rgba(220, 30, 50, 0.18),
      inset 0 0 60px rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    overflow: hidden;
  }

  .screen canvas {
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    cursor: crosshair !important;
    background: #000;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85));
    backdrop-filter: blur(2px);
    padding: 20px;
  }

  .overlay-card {
    max-width: 460px;
    width: 100%;
    text-align: center;
    background: rgba(14, 8, 12, 0.92);
    border: 1px solid rgba(255, 80, 80, 0.35);
    border-radius: 10px;
    padding: clamp(18px, 4vw, 28px);
    box-shadow: 0 12px 60px rgba(220, 30, 50, 0.2);
  }

  .overlay-card h2 {
    margin: 0 0 8px;
    font-family: 'Space Grotesk', 'DM Mono', ui-monospace, monospace;
    font-size: clamp(20px, 4vw, 30px);
    letter-spacing: 0.18em;
    color: #ff7d7d;
    text-shadow: 0 0 14px rgba(255, 60, 60, 0.4);
  }

  .overlay.won .overlay-card h2 {
    color: #c1a0ff;
    text-shadow: 0 0 14px rgba(160, 80, 220, 0.5);
  }

  .overlay.dead .overlay-card h2 {
    color: #ff4848;
    text-shadow: 0 0 14px rgba(255, 30, 30, 0.6), 0 0 30px rgba(120, 0, 0, 0.4);
  }

  .lead {
    margin: 0 0 14px;
    color: #c8b8a8;
    font-size: 13px;
    line-height: 1.55;
  }

  .stats {
    margin: 0 0 14px;
    color: #ffd9b8;
    font-size: 13px;
    letter-spacing: 0.04em;
  }

  .stats strong {
    color: #fff3cf;
  }

  .controls {
    list-style: none;
    margin: 0 auto 16px;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px 14px;
    max-width: 320px;
    text-align: left;
    color: #b59f8a;
    font-size: 12px;
  }

  .controls li {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  kbd {
    display: inline-block;
    padding: 2px 6px;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 11px;
    color: #ffe2c0;
    background: #2a1a18;
    border: 1px solid #5a3030;
    border-bottom-width: 2px;
    border-radius: 4px;
    line-height: 1;
  }

  .play-btn {
    display: inline-block;
    padding: 12px 22px;
    background: linear-gradient(180deg, #d63838 0%, #8a1a1a 100%);
    color: #fff5e6;
    border: 1px solid #ff8a8a;
    border-radius: 6px;
    font-family: 'Space Grotesk', 'DM Mono', ui-monospace, monospace;
    font-size: 14px;
    letter-spacing: 0.18em;
    font-weight: 700;
    cursor: pointer !important;
    box-shadow: 0 6px 0 #4a0a0a, 0 12px 24px rgba(220, 40, 40, 0.35);
    transition: transform 0.05s ease, box-shadow 0.05s ease;
    text-decoration: none;
  }

  .play-btn:hover {
    background: linear-gradient(180deg, #ff5050 0%, #a02020 100%);
  }

  .play-btn:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #4a0a0a, 0 6px 14px rgba(220, 40, 40, 0.3);
  }

  .ghost-btn {
    display: inline-block;
    padding: 10px 16px;
    background: transparent;
    color: #ffb8b8;
    border: 1px solid rgba(255, 120, 120, 0.5);
    border-radius: 6px;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 12px;
    letter-spacing: 0.14em;
    cursor: pointer !important;
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .ghost-btn:hover {
    background: rgba(80, 20, 24, 0.7);
    color: #fff;
  }

  .ghost-btn.link {
    display: inline-flex;
    align-items: center;
  }

  .overlay-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 6px;
  }

  .note {
    margin: 12px 0 0;
    font-size: 11px;
    color: #6f5b5b;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .hint-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: #806c6c;
    font-size: 12px;
    letter-spacing: 0.04em;
  }

  .hint-row span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .laby-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 20px 22px;
    color: #6f5b5b;
    font-size: 12px;
    letter-spacing: 0.05em;
    border-top: 1px solid rgba(180, 30, 30, 0.2);
    margin-top: 12px;
  }

  .footer-back {
    border-color: rgba(255, 100, 100, 0.25);
    background: transparent;
  }

  @media (max-width: 600px) {
    .laby-tag {
      display: none;
    }
    .laby-header,
    .laby-footer {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
      gap: 8px;
    }
    .footer-back {
      align-self: center;
    }
  }
</style>
