// 36 Squires Path — Coordinate Transform Engine
// Converts survey feet (SW=origin, +X=east, +Y=north) to SVG screen coordinates

const CoordSystem = (() => {
  const DEG2RAD = Math.PI / 180;
  const ROTATION_DEG = 42; // CCW rotation to make Squires Path horizontal

  // Compute centroid of property
  const corners = SURVEY.corners;
  const cx = (corners.SW[0] + corners.NW[0] + corners.NE[0] + corners.SE[0]) / 4;
  const cy = (corners.SW[1] + corners.NW[1] + corners.NE[1] + corners.SE[1]) / 4;

  const cosR = Math.cos(ROTATION_DEG * DEG2RAD);
  const sinR = Math.sin(ROTATION_DEG * DEG2RAD);

  // Transform a single survey point to rotated + Y-flipped coordinates
  function toRotated(x, y) {
    const dx = x - cx;
    const dy = y - cy;
    return [
      cx + dx * cosR - dy * sinR,
      -(cy + dx * sinR + dy * cosR) // flip Y for screen
    ];
  }

  // Transform an array of [x, y] points
  function transformPoints(pts) {
    return pts.map(p => toRotated(p[0], p[1]));
  }

  // Compute bounding box of transformed boundary corners
  const transformedCorners = [
    toRotated(...corners.SW),
    toRotated(...corners.NW),
    toRotated(...corners.NE),
    toRotated(...corners.SE)
  ];

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  transformedCorners.forEach(([x, y]) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });

  const PADDING = 55; // feet of padding around property
  const bounds = {
    x: minX - PADDING,
    y: minY - PADDING,
    width: (maxX - minX) + PADDING * 2,
    height: (maxY - minY) + PADDING * 2
  };

  // SVG viewBox string
  const viewBox = `${bounds.x.toFixed(1)} ${bounds.y.toFixed(1)} ${bounds.width.toFixed(1)} ${bounds.height.toFixed(1)}`;

  // Convert [x,y] array to SVG polygon/polyline points string
  function toPointsStr(pts) {
    return transformPoints(pts).map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  }

  // Convert [x,y] array to SVG path d attribute
  function toPathD(pts, close) {
    const tp = transformPoints(pts);
    let d = `M ${tp[0][0].toFixed(1)} ${tp[0][1].toFixed(1)}`;
    for (let i = 1; i < tp.length; i++) {
      d += ` L ${tp[i][0].toFixed(1)} ${tp[i][1].toFixed(1)}`;
    }
    if (close) d += ' Z';
    return d;
  }

  // Create smooth curve path through points
  function toSmoothPathD(pts) {
    const tp = transformPoints(pts);
    if (tp.length < 2) return '';
    let d = `M ${tp[0][0].toFixed(1)} ${tp[0][1].toFixed(1)}`;
    if (tp.length === 2) {
      d += ` L ${tp[1][0].toFixed(1)} ${tp[1][1].toFixed(1)}`;
      return d;
    }
    // Catmull-Rom to Bezier
    for (let i = 0; i < tp.length - 1; i++) {
      const p0 = tp[Math.max(0, i - 1)];
      const p1 = tp[i];
      const p2 = tp[i + 1];
      const p3 = tp[Math.min(tp.length - 1, i + 2)];
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }

  // Get transformed center point
  function transformCenter(x, y) {
    return toRotated(x, y);
  }

  // Compute offset point along a boundary edge (for setback lines)
  // Takes two corner names and an offset distance (inward)
  function offsetEdge(corner1Name, corner2Name, offset) {
    const c1 = corners[corner1Name];
    const c2 = corners[corner2Name];
    const dx = c2[0] - c1[0];
    const dy = c2[1] - c1[1];
    const len = Math.sqrt(dx * dx + dy * dy);
    // Normal pointing inward (rotate 90° CW for inward on a CW polygon)
    const nx = dy / len;
    const ny = -dx / len;
    return [
      [c1[0] + nx * offset, c1[1] + ny * offset],
      [c2[0] + nx * offset, c2[1] + ny * offset]
    ];
  }

  return {
    toRotated,
    transformPoints,
    transformCenter,
    toPointsStr,
    toPathD,
    toSmoothPathD,
    offsetEdge,
    viewBox,
    bounds,
    centroid: [cx, cy],
    transformedCorners
  };
})();
