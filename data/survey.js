// 36 Squires Path — Survey Data (CORRECTED from aerial + Benz survey)
// Source: Gary Benz, L.S. survey dated 5/19/2021, Job No. G21-7085
// Coordinate system: feet, SW corner = (0,0), +X = east, +Y = north
//
// KEY LAYOUT (from aerial):
//   - House is center-east of lot, L-shaped (1-story NW, 2-story SE)
//   - Driveway horseshoe is ENTIRELY WEST of the house
//   - Bottom of the U sweeps across the front (south) of the house entrance
//   - Both curb cuts on Squires Path are near the SW corner
//   - Trees are INSIDE the horseshoe (between the two arms)
//   - Pool is EAST of the house
//   - Pond is NE corner

const SURVEY = {
  property: {
    address: '36 Squires Path, East Hampton, NY 11937',
    sctm: '300-184-2-9.1',
    subdivision: 'Lot 6, Fox Hollow Estates',
    area_sf: 21901,
    area_acres: 0.502,
    yearBuilt: 1972,
    surveyor: 'Gary Benz, L.S.',
    surveyDate: '2021-05-19',
    scale: '1 inch = 30 feet'
  },

  corners: {
    SW: [0, 0],
    NW: [127.20, 141.64],
    NE: [220.72, 81.14],
    SE: [81.85, -73.49]
  },

  edges: [
    { from: 'SW', to: 'NW', bearing: 'N41°55\'30"E', distance: 190.37, label: 'Stephen Hands Path' },
    { from: 'NW', to: 'NE', bearing: 'S57°06\'10"E', distance: 111.38, label: 'North Side' },
    { from: 'NE', to: 'SE', bearing: 'S41°55\'30"W', distance: 207.84, label: 'Preserve (East)' },
    { from: 'SE', to: 'SW', bearing: 'N48°04\'30"W', distance: 110.00, label: 'Squires Path' }
  ],

  rotationDeg: 42,

  // House — L-shaped footprint as polygon vertices (clockwise from SW of 2-story)
  // 2-story section: south/east portion, ~52' wide × 30' deep
  // 1-story section: north/west extension, ~36' wide × 26' deep
  // Brick porch: extends south from 2-story section
  house: {
    sqft: 3424,
    label: 'Residence',
    entranceFacing: 'south/southwest (toward driveway)',

    // L-shaped footprint polygon (survey feet, clockwise)
    footprint: [
      [88, 2],    // SW corner of 2-story section
      [140, 2],   // SE corner of 2-story section
      [140, 32],  // NE corner of 2-story section
      [118, 32],  // step inward where 1-story begins
      [118, 58],  // NE corner of 1-story section
      [82, 58],   // NW corner of 1-story section
      [82, 32],   // SW corner of 1-story section
      [88, 32]    // back to 2-story NW corner
    ],

    // Brick porch (south of 2-story, where front door is)
    porch: [
      [95, -4],
      [125, -4],
      [125, 2],
      [95, 2]
    ],

    // Front door location (on porch, facing SW toward driveway)
    frontDoor: [100, -2],

    // Labels for sections
    sections: [
      { label: '2-STORY', center: [114, 17] },
      { label: '1-STORY', center: [100, 45] }
    ],

    // Chimney approximate position
    chimney: [108, 28],

    features: ['chimney', 'brick porch (south)', 'solar panels on roof']
  },

  pool: {
    center: [162, 18],
    width: 16,
    depth: 32,
    label: 'Heated Pool',
    // Pool corners
    corners: [
      [154, 2], [170, 2], [170, 34], [154, 34]
    ],
    features: ['waterfall', 'safety fence', 'outdoor shower']
  },

  pond: {
    center: [195, 65],
    radius: 12,
    label: 'Pond',
    note: 'Partially on property, near preserve boundary'
  },

  buriedPropane: {
    center: [90, 72],
    label: 'Buried LPG'
  },

  // Two large trees INSIDE the horseshoe loop (between the two driveway arms)
  trees: [
    {
      id: 'tree-south',
      center: [54, 12],
      canopyRadius: 13,
      label: 'Preserved Tree',
      note: 'Large hardwood, inside driveway loop (south)'
    },
    {
      id: 'tree-north',
      center: [56, 45],
      canopyRadius: 11,
      label: 'Preserved Tree',
      note: 'Large hardwood, inside driveway loop (north)'
    }
  ],

  // Current driveway — horseshoe/U-shape, ENTIRELY WEST of house
  // Both curb cuts near SW corner on Squires Path
  // Bottom of U sweeps across front of house entrance
  currentDriveway: {
    type: 'Cobblestone + Gravel',
    shape: 'U-shaped / Horseshoe Loop',
    description: 'West arm goes north along west property area. East arm returns south closer to house. Bottom of U crosses in front of house entrance. Both exits near SW corner.',
    // West arm (entry, going north from Squires Path)
    westArm: [
      [15, -28], [18, -14], [22, 2], [26, 16], [32, 30], [38, 44], [45, 56]
    ],
    // Top curve (connecting west arm to east arm)
    topCurve: [
      [52, 64], [60, 68], [68, 65]
    ],
    // East arm (going south, east of west arm, still west of house)
    eastArm: [
      [72, 56], [75, 44], [76, 32], [76, 20], [74, 8]
    ],
    // Bottom of U (sweeping across front of house entrance)
    bottomCurve: [
      [70, -2], [62, -10], [52, -18], [42, -24], [32, -30]
    ],
    // Full path for rendering (combined)
    path: [
      // West arm
      [15, -28], [18, -14], [22, 2], [26, 16], [32, 30], [38, 44], [45, 56],
      // Top curve
      [52, 64], [60, 68], [68, 65],
      // East arm
      [72, 56], [75, 44], [76, 32], [76, 20], [74, 8],
      // Bottom curve (across house front)
      [70, -2], [62, -10], [52, -18], [42, -24], [32, -30]
    ]
  },

  road: {
    label: 'Squires Path',
    pavementOffset: 5
  },

  adjacent: {
    north: { label: 'Nature Preserve', sctm: '300-184-2-7 & 8', note: 'Town of East Hampton' },
    east: { label: 'Nature Preserve', sctm: '300-184-2-7 & 8', note: 'Direct boundary' },
    south: { label: 'Squires Path', note: 'Public road' },
    southwest: { label: 'Lot 38', note: 'Residential neighbor (300-184-2-10.002)' }
  },

  setbacks: {
    frontRight: 25.00,
    frontLeft: 39.27
  }
};
