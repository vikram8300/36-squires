// 36 Squires Path — Coordinate Transform Engine
// Rotates +42° so Squires Path is horizontal at bottom (like the Benz survey).
// All structure coords are pre-computed from the lot's (u,v) axis system,
// so after rotation they appear as clean horizontal/vertical shapes.

const CoordSystem = (() => {
  const DEG2RAD = Math.PI / 180;
  const ROTATION_DEG = 42;

  const corners = SURVEY.corners;
  const cx = (corners.SW[0] + corners.NW[0] + corners.NE[0] + corners.SE[0]) / 4;
  const cy = (corners.SW[1] + corners.NW[1] + corners.NE[1] + corners.SE[1]) / 4;

  const cosR = Math.cos(ROTATION_DEG * DEG2RAD);
  const sinR = Math.sin(ROTATION_DEG * DEG2RAD);

  // Rotate point around lot centroid, then flip Y for SVG
  function toSVG(x, y) {
    const dx = x - cx;
    const dy = y - cy;
    return [
      cx + dx * cosR - dy * sinR,
      -(cy + dx * sinR + dy * cosR)
    ];
  }

  function transformPoints(pts) {
    return pts.map(p => toSVG(p[0], p[1]));
  }

  function transformCenter(x, y) {
    return toSVG(x, y);
  }

  // Compute bounding box from transformed boundary corners
  const allPts = [corners.SW, corners.NW, corners.NE, corners.SE];
  const svgCorners = allPts.map(c => toSVG(c[0], c[1]));

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  svgCorners.forEach(([x, y]) => {
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  });

  const PADDING = 45;
  const bounds = {
    x: minX - PADDING, y: minY - PADDING,
    width: (maxX - minX) + PADDING * 2,
    height: (maxY - minY) + PADDING * 2
  };

  const viewBox = `${bounds.x.toFixed(1)} ${bounds.y.toFixed(1)} ${bounds.width.toFixed(1)} ${bounds.height.toFixed(1)}`;

  function toPointsStr(pts) {
    return transformPoints(pts).map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  }

  function toPathD(pts, close) {
    const tp = transformPoints(pts);
    let d = `M ${tp[0][0].toFixed(1)} ${tp[0][1].toFixed(1)}`;
    for (let i = 1; i < tp.length; i++) {
      d += ` L ${tp[i][0].toFixed(1)} ${tp[i][1].toFixed(1)}`;
    }
    if (close) d += ' Z';
    return d;
  }

  function toSmoothPathD(pts) {
    const tp = transformPoints(pts);
    if (tp.length < 2) return '';
    let d = `M ${tp[0][0].toFixed(1)} ${tp[0][1].toFixed(1)}`;
    if (tp.length === 2) {
      d += ` L ${tp[1][0].toFixed(1)} ${tp[1][1].toFixed(1)}`;
      return d;
    }
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

  function offsetEdge(corner1Name, corner2Name, offset) {
    const c1 = corners[corner1Name];
    const c2 = corners[corner2Name];
    const dx = c2[0] - c1[0];
    const dy = c2[1] - c1[1];
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dy / len;
    const ny = -dx / len;
    return [
      [c1[0] + nx * offset, c1[1] + ny * offset],
      [c2[0] + nx * offset, c2[1] + ny * offset]
    ];
  }

  return { toSVG, transformPoints, transformCenter, toPointsStr, toPathD, toSmoothPathD, offsetEdge, viewBox, bounds, svgCorners };
})();
