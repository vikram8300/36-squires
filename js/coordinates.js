// Coordinate system: NONE. All positions are hardcoded in diagrams.js
// to match the Benz survey layout directly. No transforms.
const CoordSystem = {
  // Stub so old references don't crash
  transformCenter: (x, y) => [x, y],
  toPointsStr: (pts) => pts.map(p => `${p[0]},${p[1]}`).join(' '),
  toSmoothPathD: () => '',
  toPathD: () => '',
  offsetEdge: () => [[0,0],[0,0]],
  viewBox: '0 0 300 460',
  bounds: { x: 0, y: 0, width: 300, height: 460 }
};
