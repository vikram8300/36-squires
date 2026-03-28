// 36 Squires Path — SVG Diagram Rendering
// All SVG elements created via createElementNS for clean, reliable output

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    el.setAttribute(k, v);
  }
  return el;
}

function svgText(x, y, text, attrs) {
  const el = svgEl('text', { x, y, ...attrs });
  el.textContent = text;
  return el;
}

// ─── Base Property Diagram ───────────────────────────────────────

function renderPropertyBase(svg) {
  svg.setAttribute('viewBox', CoordSystem.viewBox);
  svg.style.width = '100%';
  svg.style.maxHeight = '700px';

  // Background
  const bg = svgEl('rect', {
    x: CoordSystem.bounds.x, y: CoordSystem.bounds.y,
    width: CoordSystem.bounds.width, height: CoordSystem.bounds.height,
    fill: '#f8f7f4'
  });
  svg.appendChild(bg);

  // -- Layers as <g> groups --
  const layers = ['road', 'boundary', 'setbacks', 'current-drive', 'structures', 'trees', 'labels', 'dimensions'];
  const groups = {};
  layers.forEach(id => {
    const g = svgEl('g', { id: `g-${id}`, class: `layer-${id}` });
    svg.appendChild(g);
    groups[id] = g;
  });

  // Option overlay groups (hidden by default)
  ['A', 'B', 'C', 'D'].forEach(id => {
    const g = svgEl('g', { id: `g-option-${id}`, class: 'layer-option', style: 'display:none' });
    svg.appendChild(g);
    groups[`option-${id}`] = g;
  });

  renderRoad(groups.road);
  renderBoundary(groups.boundary);
  renderSetbacks(groups.setbacks);
  renderCurrentDriveway(groups['current-drive']);
  renderStructures(groups.structures);
  renderTrees(groups.trees);
  renderLabels(groups.labels);
  renderDimensions(groups.dimensions);

  // Render all option overlays
  Object.keys(OPTIONS).forEach(key => {
    renderOption(groups[`option-${key}`], OPTIONS[key]);
  });

  return groups;
}

// ─── Road ────────────────────────────────────────────────────────

