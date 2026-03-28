// 36 Squires Path — Survey Data
// Source: Gary Benz, L.S. survey 5/19/2021, Job No. G21-7085
// Coordinate system: feet, SW corner = (0,0), +X = east, +Y = north
//
// NO ROTATION is applied — the diagram matches the Benz survey orientation.
// House walls are parallel to lot boundary edges (tilted ~42° from horiz).
//
// House/structure positions computed from lot's axis system:
//   u = distance along west boundary (SW→NW direction, bearing N41°55'30"E)
//   v = distance perpendicular into the lot (east-ish)
//   (u,v) → survey: x = u*0.6681 + v*0.7440, y = u*0.7440 - v*0.6681

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

  // House — L-shaped, walls parallel to lot boundary
  // 2-story section (south/SE, closer to Squires Path): u=42→70, v=30→65
  // 1-story section (north/NW, extends further west): u=70→95, v=22→55
  house: {
    sqft: 3424,
    label: 'Residence',

    // L-shaped footprint (survey coords, clockwise from 2-story SW corner)
    footprint: [
      [50.4, 11.2],   // 2-story SW (u=42, v=30) — front-left
      [76.4, -12.2],  // 2-story SE (u=42, v=65) — front-right
      [95.1, 8.7],    // 2-story NE (u=70, v=65) — back-right
      [87.7, 15.3],   // step in: 1-story SE (u=70, v=55) — 1-story narrower on east
      [104.4, 33.9],  // 1-story NE (u=95, v=55)
      [79.8, 56.0],   // 1-story NW (u=95, v=22)
      [63.1, 37.4],   // 1-story SW (u=70, v=22) — extends further west
      [69.1, 32.0]    // 2-story NW (u=70, v=30) — step back east
    ],

    // Brick porch (extends south from 2-story front face)
    porch: [
      [53.7, 2.9],    // (u=38, v=38)
      [66.3, -8.5],   // (u=38, v=55)
      [69.0, -5.5],   // (u=42, v=55)
      [56.3, 5.9]     // (u=42, v=38)
    ],

    frontDoor: [61.3, -1.3],  // center of porch front face

    sections: [
      { label: '1-STORY', center: [84.0, 41.0] },   // center of 1-story section
      { label: '2-STORY', center: [73.0, 5.0] }      // center of 2-story section
    ],

    chimney: [82.0, 23.0],

    features: ['chimney', 'brick porch (south)', 'solar panels on roof']
  },

  // Pool — east of house (u=78→93, v=60→75)
  pool: {
    center: [107.3, 18.5],
    width: 15,
    depth: 30,
    label: 'Heated Pool',
    corners: [
      [96.8, 17.9],   // (u=78, v=60)
      [107.9, 7.9],   // (u=78, v=75)
      [117.9, 19.1],  // (u=93, v=75)
      [106.8, 29.1]   // (u=93, v=60)
    ],
    features: ['waterfall', 'safety fence']
  },

  // Pond — NE area (u=100, v=72)
  pond: {
    center: [120.4, 26.3],
    radius: 12,
    label: 'Pond'
  },

  // LPG — north of 1-story (u=90, v=35)
  buriedPropane: {
    center: [86.2, 43.6],
    label: 'Buried LPG'
  },

  // Trees — inside the horseshoe loop (between driveway arms)
  trees: [
    {
      id: 'tree-south',
      center: [28.6, 7.9],    // (u=25, v=16)
      canopyRadius: 12,
      label: 'Preserved Tree'
    },
    {
      id: 'tree-north',
      center: [48.7, 30.2],   // (u=55, v=16)
      canopyRadius: 10,
      label: 'Preserved Tree'
    }
  ],

  // Current driveway — horseshoe, entirely west of house
  currentDriveway: {
    type: 'Cobblestone + Gravel',
    shape: 'U-shaped / Horseshoe Loop',
    path: [
      // West arm (entry from Squires Path, going north)
      [9.3, -1.6],   [16.0, 5.8],  [29.3, 20.7],  [40.1, 31.2],
      [50.9, 41.7],  [59.0, 47.8],
      // Top curve
      [65.9, 51.0],  [71.7, 49.9],  [73.4, 44.3],
      // East arm (going south)
      [69.5, 38.4],  [63.5, 30.3],  [56.8, 22.9],
      [49.4, 16.1],  [44.0, 11.6],
      // Bottom of U (across front of house)
      [37.8, 9.1],   [30.1, 6.6],   [22.5, 4.0],   [15.5, 2.3]
    ]
  },

  road: {
    label: 'Squires Path',
    pavementOffset: 5
  },

  adjacent: {
    north: { label: 'Nature Preserve', sctm: '300-184-2-7 & 8' },
    east: { label: 'Nature Preserve', sctm: '300-184-2-7 & 8' },
    south: { label: 'Squires Path' },
    southwest: { label: 'Lot 38' }
  },

  setbacks: {
    frontRight: 25.00,
    frontLeft: 39.27
  }
};
