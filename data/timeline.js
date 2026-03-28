// 36 Squires Path — Project Timeline & Critical Path

const TIMELINE = {
  // Pre-construction steps
  preconstruction: [
    {
      id: 'attorney',
      name: 'Engage Zoning Attorney',
      duration: 14,
      unit: 'days',
      week: '1–2',
      dependencies: [],
      status: 'not-started',
      note: 'Determine if variance needed. Twomey Latham or Sill & Sill recommended.',
      critical: true
    },
    {
      id: 'architect',
      name: 'Architect / Site Plan',
      duration: 21,
      unit: 'days',
      week: '2–4',
      dependencies: ['attorney'],
      status: 'not-started',
      note: '1/4" scale plans required for permit. Must show clearing envelope.',
      critical: true
    },
    {
      id: 'encroachment',
      name: 'Encroachment Clearance',
      duration: 7,
      unit: 'days',
      week: '2–3',
      dependencies: [],
      status: 'completed',
      note: 'Written resolution obtained from Andrew Drake. ✓ DONE'
    },
    {
      id: 'bids',
      name: 'Solicit 3 Contractor Bids',
      duration: 21,
      unit: 'days',
      week: '3–6',
      dependencies: ['architect'],
      status: 'not-started',
      note: 'Get bids from J.A. Land Development, All Purpose Paving, APM O\'Neill.',
      critical: false
    }
  ],

  // Permitting
  permitting: [
    {
      id: 'permit-app',
      name: 'Submit Building Permit',
      duration: 5,
      unit: 'days',
      week: '4–5',
      dependencies: ['architect'],
      status: 'not-started',
      note: 'Two sets of plans, contractor signature (notarized), insurance cert, survey.',
      critical: true
    },
    {
      id: 'permit-review',
      name: 'Building Dept Review',
      duration: 42,
      unit: 'days',
      week: '5–11',
      dependencies: ['permit-app'],
      status: 'not-started',
      note: 'Typical 6–8 week review for Town of East Hampton. Can be longer in summer.',
      critical: true
    },
    {
      id: 'variance',
      name: 'ZBA Variance (if needed)',
      duration: 90,
      unit: 'days',
      week: '5–16',
      dependencies: ['architect'],
      status: 'conditional',
      note: 'Only if garage placement requires variance. 2–4 month process. Adds $5K–$12K.',
      critical: true,
      conditional: true
    }
  ],

  // Construction phases
  construction: [
    {
      id: 'demo',
      name: 'Demolish Existing Driveway',
      duration: 3,
      unit: 'days',
      week: '12',
      dependencies: ['permit-review'],
      status: 'not-started',
      note: 'Remove cobblestone, gravel, base material. Haul away debris.',
      critical: false
    },
    {
      id: 'excavate',
      name: 'Excavation & Grading',
      duration: 5,
      unit: 'days',
      week: '12–13',
      dependencies: ['demo'],
      status: 'not-started',
      note: 'Cut to grade, establish drainage slopes (2% min), protect tree root zones.',
      critical: false
    },
    {
      id: 'drainage',
      name: 'Drainage Install',
      duration: 3,
      unit: 'days',
      week: '13',
      dependencies: ['excavate'],
      status: 'not-started',
      note: 'French drains, catch basins, or swales depending on material choice.',
      critical: false
    },
    {
      id: 'base',
      name: 'Sub-base & Base Layer',
      duration: 4,
      unit: 'days',
      week: '13–14',
      dependencies: ['drainage'],
      status: 'not-started',
      note: '6–8" compacted gravel base. 2" setting bed for pavers/block.',
      critical: false
    },
    {
      id: 'surface',
      name: 'Surface Material Install',
      duration: 10,
      unit: 'days',
      week: '14–16',
      dependencies: ['base'],
      status: 'not-started',
      note: 'Timeline varies: asphalt 3–5 days, pavers 7–10 days, Belgian block 10–14 days.',
      critical: false
    },
    {
      id: 'garage-foundation',
      name: 'Garage Foundation / Slab',
      duration: 5,
      unit: 'days',
      week: '12–13',
      dependencies: ['permit-review'],
      status: 'not-started',
      note: 'Can run concurrent with driveway demo. 4" concrete slab on compacted base.',
      critical: false
    },
    {
      id: 'garage-frame',
      name: 'Garage Framing & Roof',
      duration: 7,
      unit: 'days',
      week: '13–14',
      dependencies: ['garage-foundation'],
      status: 'not-started',
      note: 'Wood frame, shingle roof to match house. Garage doors.',
      critical: false
    },
    {
      id: 'garage-finish',
      name: 'Garage Finish & Electrical',
      duration: 5,
      unit: 'days',
      week: '15–16',
      dependencies: ['garage-frame'],
      status: 'not-started',
      note: 'Siding, trim, electrical panel, lighting, EV conduit run.',
      critical: false
    },
    {
      id: 'landscape',
      name: 'Landscaping & Cleanup',
      duration: 5,
      unit: 'days',
      week: '16–17',
      dependencies: ['surface', 'garage-finish'],
      status: 'not-started',
      note: 'Restore disturbed areas. Edging. Planting. Tree protection removal.',
      critical: false
    },
    {
      id: 'inspection',
      name: 'Final Inspection & C/O',
      duration: 7,
      unit: 'days',
      week: '17–18',
      dependencies: ['landscape'],
      status: 'not-started',
      note: 'Town Building Dept final inspection. Certificate of Occupancy / Compliance.',
      critical: true
    }
  ],

  // Summary milestones
  milestones: [
    { name: 'Project Kickoff', week: 1, icon: '▶' },
    { name: 'Plans Complete', week: 4, icon: '📐' },
    { name: 'Permit Submitted', week: 5, icon: '📋' },
    { name: 'Permit Approved', week: 11, icon: '✓' },
    { name: 'Construction Start', week: 12, icon: '🔨' },
    { name: 'Driveway Complete', week: 16, icon: '🚗' },
    { name: 'Final Inspection', week: 18, icon: '✓' }
  ],

  totalTimeline: {
    best: '12 weeks (no variance needed, fast permit review)',
    typical: '18–20 weeks',
    worst: '28–32 weeks (if variance required + summer delays)'
  }
};