function renderRoad(g) {
  const C = SURVEY.corners;
  // Extend road line beyond property
  const dx = C.SE[0] - C.SW[0];
  const dy = C.SE[1] - C.SW[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  const ext = 30; // extend 30' each side
  const roadPts = [
    [C.SW[0] - dx / len * ext, C.SW[1] - dy / len * ext],
    [C.SE[0] + dx / len * ext, C.SE[1] + dy / len * ext]
  ];

  // Road surface (wide band)
  const offset = 20;
  const nx = dy / len, ny = -dx / len;
  const roadPoly = [
    [roadPts[0][0] - nx * offset, roadPts[0][1] - ny * offset],
    [roadPts[1][0] - nx * offset, roadPts[1][1] - ny * offset],
    [roadPts[1][0] + nx * 3, roadPts[1][1] + ny * 3],
    [roadPts[0][0] + nx * 3, roadPts[0][1] + ny * 3]
  ];
  g.appendChild(svgEl('polygon', {
    points: CoordSystem.toPointsStr(roadPoly),
    fill: '#e0ddd6', stroke: 'none'
  }));

  // Road center line
  g.appendChild(svgEl('polyline', {
    points: CoordSystem.toPointsStr(roadPts),
    fill: 'none', stroke: '#bbb', 'stroke-width': '0.5', 'stroke-dasharray': '4,4'
  }));

  // Road label
  const mid = CoordSystem.transformCenter(
    (C.SW[0] + C.SE[0]) / 2 + nx * (-10),
    (C.SW[1] + C.SE[1]) / 2 + ny * (-10)
  );
  g.appendChild(svgText(mid[0], mid[1], 'SQUIRES PATH', {
    'font-size': '5', fill: '#888', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace', 'letter-spacing': '2'
  }));
}

// ─── Property Boundary ──────────────────────────────────────────

function renderBoundary(g) {
  const C = SURVEY.corners;
  const pts = [C.SW, C.NW, C.NE, C.SE];

  g.appendChild(svgEl('polygon', {
    points: CoordSystem.toPointsStr(pts),
    fill: '#fafaf6', stroke: '#333', 'stroke-width': '1.2'
  }));

  // Corner markers
  pts.forEach((pt, i) => {
    const tp = CoordSystem.transformCenter(pt[0], pt[1]);
    g.appendChild(svgEl('circle', {
      cx: tp[0], cy: tp[1], r: '2',
      fill: '#333', stroke: '#fff', 'stroke-width': '0.5'
    }));
  });

  // Adjacent parcel labels
  const adj = SURVEY.adjacent;
  // North label
  const nMid = CoordSystem.transformCenter(
    (C.NW[0] + C.NE[0]) / 2, (C.NW[1] + C.NE[1]) / 2 + 12
  );
  g.appendChild(svgText(nMid[0], nMid[1], 'TOWN OF EAST HAMPTON', {
    'font-size': '4', fill: '#6b8f6b', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace'
  }));
  g.appendChild(svgText(nMid[0], nMid[1] + 5.5, 'NATURE PRESERVE', {
    'font-size': '4', fill: '#6b8f6b', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace'
  }));

  // East label (rotated)
  const eMid = CoordSystem.transformCenter(
    (C.NE[0] + C.SE[0]) / 2 + 12, (C.NE[1] + C.SE[1]) / 2
  );
  g.appendChild(svgText(eMid[0], eMid[1], 'PRESERVE', {
    'font-size': '3.5', fill: '#6b8f6b', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace',
    transform: `rotate(-90, ${eMid[0]}, ${eMid[1]})`
  }));

  // West/SW label
  const wMid = CoordSystem.transformCenter(-12, 70);
  g.appendChild(svgText(wMid[0], wMid[1], 'STEPHEN', {
    'font-size': '3.5', fill: '#888', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace',
    transform: `rotate(-90, ${wMid[0]}, ${wMid[1]})`
  }));
  g.appendChild(svgText(wMid[0] + 5, wMid[1], 'HANDS PATH', {
    'font-size': '3.5', fill: '#888', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace',
    transform: `rotate(-90, ${wMid[0] + 5}, ${wMid[1]})`
  }));
}

// ─── Setback Lines ──────────────────────────────────────────────

function renderSetbacks(g) {
  const C = SURVEY.corners;
  const setbacks = ZONING.setbacks;

  // Front setback (from Squires Path = south edge)
  const frontLine = CoordSystem.offsetEdge('SE', 'SW', setbacks.front.distance);
  g.appendChild(svgEl('polyline', {
    points: CoordSystem.toPointsStr(frontLine),
    fill: 'none', stroke: '#cc4444', 'stroke-width': '0.6',
    'stroke-dasharray': '5,3', opacity: '0.7'
  }));
  const fMid = CoordSystem.transformCenter(
    (frontLine[0][0] + frontLine[1][0]) / 2,
    (frontLine[0][1] + frontLine[1][1]) / 2
  );
  g.appendChild(svgText(fMid[0] + 15, fMid[1] - 3, `${setbacks.front.distance}' FRONT SETBACK`, {
    'font-size': '3', fill: '#cc4444', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace', opacity: '0.8'
  }));

  // Side setbacks
  const westLine = CoordSystem.offsetEdge('SW', 'NW', setbacks.sideWest.distance);
  g.appendChild(svgEl('polyline', {
    points: CoordSystem.toPointsStr(westLine),
    fill: 'none', stroke: '#cc4444', 'stroke-width': '0.5',
    'stroke-dasharray': '4,3', opacity: '0.5'
  }));

  const eastLine = CoordSystem.offsetEdge('NE', 'SE', setbacks.sideEast.distance);
  g.appendChild(svgEl('polyline', {
    points: CoordSystem.toPointsStr(eastLine),
    fill: 'none', stroke: '#cc4444', 'stroke-width': '0.5',
    'stroke-dasharray': '4,3', opacity: '0.5'
  }));

  // Rear setback
  const rearLine = CoordSystem.offsetEdge('NW', 'NE', setbacks.rear.distance);
  g.appendChild(svgEl('polyline', {
    points: CoordSystem.toPointsStr(rearLine),
    fill: 'none', stroke: '#cc4444', 'stroke-width': '0.5',
    'stroke-dasharray': '4,3', opacity: '0.5'
  }));
}

// ─── Current Driveway (to demolish) ─────────────────────────────

function renderCurrentDriveway(g) {
  const path = SURVEY.currentDriveway.path;
  g.appendChild(svgEl('path', {
    d: CoordSystem.toSmoothPathD(path),
    fill: 'none', stroke: '#cc3333', 'stroke-width': '8',
    'stroke-dasharray': '6,4', opacity: '0.4', 'stroke-linecap': 'round'
  }));

  // "DEMO" label
  const mid = CoordSystem.transformCenter(45, 40);
  g.appendChild(svgText(mid[0], mid[1], 'EXISTING', {
    'font-size': '3.5', fill: '#cc3333', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace', opacity: '0.7'
  }));
  g.appendChild(svgText(mid[0], mid[1] + 4.5, 'DRIVEWAY', {
    'font-size': '3.5', fill: '#cc3333', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace', opacity: '0.7'
  }));
  g.appendChild(svgText(mid[0], mid[1] + 9, '(TO BE REMOVED)', {
    'font-size': '2.8', fill: '#cc3333', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace', opacity: '0.6'
  }));
}

// ─── Structures ─────────────────────────────────────────────────

function renderStructures(g) {
  const h = SURVEY.house;

  // House L-shaped footprint (polygon)
  g.appendChild(svgEl('polygon', {
    points: CoordSystem.toPointsStr(h.footprint),
    fill: '#e8e4de', stroke: '#555', 'stroke-width': '1.2'
  }));

  // Brick porch
  if (h.porch) {
    g.appendChild(svgEl('polygon', {
      points: CoordSystem.toPointsStr(h.porch),
      fill: '#d8c8b8', stroke: '#888', 'stroke-width': '0.6'
    }));
    // Porch label
    const porchC = CoordSystem.transformCenter(110, -1);
    g.appendChild(svgText(porchC[0], porchC[1], 'PORCH', {
      'font-size': '2.2', fill: '#888', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
  }

  // Section labels (1-story, 2-story)
  if (h.sections) {
    h.sections.forEach(sec => {
      const sc = CoordSystem.transformCenter(sec.center[0], sec.center[1]);
      g.appendChild(svgText(sc[0], sc[1], sec.label, {
        'font-size': '3.5', fill: '#555', 'text-anchor': 'middle',
        'font-weight': '500', 'font-family': '"IBM Plex Mono", monospace'
      }));
    });
  }

  // Main label at house centroid
  const centroidX = h.footprint.reduce((s, p) => s + p[0], 0) / h.footprint.length;
  const centroidY = h.footprint.reduce((s, p) => s + p[1], 0) / h.footprint.length;
  const hc = CoordSystem.transformCenter(centroidX, centroidY);
  g.appendChild(svgText(hc[0], hc[1] - 6, 'RESIDENCE', {
    'font-size': '4', fill: '#444', 'text-anchor': 'middle',
    'font-weight': '600', 'font-family': '"Inter", sans-serif'
  }));
  g.appendChild(svgText(hc[0], hc[1] - 1.5, '3,424 sf · 5 bed / 4.5 bath', {
    'font-size': '2.5', fill: '#777', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace'
  }));

  // Front door marker
  if (h.frontDoor) {
    const fd = CoordSystem.transformCenter(h.frontDoor[0], h.frontDoor[1]);
    g.appendChild(svgEl('rect', {
      x: fd[0] - 3, y: fd[1] - 1.5, width: 6, height: 3, rx: '0.5',
      fill: '#8B4513', stroke: '#5a2d0c', 'stroke-width': '0.5'
    }));
    g.appendChild(svgText(fd[0], fd[1] - 4, 'ENTRY', {
      'font-size': '2', fill: '#8B4513', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace', 'font-weight': '600'
    }));
  }

  // Chimney
  if (h.chimney) {
    const ch = CoordSystem.transformCenter(h.chimney[0], h.chimney[1]);
    g.appendChild(svgEl('rect', {
      x: ch[0] - 1.5, y: ch[1] - 1.5, width: 3, height: 3,
      fill: '#999', stroke: '#666', 'stroke-width': '0.3'
    }));
  }

  // Pool
  const p = SURVEY.pool;
  const poolPts = p.corners || [
    [p.center[0] - p.width / 2, p.center[1] - p.depth / 2],
    [p.center[0] + p.width / 2, p.center[1] - p.depth / 2],
    [p.center[0] + p.width / 2, p.center[1] + p.depth / 2],
    [p.center[0] - p.width / 2, p.center[1] + p.depth / 2]
  ];
  g.appendChild(svgEl('polygon', {
    points: CoordSystem.toPointsStr(poolPts),
    fill: '#b8d4e8', stroke: '#7ba7c9', 'stroke-width': '0.8'
  }));
  const pc = CoordSystem.transformCenter(p.center[0], p.center[1]);
  g.appendChild(svgText(pc[0], pc[1] + 1.5, 'POOL', {
    'font-size': '3', fill: '#5a8aaa', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace'
  }));

  // Pond
  const pond = SURVEY.pond;
  const pondc = CoordSystem.transformCenter(pond.center[0], pond.center[1]);
  g.appendChild(svgEl('ellipse', {
    cx: pondc[0], cy: pondc[1], rx: pond.radius, ry: pond.radius * 0.7,
    fill: '#c5dae8', stroke: '#8bb5cc', 'stroke-width': '0.5', opacity: '0.7'
  }));
  g.appendChild(svgText(pondc[0], pondc[1] + 1.5, 'Pond', {
    'font-size': '2.5', fill: '#6a98b5', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace'
  }));

  // Buried propane marker
  const lpg = SURVEY.buriedPropane;
  const lpgc = CoordSystem.transformCenter(lpg.center[0], lpg.center[1]);
  g.appendChild(svgEl('circle', {
    cx: lpgc[0], cy: lpgc[1], r: '2',
    fill: 'none', stroke: '#e8a020', 'stroke-width': '0.5', 'stroke-dasharray': '2,1'
  }));
  g.appendChild(svgText(lpgc[0], lpgc[1] + 4, 'LPG', {
    'font-size': '2', fill: '#c08020', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace'
  }));
}

// ─── Trees ──────────────────────────────────────────────────────

function renderTrees(g) {
  SURVEY.trees.forEach(tree => {
    const tc = CoordSystem.transformCenter(tree.center[0], tree.center[1]);
    const r = tree.canopyRadius;

    // Canopy (outer)
    g.appendChild(svgEl('circle', {
      cx: tc[0], cy: tc[1], r: r,
      fill: '#4a8a4a', opacity: '0.2', stroke: '#3a7a3a', 'stroke-width': '0.8'
    }));

    // Inner canopy detail
    g.appendChild(svgEl('circle', {
      cx: tc[0], cy: tc[1], r: r * 0.65,
      fill: '#3d7a3d', opacity: '0.15', stroke: 'none'
    }));

    // Trunk
    g.appendChild(svgEl('circle', {
      cx: tc[0], cy: tc[1], r: '1.5',
      fill: '#5a4a3a', stroke: '#4a3a2a', 'stroke-width': '0.3'
    }));

    // "PRESERVE" badge
    g.appendChild(svgText(tc[0], tc[1] + r + 4, 'PRESERVE', {
      'font-size': '2.2', fill: '#2d6a2d', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace', 'font-weight': '600'
    }));
  });
}

// ─── Labels ─────────────────────────────────────────────────────

function renderLabels(g) {
  // North arrow
  const na = CoordSystem.transformCenter(5, 130);
  const naEnd = CoordSystem.transformCenter(5, 150);
  g.appendChild(svgEl('line', {
    x1: na[0], y1: na[1], x2: naEnd[0], y2: naEnd[1],
    stroke: '#555', 'stroke-width': '1.2'
  }));
  // Arrowhead
  g.appendChild(svgEl('polygon', {
    points: `${naEnd[0]},${naEnd[1]} ${naEnd[0] - 2.5},${naEnd[1] + 5} ${naEnd[0] + 2.5},${naEnd[1] + 5}`,
    fill: '#555'
  }));
  g.appendChild(svgText(naEnd[0], naEnd[1] - 3, 'N', {
    'font-size': '5', fill: '#555', 'text-anchor': 'middle',
    'font-weight': '700', 'font-family': '"Inter", sans-serif'
  }));

  // Scale bar
  const sb1 = CoordSystem.transformCenter(150, -60);
  const sb2 = CoordSystem.transformCenter(180, -60);
  g.appendChild(svgEl('line', {
    x1: sb1[0], y1: sb1[1], x2: sb2[0], y2: sb2[1],
    stroke: '#666', 'stroke-width': '1'
  }));
  // Ticks
  [sb1, sb2].forEach(p => {
    g.appendChild(svgEl('line', {
      x1: p[0], y1: p[1] - 2, x2: p[0], y2: p[1] + 2,
      stroke: '#666', 'stroke-width': '0.8'
    }));
  });
  g.appendChild(svgText((sb1[0] + sb2[0]) / 2, sb1[1] + 5, '30 ft', {
    'font-size': '3', fill: '#666', 'text-anchor': 'middle',
    'font-family': '"IBM Plex Mono", monospace'
  }));
}

// ─── Dimensions ─────────────────────────────────────────────────

function renderDimensions(g) {
  const C = SURVEY.corners;
  const edges = SURVEY.edges;

  edges.forEach(edge => {
    const p1 = C[edge.from];
    const p2 = C[edge.to];
    const mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    const len = Math.sqrt(dx * dx + dy * dy);
    // Offset label outward
    const nx = -dy / len * 6, ny = dx / len * 6;

    const mc = CoordSystem.transformCenter(mid[0] + nx, mid[1] + ny);
    g.appendChild(svgText(mc[0], mc[1], `${edge.distance.toFixed(2)}'`, {
      'font-size': '3', fill: '#666', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
  });
}

// ─── Option Overlay ─────────────────────────────────────────────

function renderOption(g, opt) {
  // Entrance drive
  if (opt.entrance && opt.entrance.points) {
    const ePts = opt.entrance.points;
    // Draw drive lane as thick line
    g.appendChild(svgEl('path', {
      d: CoordSystem.toSmoothPathD(ePts),
      fill: 'none', stroke: '#8a7e6e', 'stroke-width': String(opt.entrance.width * 0.45),
      'stroke-linecap': 'round', opacity: '0.5'
    }));
    // Entrance label
    const elbl = CoordSystem.transformCenter(ePts[0][0] + 15, ePts[0][1]);
    g.appendChild(svgText(elbl[0], elbl[1], opt.entrance.label, {
      'font-size': '2.8', fill: '#5a5040', 'text-anchor': 'start',
      'font-family': '"IBM Plex Mono", monospace'
    }));
  }

  // Parking court
  if (opt.court && opt.court.corners) {
    g.appendChild(svgEl('polygon', {
      points: CoordSystem.toPointsStr(opt.court.corners),
      fill: '#d4cec4', stroke: '#8a7e6e', 'stroke-width': '1', opacity: '0.8'
    }));
    // Court hatching pattern
    const cc = CoordSystem.transformCenter(opt.court.center[0], opt.court.center[1]);
    g.appendChild(svgText(cc[0], cc[1] - 3, opt.court.label || 'PARKING COURT', {
      'font-size': '3.5', fill: '#5a5040', 'text-anchor': 'middle',
      'font-weight': '600', 'font-family': '"Inter", sans-serif'
    }));
    g.appendChild(svgText(cc[0], cc[1] + 2, `${opt.court.width}' × ${opt.court.depth}'`, {
      'font-size': '2.8', fill: '#7a7060', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
    g.appendChild(svgText(cc[0], cc[1] + 6, opt.court.capacity, {
      'font-size': '2.5', fill: '#8a8070', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
  }

  // Drive lane to garage
  if (opt.driveLane && opt.driveLane.points) {
    g.appendChild(svgEl('path', {
      d: CoordSystem.toSmoothPathD(opt.driveLane.points),
      fill: 'none', stroke: '#8a7e6e', 'stroke-width': String(opt.driveLane.width * 0.45),
      'stroke-linecap': 'round', opacity: '0.5'
    }));
  }

  // Garage / Carport
  if (opt.garage) {
    const ga = opt.garage;
    const garageCorners = [
      [ga.center[0] - ga.width / 2, ga.center[1] - ga.depth / 2],
      [ga.center[0] + ga.width / 2, ga.center[1] - ga.depth / 2],
      [ga.center[0] + ga.width / 2, ga.center[1] + ga.depth / 2],
      [ga.center[0] - ga.width / 2, ga.center[1] + ga.depth / 2]
    ];

    const isCarport = ga.type === 'carport';
    const isAttached = ga.type === 'attached';

    g.appendChild(svgEl('polygon', {
      points: CoordSystem.toPointsStr(garageCorners),
      fill: isCarport ? 'none' : '#ddd8cf',
      stroke: isAttached ? '#555' : '#666',
      'stroke-width': isAttached ? '1.5' : '1',
      'stroke-dasharray': isCarport ? '4,2' : 'none',
      opacity: '0.85'
    }));

    // Garage doors (south side)
    const doorY = ga.center[1] - ga.depth / 2;
    const door1 = CoordSystem.transformPoints([
      [ga.center[0] - 5, doorY], [ga.center[0] - 5 + 9, doorY]
    ]);
    const door2 = CoordSystem.transformPoints([
      [ga.center[0] + 5 - 9, doorY], [ga.center[0] + 5, doorY]
    ]);
    if (!isCarport) {
      [door1, door2].forEach(d => {
        g.appendChild(svgEl('line', {
          x1: d[0][0], y1: d[0][1], x2: d[1][0], y2: d[1][1],
          stroke: '#444', 'stroke-width': '2'
        }));
      });
    }

    // Label
    const gc = CoordSystem.transformCenter(ga.center[0], ga.center[1]);
    const typeLabel = isCarport ? 'CARPORT' : (isAttached ? 'ATTACHED' : 'DETACHED');
    g.appendChild(svgText(gc[0], gc[1] - 4, typeLabel, {
      'font-size': '2.8', fill: '#444', 'text-anchor': 'middle',
      'font-weight': '600', 'font-family': '"IBM Plex Mono", monospace'
    }));
    g.appendChild(svgText(gc[0], gc[1], 'GARAGE', {
      'font-size': '3.5', fill: '#444', 'text-anchor': 'middle',
      'font-weight': '600', 'font-family': '"Inter", sans-serif'
    }));
    g.appendChild(svgText(gc[0], gc[1] + 4, `${ga.width}' × ${ga.depth}'`, {
      'font-size': '2.5', fill: '#666', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
    g.appendChild(svgText(gc[0], gc[1] + 7.5, `${ga.area_sf} sf`, {
      'font-size': '2.5', fill: '#888', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
  }

  // EV Conduit line
  if (opt.evConduit) {
    const house = SURVEY.house;
    const garage = opt.garage;
    const evPts = [
      [house.center[0] - house.width / 2, house.center[1]],
      [garage.center[0] + garage.width / 2, garage.center[1]]
    ];
    g.appendChild(svgEl('polyline', {
      points: CoordSystem.toPointsStr(evPts),
      fill: 'none', stroke: '#e8a020', 'stroke-width': '0.8',
      'stroke-dasharray': '3,2', opacity: '0.7'
    }));
    const evMid = CoordSystem.transformCenter(
      (evPts[0][0] + evPts[1][0]) / 2,
      (evPts[0][1] + evPts[1][1]) / 2 - 3
    );
    g.appendChild(svgText(evMid[0], evMid[1], 'EV CONDUIT', {
      'font-size': '2', fill: '#c08020', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
  }
}

// ─── Gantt Timeline Chart ───────────────────────────────────────

function renderGanttChart(container) {
  const svg = svgEl('svg', { class: 'gantt-svg' });
  const allSteps = [...TIMELINE.preconstruction, ...TIMELINE.permitting, ...TIMELINE.construction];

  const rowH = 28;
  const leftMargin = 200;
  const topMargin = 40;
  const weekWidth = 28;
  const maxWeeks = 22;
  const chartW = leftMargin + maxWeeks * weekWidth + 20;
  const chartH = topMargin + allSteps.length * rowH + 20;

  svg.setAttribute('viewBox', `0 0 ${chartW} ${chartH}`);
  svg.style.width = '100%';

  // Background
  svg.appendChild(svgEl('rect', { x: 0, y: 0, width: chartW, height: chartH, fill: '#fafaf8' }));

  // Week columns
  for (let w = 1; w <= maxWeeks; w++) {
    const x = leftMargin + (w - 1) * weekWidth;
    if (w % 2 === 0) {
      svg.appendChild(svgEl('rect', { x, y: topMargin, width: weekWidth, height: chartH - topMargin, fill: '#f2f1ee', opacity: '0.5' }));
    }
    svg.appendChild(svgText(x + weekWidth / 2, topMargin - 8, `W${w}`, {
      'font-size': '8', fill: '#999', 'text-anchor': 'middle',
      'font-family': '"IBM Plex Mono", monospace'
    }));
  }

  // Phase headers
  const phases = [
    { name: 'PRE-CONSTRUCTION', start: 0, count: TIMELINE.preconstruction.length },
    { name: 'PERMITTING', start: TIMELINE.preconstruction.length, count: TIMELINE.permitting.length },
    { name: 'CONSTRUCTION', start: TIMELINE.preconstruction.length + TIMELINE.permitting.length, count: TIMELINE.construction.length }
  ];

  let rowIdx = 0;
  allSteps.forEach((step, i) => {
    const y = topMargin + rowIdx * rowH;

    // Row background
    svg.appendChild(svgEl('rect', {
      x: 0, y, width: chartW, height: rowH,
      fill: step.status === 'completed' ? '#e8f5e8' : 'transparent'
    }));
    svg.appendChild(svgEl('line', {
      x1: 0, y1: y + rowH, x2: chartW, y2: y + rowH,
      stroke: '#eee', 'stroke-width': '0.5'
    }));

    // Task name
    const labelColor = step.critical ? '#c44' : (step.conditional ? '#a86e1f' : '#444');
    svg.appendChild(svgText(8, y + rowH / 2 + 3, step.name, {
      'font-size': '9', fill: labelColor,
      'font-family': '"Inter", sans-serif',
      'font-weight': step.critical ? '600' : '400'
    }));

    // Parse week range
    const weekStr = step.week;
    const weeks = weekStr.split('–').map(w => parseInt(w));
    const startWeek = weeks[0];
    const endWeek = weeks.length > 1 ? weeks[1] : weeks[0];

    const barX = leftMargin + (startWeek - 1) * weekWidth;
    const barW = (endWeek - startWeek + 1) * weekWidth - 4;

    let barColor = '#5a8abf';
    if (step.status === 'completed') barColor = '#4a8a4a';
    else if (step.conditional) barColor = '#d4a04a';
    else if (step.critical) barColor = '#bf5a5a';

    svg.appendChild(svgEl('rect', {
      x: barX, y: y + 6, width: barW, height: rowH - 12, rx: '3',
      fill: barColor, opacity: '0.75'
    }));

    if (step.status === 'completed') {
      svg.appendChild(svgText(barX + barW / 2, y + rowH / 2 + 3, '✓ DONE', {
        'font-size': '7', fill: '#fff', 'text-anchor': 'middle',
        'font-weight': '600', 'font-family': '"Inter", sans-serif'
      }));
    }

    rowIdx++;
  });

  container.appendChild(svg);
}
