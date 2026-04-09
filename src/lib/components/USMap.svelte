<script lang="ts">
  export let opacity = 0.18;

  const states: { abbr: string; x: number; y: number }[] = [
    { abbr: 'WA', x: 62,  y: 31  },
    { abbr: 'OR', x: 62,  y: 104 },
    { abbr: 'CA', x: 76,  y: 250 },
    { abbr: 'NV', x: 110, y: 208 },
    { abbr: 'ID', x: 152, y: 104 },
    { abbr: 'MT', x: 207, y: 42  },
    { abbr: 'WY', x: 241, y: 125 },
    { abbr: 'UT', x: 186, y: 198 },
    { abbr: 'CO', x: 269, y: 208 },
    { abbr: 'AZ', x: 186, y: 313 },
    { abbr: 'NM', x: 262, y: 302 },
    { abbr: 'TX', x: 345, y: 375 },
    { abbr: 'OK', x: 386, y: 281 },
    { abbr: 'KS', x: 379, y: 219 },
    { abbr: 'NE', x: 359, y: 156 },
    { abbr: 'SD', x: 345, y: 94  },
    { abbr: 'ND', x: 338, y: 31  },
    { abbr: 'MN', x: 427, y: 63  },
    { abbr: 'IA', x: 434, y: 146 },
    { abbr: 'MO', x: 448, y: 219 },
    { abbr: 'AR', x: 448, y: 292 },
    { abbr: 'LA', x: 462, y: 375 },
    { abbr: 'MS', x: 490, y: 333 },
    { abbr: 'AL', x: 524, y: 333 },
    { abbr: 'TN', x: 531, y: 281 },
    { abbr: 'KY', x: 520, y: 240 },
    { abbr: 'GA', x: 566, y: 344 },
    { abbr: 'FL', x: 576, y: 430 },
    { abbr: 'SC', x: 600, y: 313 },
    { abbr: 'NC', x: 570, y: 281 },
    { abbr: 'VA', x: 590, y: 240 },
    { abbr: 'WV', x: 560, y: 219 },
    { abbr: 'MD', x: 617, y: 208 },
    { abbr: 'DE', x: 636, y: 198 },
    { abbr: 'NJ', x: 646, y: 177 },
    { abbr: 'NY', x: 634, y: 125 },
    { abbr: 'PA', x: 604, y: 167 },
    { abbr: 'OH', x: 545, y: 177 },
    { abbr: 'IN', x: 510, y: 188 },
    { abbr: 'IL', x: 480, y: 188 },
    { abbr: 'WI', x: 476, y: 94  },
    { abbr: 'MI', x: 528, y: 94  },
    { abbr: 'CT', x: 657, y: 148 },
    { abbr: 'RI', x: 670, y: 155 },
    { abbr: 'MA', x: 662, y: 138 },
    { abbr: 'NH', x: 666, y: 104 },
    { abbr: 'VT', x: 652, y: 104 },
    { abbr: 'ME', x: 692, y: 73  },
  ];

  const edges: [number, number][] = [
    [0,1],[1,2],[2,3],[3,4],[3,8],[4,5],[4,6],[4,11],[5,6],[5,15],[6,8],[6,13],[6,14],
    [7,8],[7,9],[7,10],[8,9],[8,10],[8,12],[8,13],[9,10],[10,11],[10,12],
    [11,12],[11,20],[11,21],[12,13],[12,19],[13,14],[14,15],[14,18],
    [15,16],[15,17],[16,17],[17,18],[18,19],[19,20],[19,38],[20,21],
    [20,25],[20,28],[21,22],[22,23],[23,24],[23,25],[24,25],[24,26],[24,29],
    [25,26],[25,37],[26,27],[26,28],[27,28],[28,29],[29,30],[29,31],[30,31],
    [30,33],[30,36],[31,32],[31,36],[32,33],[33,34],[34,35],[35,41],[36,37],
    [37,38],[37,40],[38,39],[39,40],[40,41],[41,42],[42,43],[43,44],[44,45],[45,46],[46,47],
    [35,36],[35,44],[36,41],[31,37],[37,39],
  ];
</script>

<svg
  viewBox="0 0 750 480"
  xmlns="http://www.w3.org/2000/svg"
  style="opacity: {opacity}; width: 100%; height: 100%;"
  aria-hidden="true"
>
  <defs>
    <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0369a1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0d9488;stop-opacity:1" />
    </linearGradient>
  </defs>

  {#each edges as [a, b]}
    <line
      x1={states[a].x}
      y1={states[a].y}
      x2={states[b].x}
      y2={states[b].y}
      stroke="url(#mapGrad)"
      stroke-width="0.8"
      stroke-opacity="0.4"
    />
  {/each}

  {#each states as state}
    <circle
      cx={state.x}
      cy={state.y}
      r="3.5"
      fill="url(#mapGrad)"
      opacity="0.85"
    />
    <text
      x={state.x}
      y={state.y - 7}
      font-size="6.5"
      font-family="'DM Mono', monospace"
      fill="#0369a1"
      text-anchor="middle"
      opacity="0.7"
    >{state.abbr}</text>
  {/each}
</svg>
