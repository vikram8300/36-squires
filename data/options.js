// 36 Squires Path — Driveway Layout Options
// All coordinates in survey feet (SW corner = origin)

const OPTIONS = {
  A: {
    id: 'A',
    name: 'Wide Court + Detached Garage',
    tagline: 'Recommended — best balance of function, cost, and zoning compliance',
    recommended: true,
    description: 'Large rectangular parking court in front of the house with a detached 2-car garage on the west side. Single wide entrance from Squires Path. Trees preserved as natural court features.',

    entrance: {
      // Single 20' wide entrance, centered on south frontage
      points: [[48, -38], [52, -25], [56, -10], [62, 5]],
      width: 20,
      label: '20\' Entrance'
    },

    court: {
      // Rectangular court between the two preserved trees
      center: [88, -8],
      width: 56,
      depth: 32,
      area_sf: 1792,
      capacity: '3–4 cars',
      label: 'Parking Court',
      // Court corners (survey feet)
      corners: [[60, -24], [116, -24], [116, 8], [60, 8]]
    },

    // Connecting drive from court to garage
    driveLane: {
      points: [[62, 8], [60, 22], [58, 38], [56, 50]],
      width: 14,
      label: '14\' Drive Lane'
    },

    garage: {
      type: 'detached',
      center: [52, 62],
      width: 24,
      depth: 26,
      area_sf: 624,
      label: 'Detached 2-Car Garage (624 sf)',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf max — may need minor variance for 624 sf, or reduce to 22\'×26\' = 572 sf',
      features: ['2 garage doors (9\' each)', 'EV conduit from house', 'concrete slab foundation']
    },

    evConduit: {
      from: 'house west wall',
      to: 'garage east wall',
      label: 'EV Conduit (empty, future-proof)',
      estimatedLength: 30
    },

    coverage: {
      newBuildingSf: 624,
      totalBuildingSf: 3046,  // 2422 + 624
      buildingPct: 13.9,
      newLotCoverageSf: 2416, // 1792 court + 624 garage
      totalLotCoverageSf: 6385,
      lotCoveragePct: 29.2
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2000, high: 5000 },
          { name: 'Parking court (1,792 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Drive lane to garage (~350 sf)', lowPerSf: 7, highPerSf: 30 },
          { name: 'Garage concrete slab (624 sf)', low: 2500, high: 5000 },
          { name: 'Garage structure (framing, roof, doors)', low: 12000, high: 22000 },
          { name: 'Garage electrical + EV conduit', low: 2000, high: 4000 },
          { name: 'Building permit + fees', low: 500, high: 1500 },
          { name: 'Landscaping restoration', low: 3000, high: 8000 }
        ]
      }
    },

    varianceRisk: 'Low',
    varianceNote: 'Garage behind front building line, under 600 sf (or adjust to 572 sf). Standard building permit should suffice.',
    phases: 1,
    timelineWeeks: '12–20'
  },

  B: {
    id: 'B',
    name: 'Wide Court + Attached Garage',
    tagline: 'Integrated design — garage becomes part of the house',
    recommended: false,
    description: 'Same wide parking court, but the garage is attached to the west wall of the house. Counts as part of the principal structure (not accessory), so the 600 sf limit doesn\'t apply. Weather-protected entry to house.',

    entrance: {
      points: [[48, -38], [52, -25], [56, -10], [62, 5]],
      width: 20,
      label: '20\' Entrance'
    },

    court: {
      center: [88, -8],
      width: 56,
      depth: 32,
      area_sf: 1792,
      capacity: '3–4 cars',
      label: 'Parking Court',
      corners: [[60, -24], [116, -24], [116, 8], [60, 8]]
    },

    driveLane: {
      points: [[62, 8], [62, 18], [64, 28]],
      width: 14,
      label: '14\' Drive Lane'
    },

    garage: {
      type: 'attached',
      // Attached to west wall of house
      center: [62, 35],
      width: 24,
      depth: 28,
      area_sf: 672,
      label: 'Attached 2-Car Garage (672 sf)',
      zoningClass: 'Principal Structure (addition)',
      zoningNote: 'No accessory 600 sf cap. Must meet principal structure setbacks. Requires building permit + architectural plans.',
      features: ['2 garage doors (9\' each)', 'Interior door to house', 'EV conduit', 'concrete slab']
    },

    evConduit: {
      from: 'house interior panel',
      to: 'garage wall',
      label: 'EV Conduit (internal run)',
      estimatedLength: 15
    },

    coverage: {
      newBuildingSf: 672,
      totalBuildingSf: 3094,
      buildingPct: 14.1,
      newLotCoverageSf: 2464,
      totalLotCoverageSf: 6433,
      lotCoveragePct: 29.4
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2000, high: 5000 },
          { name: 'Parking court (1,792 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Drive lane to garage (~250 sf)', lowPerSf: 7, highPerSf: 30 },
          { name: 'Attached garage (foundation + structure + integration)', low: 18000, high: 32000 },
          { name: 'Garage electrical + EV conduit', low: 2500, high: 4500 },
          { name: 'Building permit + architectural plans', low: 2000, high: 5000 },
          { name: 'Landscaping restoration', low: 3000, high: 8000 }
        ]
      }
    },

    varianceRisk: 'None',
    varianceNote: 'Attached garage is part of the principal structure. No 600 sf cap. Must meet standard side/rear setbacks.',
    phases: 1,
    timelineWeeks: '14–24'
  },

  C: {
    id: 'C',
    name: 'Wide Court + Carport (Phase 1)',
    tagline: 'Lowest cost entry — enclose to full garage later',
    recommended: false,
    description: 'Same wide court, but start with an open carport instead of an enclosed garage. Phase 2 adds walls, doors, and electrical to convert to a full garage. Lowest upfront cost and simplest permitting.',

    entrance: {
      points: [[48, -38], [52, -25], [56, -10], [62, 5]],
      width: 20,
      label: '20\' Entrance'
    },

    court: {
      center: [88, -8],
      width: 56,
      depth: 32,
      area_sf: 1792,
      capacity: '3–4 cars',
      label: 'Parking Court',
      corners: [[60, -24], [116, -24], [116, 8], [60, 8]]
    },

    driveLane: {
      points: [[62, 8], [60, 22], [58, 38], [56, 50]],
      width: 14,
      label: '14\' Drive Lane'
    },

    garage: {
      type: 'carport',
      center: [52, 62],
      width: 24,
      depth: 24,
      area_sf: 576,
      label: 'Open Carport (576 sf) → Phase 2: Enclosed Garage',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf max. Carport may not require full building permit (check with Building Dept).',
      features: ['Open sides (posts + roof)', 'Concrete slab', 'Phase 2: add walls, doors, electrical']
    },

    evConduit: {
      from: 'house west wall',
      to: 'carport post',
      label: 'EV Conduit (Phase 2)',
      estimatedLength: 30
    },

    coverage: {
      newBuildingSf: 576,
      totalBuildingSf: 2998,
      buildingPct: 13.7,
      newLotCoverageSf: 2368,
      totalLotCoverageSf: 6337,
      lotCoveragePct: 28.9
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2000, high: 5000 },
          { name: 'Parking court (1,792 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Drive lane to carport (~350 sf)', lowPerSf: 7, highPerSf: 30 },
          { name: 'Carport concrete slab + structure', low: 6000, high: 12000 },
          { name: 'Building permit + fees', low: 500, high: 1000 },
          { name: 'Landscaping restoration', low: 3000, high: 8000 }
        ]
      },
      phase2: {
        items: [
          { name: 'Wall framing + siding', low: 5000, high: 12000 },
          { name: 'Garage door(s)', low: 2000, high: 5000 },
          { name: 'Electrical + EV conduit', low: 1500, high: 3500 },
          { name: 'Roofing upgrade (if needed)', low: 1000, high: 3000 },
          { name: 'Building permit for enclosure', low: 500, high: 1500 }
        ]
      }
    },

    varianceRisk: 'Lowest',
    varianceNote: 'Carport under 600 sf, open structure. Simplest permitting path.',
    phases: 2,
    timelineWeeks: 'Phase 1: 10–16, Phase 2: 4–8'
  },

  D: {
    id: 'D',
    name: 'Compact Court + Extended Drive',
    tagline: 'More green space — smaller footprint, garage further back',
    recommended: false,
    description: 'Narrower parking court closer to the house with an extended driveway lane to a garage set further back (northwest). Preserves more lawn/garden area between court and garage. Best option if maximizing green space is a priority.',

    entrance: {
      points: [[48, -38], [52, -25], [58, -10], [68, 5]],
      width: 18,
      label: '18\' Entrance'
    },

    court: {
      center: [92, -5],
      width: 42,
      depth: 28,
      area_sf: 1176,
      capacity: '2–3 cars',
      label: 'Compact Court',
      corners: [[71, -19], [113, -19], [113, 9], [71, 9]]
    },

    driveLane: {
      points: [[71, 9], [66, 25], [60, 42], [55, 60], [50, 75]],
      width: 12,
      label: '12\' Drive Lane'
    },

    garage: {
      type: 'detached',
      center: [48, 82],
      width: 22,
      depth: 26,
      area_sf: 572,
      label: 'Detached 2-Car Garage (572 sf)',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf max. Set further back from road — well behind front building line.',
      features: ['2 garage doors (9\' each)', 'EV conduit from house', 'concrete slab']
    },

    evConduit: {
      from: 'house west wall',
      to: 'garage east wall',
      label: 'EV Conduit (longer run)',
      estimatedLength: 50
    },

    coverage: {
      newBuildingSf: 572,
      totalBuildingSf: 2994,
      buildingPct: 13.7,
      newLotCoverageSf: 1748,
      totalLotCoverageSf: 5717,
      lotCoveragePct: 26.1
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2500, high: 6000 },
          { name: 'Compact court (1,176 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Extended drive lane (~600 sf)', lowPerSf: 7, highPerSf: 30 },
          { name: 'Garage concrete slab (572 sf)', low: 2300, high: 4600 },
          { name: 'Garage structure', low: 11000, high: 20000 },
          { name: 'Garage electrical + EV conduit (longer run)', low: 2500, high: 5000 },
          { name: 'Building permit + fees', low: 500, high: 1500 },
          { name: 'Landscaping restoration', low: 3000, high: 8000 }
        ]
      }
    },

    varianceRisk: 'Low',
    varianceNote: 'Well behind front building line. Under 600 sf. Standard permit.',
    phases: 1,
    timelineWeeks: '14–22'
  }
};

// Helper: compute cost range for an option given a material
function computeCosts(option, material) {
  const items = option.costs.phase1.items;
  let totalLow = 0, totalHigh = 0;
  const breakdown = items.map(item => {
    let low, high;
    if (item.lowPerSf) {
      // Use material-specific cost per sf
      const matCost = MATERIALS[material];
      const sf = item.name.match(/\(([\d,]+)\s*sf\)/);
      const area = sf ? parseInt(sf[1].replace(',', '')) : 350;
      low = area * matCost.costPerSqFt.low;
      high = area * matCost.costPerSqFt.high;
    } else {
      low = item.low;
      high = item.high;
    }
    totalLow += low;
    totalHigh += high;
    return { name: item.name, low, high };
  });

  let phase2 = null;
  if (option.costs.phase2) {
    let p2Low = 0, p2High = 0;
    const p2Items = option.costs.phase2.items.map(item => {
      p2Low += item.low;
      p2High += item.high;
      return { name: item.name, low: item.low, high: item.high };
    });
    phase2 = { items: p2Items, totalLow: p2Low, totalHigh: p2High };
  }

  return { items: breakdown, totalLow, totalHigh, phase2 };
}
