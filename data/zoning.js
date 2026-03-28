// 36 Squires Path — Zoning Rules
// Town of East Hampton, Chapter 255 (NOT Village of East Hampton)

const ZONING = {
  jurisdiction: 'Town of East Hampton',
  zone: 'Residential',
  chapter: 'Chapter 255',
  lotArea: 21901,

  coverage: {
    building: {
      maxPct: 20,
      maxSf: 4380,
      currentSf: 2422,
      currentPct: 11.1,
      remainingSf: 1958,
      label: 'Building Coverage'
    },
    lot: {
      maxPct: 50,
      maxSf: 10951,
      currentSf: 3969,
      currentPct: 18.1,
      remainingSf: 6982,
      label: 'Total Lot Coverage',
      includes: 'Buildings + driveways + patios + walkways + pool deck'
    },
    clearing: {
      maxByCodePct: 70.7,
      maxByCodeSf: 15475,
      currentSf: 20942,
      currentPct: 95.6,
      status: 'Preexisting nonconforming (100%)',
      note: 'Property has scenic/conservation easements'
    }
  },

  setbacks: {
    front: { distance: 35, from: 'Squires Path', label: 'Front Setback' },
    sideWest: { distance: 15, from: 'West property line (toward Lot 38)', label: 'Side Setback (West)' },
    sideEast: { distance: 15, from: 'East property line (preserve)', label: 'Side Setback (East)' },
    rear: { distance: 25, from: 'North property line (preserve)', label: 'Rear Setback' }
  },

  accessoryStructure: {
    maxSf: 600,
    maxHeightFlat: 15,
    maxHeightGabled: 20,
    mustBeBehindFrontBuildingLine: true,
    minSeparationFromDwelling: 10,
    sideSetback: 10,
    rearSetback: 10,
    noHabitableSpace: true,
    label: 'Accessory Structure Rules (Detached Garage)',
    notes: [
      'Max 600 sf gross floor area',
      'Must be behind front building line of principal dwelling',
      'Min 10\' separation from house (proposed increase from 5\')',
      'No sleeping quarters, kitchen, or plumbing',
      'Side/rear setbacks: 10–15\' (confirm with Building Dept)'
    ]
  },

  principalStructure: {
    label: 'Principal Structure Rules (Attached Garage)',
    notes: [
      'Attached garage = part of principal structure (not accessory)',
      'No 600 sf cap — limited by building coverage only',
      'Must meet principal structure setbacks (front 35\', sides 15\', rear 25\')',
      'Requires architectural plans + building permit',
      'Combined footprint cannot exceed 20% building coverage (4,380 sf)'
    ]
  },

  permitRequirements: [
    'Two sets of 1/4" scale plans',
    'Completed application signed by licensed contractor (notarized)',
    'Workers\' compensation insurance certificate',
    'Current survey (2021 Gary Benz survey is valid — less than 10 years old)',
    'Survey showing clearing envelope if clearing involved',
    'HERS rating / Res-Check may be required (NY State Energy Code)'
  ],

  variance: {
    board: 'Zoning Board of Appeals (ZBA)',
    address: '159 Pantigo Road, East Hampton',
    phone: '(631) 324-4143',
    timeline: '2–4 months from application to decision',
    fiveFactorTest: [
      { factor: 'Cannot achieve reasonable return without variance', argument: 'Only home on Squires Path without covered vehicle storage. Diminishes utility and resale value.' },
      { factor: 'Hardship unique to this property', argument: 'Nature Preserve on two sides eliminates ~50% of buildable envelope. Not shared by other lots.' },
      { factor: 'Will not alter essential character of neighborhood', argument: 'Under 600 sf, matching architecture. Multiple neighbors have garages. Screened by landscaping.' },
      { factor: 'Hardship was not self-created', argument: 'Preserve boundaries set in 1968 subdivision. Owners purchased in 2021 with pre-existing constraints.' },
      { factor: 'Minimum variance necessary', argument: 'Smallest feasible garage (550–600 sf). Property stays at ~14% building coverage vs 20% max.' }
    ]
  },

  encroachment: {
    status: 'RESOLVED',
    noticeDate: 'April 10, 2024',
    from: 'Dept. of Land Acquisition & Management (Andrew Drake)',
    issue: 'Prior owners erected fencing + maintained landscaping/driveway beyond property boundary onto Nature Preserve',
    resolution: 'Remediated by current owners. Clearance letter obtained.',
    contact: 'Andrew Drake, adrake@ehamptonny.gov, (631) 324-7420'
  },

  contacts: {
    buildingDept: { address: '300 Pantigo Place, Suite 104', phone: '(631) 324-4142' },
    zba: { address: '159 Pantigo Road', phone: '(631) 324-4143' },
    landAcquisition: { name: 'Andrew Drake', phone: '(631) 324-7420', email: 'adrake@ehamptonny.gov' },
    surveyor: { name: 'Gary Benz, L.S.', phone: '(631) 648-9348', email: 'GaryBenzLS@Yahoo.com' }
  },

  attorneys: [
    { firm: 'Twomey, Latham, Shea, Kelley, Dubin & Quartararo', specialty: 'Premier East End zoning', location: 'Riverhead', url: 'suffolklaw.com' },
    { firm: 'Sill & Sill', specialty: 'Residential zoning in East Hampton' }
  ],

  contractors: [
    { name: 'J.A. Land Development', specialty: 'Full-service hardscape: driveways, cobblestone, bluestone, grading' },
    { name: 'All Purpose Paving (NY)', specialty: 'Family-owned, East End', url: 'nyallpurposepaving.com' },
    { name: 'APM O\'Neill & Sons', specialty: '30+ years East Hampton', phone: '(631) 480-3238' },
    { name: 'Walkway Masonry Inc', specialty: 'Stone, bluestone, pavers, Long Island' }
  ]
};
