// 36 Squires Path — SVG Diagram
// All positions hardcoded to match the Benz survey layout.
// No coordinate transforms. ViewBox: 0 0 300 460
// Scale: ~2px per foot. Lot is ~110' wide × ~200' deep.
// Squires Path at bottom, Stephen Hands Path on left, Preserve on top/right.

const SVG_NS = 'http://www.w3.org/2000/svg';
const VB = '0 0 300 460';

// Lot boundary (after rotating survey to "driver's view")
// SW=bottom-left, SE=bottom-right, NW=top-left, NE=top-right
const LOT = {
  SW: [40, 410], SE: [260, 410], NW: [40, 25], NE: [260, 25]
};

// House L-shape. 2-story faces Squires Path (south). 1-story extends NW.
// 2-story: ~35'W × 28'D → 70×56px. Setback ~38' from road.
// 1-story: ~33'W × 25'D → 66×50px. Extends ~16px further west.
const HOUSE = {
  twoStory: { x: 112, y: 278, w: 70, h: 56 },  // front face at y=334
  oneStory: { x: 96, y: 228, w: 66, h: 50 },
  porch:    { x: 125, y: 334, w: 40, h: 12 },
  door:     [145, 340],
  chimney:  [135, 270]
};

// Pool: east of house
const POOL = { x: 195, y: 245, w: 30, h: 55 };
// Pond: NE area
const POND = { cx: 225, cy: 130, r: 18 };
// LPG: north of 1-story
const LPG = { cx: 120, cy: 205 };

// Trees inside the driveway horseshoe (west of house)
const TREES = [
  { cx: 78, cy: 345, r: 18, label: 'Preserved' },
  { cx: 82, cy: 255, r: 16, label: 'Preserved' }
];

// Current driveway horseshoe — entirely west of house
const DRIVEWAY = {
  // West arm (from Squires Path going north)
  westArm: [[52, 405], [50, 370], [48, 340], [48, 310], [50, 280], [52, 250], [56, 225]],
  // Top curve
  top: [[62, 208], [72, 200], [82, 205]],
  // East arm (going south, east of west arm, still west of house)
  eastArm: [[88, 220], [92, 245], [95, 270], [96, 295], [95, 315], [92, 335]],
  // Bottom of U (sweeps across front of house)
  bottom: [[88, 350], [82, 360], [74, 370], [65, 378], [56, 388], [48, 398]]
};

// Flatten driveway path
const DRIVE_PATH = [
  ...DRIVEWAY.westArm, ...DRIVEWAY.top, ...DRIVEWAY.eastArm, ...DRIVEWAY.bottom
];

// ── Option overlays ──────────────────────────────────────────────
// All options share entrance from Squires Path, differ in court size & garage

const OPT_ENTRANCE = [[148, 410], [148, 395], [146, 375], [142, 358]];

const OPT_A = {
  court: { x: 108, y: 340, w: 88, h: 50 },   // in front of house
  driveToGarage: [[108, 340], [104, 320], [98, 300], [92, 280]],
  garage: { x: 62, y: 260, w: 44, h: 44, label: 'DETACHED\nGARAGE\n576 sf' }
};

const OPT_B = {
  court: { x: 108, y: 340, w: 88, h: 50 },
  driveToGarage: [[108, 340], [105, 320], [100, 300]],
  garage: { x: 70, y: 230, w: 44, h: 44, label: 'ATTACHED\nGARAGE\n576 sf', attached: true }
};

const OPT_C = {
  court: { x: 108, y: 340, w: 88, h: 50 },
  driveToGarage: [[108, 340], [104, 320], [98, 300], [92, 280]],
  garage: { x: 62, y: 260, w: 44, h: 40, label: 'CARPORT\n528 sf', carport: true }
};

const OPT_D = {
  court: { x: 118, y: 348, w: 68, h: 42 },   // smaller court
  driveToGarage: [[118, 348], [112, 328], [104, 305], [96, 280], [90, 260]],
  garage: { x: 58, y: 230, w: 42, h: 44, label: 'DETACHED\nGARAGE\n528 sf' }
};

