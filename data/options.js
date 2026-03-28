// 36 Squires Path — Driveway Layout Options (CORRECTED)
// All coordinates in survey feet (SW corner = origin)
//
// LAYOUT CONTEXT (from aerial + surveys):
//   House front door faces south/SW at approximately (100, -2)
//   Driveway horseshoe is entirely WEST of house (x < 82)
//   Parking court goes in front of house, between house and Squires Path
//   Trees at ~(54, 12) and ~(56, 45) are inside the old horseshoe
//   Garage goes on the west side, behind front building line

const OPTIONS = {
  A: {
    id: 'A',
    name: 'Wide Court + Detached Garage',
    tagline: 'Recommended — best balance of function, cost, and zoning compliance',
    recommended: true,
    description: 'Large rectangular parking court directly in front of the house entrance, replacing the cobblestone area. Detached 2-car garage on the west side between the preserved trees. Single wide entrance from Squires Path.',

    entrance: {
      points: [[50, -40], [55, -32], [60, -22], [63, -14]],
      width: 20,
      label: '20\' Entrance'
    },

    court: {
      center: [88, -14],
      width: 50,
      depth: 26,
      area_sf: 1300,
      capacity: '3–4 cars',
      label: 'Parking Court',
      corners: [[63, -27], [113, -27], [113, -1], [63, -1]]
    },

    driveLane: {
      points: [[63, -1], [60, 10], [56, 22], [54, 35]],
      width: 14,
      label: '14\' Drive Lane'
    },

    garage: {
      type: 'detached',
      center: [52, 48],
      width: 24,
      depth: 24,
      area_sf: 576,
      label: 'Detached 2-Car Garage (576 sf)',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf max. Between the two preserved trees, behind front building line.',
      features: ['2 garage doors (9\' each)', 'EV conduit from house', 'concrete slab foundation']
    },

    evConduit: {
      from: 'house west wall',
      to: 'garage east wall',
      label: 'EV Conduit (empty, future-proof)',
      estimatedLength: 35
    },

    coverage: {
      newBuildingSf: 576,
      totalBuildingSf: 2998,
      buildingPct: 13.7,
      newLotCoverageSf: 1876,
      totalLotCoverageSf: 5845,
      lotCoveragePct: 26.7
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2000, high: 5000 },
          { name: 'Parking court (1,300 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Drive lane to garage (~400 sf)', lowPerSf: 7, highPerSf: 30 },
          { name: 'Garage concrete slab (576 sf)', low: 2300, high: 4600 },
          { name: 'Garage structure (framing, roof, doors)', low: 12000, high: 22000 },
          { name: 'Garage electrical + EV conduit', low: 2000, high: 4000 },
          { name: 'Building permit + fees', low: 500, high: 1500 },
          { name: 'Landscaping restoration', low: 3000, high: 8000 }
        ]
      }
    },

    varianceRisk: 'Low',
    varianceNote: 'Garage behind front building line, under 600 sf. Standard building permit should suffice.',
    phases: 1,
    timelineWeeks: '12–20'
  },

  B: {
    id: 'B',
    name: 'Wide Court + Attached Garage',
    tagline: 'Integrated design — garage becomes part of the house',
    recommended: false,
    description: 'Same wide parking court, but the garage is attached to the west wall of the 1-story section. Counts as principal structure — no 600 sf cap. Interior door access to house.',

    entrance: {
      points: [[50, -40], [55, -32], [60, -22], [63, -14]],
      width: 20,
      label: '20\' Entrance'
    },

    court: {
      center: [88, -14],
      width: 50,
      depth: 26,
      area_sf: 1300,
      capacity: '3–4 cars',
      label: 'Parking Court',
      corners: [[63, -27], [113, -27], [113, -1], [63, -1]]
    },

    driveLane: {
      points: [[63, -1], [62, 12], [60, 25], [58, 36]],
      width: 14,
      label: '14\' Drive Lane'
    },

    garage: {
      type: 'attached',
      center: [62, 45],
      width: 24,
      depth: 26,
      area_sf: 624,
      label: 'Attached 2-Car Garage (624 sf)',
      zoningClass: 'Principal Structure (addition)',
      zoningNote: 'Attached to west wall of 1-story section. No 600 sf cap. Must meet principal structure setbacks.',
      features: ['2 garage doors (9\' each)', 'Interior door to house', 'EV conduit', 'concrete slab']
    },

    evConduit: {
      from: 'house interior panel',
      to: 'garage wall',
      label: 'EV Conduit (internal run)',
      estimatedLength: 15
    },

    coverage: {
      newBuildingSf: 624,
      totalBuildingSf: 3046,
      buildingPct: 13.9,
      newLotCoverageSf: 1924,
      totalLotCoverageSf: 5893,
      lotCoveragePct: 26.9
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2000, high: 5000 },
          { name: 'Parking court (1,300 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Drive lane to garage (~350 sf)', lowPerSf: 7, highPerSf: 30 },
          { name: 'Attached garage (foundation + structure + house integration)', low: 18000, high: 32000 },
          { name: 'Garage electrical + EV conduit', low: 2500, high: 4500 },
          { name: 'Building permit + architectural plans', low: 2000, high: 5000 },
          { name: 'Landscaping restoration', low: 3000, high: 8000 }
        ]
      }
    },

    varianceRisk: 'None',
    varianceNote: 'Attached garage = part of principal structure. No 600 sf cap. Standard setbacks apply.',
    phases: 1,
    timelineWeeks: '14–24'
  },

  C: {
    id: 'C',
    name: 'Wide Court + Carport (Phase 1)',
    tagline: 'Lowest cost entry — enclose to full garage later',
    recommended: false,
    description: 'Same wide court, but open carport instead of enclosed garage. Phase 2 adds walls, doors, and electrical. Lowest upfront cost and simplest permitting.',

    entrance: {
      points: [[50, -40], [55, -32], [60, -22], [63, -14]],
      width: 20,
      label: '20\' Entrance'
    },

    court: {
      center: [88, -14],
      width: 50,
      depth: 26,
      area_sf: 1300,
      capacity: '3–4 cars',
      label: 'Parking Court',
      corners: [[63, -27], [113, -27], [113, -1], [63, -1]]
    },

    driveLane: {
      points: [[63, -1], [60, 10], [56, 22], [54, 35]],
      width: 14,
      label: '14\' Drive Lane'
    },

    garage: {
      type: 'carport',
      center: [52, 48],
      width: 24,
      depth: 22,
      area_sf: 528,
      label: 'Open Carport (528 sf) → Phase 2: Enclosed Garage',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf max. Carport may not require full building permit.',
      features: ['Open sides (posts + roof)', 'Concrete slab', 'Phase 2: add walls, doors, electrical']
    },

    evConduit: {
      from: 'house west wall',
      to: 'carport post',
      label: 'EV Conduit (Phase 2)',
      estimatedLength: 35
    },

    coverage: {
      newBuildingSf: 528,
      totalBuildingSf: 2950,
      buildingPct: 13.5,
      newLotCoverageSf: 1828,
      totalLotCoverageSf: 5797,
      lotCoveragePct: 26.5
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2000, high: 5000 },
          { name: 'Parking court (1,300 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Drive lane to carport (~400 sf)', lowPerSf: 7, highPerSf: 30 },
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
    varianceNote: 'Open carport under 600 sf. Simplest permitting path.',
    phases: 2,
    timelineWeeks: 'Phase 1: 10–16, Phase 2: 4–8'
  },

  D: {
    id: 'D',
    name: 'Compact Court + Extended Drive',
    tagline: 'More green space — smaller footprint, garage further back',
    recommended: false,
    description: 'Narrower parking court closer to the house. Extended driveway lane to a garage set further back (northwest), preserving more lawn between court and garage.',

    entrance: {
      points: [[50, -40], [56, -32], [62, -22], [68, -12]],
      width: 18,
      label: '18\' Entrance'
    },

    court: {
      center: [92, -11],
      width: 40,
      depth: 22,
      area_sf: 880,
      capacity: '2–3 cars',
      label: 'Compact Court',
      corners: [[72, -22], [112, -22], [112, 0], [72, 0]]
    },

    driveLane: {
      points: [[72, 0], [66, 15], [58, 32], [52, 48], [48, 62]],
      width: 12,
      label: '12\' Drive Lane'
    },

    garage: {
      type: 'detached',
      center: [46, 72],
      width: 22,
      depth: 24,
      area_sf: 528,
      label: 'Detached 2-Car Garage (528 sf)',
      zoningClass: 'Accessory Structure',
      zoningNote: 'Under 600 sf max. Set further back — well behind front building line.',
      features: ['2 garage doors (9\' each)', 'EV conduit from house (longer run)', 'concrete slab']
    },

    evConduit: {
      from: 'house west wall',
      to: 'garage east wall',
      label: 'EV Conduit (longer run)',
      estimatedLength: 55
    },

    coverage: {
      newBuildingSf: 528,
      totalBuildingSf: 2950,
      buildingPct: 13.5,
      newLotCoverageSf: 1408,
      totalLotCoverageSf: 5377,
      lotCoveragePct: 24.6
    },

    costs: {
      phase1: {
        items: [
          { name: 'Demo existing loop driveway', low: 3000, high: 6000 },
          { name: 'Excavation & grading', low: 2500, high: 6000 },
          { name: 'Compact court (880 sf)', lowPerSf: 7, highPerSf: 30, note: 'Varies by material' },
          { name: 'Extended drive lane (~650 sf)', lowPerSf: 7, highPerSf: 30 },
          { name: 'Garage concrete slab (528 sf)', low: 2100, high: 4200 },
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
