// 36 Squires Path — Surface Material Options
// Costs reflect East End Long Island, Q1 2026 pricing

const MATERIALS = {
  belgianBlock: {
    id: 'belgianBlock',
    name: 'Belgian Block (Granite Cobble)',
    shortName: 'Belgian Block',
    costPerSqFt: { low: 22, high: 38 },
    color: '#a89882',
    patternColor: '#8b7d6b',
    installTime: '2–3 weeks for court',
    lifespan: '100+ years',
    pros: [
      'Premium Hamptons aesthetic',
      'Extremely durable — outlasts the house',
      'Excellent drainage between joints',
      'Individual stones replaceable',
      'Heritage-appropriate for East Hampton'
    ],
    cons: [
      'Highest material + labor cost',
      'Uneven surface (not ideal for heels, strollers, bikes)',
      'Requires skilled mason — limited East End availability',
      'Longer installation timeline'
    ],
    maintenance: 'Re-sand joints every 3–5 years. Weed control in joints. Individual stones replaceable if cracked.',
    bestFor: 'Parking court surface, entrance apron. Best long-term value if budget allows.',
    drainageRating: 'Excellent (permeable joints)',
    hamptonsFit: 'Perfect — classic East End material'
  },

  pavers: {
    id: 'pavers',
    name: 'Concrete Pavers / Bluestone',
    shortName: 'Pavers',
    costPerSqFt: { low: 15, high: 28 },
    color: '#b8a99a',
    patternColor: '#9a8b7c',
    installTime: '1–2 weeks for court',
    lifespan: '25–50 years',
    pros: [
      'Wide variety of patterns and colors',
      'Smoother than Belgian block',
      'Good drainage with proper joint spacing',
      'Modular — easy to repair sections',
      'Can match existing bluestone walkways'
    ],
    cons: [
      'Can shift/settle over time without proper base',
      'Color may fade with UV exposure',
      'Mid-to-high cost range',
      'Weed growth in joints if not maintained'
    ],
    maintenance: 'Re-sand joints every 2–3 years. Seal every 3–5 years for color retention. Reset shifted pavers.',
    bestFor: 'Parking court. Good balance of aesthetics and function.',
    drainageRating: 'Good (permeable with proper joints)',
    hamptonsFit: 'Very good — bluestone especially popular'
  },

  asphalt: {
    id: 'asphalt',
    name: 'Asphalt (Hot Mix)',
    shortName: 'Asphalt',
    costPerSqFt: { low: 7, high: 15 },
    color: '#4a4a4a',
    patternColor: '#333333',
    installTime: '3–5 days for court',
    lifespan: '15–25 years',
    pros: [
      'Most cost-effective option',
      'Fast installation (usable in 24–48 hours)',
      'Smooth, uniform surface',
      'Easy to snowplow',
      'Simple repairs (patch and seal)'
    ],
    cons: [
      'Least premium appearance',
      'Requires seal-coating every 2–3 years',
      'Softens in extreme heat',
      'Cracks over time (especially with tree roots)',
      'Not permeable — needs drainage plan'
    ],
    maintenance: 'Seal-coat every 2–3 years ($0.15–0.25/sf). Crack fill annually. Full resurfacing at 15–20 years.',
    bestFor: 'Budget-conscious approach. Drive lanes. Functional areas not visible from street.',
    drainageRating: 'Poor (impervious — needs drainage swales or catch basins)',
    hamptonsFit: 'Common but not premium — fine for drive lanes, less ideal for visible court'
  },

  gravel: {
    id: 'gravel',
    name: 'Crushed Stone / Pea Gravel',
    shortName: 'Gravel',
    costPerSqFt: { low: 4, high: 10 },
    color: '#c9bfaf',
    patternColor: '#b0a696',
    installTime: '2–4 days for court',
    lifespan: 'Indefinite (add material as needed)',
    pros: [
      'Lowest cost option',
      'Fully permeable — excellent drainage',
      'Natural, casual Hamptons aesthetic',
      'No cracking or heaving',
      'Environmentally friendly'
    ],
    cons: [
      'Requires periodic regrading (1–2x/year)',
      'Stones migrate — needs edging/borders',
      'Difficult to shovel snow',
      'Dusty in dry weather',
      'Not wheelchair/stroller friendly'
    ],
    maintenance: 'Regrade 1–2x/year ($200–400). Add fresh material every 2–3 years. Weed barrier underneath.',
    bestFor: 'Casual/country aesthetic. Drive lanes. Budget-first approach.',
    drainageRating: 'Excellent (fully permeable)',
    hamptonsFit: 'Good — casual East End feel, common for country lanes and secondary drives'
  }
};

const MATERIAL_ORDER = ['belgianBlock', 'pavers', 'asphalt', 'gravel'];
