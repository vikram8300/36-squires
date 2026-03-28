// 36 Squires Path — Driveway Layout Options
// Coordinates in survey feet (SW=origin), walls parallel to lot boundary.
// Lot axis: u along west boundary (0.6681, 0.7440), v perpendicular (0.7440, -0.6681)

const OPTIONS = {
  A: {
    id: 'A',
    name: 'Wide Court + Detached Garage',
    tagline: 'Recommended — best balance of function, cost, and zoning compliance',
    recommended: true,
    description: 'Large parking court in front of the house entrance. Detached 2-car garage on the west side. Single entrance from Squires Path.',

    entrance: {
      // From Squires Path up to court (u=5→18, v=30→35)
      points: [[22.2, -16.3], [27.4, -10.0], [31.2, -1.2], [34.0, 4.5]],
      width: 18,
      label: '18\' Entrance'
    },

    court: {
      // In front of house (u=20→40, v=25→58)
      center: [49.8, -4.4],
      width: 33,
      depth: 20,
      area_sf: 1320,
      capacity: '3–4 cars',
      label: 'Parking Court',
      corners: [
        [31.8, 1.2],   // (u=20, v=25)
        [55.4, -22.3],  // (u=20, v=58)
        [68.9, -7.7],   // (u=40, v=58)
        [45.2, 15.8]    // (u=40, v=25)
      ]
    },

    driveLane: {
      // Court to garage (u=40→56, v=14→25)
      points: [[45.2, 15.8], [48.0, 20.0], [51.5, 27.0], [53.5, 32.0]],
      width: 12,
      label: '12\' Drive Lane'
    },

    garage: {
      type: 'detached',
      // West side (u=50→62, v=6→18), between the trees
      center: [47.7, 33.5],
      width: 24,
      depth: 24,
      area_sf: 576,
      label: 'Detached 2-Car Garage (576 sf)',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf. West side, behind front building line.',
      features: ['2 garage doors', 'EV conduit', 'concrete slab'],
      corners: [
        [37.9, 25.6],  // (u=50, v=6)
        [46.8, 17.6],  // (u=50, v=18)
        [62.8, 33.5],  // (u=62, v=18)
        [53.9, 41.5]   // (u=62, v=6)
      ]
    },

    evConduit: { from: 'house west wall', to: 'garage', label: 'EV Conduit', estimatedLength: 30 },
    coverage: { newBuildingSf: 576, totalBuildingSf: 2998, buildingPct: 13.7, newLotCoverageSf: 1896, totalLotCoverageSf: 5865, lotCoveragePct: 26.8 },
    costs: { phase1: { items: [
      { name: 'Demo existing driveway', low: 3000, high: 6000 },
      { name: 'Excavation & grading', low: 2000, high: 5000 },
      { name: 'Parking court (1,320 sf)', lowPerSf: 7, highPerSf: 30 },
      { name: 'Drive lane (~350 sf)', lowPerSf: 7, highPerSf: 30 },
      { name: 'Garage slab (576 sf)', low: 2300, high: 4600 },
      { name: 'Garage structure', low: 12000, high: 22000 },
      { name: 'Electrical + EV conduit', low: 2000, high: 4000 },
      { name: 'Permits', low: 500, high: 1500 },
      { name: 'Landscaping', low: 3000, high: 8000 }
    ]}},
    varianceRisk: 'Low',
    varianceNote: 'Behind front building line, under 600 sf.',
    phases: 1,
    timelineWeeks: '12–20'
  },

  B: {
    id: 'B',
    name: 'Wide Court + Attached Garage',
    tagline: 'Integrated — garage attached to house',
    recommended: false,
    description: 'Same court, garage attached to west wall of 1-story section. Part of principal structure — no 600 sf cap.',

    entrance: {
      points: [[22.2, -16.3], [27.4, -10.0], [31.2, -1.2], [34.0, 4.5]],
      width: 18, label: '18\' Entrance'
    },
    court: {
      center: [49.8, -4.4], width: 33, depth: 20, area_sf: 1320, capacity: '3–4 cars', label: 'Parking Court',
      corners: [[31.8, 1.2], [55.4, -22.3], [68.9, -7.7], [45.2, 15.8]]
    },
    driveLane: {
      points: [[45.2, 15.8], [48.0, 22.0], [52.0, 28.0]],
      width: 12, label: '12\' Drive Lane'
    },
    garage: {
      type: 'attached',
      // Attached to 1-story west wall (u=70→82, v=10→22)
      center: [57.0, 41.0],
      width: 24, depth: 24, area_sf: 576,
      label: 'Attached 2-Car Garage (576 sf)',
      zoningClass: 'Principal Structure',
      zoningNote: 'Attached to house. No 600 sf cap.',
      features: ['Interior door to house', 'EV conduit'],
      corners: [
        [54.2, 44.0],  // (u=70, v=10)
        [63.1, 36.0],  // (u=70, v=22)
        [71.1, 44.9],  // (u=82, v=22)
        [62.2, 52.9]   // (u=82, v=10)
      ]
    },
    evConduit: { from: 'house panel', to: 'garage', label: 'EV Conduit (internal)', estimatedLength: 10 },
    coverage: { newBuildingSf: 576, totalBuildingSf: 2998, buildingPct: 13.7, newLotCoverageSf: 1896, totalLotCoverageSf: 5865, lotCoveragePct: 26.8 },
    costs: { phase1: { items: [
      { name: 'Demo existing driveway', low: 3000, high: 6000 },
      { name: 'Excavation & grading', low: 2000, high: 5000 },
      { name: 'Parking court (1,320 sf)', lowPerSf: 7, highPerSf: 30 },
      { name: 'Drive lane (~300 sf)', lowPerSf: 7, highPerSf: 30 },
      { name: 'Attached garage (foundation + structure + integration)', low: 18000, high: 32000 },
      { name: 'Electrical + EV conduit', low: 2500, high: 4500 },
      { name: 'Permits + architectural plans', low: 2000, high: 5000 },
      { name: 'Landscaping', low: 3000, high: 8000 }
    ]}},
    varianceRisk: 'None',
    varianceNote: 'Attached = principal structure. Standard setbacks.',
    phases: 1,
    timelineWeeks: '14–24'
  },

  C: {
    id: 'C',
    name: 'Wide Court + Carport (Phase 1)',
    tagline: 'Lowest cost — enclose later',
    recommended: false,
    description: 'Same court, open carport instead of garage. Phase 2 adds walls and doors.',

    entrance: {
      points: [[22.2, -16.3], [27.4, -10.0], [31.2, -1.2], [34.0, 4.5]],
      width: 18, label: '18\' Entrance'
    },
    court: {
      center: [49.8, -4.4], width: 33, depth: 20, area_sf: 1320, capacity: '3–4 cars', label: 'Parking Court',
      corners: [[31.8, 1.2], [55.4, -22.3], [68.9, -7.7], [45.2, 15.8]]
    },
    driveLane: {
      points: [[45.2, 15.8], [48.0, 20.0], [51.5, 27.0], [53.5, 32.0]],
      width: 12, label: '12\' Drive Lane'
    },
    garage: {
      type: 'carport',
      center: [47.7, 33.5],
      width: 24, depth: 22, area_sf: 528,
      label: 'Open Carport (528 sf) → Garage',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf. Simplest permit.',
      features: ['Posts + roof', 'Concrete slab', 'Phase 2: enclose'],
      corners: [
        [37.9, 25.6], [46.8, 17.6], [61.5, 32.3], [52.6, 40.3]
      ]
    },
    evConduit: { from: 'house', to: 'carport', label: 'EV Conduit (Phase 2)', estimatedLength: 30 },
    coverage: { newBuildingSf: 528, totalBuildingSf: 2950, buildingPct: 13.5, newLotCoverageSf: 1848, totalLotCoverageSf: 5817, lotCoveragePct: 26.6 },
    costs: {
      phase1: { items: [
        { name: 'Demo existing driveway', low: 3000, high: 6000 },
        { name: 'Excavation & grading', low: 2000, high: 5000 },
        { name: 'Parking court (1,320 sf)', lowPerSf: 7, highPerSf: 30 },
        { name: 'Drive lane (~350 sf)', lowPerSf: 7, highPerSf: 30 },
        { name: 'Carport slab + structure', low: 6000, high: 12000 },
        { name: 'Permits', low: 500, high: 1000 },
        { name: 'Landscaping', low: 3000, high: 8000 }
      ]},
      phase2: { items: [
        { name: 'Walls + siding', low: 5000, high: 12000 },
        { name: 'Garage doors', low: 2000, high: 5000 },
        { name: 'Electrical + EV', low: 1500, high: 3500 },
        { name: 'Roof upgrade', low: 1000, high: 3000 },
        { name: 'Permit', low: 500, high: 1500 }
      ]}
    },
    varianceRisk: 'Lowest',
    varianceNote: 'Open carport under 600 sf.',
    phases: 2,
    timelineWeeks: 'Ph1: 10–16, Ph2: 4–8'
  },

  D: {
    id: 'D',
    name: 'Compact Court + Extended Drive',
    tagline: 'More green space — smaller footprint',
    recommended: false,
    description: 'Narrower court, extended drive to garage further northwest. More lawn preserved.',

    entrance: {
      points: [[22.2, -16.3], [28.0, -8.0], [34.0, 2.0], [38.0, 8.0]],
      width: 16, label: '16\' Entrance'
    },
    court: {
      // Smaller court (u=22→38, v=28→52)
      center: [48.0, 0.5],
      width: 24, depth: 16, area_sf: 960, capacity: '2–3 cars', label: 'Compact Court',
      corners: [
        [35.5, 3.8],   // (u=22, v=28)
        [53.4, -14.1],  // (u=22, v=52)
        [64.1, -3.4],   // (u=38, v=52)
        [46.2, 14.5]    // (u=38, v=28)
      ]
    },
    driveLane: {
      points: [[46.2, 14.5], [50.0, 22.0], [54.0, 30.0], [58.0, 38.0], [60.0, 44.0]],
      width: 12, label: '12\' Drive Lane'
    },
    garage: {
      type: 'detached',
      // Further back (u=62→74, v=4→16)
      center: [53.5, 43.0],
      width: 22, depth: 24, area_sf: 528,
      label: 'Detached 2-Car Garage (528 sf)',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Well behind front building line. Under 600 sf.',
      features: ['2 garage doors', 'EV conduit (longer run)'],
      corners: [
        [44.1, 39.5],  [52.1, 31.5],  [64.1, 43.4],  [56.1, 51.4]
      ]
    },
    evConduit: { from: 'house', to: 'garage', label: 'EV Conduit (long run)', estimatedLength: 50 },
    coverage: { newBuildingSf: 528, totalBuildingSf: 2950, buildingPct: 13.5, newLotCoverageSf: 1488, totalLotCoverageSf: 5457, lotCoveragePct: 24.9 },
    costs: { phase1: { items: [
      { name: 'Demo existing driveway', low: 3000, high: 6000 },
      { name: 'Excavation & grading', low: 2500, high: 6000 },
      { name: 'Compact court (960 sf)', lowPerSf: 7, highPerSf: 30 },
      { name: 'Extended drive (~600 sf)', lowPerSf: 7, highPerSf: 30 },
      { name: 'Garage slab (528 sf)', low: 2100, high: 4200 },
      { name: 'Garage structure', low: 11000, high: 20000 },
      { name: 'Electrical + EV (longer run)', low: 2500, high: 5000 },
      { name: 'Permits', low: 500, high: 1500 },
      { name: 'Landscaping', low: 3000, high: 8000 }
    ]}},
    varianceRisk: 'Low',
    varianceNote: 'Well behind front building line. Under 600 sf.',
    phases: 1,
    timelineWeeks: '14–22'
  }
};

function computeCosts(option, material) {
  const items = option.costs.phase1.items;
  let totalLow = 0, totalHigh = 0;
  const breakdown = items.map(item => {
    let low, high;
    if (item.lowPerSf !== undefined) {
      const matCost = MATERIALS[material];
      const sfMatch = item.name.match(/\(([\d,]+)\s*sf\)/);
      const area = sfMatch ? parseInt(sfMatch[1].replace(',', '')) : 350;
      low = area * matCost.costPerSqFt.low;
      high = area * matCost.costPerSqFt.high;
    } else { low = item.low; high = item.high; }
    totalLow += low; totalHigh += high;
    return { name: item.name, low, high };
  });
  let phase2 = null;
  if (option.costs.phase2) {
    let p2Low = 0, p2High = 0;
    const p2Items = option.costs.phase2.items.map(item => { p2Low += item.low; p2High += item.high; return item; });
    phase2 = { items: p2Items, totalLow: p2Low, totalHigh: p2High };
  }
  return { items: breakdown, totalLow, totalHigh, phase2 };
}