const OPT_DATA = { A: OPT_A, B: OPT_B, C: OPT_C, D: OPT_D };

// ── SVG Helpers ──────────────────────────────────────────────────

function el(tag, attrs) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, v);
  return e;
}

function txt(x, y, text, attrs) {
  const e = el('text', { x, y, ...attrs });
  e.textContent = text;
  return e;
}

function smoothPath(pts) {
  if (!pts || pts.length < 2) return '';
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i-1)];
    const p1 = pts[i];
    const p2 = pts[i+1];
    const p3 = pts[Math.min(pts.length-1, i+2)];
    d += ` C ${p1[0]+(p2[0]-p0[0])/6} ${p1[1]+(p2[1]-p0[1])/6}, ${p2[0]-(p3[0]-p1[0])/6} ${p2[1]-(p3[1]-p1[1])/6}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

// ── Render Property Base ─────────────────────────────────────────

function renderPropertyBase(svg) {
  svg.setAttribute('viewBox', VB);
  svg.style.width = '100%';
  svg.style.maxHeight = '680px';

  // Background
  svg.appendChild(el('rect', { x:0, y:0, width:300, height:460, fill:'#f8f7f4' }));

  // Groups
  const gRoad = el('g', { id:'g-road' });
  const gBoundary = el('g', { id:'g-boundary' });
  const gSetbacks = el('g', { id:'g-setbacks' });
  const gDrive = el('g', { id:'g-current-drive', style:'display:none' });
  const gStruct = el('g', { id:'g-structures' });
  const gTrees = el('g', { id:'g-trees' });
  const gLabels = el('g', { id:'g-labels' });
  const gDims = el('g', { id:'g-dimensions' });

  [gRoad, gBoundary, gSetbacks, gDrive, gStruct, gTrees, gLabels, gDims].forEach(g => svg.appendChild(g));

  // Option groups
  ['A','B','C','D'].forEach(id => {
    const g = el('g', { id:`g-option-${id}`, class:'layer-option', style:'display:none' });
    svg.appendChild(g);
  });

  // ── Road ──
  gRoad.appendChild(el('rect', { x:20, y:412, width:260, height:35, fill:'#e0ddd6' }));
  gRoad.appendChild(el('line', { x1:20, y1:428, x2:280, y2:428, stroke:'#bbb', 'stroke-width':'0.5', 'stroke-dasharray':'4,4' }));
  gRoad.appendChild(txt(150, 434, 'SQUIRES PATH', { 'font-size':'7', fill:'#888', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace', 'letter-spacing':'2' }));

  // ── Boundary ──
  const bPts = [LOT.SW, LOT.SE, LOT.NE, LOT.NW].map(p => p.join(',')).join(' ');
  gBoundary.appendChild(el('polygon', { points: bPts, fill:'#fafaf6', stroke:'#333', 'stroke-width':'1.5' }));
  // Corner dots
  [LOT.SW, LOT.SE, LOT.NE, LOT.NW].forEach(p => {
    gBoundary.appendChild(el('circle', { cx:p[0], cy:p[1], r:2.5, fill:'#333', stroke:'#fff', 'stroke-width':'0.5' }));
  });

  // Neighbor labels
  gBoundary.appendChild(txt(150, 14, 'TOWN OF EAST HAMPTON NATURE PRESERVE', { 'font-size':'5', fill:'#6b8f6b', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));
  const eLabel = txt(274, 220, 'PRESERVE', { 'font-size':'4.5', fill:'#6b8f6b', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' });
  eLabel.setAttribute('transform', 'rotate(90,274,220)');
  gBoundary.appendChild(eLabel);
  const wLabel = txt(28, 220, 'STEPHEN HANDS PATH', { 'font-size':'4.5', fill:'#888', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' });
  wLabel.setAttribute('transform', 'rotate(-90,28,220)');
  gBoundary.appendChild(wLabel);

  // ── Setbacks ──
  // Front setback (35' from road = 70px from y=410)
  const setY = 410 - 70;
  gSetbacks.appendChild(el('line', { x1:40, y1:setY, x2:260, y2:setY, stroke:'#cc4444', 'stroke-width':'0.6', 'stroke-dasharray':'5,3', opacity:'0.6' }));
  gSetbacks.appendChild(txt(200, setY-3, "35' FRONT SETBACK", { 'font-size':'4', fill:'#cc4444', 'font-family':'"IBM Plex Mono",monospace' }));
  // Side setbacks
  [55, 245].forEach(x => {
    gSetbacks.appendChild(el('line', { x1:x, y1:25, x2:x, y2:410, stroke:'#cc4444', 'stroke-width':'0.4', 'stroke-dasharray':'4,3', opacity:'0.35' }));
  });
  // Rear setback
  gSetbacks.appendChild(el('line', { x1:40, y1:75, x2:260, y2:75, stroke:'#cc4444', 'stroke-width':'0.4', 'stroke-dasharray':'4,3', opacity:'0.35' }));

  // ── Current Driveway ──
  gDrive.appendChild(el('path', {
    d: smoothPath(DRIVE_PATH),
    fill:'none', stroke:'#cc3333', 'stroke-width':'10', 'stroke-dasharray':'6,4', opacity:'0.35', 'stroke-linecap':'round'
  }));
  gDrive.appendChild(txt(55, 395, 'EXISTING', { 'font-size':'4.5', fill:'#cc3333', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace', opacity:'0.7' }));
  gDrive.appendChild(txt(55, 401, 'DRIVEWAY', { 'font-size':'4.5', fill:'#cc3333', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace', opacity:'0.7' }));

  // ── Structures ──
  // House 2-story
  const h2 = HOUSE.twoStory;
  gStruct.appendChild(el('rect', { x:h2.x, y:h2.y, width:h2.w, height:h2.h, fill:'#e8e4de', stroke:'#555', 'stroke-width':'1.2' }));
  gStruct.appendChild(txt(h2.x+h2.w/2, h2.y+h2.h/2+2, '2-STORY', { 'font-size':'6', fill:'#555', 'text-anchor':'middle', 'font-weight':'500', 'font-family':'"IBM Plex Mono",monospace' }));
  // House 1-story
  const h1 = HOUSE.oneStory;
  gStruct.appendChild(el('rect', { x:h1.x, y:h1.y, width:h1.w, height:h1.h, fill:'#e8e4de', stroke:'#555', 'stroke-width':'1.2' }));
  gStruct.appendChild(txt(h1.x+h1.w/2, h1.y+h1.h/2+2, '1-STORY', { 'font-size':'6', fill:'#555', 'text-anchor':'middle', 'font-weight':'500', 'font-family':'"IBM Plex Mono",monospace' }));
  // Porch
  const pr = HOUSE.porch;
  gStruct.appendChild(el('rect', { x:pr.x, y:pr.y, width:pr.w, height:pr.h, fill:'#d8c8b8', stroke:'#888', 'stroke-width':'0.6' }));
  gStruct.appendChild(txt(pr.x+pr.w/2, pr.y+pr.h/2+2, 'PORCH', { 'font-size':'3.5', fill:'#888', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));
  // Front door
  gStruct.appendChild(el('rect', { x:HOUSE.door[0]-4, y:HOUSE.door[1], width:8, height:4, rx:'1', fill:'#8B4513', stroke:'#5a2d0c', 'stroke-width':'0.5' }));
  gStruct.appendChild(txt(HOUSE.door[0], HOUSE.door[1]-3, 'ENTRY', { 'font-size':'3.5', fill:'#8B4513', 'text-anchor':'middle', 'font-weight':'600', 'font-family':'"IBM Plex Mono",monospace' }));
  // Chimney
  gStruct.appendChild(el('rect', { x:HOUSE.chimney[0]-2, y:HOUSE.chimney[1]-2, width:4, height:4, fill:'#999', stroke:'#666', 'stroke-width':'0.3' }));
  // RESIDENCE label
  gStruct.appendChild(txt(140, 300, 'RESIDENCE', { 'font-size':'5.5', fill:'#444', 'text-anchor':'middle', 'font-weight':'600', 'font-family':'"Inter",sans-serif' }));
  gStruct.appendChild(txt(140, 308, '3,424 sf · 5 bed / 4.5 bath', { 'font-size':'3.5', fill:'#777', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));

  // Pool
  gStruct.appendChild(el('rect', { x:POOL.x, y:POOL.y, width:POOL.w, height:POOL.h, fill:'#b8d4e8', stroke:'#7ba7c9', 'stroke-width':'0.8', rx:'2' }));
  gStruct.appendChild(txt(POOL.x+POOL.w/2, POOL.y+POOL.h/2+2, 'POOL', { 'font-size':'5', fill:'#5a8aaa', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));

  // Pond
  gStruct.appendChild(el('ellipse', { cx:POND.cx, cy:POND.cy, rx:POND.r, ry:POND.r*0.7, fill:'#c5dae8', stroke:'#8bb5cc', 'stroke-width':'0.5', opacity:'0.7' }));
  gStruct.appendChild(txt(POND.cx, POND.cy+2, 'Pond', { 'font-size':'4.5', fill:'#6a98b5', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));

  // LPG
  gStruct.appendChild(el('circle', { cx:LPG.cx, cy:LPG.cy, r:3, fill:'none', stroke:'#e8a020', 'stroke-width':'0.5', 'stroke-dasharray':'2,1' }));
  gStruct.appendChild(txt(LPG.cx, LPG.cy+7, 'LPG', { 'font-size':'3', fill:'#c08020', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));

  // ── Trees ──
  TREES.forEach(t => {
    gTrees.appendChild(el('circle', { cx:t.cx, cy:t.cy, r:t.r, fill:'#4a8a4a', opacity:'0.2', stroke:'#3a7a3a', 'stroke-width':'0.8' }));
    gTrees.appendChild(el('circle', { cx:t.cx, cy:t.cy, r:t.r*0.6, fill:'#3d7a3d', opacity:'0.15' }));
    gTrees.appendChild(el('circle', { cx:t.cx, cy:t.cy, r:2, fill:'#5a4a3a', stroke:'#4a3a2a', 'stroke-width':'0.3' }));
    gTrees.appendChild(txt(t.cx, t.cy+t.r+6, 'PRESERVE', { 'font-size':'3', fill:'#2d6a2d', 'text-anchor':'middle', 'font-weight':'600', 'font-family':'"IBM Plex Mono",monospace' }));
  });

  // ── North Arrow ──
  gLabels.appendChild(el('line', { x1:42, y1:65, x2:42, y2:42, stroke:'#555', 'stroke-width':'1.5' }));
  gLabels.appendChild(el('polygon', { points:'42,38 39,46 45,46', fill:'#555' }));
  gLabels.appendChild(txt(42, 34, 'N', { 'font-size':'7', fill:'#555', 'text-anchor':'middle', 'font-weight':'700', 'font-family':'"Inter",sans-serif' }));

  // ── Dimensions ──
  // South edge
  gDims.appendChild(txt(150, 408, "110.00'", { 'font-size':'4', fill:'#666', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));
  // West edge
  const wDim = txt(34, 220, "190.37'", { 'font-size':'4', fill:'#666', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' });
  wDim.setAttribute('transform', 'rotate(-90,34,220)');
  gDims.appendChild(wDim);
  // East edge
  const eDim = txt(266, 220, "207.84'", { 'font-size':'4', fill:'#666', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' });
  eDim.setAttribute('transform', 'rotate(90,266,220)');
  gDims.appendChild(eDim);
  // North edge
  gDims.appendChild(txt(150, 22, "111.38'", { 'font-size':'4', fill:'#666', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));

  // Scale bar
  gDims.appendChild(el('line', { x1:220, y1:442, x2:280, y2:442, stroke:'#666', 'stroke-width':'1' }));
  [220, 280].forEach(x => gDims.appendChild(el('line', { x1:x, y1:439, x2:x, y2:445, stroke:'#666', 'stroke-width':'0.8' })));
  gDims.appendChild(txt(250, 450, '30 ft', { 'font-size':'4', fill:'#666', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));

  // ── Option overlays ──
  Object.keys(OPT_DATA).forEach(key => {
    const g = document.getElementById(`g-option-${key}`);
    renderOptionOverlay(g, OPT_DATA[key]);
  });
}

// ── Render Option Overlay ────────────────────────────────────────

function renderOptionOverlay(g, opt) {
  // Entrance from road
  g.appendChild(el('path', {
    d: smoothPath(OPT_ENTRANCE),
    fill:'none', stroke:'#8a7e6e', 'stroke-width':'12', 'stroke-linecap':'round', opacity:'0.4'
  }));
  g.appendChild(txt(160, 392, "18' ENTRANCE", { 'font-size':'3.5', fill:'#5a5040', 'font-family':'"IBM Plex Mono",monospace' }));

  // Court
  const c = opt.court;
  g.appendChild(el('rect', { x:c.x, y:c.y, width:c.w, height:c.h, fill:'#d4cec4', stroke:'#8a7e6e', 'stroke-width':'1', opacity:'0.8', rx:'1' }));
  g.appendChild(txt(c.x+c.w/2, c.y+c.h/2-4, 'PARKING COURT', { 'font-size':'4.5', fill:'#5a5040', 'text-anchor':'middle', 'font-weight':'600', 'font-family':'"Inter",sans-serif' }));
  g.appendChild(txt(c.x+c.w/2, c.y+c.h/2+3, '3–4 cars', { 'font-size':'3.5', fill:'#8a8070', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));

  // Drive lane to garage
  if (opt.driveToGarage) {
    g.appendChild(el('path', {
      d: smoothPath(opt.driveToGarage),
      fill:'none', stroke:'#8a7e6e', 'stroke-width':'8', 'stroke-linecap':'round', opacity:'0.4'
    }));
  }

  // Garage/Carport
  const ga = opt.garage;
  g.appendChild(el('rect', {
    x:ga.x, y:ga.y, width:ga.w, height:ga.h,
    fill: ga.carport ? 'none' : (ga.attached ? '#ddd8cf' : '#ddd8cf'),
    stroke: ga.attached ? '#555' : '#666',
    'stroke-width': ga.attached ? '1.5' : '1',
    'stroke-dasharray': ga.carport ? '4,2' : 'none',
    opacity:'0.85', rx:'1'
  }));

  // Garage label (multi-line)
  const lines = ga.label.split('\n');
  lines.forEach((line, i) => {
    g.appendChild(txt(ga.x+ga.w/2, ga.y+ga.h/2 - (lines.length-1)*5 + i*9, line, {
      'font-size': i === 0 ? '4.5' : '3.5',
      fill:'#444', 'text-anchor':'middle',
      'font-weight': i === 0 ? '600' : '400',
      'font-family':'"IBM Plex Mono",monospace'
    }));
  });

  // Garage doors (south face)
  if (!ga.carport) {
    g.appendChild(el('line', { x1:ga.x+5, y1:ga.y+ga.h, x2:ga.x+ga.w/2-2, y2:ga.y+ga.h, stroke:'#444', 'stroke-width':'2.5' }));
    g.appendChild(el('line', { x1:ga.x+ga.w/2+2, y1:ga.y+ga.h, x2:ga.x+ga.w-5, y2:ga.y+ga.h, stroke:'#444', 'stroke-width':'2.5' }));
  }

  // EV conduit
  g.appendChild(el('line', {
    x1:HOUSE.oneStory.x, y1:HOUSE.oneStory.y+HOUSE.oneStory.h/2,
    x2:ga.x+ga.w, y2:ga.y+ga.h/2,
    stroke:'#e8a020', 'stroke-width':'0.8', 'stroke-dasharray':'3,2', opacity:'0.7'
  }));
  const evMidX = (HOUSE.oneStory.x + ga.x+ga.w) / 2;
  const evMidY = (HOUSE.oneStory.y+HOUSE.oneStory.h/2 + ga.y+ga.h/2) / 2 - 4;
  g.appendChild(txt(evMidX, evMidY, 'EV CONDUIT', { 'font-size':'2.5', fill:'#c08020', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));
}

// ── Gantt Timeline ──────────────────────────────────────────────

function renderGanttChart(container) {
  const svg = el('svg', { class: 'gantt-svg' });
  const allSteps = [...TIMELINE.preconstruction, ...TIMELINE.permitting, ...TIMELINE.construction];
  const rowH = 28, leftMargin = 200, topMargin = 40, weekWidth = 28, maxWeeks = 22;
  const chartW = leftMargin + maxWeeks * weekWidth + 20;
  const chartH = topMargin + allSteps.length * rowH + 20;
  svg.setAttribute('viewBox', `0 0 ${chartW} ${chartH}`);
  svg.style.width = '100%';
  svg.appendChild(el('rect', { x:0, y:0, width:chartW, height:chartH, fill:'#fafaf8' }));

  for (let w = 1; w <= maxWeeks; w++) {
    const x = leftMargin + (w-1) * weekWidth;
    if (w % 2 === 0) svg.appendChild(el('rect', { x, y:topMargin, width:weekWidth, height:chartH-topMargin, fill:'#f2f1ee', opacity:'0.5' }));
    svg.appendChild(txt(x+weekWidth/2, topMargin-8, `W${w}`, { 'font-size':'8', fill:'#999', 'text-anchor':'middle', 'font-family':'"IBM Plex Mono",monospace' }));
  }

  allSteps.forEach((step, i) => {
    const y = topMargin + i * rowH;
    svg.appendChild(el('line', { x1:0, y1:y+rowH, x2:chartW, y2:y+rowH, stroke:'#eee', 'stroke-width':'0.5' }));
    if (step.status === 'completed') svg.appendChild(el('rect', { x:0, y, width:chartW, height:rowH, fill:'#e8f5e8' }));

    const labelColor = step.critical ? '#c44' : (step.conditional ? '#a86e1f' : '#444');
    svg.appendChild(txt(8, y+rowH/2+3, step.name, { 'font-size':'9', fill:labelColor, 'font-family':'"Inter",sans-serif', 'font-weight': step.critical ? '600' : '400' }));

    const weeks = step.week.split('–').map(w => parseInt(w));
    const startW = weeks[0], endW = weeks.length > 1 ? weeks[1] : weeks[0];
    const barX = leftMargin + (startW-1) * weekWidth;
    const barW = (endW-startW+1) * weekWidth - 4;
    let barColor = '#5a8abf';
    if (step.status === 'completed') barColor = '#4a8a4a';
    else if (step.conditional) barColor = '#d4a04a';
    else if (step.critical) barColor = '#bf5a5a';

    svg.appendChild(el('rect', { x:barX, y:y+6, width:barW, height:rowH-12, rx:'3', fill:barColor, opacity:'0.75' }));
    if (step.status === 'completed') {
      svg.appendChild(txt(barX+barW/2, y+rowH/2+3, '✓ DONE', { 'font-size':'7', fill:'#fff', 'text-anchor':'middle', 'font-weight':'600', 'font-family':'"Inter",sans-serif' }));
    }
  });
  container.appendChild(svg);
}
