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
  const POS_Z = VIEW_H * 0.5;

  // ---------- Maze (hand-crafted Pac-Man-ish) ----------
  // # = wall, . = pellet, o = power pellet, G = ghost spawn, P = player spawn
  const MAZE_RAW = [
    '#################',
    '#o.............o#',
    '#.##.###.###.##.#',
    '#...............#',
    '#.##.##.#.##.##.#',
    '#....#..#..#....#',
    '#.##.#..#..#.##.#',
    '#....#.....#....#',
    '#.##.##.G.##.##.#',
    '#....#.....#....#',
    '#.##.#..#..#.##.#',
    '#....#..#..#....#',
    '#.##.##.#.##.##.#',
    '#...............#',
    '#.##.###.###.##.#',
    '#o......P......o#',
    '#################',
  ];
  const MAP_W = MAZE_RAW[0].length;
  const MAP_H = MAZE_RAW.length;

  const TILE_EMPTY = 0;
  const TILE_WALL = 1;
  const TILE_PELLET = 2;
  const TILE_POWER = 3;

  let map = new Uint8Array(MAP_W * MAP_H);
  let pelletsTotal = 0;
  let pelletsEaten = 0;
  let pSpawnX = 8.5;
  let pSpawnY = 15.5;
  let ghostSpawn = { x: 8.5, y: 8.5 };

  // ---------- Player ----------
  let px = pSpawnX;
  let py = pSpawnY;
  let pa = -Math.PI / 2;
  let lives = 3;
  let score = 0;
  let powerTimer = 0;
  let ghostStreak = 0;
  let elapsedSec = 0;
  let respawning = 0;
  let damageFlash = 0;
  let powerFlash = 0;
  let messageText = '';
  let messageTime = 0;

  // ---------- Game state ----------
  type GameState = 'idle' | 'playing' | 'paused' | 'won' | 'gameover';
  let state: GameState = 'idle';

  // ---------- Ghosts ----------
  type GhostMode = 'chase' | 'frightened' | 'eaten';
  type Ghost = {
    name: string;
    color: number;
    x: number;
    y: number;
    targetCellX: number;
    targetCellY: number;
    lastCellX: number;
    lastCellY: number;
    speed: number;
    mode: GhostMode;
    bob: number;
    eyeDirX: number;
    eyeDirY: number;
  };
  let ghosts: Ghost[] = [];

  // BFS distance field from player cell (for ghost AI)
  const distField = new Int16Array(MAP_W * MAP_H);
  let lastDistFieldCell = -1;

  // ---------- Input ----------
  const keys = new Set<string>();
  let mouseLook = 0;
  let pointerLocked = false;

  // ---------- Canvas / pixels ----------
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let imageData: ImageData;
  let pixels32: Uint32Array;
  const zbuffer = new Float32Array(W);

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
  let pelletToggle = false;
  function eatBlip() {
    pelletToggle = !pelletToggle;
    beep(pelletToggle ? 660 : 880, 50, 'square', 0.035);
  }
  function powerSound() {
    beep(220, 120, 'sawtooth', 0.05);
    setTimeout(() => beep(330, 140, 'sawtooth', 0.05), 80);
    setTimeout(() => beep(440, 200, 'sawtooth', 0.05), 200);
  }
  function ghostEatSound() {
    beep(880, 80, 'triangle', 0.06);
    setTimeout(() => beep(1320, 80, 'triangle', 0.06), 70);
    setTimeout(() => beep(1760, 140, 'triangle', 0.06), 140);
  }
  function deathSound() {
    beep(440, 200, 'square', 0.06);
    setTimeout(() => beep(330, 220, 'square', 0.06), 200);
    setTimeout(() => beep(220, 280, 'square', 0.06), 420);
    setTimeout(() => beep(110, 400, 'sawtooth', 0.07), 700);
  }
  function winSound() {
    const notes = [523, 659, 784, 1047, 784, 1047];
    notes.forEach((n, i) => setTimeout(() => beep(n, 150, 'square', 0.05), i * 130));
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

  // ---------- Maze parsing ----------
  function parseMaze() {
    map = new Uint8Array(MAP_W * MAP_H);
    pelletsTotal = 0;
    for (let y = 0; y < MAP_H; y++) {
      const row = MAZE_RAW[y];
      for (let x = 0; x < MAP_W; x++) {
        const c = row[x];
        const idx = y * MAP_W + x;
        if (c === '#') {
          map[idx] = TILE_WALL;
        } else if (c === '.') {
          map[idx] = TILE_PELLET;
          pelletsTotal++;
        } else if (c === 'o') {
          map[idx] = TILE_POWER;
          pelletsTotal++;
        } else if (c === 'G') {
          map[idx] = TILE_EMPTY;
          ghostSpawn = { x: x + 0.5, y: y + 0.5 };
        } else if (c === 'P') {
          map[idx] = TILE_PELLET;
          pelletsTotal++;
          pSpawnX = x + 0.5;
          pSpawnY = y + 0.5;
        } else {
          map[idx] = TILE_EMPTY;
        }
      }
    }
  }

  function spawnGhosts() {
    const proto = [
      { name: 'Blinky', color: rgb(255, 60, 60), speed: 2.0 },
      { name: 'Pinky', color: rgb(255, 170, 200), speed: 1.95 },
      { name: 'Inky', color: rgb(80, 220, 240), speed: 1.9 },
      { name: 'Clyde', color: rgb(255, 170, 60), speed: 1.85 },
    ];
    const cx = Math.floor(ghostSpawn.x);
    const cy = Math.floor(ghostSpawn.y);
    ghosts = proto.map((p, i) => ({
      name: p.name,
      color: p.color,
      x: ghostSpawn.x + (i - 1.5) * 0.25,
      y: ghostSpawn.y,
      targetCellX: cx,
      targetCellY: cy,
      lastCellX: cx,
      lastCellY: cy,
      speed: p.speed,
      mode: 'chase' as GhostMode,
      bob: Math.random() * Math.PI * 2,
      eyeDirX: 0,
      eyeDirY: 1,
    }));
  }

  function resetGame() {
    parseMaze();
    spawnGhosts();
    px = pSpawnX;
    py = pSpawnY;
    pa = -Math.PI / 2;
    pelletsEaten = 0;
    score = 0;
    lives = 3;
    powerTimer = 0;
    ghostStreak = 0;
    elapsedSec = 0;
    damageFlash = 0;
    powerFlash = 0;
    respawning = 0;
    messageText = '';
    messageTime = 0;
    lastDistFieldCell = -1;
  }

  function respawnPlayer() {
    px = pSpawnX;
    py = pSpawnY;
    pa = -Math.PI / 2;
    powerTimer = 0;
    for (const g of ghosts) {
      g.x = ghostSpawn.x + (Math.random() - 0.5) * 0.4;
      g.y = ghostSpawn.y;
      const cx = Math.floor(g.x);
      const cy = Math.floor(g.y);
      g.targetCellX = cx;
      g.targetCellY = cy;
      g.lastCellX = cx;
      g.lastCellY = cy;
      g.mode = 'chase';
    }
    lastDistFieldCell = -1;
  }

  // ---------- Distance field (BFS from player cell) ----------
  function updateDistField() {
    const cx = Math.floor(px);
    const cy = Math.floor(py);
    if (cx < 0 || cy < 0 || cx >= MAP_W || cy >= MAP_H) return;
    const cellIdx = cy * MAP_W + cx;
    if (cellIdx === lastDistFieldCell) return;
    lastDistFieldCell = cellIdx;
    distField.fill(-1);
    if (map[cellIdx] === TILE_WALL) return;
    distField[cellIdx] = 0;
    const q: number[] = [cellIdx];
    while (q.length) {
      const c = q.shift()!;
      const cyy = Math.floor(c / MAP_W);
      const cxx = c - cyy * MAP_W;
      const d = distField[c];
      if (cxx + 1 < MAP_W) {
        const ni = cyy * MAP_W + (cxx + 1);
        if (map[ni] !== TILE_WALL && distField[ni] === -1) {
          distField[ni] = d + 1;
          q.push(ni);
        }
      }
      if (cxx - 1 >= 0) {
        const ni = cyy * MAP_W + (cxx - 1);
        if (map[ni] !== TILE_WALL && distField[ni] === -1) {
          distField[ni] = d + 1;
          q.push(ni);
        }
      }
      if (cyy + 1 < MAP_H) {
        const ni = (cyy + 1) * MAP_W + cxx;
        if (map[ni] !== TILE_WALL && distField[ni] === -1) {
          distField[ni] = d + 1;
          q.push(ni);
        }
      }
      if (cyy - 1 >= 0) {
        const ni = (cyy - 1) * MAP_W + cxx;
        if (map[ni] !== TILE_WALL && distField[ni] === -1) {
          distField[ni] = d + 1;
          q.push(ni);
        }
      }
    }
  }

  // ---------- Wall texture (Pac-Man neon-blue) ----------
  function wallTexel(u: number, v: number, side: number): number {
    const border = 0.07;
    const inBorder = u < border || u > 1 - border || v < border || v > 1 - border;
    if (inBorder) {
      // bright cyan glow on edges
      return side === 1 ? rgb(40, 130, 200) : rgb(70, 200, 255);
    }
    // dark blue interior
    return side === 1 ? rgb(8, 8, 50) : rgb(14, 14, 80);
  }

  // ---------- Floor / ceiling (subtle dotted grid) ----------
  function floorTexel(fx: number, fy: number): number {
    const gx = Math.floor(fx * 8) & 1;
    const gy = Math.floor(fy * 8) & 1;
    if (gx === 0 && gy === 0) return rgb(14, 14, 28);
    return rgb(8, 8, 18);
  }
  function ceilTexel(fx: number, fy: number): number {
    const tx = Math.floor(fx * 16);
    const ty = Math.floor(fy * 16);
    const n = Math.abs(Math.sin(tx * 31.7 + ty * 47.1));
    if (n > 0.985) return rgb(150, 180, 220); // tiny "stars"
    return rgb(2, 2, 8);
  }

  // ---------- Pellet sprite ----------
  function pelletTexel(u: number, v: number, isPower: boolean, t: number): number {
    const cx = u - 0.5;
    const cy = v - 0.5;
    const r2 = cx * cx + cy * cy;
    if (r2 > 0.25) return 0;
    if (isPower) {
      const pulse = 0.6 + Math.sin(t * 6) * 0.4;
      return rgb(
        Math.floor(255 * pulse),
        Math.floor(220 * pulse),
        Math.floor(80 * Math.max(0.3, pulse * 0.7)),
      );
    }
    // Solid pellet with simple shading
    if (r2 < 0.04) return rgb(255, 250, 220);
    return rgb(255, 215, 140);
  }

  // ---------- Ghost sprite ----------
  function ghostTexel(
    u: number,
    v: number,
    color: number,
    mode: GhostMode,
    eyeDirX: number,
    eyeDirY: number,
    powerLeft: number,
  ): number {
    const cx = u - 0.5;
    const cy = v - 0.5;

    // Eyes — drawn over body, also visible when ghost is "eaten"
    const eyeY = -0.05;
    const eyeOff = 0.18;
    const eyeR = 0.085;
    const pupilOffX = eyeDirX * 0.045;
    const pupilOffY = eyeDirY * 0.045;
    const dlEye = (cx + eyeOff) * (cx + eyeOff) + (cy - eyeY) * (cy - eyeY);
    const drEye = (cx - eyeOff) * (cx - eyeOff) + (cy - eyeY) * (cy - eyeY);
    const dlPupX = cx + eyeOff - pupilOffX;
    const dlPupY = cy - eyeY - pupilOffY;
    const drPupX = cx - eyeOff - pupilOffX;
    const drPupY = cy - eyeY - pupilOffY;
    const dlPupil = dlPupX * dlPupX + dlPupY * dlPupY;
    const drPupil = drPupX * drPupX + drPupY * drPupY;

    const eyeWhite = rgb(245, 245, 250);
    const eyeBlue = rgb(20, 20, 110);

    if (dlPupil < 0.0018 || drPupil < 0.0018) return eyeBlue;
    if (dlEye < eyeR * eyeR || drEye < eyeR * eyeR) {
      if (mode === 'frightened') return rgb(220, 80, 60);
      return eyeWhite;
    }
    if (mode === 'eaten') return 0;

    // Body silhouette
    if (cy < 0.05) {
      // Dome (top)
      const r2 = (cx * cx) / 0.18 + (cy * cy) / 0.18;
      if (r2 > 1) return 0;
    } else {
      // Bottom: rectangle with wavy edge
      if (Math.abs(cx) > 0.42) return 0;
      const wave = 0.42 - Math.max(0, Math.sin(cx * 24)) * 0.06;
      if (cy > wave) return 0;
    }

    // Frightened body
    if (mode === 'frightened') {
      const blink = powerLeft < 2 && Math.floor(powerLeft * 5) % 2 === 0;
      const body = blink ? rgb(245, 245, 250) : rgb(40, 60, 220);
      // mouth: zig-zag pattern
      if (cy > 0.05 && cy < 0.18 && Math.abs(cx) < 0.25) {
        const z = Math.sin(cx * 36) > 0;
        if (z) return blink ? rgb(40, 60, 220) : rgb(245, 245, 250);
        return rgb(40, 20, 80);
      }
      return body;
    }

    // Slight inner highlight
    if (cy < -0.1 && cx > 0.05 && cx < 0.18) {
      return shade(color, 1.18);
    }
    return color;
  }

  // ---------- Movement / collision ----------
  function isWall(mx: number, my: number): boolean {
    if (mx < 0 || my < 0 || mx >= MAP_W || my >= MAP_H) return true;
    return map[my * MAP_W + mx] === TILE_WALL;
  }
  function tryMove(nx: number, ny: number) {
    const pad = 0.22;
    // Try X
    if (
      !isWall(Math.floor(nx - pad), Math.floor(py - pad)) &&
      !isWall(Math.floor(nx - pad), Math.floor(py + pad)) &&
      !isWall(Math.floor(nx + pad), Math.floor(py - pad)) &&
      !isWall(Math.floor(nx + pad), Math.floor(py + pad))
    ) {
      px = nx;
    }
    // Try Y
    if (
      !isWall(Math.floor(px - pad), Math.floor(ny - pad)) &&
      !isWall(Math.floor(px - pad), Math.floor(ny + pad)) &&
      !isWall(Math.floor(px + pad), Math.floor(ny - pad)) &&
      !isWall(Math.floor(px + pad), Math.floor(ny + pad))
    ) {
      py = ny;
    }
  }

  // ---------- Raycast (DDA) ----------
  type RayHit = { dist: number; side: number; hitU: number };
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
        return { dist: 64, side, hitU: 0 };
      }
      if (map[mapY * MAP_W + mapX] === TILE_WALL) {
        const dist = side === 0 ? sideX - deltaX : sideY - deltaY;
        let hitU = side === 0 ? originY + dist * dirY : originX + dist * dirX;
        hitU -= Math.floor(hitU);
        if ((side === 0 && stepX > 0) || (side === 1 && stepY < 0)) {
          hitU = 1 - hitU;
        }
        return { dist, side, hitU };
      }
    }
    return { dist: 64, side, hitU: 0 };
  }

  // ---------- Render ----------
  function render(t: number) {
    pixels32.fill(rgb(0, 0, 0));
    const cosA = Math.cos(pa);
    const sinA = Math.sin(pa);
    const planeLen = Math.tan(HALF_FOV);
    const planeX = -sinA * planeLen;
    const planeY = cosA * planeLen;

    // ----- Floor / ceiling cast -----
    const horizon = HALF_VIEW_H;
    for (let y = horizon + 1; y < VIEW_H; y++) {
      const p = y - horizon;
      const rowDist = POS_Z / p;
      const rayDirX0 = cosA - planeX;
      const rayDirY0 = sinA - planeY;
      const rayDirX1 = cosA + planeX;
      const rayDirY1 = sinA + planeY;
      const stepX = (rowDist * (rayDirX1 - rayDirX0)) / W;
      const stepY = (rowDist * (rayDirY1 - rayDirY0)) / W;
      let fx = px + rowDist * rayDirX0;
      let fy = py + rowDist * rayDirY0;
      const fade = Math.max(0.18, 1 - rowDist / 9);
      const rowOff = y * W;
      const ceilY = horizon - p;
      const rowCeil = ceilY * W;
      for (let x = 0; x < W; x++) {
        pixels32[rowOff + x] = shade(floorTexel(fx, fy), fade);
        if (ceilY >= 0 && ceilY < VIEW_H) {
          pixels32[rowCeil + x] = shade(ceilTexel(fx, fy), fade * 0.6);
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
      const fade = Math.max(0.25, 1 - perpDist / 11);
      const top = -lineH / 2 + HALF_VIEW_H;
      for (let y = drawStart; y <= drawEnd; y++) {
        const v = (y - top) / lineH;
        const tex = wallTexel(hit.hitU, v, hit.side);
        pixels32[y * W + x] = shade(tex, fade);
      }
    }

    // ----- Sprite list (pellets, power pellets, ghosts) -----
    type Sprite =
      | { kind: 'pellet' | 'power'; x: number; y: number; d2: number }
      | { kind: 'ghost'; ghost: Ghost; x: number; y: number; d2: number };
    const sprites: Sprite[] = [];

    // Pellets — only collect ones in front and within view distance
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const tile = map[y * MAP_W + x];
        if (tile !== TILE_PELLET && tile !== TILE_POWER) continue;
        const wx = x + 0.5;
        const wy = y + 0.5;
        const dx = wx - px;
        const dy = wy - py;
        const d2 = dx * dx + dy * dy;
        if (d2 > 49) continue; // < 7 units
        sprites.push({
          kind: tile === TILE_POWER ? 'power' : 'pellet',
          x: wx,
          y: wy,
          d2,
        });
      }
    }
    for (const g of ghosts) {
      const dx = g.x - px;
      const dy = g.y - py;
      const d2 = dx * dx + dy * dy;
      sprites.push({ kind: 'ghost', ghost: g, x: g.x, y: g.y, d2 });
    }
    sprites.sort((a, b) => b.d2 - a.d2);

    const invDet = 1.0 / (planeX * sinA - cosA * planeY);
    for (const s of sprites) {
      const sx = s.x - px;
      const sy = s.y - py;
      const transformX = invDet * (sinA * sx - cosA * sy);
      const transformY = invDet * (-planeY * sx + planeX * sy);
      if (transformY <= 0.05) continue;
      const screenX = Math.floor((W / 2) * (1 + transformX / transformY));
      let spriteH: number;
      let spriteW: number;
      let spriteTop: number;
      let spriteLeft: number;

      if (s.kind === 'ghost') {
        const size = 0.85;
        spriteH = (size * VIEW_H) / transformY;
        spriteW = spriteH;
        const bob = Math.sin(t * 5 + s.ghost.bob) * (spriteH * 0.04);
        const floorScreenY = HALF_VIEW_H + POS_Z / transformY;
        spriteTop = floorScreenY - spriteH + bob;
        spriteLeft = screenX - spriteW / 2;
      } else {
        const size = s.kind === 'power' ? 0.34 : 0.18;
        spriteH = (size * VIEW_H) / transformY;
        spriteW = spriteH;
        const floorScreenY = HALF_VIEW_H + POS_Z / transformY;
        spriteTop = floorScreenY - spriteH;
        spriteLeft = screenX - spriteW / 2;
      }

      const drawStartX = Math.max(0, Math.floor(spriteLeft));
      const drawEndX = Math.min(W - 1, Math.floor(spriteLeft + spriteW));
      const drawStartY = Math.max(0, Math.floor(spriteTop));
      const drawEndY = Math.min(VIEW_H - 1, Math.floor(spriteTop + spriteH));
      const fade = Math.max(0.4, 1 - transformY / 9);

      if (s.kind === 'ghost') {
        const g = s.ghost;
        const eyeDirX = g.eyeDirX;
        const eyeDirY = g.eyeDirY;
        for (let stripe = drawStartX; stripe <= drawEndX; stripe++) {
          if (transformY > zbuffer[stripe]) continue;
          const u = (stripe - spriteLeft) / spriteW;
          for (let y = drawStartY; y <= drawEndY; y++) {
            const v = (y - spriteTop) / spriteH;
            const tex = ghostTexel(u, v, g.color, g.mode, eyeDirX, eyeDirY, powerTimer);
            if (tex === 0) continue;
            pixels32[y * W + stripe] = shade(tex, fade);
          }
        }
      } else {
        const isPower = s.kind === 'power';
        for (let stripe = drawStartX; stripe <= drawEndX; stripe++) {
          if (transformY > zbuffer[stripe]) continue;
          const u = (stripe - spriteLeft) / spriteW;
          for (let y = drawStartY; y <= drawEndY; y++) {
            const v = (y - spriteTop) / spriteH;
            const tex = pelletTexel(u, v, isPower, t);
            if (tex === 0) continue;
            pixels32[y * W + stripe] = shade(tex, fade);
          }
        }
      }
    }

    // ----- Damage flash (red vignette) -----
    if (damageFlash > 0.01) {
      const intensity = Math.min(0.7, damageFlash);
      for (let y = 0; y < VIEW_H; y++) {
        for (let x = 0; x < W; x++) {
          const cx = (x - W / 2) / (W / 2);
          const cy = (y - VIEW_H / 2) / (VIEW_H / 2);
          const r2 = cx * cx + cy * cy;
          if (r2 < 0.5) continue;
          const v = Math.min(1, (r2 - 0.5) * 1.6) * intensity;
          const i = y * W + x;
          const c = pixels32[i];
          const cr = c & 0xff;
          const cg = (c >> 8) & 0xff;
          const cb = (c >> 16) & 0xff;
          pixels32[i] = rgb(
            Math.min(255, Math.floor(cr * (1 - v) + 240 * v)),
            Math.floor(cg * (1 - v) + 30 * v),
            Math.floor(cb * (1 - v) + 30 * v),
          );
        }
      }
    }
    // ----- Power pellet flash (cyan/blue vignette) -----
    if (powerFlash > 0.01) {
      const intensity = Math.min(0.6, powerFlash);
      for (let y = 0; y < VIEW_H; y++) {
        for (let x = 0; x < W; x++) {
          const cx = (x - W / 2) / (W / 2);
          const cy = (y - VIEW_H / 2) / (VIEW_H / 2);
          const r2 = cx * cx + cy * cy;
          const v = Math.min(1, r2) * intensity;
          const i = y * W + x;
          const c = pixels32[i];
          const cr = c & 0xff;
          const cg = (c >> 8) & 0xff;
          const cb = (c >> 16) & 0xff;
          pixels32[i] = rgb(
            Math.floor(cr * (1 - v) + 30 * v),
            Math.floor(cg * (1 - v) + 100 * v),
            Math.min(255, Math.floor(cb * (1 - v) + 230 * v)),
          );
        }
      }
    }

    // ----- Crosshair (subtle dot) -----
    if (state === 'playing') {
      const ccx = W >> 1;
      const ccy = VIEW_H >> 1;
      const c = rgb(255, 220, 80);
      pixels32[ccy * W + ccx] = c;
      pixels32[ccy * W + (ccx - 2)] = c;
      pixels32[ccy * W + (ccx + 2)] = c;
      pixels32[(ccy - 2) * W + ccx] = c;
      pixels32[(ccy + 2) * W + ccx] = c;
    }

    // ----- HUD strip -----
    const hudTop = VIEW_H;
    const bg = rgb(6, 6, 22);
    const accent = rgb(70, 200, 255);
    for (let y = hudTop; y < H; y++) {
      const rowOff = y * W;
      for (let x = 0; x < W; x++) {
        if (y === hudTop) {
          pixels32[rowOff + x] = accent;
          continue;
        }
        pixels32[rowOff + x] = bg;
      }
    }

    // Power timer bar
    if (powerTimer > 0) {
      const pwX = 8;
      const pwY = hudTop + 28;
      const pwW = 100;
      const pwH = 4;
      drawRect(pwX, pwY, pwW, pwH, rgb(20, 20, 40));
      const fillW = Math.max(0, Math.floor((powerTimer / 7) * pwW));
      drawRect(pwX, pwY, fillW, pwH, rgb(80, 200, 255));
    }

    // Lives indicators (small Pac-Man circles)
    for (let i = 0; i < lives; i++) {
      const lx = W - 18 - i * 16;
      const ly = hudTop + 28;
      drawCircle(lx, ly, 4, rgb(255, 220, 80));
      // wedge mouth
      drawTriangle(lx, ly, 4, rgb(6, 6, 22));
    }

    // ----- Mini-map (top-right corner of view) -----
    const miniCell = 3;
    const miniW = MAP_W * miniCell;
    const miniH = MAP_H * miniCell;
    const miniX = W - miniW - 4;
    const miniY = 4;
    drawRect(miniX - 2, miniY - 2, miniW + 4, miniH + 4, rgb(0, 0, 12));
    for (let my = 0; my < MAP_H; my++) {
      for (let mx = 0; mx < MAP_W; mx++) {
        const tile = map[my * MAP_W + mx];
        let c: number;
        if (tile === TILE_WALL) c = rgb(30, 50, 130);
        else c = rgb(6, 6, 22);
        drawRect(miniX + mx * miniCell, miniY + my * miniCell, miniCell, miniCell, c);
        if (tile === TILE_PELLET) {
          pixels32[(miniY + my * miniCell + 1) * W + (miniX + mx * miniCell + 1)] = rgb(
            255,
            230,
            150,
          );
        } else if (tile === TILE_POWER) {
          drawRect(miniX + mx * miniCell, miniY + my * miniCell, miniCell, miniCell, rgb(255, 220, 80));
        }
      }
    }
    drawRectOutline(miniX - 1, miniY - 1, miniW + 2, miniH + 2, rgb(70, 200, 255));
    // Player dot
    const ppx = miniX + Math.floor(px * miniCell);
    const ppy = miniY + Math.floor(py * miniCell);
    drawRect(ppx - 1, ppy - 1, 3, 3, rgb(255, 240, 80));
    // Ghosts
    for (const g of ghosts) {
      const ex = miniX + Math.floor(g.x * miniCell);
      const ey = miniY + Math.floor(g.y * miniCell);
      let c = g.color;
      if (g.mode === 'frightened') c = rgb(80, 100, 240);
      else if (g.mode === 'eaten') c = rgb(200, 200, 220);
      drawRect(ex, ey, 2, 2, c);
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
  function drawCircle(cx: number, cy: number, r: number, color: number) {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy <= r * r) {
          const xx = cx + dx;
          const yy = cy + dy;
          if (xx >= 0 && yy >= 0 && xx < W && yy < H) {
            pixels32[yy * W + xx] = color;
          }
        }
      }
    }
  }
  function drawTriangle(cx: number, cy: number, r: number, color: number) {
    // Right-facing wedge (Pac-Man mouth)
    for (let dy = -r; dy <= r; dy++) {
      const adx = Math.abs(dy);
      for (let dx = 0; dx <= r; dx++) {
        if (dx >= adx) {
          const xx = cx + dx;
          const yy = cy + dy;
          if (xx >= 0 && yy >= 0 && xx < W && yy < H) {
            pixels32[yy * W + xx] = color;
          }
        }
      }
    }
  }

  // ---------- Pellet eating ----------
  function eatPellets() {
    const cx = Math.floor(px);
    const cy = Math.floor(py);
    if (cx < 0 || cy < 0 || cx >= MAP_W || cy >= MAP_H) return;
    const idx = cy * MAP_W + cx;
    const tile = map[idx];
    if (tile !== TILE_PELLET && tile !== TILE_POWER) return;
    const dx = px - (cx + 0.5);
    const dy = py - (cy + 0.5);
    if (dx * dx + dy * dy > 0.36) return;
    if (tile === TILE_PELLET) {
      map[idx] = TILE_EMPTY;
      pelletsEaten++;
      score += 10;
      eatBlip();
    } else {
      map[idx] = TILE_EMPTY;
      pelletsEaten++;
      score += 50;
      powerTimer = 7;
      powerFlash = 0.6;
      ghostStreak = 0;
      for (const g of ghosts) {
        if (g.mode === 'chase') g.mode = 'frightened';
      }
      powerSound();
    }
  }

  // ---------- Ghost AI ----------
  function pickNeighbor(g: Ghost) {
    const myCellX = Math.floor(g.x);
    const myCellY = Math.floor(g.y);
    if (g.mode === 'eaten' && myCellX === Math.floor(ghostSpawn.x) && myCellY === Math.floor(ghostSpawn.y)) {
      g.mode = 'chase';
    }
    type Cand = { x: number; y: number; score: number };
    const cands: Cand[] = [];
    const dirs: Array<[number, number]> = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (const [ddx, ddy] of dirs) {
      const nx = myCellX + ddx;
      const ny = myCellY + ddy;
      if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) continue;
      if (map[ny * MAP_W + nx] === TILE_WALL) continue;
      // Avoid going back the way we came (unless dead end)
      if (nx === g.lastCellX && ny === g.lastCellY) continue;
      const dist = distField[ny * MAP_W + nx];
      let s: number;
      if (g.mode === 'eaten') {
        const dx = nx + 0.5 - ghostSpawn.x;
        const dy = ny + 0.5 - ghostSpawn.y;
        s = -Math.hypot(dx, dy);
      } else if (g.mode === 'frightened') {
        s = dist >= 0 ? dist + Math.random() * 0.8 : 0;
      } else {
        s = dist >= 0 ? -dist + Math.random() * 0.4 : -10000;
      }
      cands.push({ x: nx, y: ny, score: s });
    }
    if (cands.length === 0) {
      // Dead end — allow reverse
      for (const [ddx, ddy] of dirs) {
        const nx = myCellX + ddx;
        const ny = myCellY + ddy;
        if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) continue;
        if (map[ny * MAP_W + nx] === TILE_WALL) continue;
        cands.push({ x: nx, y: ny, score: 0 });
      }
    }
    if (cands.length === 0) return;
    cands.sort((a, b) => b.score - a.score);
    const pick = cands[0];
    g.lastCellX = myCellX;
    g.lastCellY = myCellY;
    g.targetCellX = pick.x;
    g.targetCellY = pick.y;
  }

  function updateGhost(g: Ghost, dt: number) {
    const tx = g.targetCellX + 0.5;
    const ty = g.targetCellY + 0.5;
    const dx = tx - g.x;
    const dy = ty - g.y;
    const d = Math.hypot(dx, dy);
    let speed = g.speed;
    if (g.mode === 'frightened') speed *= 0.55;
    else if (g.mode === 'eaten') speed *= 2.2;

    if (d < 0.05 || d <= speed * dt) {
      g.x = tx;
      g.y = ty;
      pickNeighbor(g);
    } else {
      g.x += (dx / d) * speed * dt;
      g.y += (dy / d) * speed * dt;
    }
    g.bob += dt * 6;

    const edx = px - g.x;
    const edy = py - g.y;
    const ed = Math.hypot(edx, edy);
    if (ed > 0.01) {
      g.eyeDirX = edx / ed;
      g.eyeDirY = edy / ed;
    }
  }

  // ---------- Ghost collision ----------
  function checkGhostCollision() {
    if (respawning > 0) return;
    for (const g of ghosts) {
      if (g.mode === 'eaten') continue;
      const dx = g.x - px;
      const dy = g.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < 0.32) {
        if (g.mode === 'frightened') {
          g.mode = 'eaten';
          ghostStreak++;
          const pts = 200 * Math.pow(2, Math.min(3, ghostStreak - 1));
          score += pts;
          messageText = `+${pts}`;
          messageTime = 1.0;
          ghostEatSound();
        } else {
          loseLife();
          return;
        }
      }
    }
  }

  function loseLife() {
    lives--;
    deathSound();
    damageFlash = 0.9;
    if (lives <= 0) {
      state = 'gameover';
      releasePointer();
    } else {
      respawning = 1.6;
      respawnPlayer();
    }
  }

  function checkWin() {
    if (pelletsEaten >= pelletsTotal) {
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
      respawning = Math.max(0, respawning - dt);
      // Movement
      const moveSpeed = 3.6;
      const turnSpeed = 2.6;
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
        mx += sinA;
        my += -cosA;
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
      if (mouseLook !== 0) {
        pa += mouseLook * 0.0025;
        mouseLook = 0;
      }

      // Powerup timer
      if (powerTimer > 0) {
        powerTimer = Math.max(0, powerTimer - dt);
        if (powerTimer === 0) {
          for (const g of ghosts) {
            if (g.mode === 'frightened') g.mode = 'chase';
          }
          ghostStreak = 0;
        }
      }

      eatPellets();
      updateDistField();
      for (const g of ghosts) updateGhost(g, dt);
      checkGhostCollision();
      checkWin();
    }

    damageFlash = Math.max(0, damageFlash - dt * 1.4);
    powerFlash = Math.max(0, powerFlash - dt * 1.6);
    if (messageTime > 0) messageTime -= dt;

    render(now / 1000);
    ctx.putImageData(imageData, 0, 0);
    drawHudText();
  }

  function drawHudText() {
    const c = ctx;
    c.save();
    c.font = 'bold 11px "DM Mono", ui-monospace, monospace';
    c.textBaseline = 'middle';
    c.textAlign = 'left';
    c.fillStyle = '#ffe07a';
    c.fillText(`SCORE  ${score}`, 8, VIEW_H + 12);
    c.fillStyle = '#9be6ff';
    c.font = '9px "DM Mono", ui-monospace, monospace';
    const remaining = pelletsTotal - pelletsEaten;
    c.fillText(`PELLETS ${remaining}`, 130, VIEW_H + 12);
    c.fillText(`TIME ${formatTime(elapsedSec)}`, 220, VIEW_H + 12);

    if (powerTimer > 0) {
      c.fillStyle = '#9be6ff';
      c.font = 'bold 8px "DM Mono", ui-monospace, monospace';
      c.fillText('POWER', 8, VIEW_H + 25);
    }

    if (messageTime > 0 && messageText) {
      c.save();
      c.textAlign = 'center';
      c.font = 'bold 16px "Space Grotesk", "DM Mono", monospace';
      c.fillStyle = `rgba(255, 230, 100, ${Math.min(1, messageTime)})`;
      c.fillText(messageText, W / 2, VIEW_H * 0.35);
      c.restore();
    }
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
    if (k === 'r' && (state === 'won' || state === 'gameover')) {
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

  function startGame() {
    if (state === 'idle' || state === 'won' || state === 'gameover') {
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
    pixels32.fill(rgb(0, 0, 0));
    parseMaze();
    spawnGhosts();
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
  <title>First-person Pac-Man | HostVerna</title>
  <meta
    name="description"
    content="A first-person Pac-Man hidden inside hostverna.com. Eat all the pellets, dodge the ghosts, grab a power pellet to chomp them back."
  />
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="pac-page">
  <header class="pac-header">
    <a class="back-link" href="/journal.txt" aria-label="Back to journal.txt">
      <span class="arrow" aria-hidden="true">&larr;</span>
      <span>/journal.txt</span>
    </a>
    <h1 class="pac-title">FIRST-PERSON PAC-MAN</h1>
    <span class="pac-tag">eat the dots, fear the ghosts</span>
  </header>

  <main class="pac-stage">
    <div class="screen">
      <canvas
        bind:this={canvas}
        width={W}
        height={H}
        on:click={() => {
          if (state === 'idle') startGame();
          else if (state === 'paused') resumeGame();
        }}
      ></canvas>

      {#if state === 'idle'}
        <div class="overlay">
          <div class="overlay-card">
            <h2>READY?</h2>
            <p class="lead">
              Eat every pellet without getting caught. Power pellets in the corners turn the ghosts blue — chomp
              them back for big points.
            </p>
            <ul class="controls">
              <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> &middot; move</li>
              <li><kbd>Mouse</kbd> &middot; look</li>
              <li><kbd>Esc</kbd> &middot; pause / release cursor</li>
              <li><kbd>R</kbd> &middot; restart on win/loss</li>
            </ul>
            <button type="button" class="play-btn" on:click={startGame}>CLICK TO PLAY</button>
            <p class="note">Best with mouse + keyboard. Audio is on.</p>
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
                NEW GAME
              </button>
              <a class="ghost-btn link" href="/journal.txt">QUIT TO /journal.txt</a>
            </div>
          </div>
        </div>
      {:else if state === 'gameover'}
        <div class="overlay dead">
          <div class="overlay-card">
            <h2>GAME OVER</h2>
            <p class="lead">The ghosts got you. Should've grabbed a power pellet.</p>
            <p class="stats">
              Score: <strong>{score}</strong> &middot; Pellets eaten: <strong>{pelletsEaten}</strong> /
              {pelletsTotal} &middot; Time: <strong>{formatTime(elapsedSec)}</strong>
            </p>
            <div class="overlay-actions">
              <button type="button" class="play-btn" on:click={startGame}>TRY AGAIN</button>
              <a class="ghost-btn link" href="/journal.txt">BACK TO /journal.txt</a>
            </div>
          </div>
        </div>
      {:else if state === 'won'}
        <div class="overlay won">
          <div class="overlay-card">
            <h2>YOU WIN</h2>
            <p class="lead">Every pellet eaten. The ghosts are very upset with you.</p>
            <p class="stats">
              Score: <strong>{score}</strong> &middot; Lives left: <strong>{lives}</strong> &middot; Time:
              <strong>{formatTime(elapsedSec)}</strong>
            </p>
            <div class="overlay-actions">
              <button type="button" class="play-btn" on:click={startGame}>RUN IT AGAIN</button>
              <a class="ghost-btn link" href="/journal.txt">BACK TO /journal.txt</a>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <div class="hint-row">
      <span><kbd>WASD</kbd> move</span>
      <span><kbd>Mouse</kbd> look</span>
      <span><kbd>Esc</kbd> pause</span>
      <span><kbd>R</kbd> restart</span>
    </div>
  </main>

  <footer class="pac-footer">
    <span>Made by HostVerna for no reason at all.</span>
    <a class="back-link footer-back" href="/journal.txt">Back to /journal.txt &rarr;</a>
  </footer>
</div>

<style>
  .pac-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at 50% 0%, rgba(70, 200, 255, 0.18), transparent 60%),
      radial-gradient(circle at 50% 100%, rgba(255, 220, 80, 0.1), transparent 60%),
      #04050d;
    color: #e8eef5;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    display: flex;
    flex-direction: column;
  }

  .pac-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(70, 200, 255, 0.35);
    background: rgba(8, 10, 24, 0.6);
    backdrop-filter: blur(6px);
  }

  .pac-title {
    margin: 0;
    font-family: 'Space Grotesk', 'DM Mono', ui-monospace, monospace;
    font-size: clamp(18px, 3vw, 26px);
    letter-spacing: 0.18em;
    font-weight: 700;
    color: #ffd54a;
    text-shadow: 0 0 10px rgba(255, 220, 80, 0.45), 0 0 24px rgba(255, 220, 80, 0.18);
  }

  .pac-tag {
    font-size: 11px;
    color: #6a7a90;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #c8eaff;
    text-decoration: none;
    font-size: 13px;
    letter-spacing: 0.05em;
    padding: 8px 12px;
    border: 1px solid rgba(70, 200, 255, 0.4);
    border-radius: 6px;
    background: rgba(10, 18, 36, 0.6);
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

  .back-link:hover {
    background: rgba(20, 36, 70, 0.8);
    border-color: #7fdcff;
    color: #fff;
  }

  .back-link .arrow {
    font-size: 16px;
    line-height: 1;
  }

  .pac-stage {
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
    border: 1px solid rgba(70, 200, 255, 0.45);
    box-shadow:
      0 0 0 4px #04060e,
      0 0 60px rgba(70, 200, 255, 0.18),
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
    background: rgba(8, 12, 26, 0.92);
    border: 1px solid rgba(70, 200, 255, 0.35);
    border-radius: 10px;
    padding: clamp(18px, 4vw, 28px);
    box-shadow: 0 12px 60px rgba(70, 200, 255, 0.18);
  }

  .overlay-card h2 {
    margin: 0 0 8px;
    font-family: 'Space Grotesk', 'DM Mono', ui-monospace, monospace;
    font-size: clamp(20px, 4vw, 30px);
    letter-spacing: 0.18em;
    color: #ffd54a;
    text-shadow: 0 0 14px rgba(255, 220, 80, 0.4);
  }

  .overlay.won .overlay-card h2 {
    color: #9be6ff;
    text-shadow: 0 0 14px rgba(80, 200, 255, 0.5);
  }

  .overlay.dead .overlay-card h2 {
    color: #ff7d7d;
    text-shadow: 0 0 14px rgba(255, 60, 60, 0.5);
  }

  .lead {
    margin: 0 0 14px;
    color: #b8c2d4;
    font-size: 13px;
    line-height: 1.55;
  }

  .stats {
    margin: 0 0 14px;
    color: #d8e4f4;
    font-size: 13px;
    letter-spacing: 0.04em;
  }

  .stats strong {
    color: #ffd54a;
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
    color: #9aa8c0;
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
    color: #d8eeff;
    background: #14213d;
    border: 1px solid #2a4570;
    border-bottom-width: 2px;
    border-radius: 4px;
    line-height: 1;
  }

  .play-btn {
    display: inline-block;
    padding: 12px 22px;
    background: linear-gradient(180deg, #ffd54a 0%, #d49a00 100%);
    color: #1a1500;
    border: 1px solid #ffe07a;
    border-radius: 6px;
    font-family: 'Space Grotesk', 'DM Mono', ui-monospace, monospace;
    font-size: 14px;
    letter-spacing: 0.18em;
    font-weight: 800;
    cursor: pointer !important;
    box-shadow: 0 6px 0 #6e4d00, 0 12px 24px rgba(255, 200, 60, 0.3);
    transition: transform 0.05s ease, box-shadow 0.05s ease;
    text-decoration: none;
  }

  .play-btn:hover {
    background: linear-gradient(180deg, #ffe17a 0%, #e0a600 100%);
  }

  .play-btn:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #6e4d00, 0 6px 14px rgba(255, 200, 60, 0.25);
  }

  .ghost-btn {
    display: inline-block;
    padding: 10px 16px;
    background: transparent;
    color: #c8eaff;
    border: 1px solid rgba(120, 200, 255, 0.5);
    border-radius: 6px;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 12px;
    letter-spacing: 0.14em;
    cursor: pointer !important;
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .ghost-btn:hover {
    background: rgba(20, 40, 70, 0.7);
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
    color: #6a7a90;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .hint-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: #6a7a90;
    font-size: 12px;
    letter-spacing: 0.04em;
  }

  .hint-row span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .pac-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 20px 22px;
    color: #6a7a90;
    font-size: 12px;
    letter-spacing: 0.05em;
    border-top: 1px solid rgba(70, 200, 255, 0.18);
    margin-top: 12px;
  }

  .footer-back {
    background: transparent;
  }

  @media (max-width: 600px) {
    .pac-tag {
      display: none;
    }
    .pac-header,
    .pac-footer {
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
