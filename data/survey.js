// 36 Squires Path — Survey Data
// Source: Gary Benz, L.S. survey dated 5/19/2021, Job No. G21-7085
// Coordinate system: feet, SW corner = (0,0), +X = east, +Y = north

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

  // Boundary corners in survey feet (SW = origin)
  corners: {
    SW: [0, 0],
    NW: [127.20, 141.64],
    NE: [220.72, 81.14],
    SE: [81.85, -73.49]
  },

  // Boundary edges (clockwise from SW)
  edges: [
    { from: 'SW', to: 'NW', bearing: 'N41°55\'30"E', distance: 190.37, label: 'Stephen Hands Path / Preserve Buffer' },
    { from: 'NW', to: 'NE', bearing: 'S57°06\'10"E', distance: 111.38, label: 'North Side' },
    { from: 'NE', to: 'SE', bearing: 'S41°55\'30"W', distance: 207.84, label: 'Preserve Boundary (East)' },
    { from: 'SE', to: 'SW', bearing: 'N48°04\'30"W', distance: 110.00, label: 'Squires Path Frontage' }
  ],

  // Rotation to make Squires Path horizontal (driver's view)
  // Computed from bearing of south edge (N48°04'30"W → math angle 138°, need 180°, so rotate +42°)
  rotationDeg: 42,

  // Structures — positions in survey feet from SW origin
  house: {
    // Approximate center from aerial + survey overlay
    center: [110, 35],
    width: 52,   // east-west
    depth: 48,   // north-south
    sqft: 3424,
    label: 'Residence (3,424 sf)',
    sections: [
      { type: '1-story frame', position: 'NW portion' },
      { type: '2-story frame', position: 'SE portion' }
    ],
    features: ['chimney', 'brick porch (south)', 'solar panels on roof']
  },

  pool: {
    center: [155, 25],
    width: 15,
    depth: 30,
    label: 'Heated Pool',
    features: ['waterfall', 'safety fence', 'outdoor shower']
  },

  pond: {
    center: [195, 65],
    radius: 15,
    label: 'Pond',
    note: 'Partially on property, near preserve boundary'
  },

  buriedPropane: {
    center: [95, 78],
    label: 'Buried LPG'
  },

  // Two large trees that MUST be preserved
  // Located inside the current horseshoe loop, flanking west side of house
  trees: [
    {
      id: 'tree-south',
      center: [68, 8],
      canopyRadius: 14,
      label: 'Preserved Tree (South)',
      note: 'Large hardwood, inside current driveway loop'
    },
    {
      id: 'tree-north',
      center: [72, 52],
      canopyRadius: 12,
      label: 'Preserved Tree (North)',
      note: 'Large hardwood, inside current driveway loop'
    }
  ],

  // Current driveway to be demolished
  currentDriveway: {
    type: 'Cobblestone + Gravel',
    shape: 'C-shaped / Horseshoe Loop',
    description: 'Two entry/exit points from Squires Path. Curves north along west side of house.',
    // Path points (survey feet) tracing the loop
    path: [
      [22, -20], [28, -5], [35, 15], [45, 35], [55, 55],
      [65, 65], [80, 70], [95, 65], [100, 55], [100, 42],
      [95, 28], [88, 15], [80, 2], [72, -12], [62, -25], [52, -42]
    ]
  },

  // Road reference
  road: {
    label: 'Squires Path',
    // The road runs along the south edge (SE to SW)
    // Edge of pavement is 5' from SW corner
    pavementOffset: 5
  },

  // Adjacent parcels
  adjacent: {
    north: { label: 'Nature Preserve', sctm: '300-184-2-7 & 8', note: 'Town of East Hampton' },
    east: { label: 'Nature Preserve', sctm: '300-184-2-7 & 8', note: 'Direct boundary, no buffer' },
    south: { label: 'Squires Path', note: 'Public road' },
    southwest: { label: 'Lot 38', note: 'Residential neighbor' }
  },

  // Setback reference points from survey
  setbacks: {
    frontRight: 25.00, // from SW corner
    frontLeft: 39.27   // from SW corner
  }
};
