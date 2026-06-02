export type ProgressEntry = {
  date: string;
  note: string;
  image?: string;
};

export type ProjectData = {
  index: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  year: string;
  status: "active" | "completed";
  highlight: string;
  summary: string;
  brief: string;
  image: string;
  plans: { label: string; image: string }[];
  renders: { label: string; image: string; isVideo?: boolean }[];
  progress: ProgressEntry[];
  amenities: string[];
  /** Grouped amenities (e.g. Community, Lifestyle, Interior) — replaces flat grid when set */
  amenitySections?: { title: string; items: string[] }[];
  locationMap: string;

  // New fields for Sydney Oaks dedicated page
  name?: string;
  priceText?: string;
  statusBadge?: "Ready to Move" | "Ongoing" | "Coming Soon" | "Completed";
  tagline?: string;
  reraNumber?: string;
  possessionDate?: string;
  projectArea?: string;
  totalUnits?: string;
  priceRange?: string;
  propertyType?: string;
  highlightsList?: string[];
  sitePlanPdfUrl?: string;
  floorPlansPdfUrl?: string;
  masterPlanComponents?: { name: string; desc: string }[];
  floorPlansDetails?: {
    name: string;
    /** Series letter shown on plan cards (e.g. A, B, E) */
    seriesLetter?: string;
    image: string;
    /** Additional plan sheets (first floor, second floor, terrace, options) */
    views?: { label: string; image?: string; video?: string }[];
    bedrooms: number;
    bathrooms: number;
    parking: number;
    area: number;
    price: string;
    emi: string;
    availability: "Available" | "Sold Out" | "Coming Soon";
    virtualTourUrl: string;
  }[];
  unitsList?: {
    id: string;
    name: string;
    bhk: number;
    area: number;
    facing: string;
    price: string;
    availability: "Available" | "Booking Open" | "Sold Out";
    image: string;
  }[];
  nearbyPlaces?: {
    category: "Schools" | "Hospitals" | "Metro" | "Airport" | "Shopping" | "Tech Parks";
    name: string;
    distance: string;
    time: string;
  }[];
  locationSectionLabel?: string;
  locationHeadline?: string;
  locationPlaceGroups?: {
    title: string;
    places: { name: string; distance?: string }[];
  }[];
  faqsList?: {
    question: string;
    answer: string;
  }[];
  testimonialsList?: {
    name: string;
    review: string;
    rating: number;
    image: string;
  }[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  overviewParagraphs?: string[];
  overviewSectionLabel?: string;
  overviewHeadline?: string;
  overviewKeynote?: string;
  highlightCriteria?: { title: string; desc: string }[];
  locationConnectivityBlurb?: string;
  sitePlanSvg?: string;
  configurationLabel?: string;
  keyAdvantages?: { title: string; description: string }[];
  keyAdvantagesSectionLabel?: string;
  keyAdvantagesHeadline?: string;
  /** Hero-only copy; other sections keep using summary/brief until updated */
  heroDescription?: string;
  heroKeySpecs?: string[];
  heroLocationLabel?: string;
  heroHideStatusBadge?: boolean;
  heroCtaSecondary?: string;
  /** Floating accent frames layered over the hero image */
  heroAccentImages?: { src: string; alt: string; caption?: string }[];
  /** Hero main image fit — use contain for site plans and diagrams */
  heroImageObjectFit?: "cover" | "contain";
  /** Phased project development timeline (dedicated project pages) */
  developmentTimeline?: {
    sectionLabel?: string;
    headline?: string;
    description?: string;
    phases: {
      title: string;
      items: string[];
    }[];
  };
  /** Premium map section with nearby attractions (dedicated project pages) */
  locationNearbySection?: {
    sectionLabel: string;
    headline: string;
    headlineEmphasis?: string;
    description: string;
    googleMapsUrl: string;
    highlightRadius?: number;
    nearbyLocations: {
      name: string;
      distance: string;
      time?: string;
      category?: string;
      coordinates?: { lat: number; lng: number };
    }[];
  };
  /** Cloudinary-hosted model walkthrough videos (dedicated project pages) */
  modelWalkthroughVideos?: {
    modelName: string;
    label: string;
    cloudinaryPublicId: string;
  }[];
};

export const DEDICATED_PROJECT_SLUGS = [
  "sydney-oaks",
  "elysian-gates",
  "hanover-park-at-stockbridge",
] as const;
export type DedicatedProjectSlug = (typeof DEDICATED_PROJECT_SLUGS)[number];

export function isDedicatedProjectSlug(slug: string): slug is DedicatedProjectSlug {
  return (DEDICATED_PROJECT_SLUGS as readonly string[]).includes(slug);
}

export const allProjects: ProjectData[] = [
  {
    index: "01",
    slug: "shree-vistaa",
    title: "Shree Vistaa",
    location: "Prime Residential Enclave",
    type: "Premium Villas",
    year: "Now Selling",
    status: "active",
    highlight: "48 custom homes with private garden setbacks and 40-ft internal roads",
    summary:
      "A calm, gated address planned around generous internal roads, garden edges, and homes that feel private without feeling closed off.",
    brief:
      "Shree Vistaa is our flagship villa community — a gated 12-acre enclave featuring 48 individually designed homes with private garden setbacks, 40-ft landscaped internal roads, and a curated amenity cluster at its heart. Every home is oriented to maximize natural light and cross-ventilation, with Vastu-compliant layouts and premium-grade construction. The community includes a clubhouse, children's play zone, landscaped walking paths, and 24/7 security infrastructure. RERA registered and bank-loan approved.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
    plans: [
      { label: "Master Site Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "3-Bedroom Floor Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "4-Bedroom Duplex Plan", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Clubhouse 3D Walkthrough", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
      { label: "Street-View Renders", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
      { label: "Aerial Drone Video", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "Apr 2026", note: "Phase 1 foundation complete — 18 villas", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
      { date: "Mar 2026", note: "Boundary wall and gate house finished", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" },
      { date: "Jan 2026", note: "Earth-leveling and soil testing completed" },
      { date: "Nov 2025", note: "RERA registration approved — sales opened" },
    ],
    amenities: ["Gated Community", "Clubhouse", "Children's Play Area", "Landscaped Gardens", "24/7 Security", "Vastu Compliant"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "02",
    slug: "shree-greens",
    title: "Shree Greens",
    location: "Nature-Led Living",
    type: "Homesite Community",
    year: "Limited Release",
    status: "active",
    highlight: "72 open homesites with underground utilities and tree-lined avenues",
    summary:
      "Open homesites, thoughtful services, and a quieter streetscape for families planning their own long-term home.",
    brief:
      "Shree Greens offers 72 open residential homesites in a nature-forward community. Underground utilities ensure clean streetscapes, while tree-lined avenues and central greens create a park-like setting. Infrastructure includes storm-water drainage, street lighting, and dedicated utility corridors. Ideal for families who want to design their own home on a trusted, fully-serviced platform.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Site Layout Map", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "Infrastructure Blueprint", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "Landscape Plan", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Community Entrance Render", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80" },
      { label: "Park Area Visualization", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80" },
    ],
    progress: [
      { date: "Apr 2026", note: "Road asphalting 80% done", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
      { date: "Feb 2026", note: "Water supply and drainage network laid" },
      { date: "Dec 2025", note: "Homesite demarcation and boundary stones placed" },
    ],
    amenities: ["Underground Utilities", "Tree-lined Avenues", "Central Park", "Storm Water Drainage", "Street Lighting"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "03",
    slug: "shree-skyline",
    title: "Shree Skyline",
    location: "Connected Urban Address",
    type: "Apartments",
    year: "Underway",
    status: "active",
    highlight: "14-storey tower with sky lounge and EV-ready basement parking",
    summary:
      "A composed vertical community with daily conveniences close at hand and a restrained material palette throughout.",
    brief:
      "Shree Skyline is a 14-storey residential tower in the city's most connected corridor. Features include a rooftop sky lounge, EV-ready basement parking, rainwater harvesting, and a landscaped podium deck. Home options range from compact 2-bedroom residences to premium 3-bedroom corners and a signature penthouse. Designed for urban professionals who want convenience without compromising on quality of living.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Tower Floor Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "2-Bedroom Layout", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "3-Bedroom Layout", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
      { label: "Penthouse Plan", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Elevation Night View", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80" },
      { label: "Lobby Interior 3D", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80" },
      { label: "Amenity Deck Video", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "Apr 2026", note: "Structural work reached 9th floor", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" },
      { date: "Jan 2026", note: "RERA registration approved" },
      { date: "Oct 2025", note: "Pile foundation and basement slab complete" },
    ],
    amenities: ["Sky Lounge", "EV-Ready Parking", "Rainwater Harvesting", "Landscaped Podium", "24/7 Security", "High-speed Elevators"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "04",
    slug: "shree-serenity",
    title: "Shree Serenity",
    location: "Family-Focused Neighborhood",
    type: "Row Homes",
    year: "Completed",
    status: "completed",
    highlight: "36 row homes delivered on-time with zero structural defects",
    summary:
      "Efficient planning, warm finishes, and a community scale that keeps everyday life comfortable and easy to manage.",
    brief:
      "Shree Serenity is a completed community of 36 row homes designed for middle-income families. Every unit features efficient floor plans, warm interior finishes, dedicated parking, and shared green spaces. The project was delivered on schedule with zero structural defect claims — a testament to our construction standards and material sourcing discipline.",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Site Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "Row Home Floor Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "Parking Layout", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Completed Exterior Photos", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
      { label: "Interior Walkthrough Video", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "Dec 2024", note: "All 36 units handed over to owners", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
      { date: "Sep 2024", note: "Landscaping and common areas finished" },
      { date: "Jun 2024", note: "Interior finishing and quality audit completed" },
    ],
    amenities: ["Shared Green Spaces", "Dedicated Parking", "24/7 Water Supply", "Street Lighting", "Gated Entry"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "05",
    slug: "shree-aangan",
    title: "Shree Aangan",
    location: "Heritage-Inspired Township",
    type: "Independent Floors",
    year: "Completed",
    status: "completed",
    highlight: "Courtyard-centric design with Vastu-compliant orientation",
    summary:
      "Courtyard-style residences that draw from traditional planning principles while offering contemporary amenities and spacious interiors.",
    brief:
      "Shree Aangan is a heritage-inspired township where every cluster of independent floors is arranged around a shared courtyard. Vastu-compliant orientations, generous ceiling heights, and traditional jaali work on facades give the community a distinctive identity. Modern amenities include a community hall, jogging track, and senior citizen garden.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Township Master Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "First Floor Layout", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "Second Floor Layout", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Courtyard Render", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80" },
      { label: "Evening Aerial View", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" },
    ],
    progress: [
      { date: "Jun 2023", note: "Phase 2 occupancy certificates issued" },
      { date: "Mar 2023", note: "Community hall inauguration" },
      { date: "Dec 2022", note: "Final handover of Phase 1 units" },
    ],
    amenities: ["Central Courtyard", "Community Hall", "Jogging Track", "Senior Citizen Garden", "Vastu Orientation"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "06",
    slug: "shree-orchid",
    title: "Shree Orchid",
    location: "Garden-View Residences",
    type: "Premium Apartments",
    year: "Completed",
    status: "completed",
    highlight: "Every unit faces central landscaped greens — no blind walls",
    summary:
      "Every unit is oriented toward landscaped greens, with clean architectural lines and a considered approach to shared amenity spaces.",
    brief:
      "Shree Orchid was designed with a single principle: no unit should face a blind wall. Every apartment opens to the central landscaped courtyard or perimeter greens. The building features clean contemporary lines, a rooftop terrace, swimming pool, gym, and a double-height lobby. Completed and fully occupied.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Block Layout Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "2-Bedroom Garden Home", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "3-Bedroom Corner Home", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Garden Courtyard Render", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
      { label: "Swimming Pool Area", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80" },
    ],
    progress: [
      { date: "Nov 2022", note: "100% units occupied" },
      { date: "Aug 2022", note: "Final coat painting and handover prep" },
      { date: "May 2022", note: "Pool and gym facility commissioning" },
    ],
    amenities: ["Swimming Pool", "Rooftop Terrace", "Gymnasium", "Double-height Lobby", "Landscaped Courtyard"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "07",
    slug: "shree-haven",
    title: "Shree Haven",
    location: "Suburban Retreat",
    type: "Luxury Villas",
    year: "Completed",
    status: "completed",
    highlight: "Homes from 2,400–3,600 sq ft with mature neem and banyan landscaping",
    summary:
      "Generous home sizes, mature landscaping, and a gated perimeter that creates a sense of seclusion minutes from everyday conveniences.",
    brief:
      "Shree Haven is a completed luxury villa community set across 8 acres of mature landscaping. Homes range from 2,400 to 3,600 sq ft, with existing neem and banyan trees preserved within the layout. The gated community features a clubhouse, swimming pool, multi-purpose court, and 24/7 manned security. Every villa enjoys a private garden and covered car park.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Gated Community Layout", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "Villa Type A Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "Villa Type B Plan", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Gate House Render", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80" },
      { label: "Drone Flyover Video", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "Apr 2021", note: "All villas delivered — community fully occupied" },
      { date: "Jan 2021", note: "Club and pool facility opened" },
      { date: "Oct 2020", note: "Landscaping and common area handover" },
    ],
    amenities: ["Clubhouse", "Swimming Pool", "Multi-purpose Court", "Manned Security", "Mature Landscaping"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "08",
    slug: "shree-horizon",
    title: "Shree Horizon",
    location: "Mixed-Use Development",
    type: "Commercial & Residential",
    year: "Completed",
    status: "completed",
    highlight: "Ground + 3 commercial floors with 8 floors of residences above",
    summary:
      "A landmark mixed-use address combining retail convenience with elevated residential living across a thoughtfully phased master plan.",
    brief:
      "Shree Horizon is a mixed-use landmark featuring 3 floors of commercial retail space topped by 8 floors of residential apartments. The commercial podium includes anchor-ready retail bays, food court spaces, and office suites. Residential floors above offer panoramic views, dedicated lobby access, and separation from commercial traffic. Fully completed with 90% retail occupancy at launch.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Mixed-Use Site Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "Retail Floor Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "Residential Tower Plan", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Street-Level Commercial Render", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80" },
      { label: "Rooftop Terrace Video", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "Sep 2020", note: "Retail spaces 90% leased at launch" },
      { date: "Jun 2020", note: "Completion certificate received" },
      { date: "Mar 2020", note: "Residential floors handed over" },
    ],
    amenities: ["Retail Podium", "Food Court", "Sky Terrace", "Separate Residential Entry", "Elevated Living"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "09",
    slug: "elysian-gates",
    title: "Elysian Gates",
    location: "Suwanee, GA",
    type: "Gated Enclave",
    year: "Ongoing",
    status: "active",
    highlight: "Exclusive gated living featuring 5-bedroom estate homes on 44 private acres in Suwanee",
    summary:
      "A private, high-performance enclave in Suwanee where architectural precision meets the quiet seclusion of North Georgia's wooded landscape.",
    brief:
      "Elysian Gates is a premiere gated enclave in Suwanee, GA — 44 acres with just 28 estate homes. Designed for those who seek architectural performance and natural seclusion, each residence offers 5-bedroom layouts with expansive wooded backyards and a level of privacy rarely found in modern developments.",
    image: "/images/elysian-gates/hero.jpg",
    heroImageObjectFit: "cover",
    plans: [
      { label: "Community Layout", image: "/images/elysian-gates/master-plan.jpg" },
      { label: "Jamestown Floor Plan", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-gf-floor-layout.png" },
    ],
    renders: [
      { label: "Jamestown Estate Render", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-option-a--1-.png" },
      { label: "Vicksburg Estate Render", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-option-a--1.png" },
    ],
    progress: [],
    amenities: [],
    amenitySections: [
      {
        title: "Community Amenities",
        items: [
          "Gated 44-acre private enclave",
          "Pickleball courts",
          "Community gazebo",
          "Walking trails throughout",
          "Wooded backyard setbacks",
        ],
      },
      {
        title: "Lifestyle & Recreation",
        items: [
          "Lambert High School district",
          "Halcyon & Avalon nearby",
          "Northside Hospital Forsyth access",
          "Private trail connectivity",
          "Suwanee Town Center proximity",
        ],
      },
      {
        title: "Interior Features",
        items: [
          "5-bedroom estate layouts",
          "Expansive double-height spaces",
          "Premium stonework and masonry",
          "High-efficiency HVAC systems",
          "Award-winning architectural design",
        ],
      },
      {
        title: "Kitchen Features",
        items: [
          "Chef-inspired kitchen layouts",
          "Quartz and stone countertops",
          "Premium appliance packages",
          "Large islands with seating",
          "Butler's pantry options",
        ],
      },
      {
        title: "Energy Efficient Features",
        items: [
          "High-efficiency insulation",
          "Low-E insulated windows",
          "Programmable thermostats",
          "Eco-conscious construction standards",
          "Natural daylight optimization",
        ],
      },
    ],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
    developmentTimeline: {
      sectionLabel: "Development Timeline",
      headline: "Project development timeline",
      description:
        "The phased development approach ensures premium construction quality, controlled execution standards, and a refined luxury community outcome.",
      phases: [
        {
          title: "Phase I",
          items: [
            "Land preparation and infrastructure development",
            "Civil engineering and utility coordination",
            "Road and site development works",
          ],
        },
        {
          title: "Phase II",
          items: [
            "Vertical home construction",
            "Architectural finishing and landscape execution",
            "Final stabilization and homeowner delivery process",
          ],
        },
      ],
    },
    name: "Elysian Gates",
    priceText: "From $1.3M",
    statusBadge: "Ongoing",
    tagline: "Where Quiet Luxury Meets Wooded Seclusion",
    reraNumber: "RERA-GA-7841",
    possessionDate: "Q2 2027",
    projectArea: "44 Acres",
    totalUnits: "28 Estate Homes",
    priceRange: "$1.3M - $2M",
    propertyType: "Luxury Estate Homes",
    sitePlanPdfUrl: "/pdfs/site-plan.pdf",
    floorPlansPdfUrl: "/pdfs/aspen-plan-set.pdf",
    sitePlanSvg: "/images/elysian-gates/master-plan.jpg",
    configurationLabel: "5 Bedrooms",
    heroDescription:
      "A gated Suwanee enclave on 44 acres with 28 estate homes — zoned for Lambert High School, ranked among the top 10 high schools in the nation.",
    heroLocationLabel: "Suwanee, GA",
    heroHideStatusBadge: true,
    heroKeySpecs: [
      "44-acre gated enclave",
      "28 estate homes",
      "5-bedroom layouts",
      "$1.3M – $2M",
      "Zoned for Lambert High School",
    ],
    heroCtaSecondary: "Schedule a Visit",
    heroAccentImages: [
      {
        src: "/images/elysian-gates/accents/accent-jamestown.png",
        alt: "Jamestown estate exterior render",
        caption: "Jamestown",
      },
      {
        src: "/images/elysian-gates/accents/accent-vicksburg.png",
        alt: "Vicksburg estate exterior render",
        caption: "Vicksburg",
      },
      {
        src: "/images/elysian-gates/accents/accent-mcallister.png",
        alt: "McAllister estate exterior render",
        caption: "McAllister",
      },
    ],
    overviewSectionLabel: "Community Overview",
    overviewParagraphs: [
      "Elysian Gates is conceived as a private sanctuary for families seeking architectural performance and natural seclusion in Suwanee, GA. Spanning 44 acres with just 28 estate homes, each residence leverages high-efficiency systems, premium stonework, and expansive glazing that frames the protected wooded backdrop.",
      "Each home is positioned to capture optimal ventilation and daylight throughout the seasons, ensuring comfortable living and bright gathering spaces. Zoned for Lambert High School — consistently ranked among the top 10 high schools in the nation — residents enjoy pickleball courts, a community gazebo, and walking trails within a fully gated enclave.",
    ],
    highlightCriteria: [
      {
        title: "Lambert High School",
        desc: "Zoned for Lambert High School — consistently ranked among the top 10 high schools in the nation.",
      },
      {
        title: "Healthcare Integration",
        desc: "Under 12 minutes from Northside Hospital Forsyth, providing premium regional care.",
      },
      {
        title: "North Metro Connectivity",
        desc: "Quick commutes to Halcyon, Avalon, and GA-400 business corridors.",
      },
      {
        title: "Wooded Trail Access",
        desc: "The gated layout adjoins private paths into preserved hardwood corridors and community greens.",
      },
    ],
    locationSectionLabel: "Location Advantages",
    locationHeadline: "Prime connectivity in Suwanee",
    locationConnectivityBlurb:
      "Positioned in Suwanee's premier residential corridors, Elysian Gates is zoned exclusively for Lambert High School — one of the top 10 high schools in the nation.",
    locationPlaceGroups: [
      {
        title: "School District",
        places: [
          {
            name: "Lambert High School",
            distance: "3.1 miles — Top 10 nationally",
          },
        ],
      },
      {
        title: "Healthcare Access",
        places: [{ name: "Northside Hospital Forsyth", distance: "5.4 miles" }],
      },
      {
        title: "Shopping & Dining",
        places: [{ name: "Halcyon & Avalon", distance: "7.8 miles" }],
      },
    ],
    locationNearbySection: {
      sectionLabel: "Location & Schools",
      headline: "Zoned for",
      headlineEmphasis: "Lambert High",
      description:
        "Elysian Gates is zoned for Lambert High School — consistently ranked among the top 10 high schools in the nation — in the heart of Suwanee.",
      googleMapsUrl: "https://maps.google.com/?q=Suwanee+GA",
      highlightRadius: 420,
      nearbyLocations: [
        {
          name: "Lambert High School",
          distance: "3.1 mi",
          time: "7 min",
          category: "school",
          coordinates: { lat: 34.0629, lng: -84.0897 },
        },
      ],
    },
    keyAdvantagesSectionLabel: "Why Choose This Project",
    keyAdvantagesHeadline: "Why Elysian Gates?",
    keyAdvantages: [
      {
        title: "Premium Location",
        description:
          "Suwanee address with quick access to walking trails, Lambert High School, healthcare, and daily essentials.",
      },
      {
        title: "Smart Planning",
        description:
          "Low-density planning, open layouts, efficient systems, and a design language built for long-term comfort.",
      },
      {
        title: "High Appreciation",
        description:
          "Positioned in a growing residential corridor with strong demand for estate-focused communities.",
      },
      {
        title: "Trusted Developer",
        description:
          "Delivered by Shree Developers Group with transparent documentation and responsive site support.",
      },
    ],
    highlightsList: [
      "Expansive wooded backyard retreats bordering natural corridors",
      "Pickleball courts, gazebo, and walking trails within the gated community",
      "High-efficiency HVAC and eco-conscious construction standards",
      "5-bedroom open-concept estate floor plans designed by award-winning architects",
    ],
    floorPlansDetails: [
      {
        name: "Jamestown",
        seriesLetter: "J",
        image: "/images/elysian-gates/floor-plans/jamestown/jamestown-gf-floor-layout.png",
        views: [
          { label: "First Floor", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-gf-floor-layout.png" },
          { label: "Second Floor", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-ff-floor-layout.jpg" },
          { label: "First Floor Aerial", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-gf-aerial--view.jpg" },
          { label: "Second Floor Aerial", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-ff-aerial--view.jpg" },
          { label: "First Floor Top View", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-gf-top--view.jpg" },
          { label: "Second Floor Top View", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-ff-top--view.jpg" },
          { label: "Option A — Front", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-option-a--1-.png" },
          { label: "Option A — Rear", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-option-a--2.png" },
          { label: "Option B — Front", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-option-b--1-.png" },
          { label: "Option B — Rear", image: "/images/elysian-gates/floor-plans/jamestown/jamestown-option-b--2.png" },
          { label: "Walkthrough", video: "elysian-gates/jamestown-preview" },
        ],
        bedrooms: 5,
        bathrooms: 4.5,
        parking: 3,
        area: 4000,
        price: "$1,300,000",
        emi: "$6,750/mo",
        availability: "Available",
        virtualTourUrl: "elysian-gates/jamestown-preview",
      },
      {
        name: "Vicksburg",
        seriesLetter: "V",
        image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-gf-floor-layout.jpg",
        views: [
          { label: "First Floor", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-gf-floor-layout.jpg" },
          { label: "Second Floor", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-ff-floor-layout.png" },
          { label: "First Floor Aerial", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-gf-aerial-view.jpg" },
          { label: "Second Floor Aerial", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-ff-aerial-view.jpg" },
          { label: "First Floor Top View", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-gf-top-view.jpg" },
          { label: "Second Floor Top View", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-ff-top-view.jpg" },
          { label: "Option A — Front", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-option-a--1.png" },
          { label: "Option A — Rear", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-option-a--2.png" },
          { label: "Option B — Front", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-option-b---1.png" },
          { label: "Option B — Rear", image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-option-b---2.png" },
          { label: "Walkthrough", video: "elysian-gates/vicksburg-foyer-walkthrough" },
        ],
        bedrooms: 5,
        bathrooms: 4.5,
        parking: 3,
        area: 4200,
        price: "$1,650,000",
        emi: "$8,575/mo",
        availability: "Available",
        virtualTourUrl: "elysian-gates/vicksburg-foyer-walkthrough",
      },
      {
        name: "McAllister",
        seriesLetter: "M",
        image: "/images/elysian-gates/floor-plans/mcallister/gf-floor-layout.jpg",
        views: [
          { label: "First Floor", image: "/images/elysian-gates/floor-plans/mcallister/gf-floor-layout.jpg" },
          { label: "Second Floor", image: "/images/elysian-gates/floor-plans/mcallister/mcallister-ff-floor-plan.jpg" },
          { label: "First Floor Aerial", image: "/images/elysian-gates/floor-plans/mcallister/mcallister--gf-arial-view.jpg" },
          { label: "Second Floor Aerial", image: "/images/elysian-gates/floor-plans/mcallister/mcallister--ff-arial-view.jpg" },
          { label: "First Floor Top View", image: "/images/elysian-gates/floor-plans/mcallister/mcallister--gf-top-view.jpg" },
          { label: "Second Floor Top View", image: "/images/elysian-gates/floor-plans/mcallister/mcallister--ff-top-view.jpg" },
          { label: "Option A — White Front", image: "/images/elysian-gates/floor-plans/mcallister/mcallister-option-a---white-1.png" },
          { label: "Option A — White Rear", image: "/images/elysian-gates/floor-plans/mcallister/mcallister-option-a---white-2.png" },
          { label: "Option A — Brick Front", image: "/images/elysian-gates/floor-plans/mcallister/mcallister-option-a---non-white-1.png" },
          { label: "Option A — Brick Rear", image: "/images/elysian-gates/floor-plans/mcallister/mcallister-option-a---non-white-2.png" },
          { label: "Option B — White Front", image: "/images/elysian-gates/floor-plans/mcallister/mcallister-option-b----white-1.png" },
          { label: "Option B — White Rear", image: "/images/elysian-gates/floor-plans/mcallister/mcallister-option-b----white-2.png" },
          { label: "Walkthrough", video: "elysian-gates/mcallister-foyer-walkthrough" },
        ],
        bedrooms: 5,
        bathrooms: 5.5,
        parking: 3,
        area: 5000,
        price: "$2,000,000",
        emi: "$10,400/mo",
        availability: "Coming Soon",
        virtualTourUrl: "elysian-gates/mcallister-foyer-walkthrough",
      },
    ],
    modelWalkthroughVideos: [
      {
        modelName: "Jamestown",
        label: "Exterior & option preview",
        cloudinaryPublicId: "elysian-gates/jamestown-preview",
      },
      {
        modelName: "Vicksburg",
        label: "Foyer roaming walkthrough",
        cloudinaryPublicId: "elysian-gates/vicksburg-foyer-walkthrough",
      },
      {
        modelName: "McAllister",
        label: "Foyer roaming walkthrough",
        cloudinaryPublicId: "elysian-gates/mcallister-foyer-walkthrough",
      },
    ],
    unitsList: [
      {
        id: "Lot 08",
        name: "Jamestown (Lot 08)",
        bhk: 5,
        area: 4000,
        facing: "East-Facing",
        price: "$1,300,000",
        availability: "Available",
        image: "/images/elysian-gates/floor-plans/jamestown/jamestown-option-a--1-.png",
      },
      {
        id: "Lot 19",
        name: "Vicksburg (Lot 19)",
        bhk: 5,
        area: 4200,
        facing: "North-Facing",
        price: "$1,650,000",
        availability: "Booking Open",
        image: "/images/elysian-gates/floor-plans/vicksburg/vicksburg-option-a--1.png",
      },
      {
        id: "Lot 03",
        name: "McAllister (Lot 03)",
        bhk: 5,
        area: 5000,
        facing: "West-Facing",
        price: "$2,000,000",
        availability: "Available",
        image: "/images/elysian-gates/floor-plans/mcallister/mcallister-option-a---white-1.png",
      },
      {
        id: "Lot 14",
        name: "Jamestown (Lot 14)",
        bhk: 5,
        area: 4000,
        facing: "South-Facing",
        price: "$1,350,000",
        availability: "Sold Out",
        image: "/images/elysian-gates/floor-plans/jamestown/jamestown-option-b--1-.png",
      },
    ],
    nearbyPlaces: [
      { category: "Hospitals", name: "Northside Hospital Forsyth", distance: "5.4 miles", time: "11 min" },
      { category: "Metro", name: "MARTA Station - North Springs", distance: "18 miles", time: "26 min" },
      { category: "Shopping", name: "Halcyon & Avalon", distance: "7.8 miles", time: "14 min" },
      { category: "Tech Parks", name: "Cumming Tech Corridor", distance: "6.3 miles", time: "11 min" },
    ],
    faqsList: [
      {
        question: "What is the expected completion date of Elysian Gates?",
        answer: "Phase 1 handovers are scheduled to begin in June 2027, with the final phase of estate homes concluding by December 2027.",
      },
      {
        question: "Are home loans approved for this project?",
        answer: "Yes, Elysian Gates is fully approved for construction finance and home loans by major national and regional banking institutions.",
      },
      {
        question: "What is the booking and reservation process?",
        answer: "You can reserve a homesite or completed estate layout with an initial refundable reservation deposit of $7,500, followed by a 10% builder contract signing within 15 days.",
      },
      {
        question: "What are the monthly maintenance charges?",
        answer: "Maintenance is estimated at $165/month, covering common park landscaping, road paving care, gazebo and trail upkeep, and 24/7 security guard services.",
      },
      {
        question: "Are all legal approvals and RERA clearances in place?",
        answer: "Yes, the development holds a verified clear title deed and is registered under state housing regulatory authority (RERA Ref: RERA-GA-7841).",
      },
      {
        question: "What high school is Elysian Gates zoned for?",
        answer: "Elysian Gates is zoned for Lambert High School — consistently ranked among the top 10 high schools in the nation.",
      },
      {
        question: "What community amenities are included?",
        answer: "Ownership includes access to pickleball courts, a community gazebo, and walking trails throughout the 44-acre gated enclave.",
      },
    ],
    testimonialsList: [
      {
        name: "Rachel & James Whitmore",
        review: "The estate architecture and wooded setbacks are exactly what we wanted. Lambert High School and the walking trails made Elysian Gates an easy choice for our family.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Daniel Okonkwo",
        review: "Spacious layouts with high-performance insulation. The site team has been transparent through foundation and framing inspections.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Dr. Priya Nair",
        review: "Quiet, private, yet minutes from Lambert High School and Suwanee's best dining and shopping. Outstanding planning for long-term family living.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      },
    ],
    coordinates: { lat: 34.0515, lng: -84.0713 },
  },
  {
    index: "10",
    slug: "sydney-oaks",
    title: "Sydney Oaks",
    location: "Cumming, GA",
    type: "89 Town Homes",
    year: "Ongoing",
    status: "active",
    highlight: "22-acre mixed-use community with townhomes, retail, and office space in Cumming",
    summary: "A 22-acre mixed-use community in Cumming featuring 89 townhomes, 21,000 sq. ft. of retail, and 24,000 sq. ft. of office space.",
    brief: "Sydney Oaks is a 22-acre mixed-use community in Cumming, Georgia, featuring 89 townhomes alongside 21,000 sq. ft. of retail and 24,000 sq. ft. of office space. Designed for connected living, the development combines residential comfort with walkable retail, office, and green spaces for long-term value.",
    image: "/images/sydney-oaks-hero.png",
    plans: [
      { label: "Community Layout", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "4-Bedroom Townhome Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Street View Render", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
      { label: "Interior Walkthrough Video", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "Apr 2026", note: "Paving of Oak Ridge Trail completed", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
      { date: "Jan 2026", note: "Underground utility lines installed" },
    ],
    amenities: [],
    amenitySections: [
      {
        title: "Community Amenities",
        items: [
          "HOA maintained landscaping and exterior maintenance",
          "Parks and green open spaces",
          "Professionally landscaped common areas",
          "Double sidewalks and walkable streets",
          "Integrated retail and dining spaces",
        ],
      },
      {
        title: "Lifestyle & Recreation",
        items: [
          "Nearby recreation centers",
          "Aquatic center access",
          "Mountain trails and nature connectivity",
          "Lake Lanier nearby",
          "Entertainment and shopping districts within minutes",
        ],
      },
      {
        title: "Interior Features",
        items: [
          "Curated lighting packages",
          "Ceiling fans in family room and owner's suite",
          "Crown molding and upgraded interior finishes",
          "Flex room and bonus room options",
          "Structured CAT6 wiring",
        ],
      },
      {
        title: "Kitchen Features",
        items: [
          "Quartz countertops",
          "Stainless steel appliances",
          "Soft-close upper cabinets",
          "Kitchen island pendant lighting",
          "Energy-efficient LED fixtures",
        ],
      },
      {
        title: "Energy Efficient Features",
        items: [
          "ENERGY STAR HVAC systems",
          "Programmable thermostats",
          "Low-E insulated windows",
          "Weather-resistant house wrap",
          "High-efficiency insulation systems",
        ],
      },
    ],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",

    // New Fields
    name: "Sydney Oaks",
    priceText: "From low $400s",
    statusBadge: "Ongoing",
    tagline: "Luxury Mixed-Use Townhome Community in Cumming, Georgia",
    heroDescription:
      "A 22-acre mixed-use community in Cumming featuring 89 townhomes, 21,000 sq. ft. of retail, and 24,000 sq. ft. of office space — designed for connected living with walkable streets, green landscapes, and long-term value.",
    heroLocationLabel: "Cumming, GA",
    heroHideStatusBadge: true,
    heroKeySpecs: [
      "22-acre master-planned community",
      "89 townhomes",
      "3–4 bedroom townhome plans",
      "21,000 sq. ft. retail space",
      "24,000 sq. ft. office space",
      "Starting from the low $400s",
    ],
    heroCtaSecondary: "Schedule a Visit",
    heroAccentImages: [
      {
        src: "/images/sydney-oaks-accent-01.png",
        alt: "Sydney Oaks streetscape render",
        caption: "Streetscape",
      },
      {
        src: "/images/sydney-oaks-accent-02.png",
        alt: "Sydney Oaks community aerial view",
        caption: "Community",
      },
      {
        src: "/images/sydney-oaks-accent-03.png",
        alt: "Sydney Oaks townhome exterior",
        caption: "Townhome",
      },
    ],
    reraNumber: "RERA-GA-8923",
    possessionDate: "Q4 2026",
    projectArea: "22 Acres",
    totalUnits: "89 Townhomes",
    priceRange: "From low $400s",
    propertyType: "Townhomes",
    sitePlanPdfUrl: "/pdfs/site-plan.pdf",
    floorPlansPdfUrl: "/pdfs/aspen-plan-set.pdf",
    sitePlanSvg: "/svg/siteMap-final.svg",
    configurationLabel: "3–4 Bedrooms",
    overviewSectionLabel: "Community Overview",
    overviewParagraphs: [
      "Sydney Oaks is a thoughtfully planned 22-acre mixed-use community in Cumming, Georgia, designed to create a balanced lifestyle where residents can truly live, work, and play within one connected environment. The development offers 89 townhomes alongside 21,000 sq. ft. of retail and 24,000 sq. ft. of office space, with walkable streets, parks, and recreational zones. The community focuses on modern family living with professionally landscaped surroundings, green spaces, pedestrian-friendly streets, and convenient access to schools, healthcare, shopping, and entertainment.",
    ],
    highlightCriteria: [],
    locationSectionLabel: "Location Advantages",
    locationHeadline: "Prime connectivity in Cumming",
    locationConnectivityBlurb:
      "Sydney Oaks offers excellent access to schools, recreation, healthcare, dining, shopping, and daily essentials — making it highly convenient for families and professionals.",
    locationPlaceGroups: [
      {
        title: "Nearby Recreation",
        places: [
          { name: "Dobbs Creek Recreation Center", distance: "0.3 miles" },
          { name: "Sawnee Mountainside Trail", distance: "1.7 miles" },
          { name: "Lake Lanier", distance: "5.0 miles" },
        ],
      },
      {
        title: "Shopping & Grocery",
        places: [
          { name: "Walmart", distance: "4.0 miles" },
          { name: "Costco", distance: "4.0 miles" },
          { name: "Publix", distance: "3.7 miles" },
          { name: "Kroger", distance: "2.9 miles" },
        ],
      },
      {
        title: "Entertainment & Dining",
        places: [
          { name: "Cumming City Center", distance: "2.5 miles" },
          { name: "Stars & Strikes", distance: "3.8 miles" },
          { name: "Tam's Backstage", distance: "2.1 miles" },
          { name: "Community Cup", distance: "2.0 miles" },
        ],
      },
      {
        title: "Healthcare Access",
        places: [
          { name: "Northside Hospital Forsyth", distance: "4.5 miles" },
          { name: "Piedmont Urgent Care", distance: "3.7 miles" },
          { name: "Cumming Medical Center", distance: "2.9 miles" },
        ],
      },
      {
        title: "School District",
        places: [
          { name: "Cumming Elementary School" },
          { name: "Otwell Middle School" },
          { name: "Forsyth Central High School" },
          { name: "Alliance Academy for Innovation" },
        ],
      },
    ],
    coordinates: { lat: 34.2335397, lng: -84.1247657 },
    locationNearbySection: {
      sectionLabel: "Location & Nearby Attractions",
      headline: "Connected To",
      headlineEmphasis: "Everything",
      description:
        "Sydney Oaks sits in the heart of Cumming — minutes from premier shopping, top-rated schools, healthcare, and recreation. Every destination you need is within effortless reach.",
      googleMapsUrl: "https://maps.app.goo.gl/MCvxLFpoSDwBcPHn9",
      highlightRadius: 420,
      nearbyLocations: [
        {
          name: "Atlanta Airport",
          distance: "42 mi",
          time: "45 min",
          category: "airport",
          coordinates: { lat: 33.6407, lng: -84.4277 },
        },
        {
          name: "The Collection at Forsyth",
          distance: "4.2 mi",
          time: "10 min",
          category: "shopping",
          coordinates: { lat: 34.1123, lng: -84.1436 },
        },
        {
          name: "Lake Lanier",
          distance: "5.0 mi",
          time: "12 min",
          category: "recreation",
          coordinates: { lat: 34.1682, lng: -84.0373 },
        },
        {
          name: "Cumming City Center",
          distance: "2.5 mi",
          time: "8 min",
          category: "transit",
          coordinates: { lat: 34.2073, lng: -84.1402 },
        },
        {
          name: "Northside Hospital Forsyth",
          distance: "4.5 mi",
          time: "10 min",
          category: "healthcare",
          coordinates: { lat: 34.1251, lng: -84.1037 },
        },
        {
          name: "Forsyth Central High School",
          distance: "1.8 mi",
          time: "5 min",
          category: "school",
          coordinates: { lat: 34.2036, lng: -84.1412 },
        },
        {
          name: "Alliance Academy for Innovation",
          distance: "3.2 mi",
          time: "8 min",
          category: "business",
          coordinates: { lat: 34.192, lng: -84.165 },
        },
      ],
    },
    keyAdvantagesSectionLabel: "Why Choose This Project",
    keyAdvantagesHeadline: "Why Sydney Oaks?",
    keyAdvantages: [
      {
        title: "Premium Mixed-Use Planning",
        description:
          "A modern development concept that combines residential, retail, office, and recreational spaces within one integrated masterplan.",
      },
      {
        title: "Prime Cumming Location",
        description:
          "Strategically located near top-rated schools, shopping centers, healthcare facilities, and recreational destinations.",
      },
      {
        title: "Family-Friendly Community",
        description:
          "Walkable streets, landscaped surroundings, parks, and nearby educational institutions create a strong community atmosphere.",
      },
      {
        title: "High Lifestyle Convenience",
        description:
          "Everything from grocery stores to dining and entertainment is located within minutes, reducing commute time and improving daily living.",
      },
      {
        title: "Quality Construction & Design",
        description:
          "Energy-efficient systems, upgraded interiors, premium finishes, and professionally planned architecture ensure long-term comfort and value.",
      },
      {
        title: "Strong Investment Potential",
        description:
          "Forsyth County continues to grow rapidly, making Sydney Oaks an attractive opportunity for homeowners and investors alike.",
      },
    ],
    highlightsList: [
      "Wooded backyard retreats bordering natural trails",
      "Curated lifestyle amenities at our private community core",
      "High-efficiency HVAC and eco-conscious construction standards",
      "Open-concept family floor plans designed by award-winning architects"
    ],
    floorPlansDetails: [
      {
        name: "Aspen",
        seriesLetter: "A",
        image: "/images/floor-plans/aspen/first-floor.jpg",
        views: [
          { label: "First Floor", image: "/images/floor-plans/aspen/first-floor.jpg" },
          { label: "Second Floor", image: "/images/floor-plans/aspen/second-floor.jpg" },
          { label: "Terrace", image: "/images/floor-plans/aspen/terrace.jpg" },
          { label: "Optional 01", image: "/images/floor-plans/aspen/optional-01.jpg" },
          { label: "Optional 02", image: "/images/floor-plans/aspen/optional-02.jpg" },
        ],
        bedrooms: 3,
        bathrooms: 2.5,
        parking: 2,
        area: 1971,
        price: "From low $400s",
        emi: "$2,150/mo",
        availability: "Available",
        virtualTourUrl: "#tour-aspen",
      },
      {
        name: "Birch",
        seriesLetter: "B",
        image: "/images/floor-plans/birch/first-floor.jpg",
        views: [
          { label: "First Floor", image: "/images/floor-plans/birch/first-floor.jpg" },
          { label: "Second Floor", image: "/images/floor-plans/birch/second-floor.jpg" },
          { label: "Terrace", image: "/images/floor-plans/birch/terrace.jpg" },
          { label: "Optional 01", image: "/images/floor-plans/birch/optional-01.jpg" },
          { label: "Optional 02", image: "/images/floor-plans/birch/optional-02.jpg" },
        ],
        bedrooms: 4,
        bathrooms: 3.5,
        parking: 2,
        area: 2026,
        price: "From low $400s",
        emi: "$2,250/mo",
        availability: "Available",
        virtualTourUrl: "#tour-birch",
      },
      {
        name: "Elm",
        seriesLetter: "E",
        image: "/images/floor-plans/elm/first-floor.jpg",
        views: [
          { label: "First Floor", image: "/images/floor-plans/elm/first-floor.jpg" },
          { label: "Second Floor", image: "/images/floor-plans/elm/second-floor.jpg" },
          { label: "Terrace", image: "/images/floor-plans/elm/terrace.jpg" },
          { label: "Optional", image: "/images/floor-plans/elm/optional-01.jpg" },
        ],
        bedrooms: 4,
        bathrooms: 3.5,
        parking: 2,
        area: 2065,
        price: "From low $400s",
        emi: "$2,350/mo",
        availability: "Coming Soon",
        virtualTourUrl: "#tour-elm",
      },
    ],
    unitsList: [
      {
        id: "Home 12",
        name: "Home 12 — Aspen, Birch, or Elm",
        bhk: 3,
        area: 1971,
        facing: "East-Facing",
        price: "From low $400s",
        availability: "Available",
        image: "/images/floor-plans/aspen/first-floor.jpg"
      },
      {
        id: "Home 34",
        name: "Home 34 — Aspen, Birch, or Elm",
        bhk: 3,
        area: 1971,
        facing: "North-Facing",
        price: "From low $400s",
        availability: "Booking Open",
        image: "/images/floor-plans/birch/first-floor.jpg"
      },
      {
        id: "Home 05",
        name: "Home 05 — Aspen, Birch, or Elm",
        bhk: 4,
        area: 2065,
        facing: "West-Facing",
        price: "From low $400s",
        availability: "Available",
        image: "/images/floor-plans/elm/first-floor.jpg"
      },
      {
        id: "Home 21",
        name: "Home 21 — Aspen, Birch, or Elm",
        bhk: 3,
        area: 1971,
        facing: "South-Facing",
        price: "From low $400s",
        availability: "Sold Out",
        image: "/images/floor-plans/aspen/first-floor.jpg"
      }
    ],
    nearbyPlaces: [],
    faqsList: [
      {
        question: "What is the expected completion date of Sydney Oaks?",
        answer: "Phase 1 handovers are scheduled to begin in October 2026, with the final phase of townhomes concluding by April 2027."
      },
      {
        question: "Are home loans approved for this project?",
        answer: "Yes, Sydney Oaks is fully approved for construction finance and home loans by major national and regional banking institutions."
      },
      {
        question: "What is the booking and reservation process?",
        answer: "You can reserve a townhome with an initial refundable reservation deposit of $5,000, followed by a 10% builder contract signing within 15 days."
      },
      {
        question: "What are the monthly maintenance charges?",
        answer: "Maintenance is estimated at $145/month, covering common park landscaping, road paving care, clubhouse upkeep, and 24/7 security guard services."
      },
      {
        question: "Are all legal approvals and RERA clearances in place?",
        answer: "Yes, the development holds a verified clear title deed and is registered under state housing regulatory authority (RERA Ref: RERA-GA-8923)."
      },
      {
        question: "Does the booking cost cover access to all clubhouse amenities?",
        answer: "Yes, ownership includes lifetime resident membership to the swimming pool, fitness center, basketball courts, and common co-working lounges."
      }
    ],
    testimonialsList: [
      {
        name: "Sarah & David Vance",
        review: "The modern farmhouse architecture is exactly what we wanted. The integration with Gwinnett's natural trail systems was the deciding factor for our family.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Marcus Chen",
        review: "Spacious estate layouts coupled with high-performance insulation. Dealing with the site office during foundation inspection has been seamless.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Dr. Alisha Patel",
        review: "Perfect location. It is incredibly quiet and peaceful, yet I can drive to Emory Johns Creek Hospital in under ten minutes. Outstanding planning.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
      }
    ],
  },
  {
    index: "11",
    slug: "hanover-park-at-stockbridge",
    title: "Hanover Park at Stockbridge",
    location: "Stockbridge, GA",
    type: "Townhomes & Single-Family Homes",
    year: "Completed",
    status: "completed",
    highlight:
      "Resort-inspired community with clubhouse, pool, putting green, pickleball courts, and walkable neighborhood design",
    summary:
      "A walkable, resort-inspired neighborhood in Stockbridge pairing timeless architecture with wellness-focused amenities and modern comfort.",
    brief:
      "Hanover Park at Stockbridge is a modern, resort-inspired residential community focused on wellness, leisure, walkability, and connection. The master-planned neighborhood combines townhomes and single-family homes around a centralized amenity core with a resort-style pool, PopStroke-inspired putting green, pickleball courts, and an elegant clubhouse.",
    image: "/images/hanover-park/hero.png",
    plans: [
      { label: "Master Site Plan", image: "/images/hanover-park/master-plan.jpg" },
      { label: "Community Layout", image: "/images/hanover-park/master-plan.jpg" },
    ],
    renders: [
      { label: "Clubhouse & Pool Rendering", image: "/images/hanover-park/gallery-01.jpg" },
      { label: "Community Amenity Vision", image: "/images/hanover-park/gallery-02.jpg" },
      { label: "Resort-Style Living", image: "/images/hanover-park/gallery-03.jpg" },
    ],
    progress: [
      { date: "May 2026", note: "Master plan and amenity vision released" },
      { date: "Q3 2026", note: "Site development planning underway" },
    ],
    amenities: [],
    amenitySections: [
      {
        title: "Core Amenities",
        items: [
          "Resort-style swimming pool with large paver decking",
          "PopStroke-inspired putting green",
          "Pickleball courts for all ages",
          "Elegant clubhouse with gathering space",
        ],
      },
      {
        title: "Community Design",
        items: [
          "Walkable, resort-inspired neighborhood layout",
          "Centralized amenity zone with sports field",
          "Green and open spaces with buffer zones",
          "Internal road system with parking and access areas",
        ],
      },
      {
        title: "Home Features",
        items: [
          "Architectural style aligned with the clubhouse",
          "Warm-toned brick and stone exteriors",
          "Townhomes from 1,850 sq. ft. minimum",
          "Single-family homes from 2,300 sq. ft. minimum",
          "2-car garage included on all homes",
        ],
      },
    ],
    locationMap: "/images/hanover-park/master-plan.jpg",
    name: "Hanover Park at Stockbridge",
    priceText: "Community Complete",
    statusBadge: "Completed",
    tagline: "Resort-Inspired Living in Stockbridge",
    heroDescription:
      "A walkable, resort-inspired neighborhood designed around wellness, leisure, and community connection — with timeless architecture and modern comfort at every homesite.",
    heroLocationLabel: "Stockbridge, Georgia",
    heroHideStatusBadge: false,
    heroKeySpecs: [
      "Townhomes from 1,850 sq. ft.",
      "Single-family homes from 2,300 sq. ft.",
      "2-car garage on every home",
      "Resort-style pool & clubhouse",
      "Putting green & pickleball courts",
      "Walkable community planning",
    ],
    heroCtaSecondary: "Explore Community",
    heroAccentImages: [
      {
        src: "/images/hanover-park/gallery-01.jpg",
        alt: "Hanover Park clubhouse and pool rendering",
        caption: "Clubhouse",
      },
      {
        src: "/images/hanover-park/gallery-02.jpg",
        alt: "Hanover Park community amenities",
        caption: "Amenities",
      },
      {
        src: "/images/hanover-park/gallery-03.jpg",
        alt: "Hanover Park resort-style neighborhood",
        caption: "Community",
      },
    ],
    possessionDate: "TBA",
    projectArea: "Master-Planned Community",
    totalUnits: "Townhomes & Single-Family Homes",
    priceRange: "Completed",
    propertyType: "Townhomes & Single-Family",
    sitePlanPdfUrl: "/images/hanover-park/master-plan.jpg",
    sitePlanSvg: "/images/hanover-park/master-plan.jpg",
    configurationLabel: "Townhomes & Single-Family",
    overviewSectionLabel: "Community Overview",
    overviewHeadline: "Resort-inspired living in Stockbridge",
    overviewParagraphs: [
      "Hanover Park at Stockbridge is presented as a modern, resort-inspired residential community focused on wellness, leisure, walkability, and community living. The vision pairs timeless architectural design with modern comfort across a thoughtfully planned neighborhood of townhomes and single-family homes.",
      "The site plan centers recreation and connection — with a community clubhouse, resort-style pool, putting green, pickleball courts, sports field, and walking-friendly layout woven through green and open spaces. Homes feature warm-toned brick and stone exteriors designed to complement the clubhouse architecture, with every residence including a 2-car garage.",
    ],
    overviewKeynote:
      "A walkable neighborhood where wellness, leisure, and gathering spaces shape everyday life.",
    highlightCriteria: [
      {
        title: "Resort-Style Amenities",
        desc: "Pool, putting green, pickleball courts, and clubhouse designed for social and leisure-focused living.",
      },
      {
        title: "Walkable Layout",
        desc: "Pedestrian-friendly streets, open spaces, and a centralized amenity core encourage connection outdoors.",
      },
      {
        title: "Timeless Architecture",
        desc: "Warm brick and stone exteriors aligned with the clubhouse for a cohesive, high-end streetscape.",
      },
      {
        title: "Flexible Home Types",
        desc: "Townhomes from 1,850 sq. ft. and single-family homes from 2,300 sq. ft., each with a 2-car garage.",
      },
    ],
    locationSectionLabel: "Location",
    locationHeadline: "Stockbridge, Georgia",
    locationConnectivityBlurb:
      "Positioned in Stockbridge with convenient access to metro Atlanta corridors, shopping, schools, and daily essentials.",
    locationPlaceGroups: [
      {
        title: "Community Features",
        places: [
          { name: "Resort-style swimming pool" },
          { name: "PopStroke-inspired putting green" },
          { name: "Pickleball courts" },
          { name: "Community clubhouse" },
          { name: "Community sports field" },
        ],
      },
      {
        title: "Home Types",
        places: [
          { name: "Townhomes — from 1,850 sq. ft." },
          { name: "Single-family homes — from 2,300 sq. ft." },
          { name: "2-car garage — all homes" },
        ],
      },
    ],
    keyAdvantagesSectionLabel: "Why Hanover Park",
    keyAdvantagesHeadline: "Designed for wellness & connection",
    keyAdvantages: [
      {
        title: "Resort Lifestyle",
        description:
          "Pool, putting green, pickleball, and clubhouse amenities create a leisure-focused environment for all ages.",
      },
      {
        title: "Walkable Planning",
        description:
          "Internal roads, green spaces, and amenity zones support wellness, outdoor activity, and neighbor connection.",
      },
      {
        title: "Premium Exteriors",
        description:
          "Warm brick and stone façades with architecture matched to the clubhouse for timeless suburban elegance.",
      },
      {
        title: "Family-Friendly Scale",
        description:
          "Spacious townhome and single-family options with 2-car garages support modern family living.",
      },
    ],
    highlightsList: [
      "Resort-style pool with expansive paver decking",
      "PopStroke-inspired putting green and pickleball courts",
      "Elegant clubhouse gathering space",
      "Townhomes and single-family homes with 2-car garages",
    ],
    floorPlansDetails: [
      {
        name: "Townhome Collection",
        seriesLetter: "T",
        image: "/images/hanover-park/gallery-02.jpg",
        bedrooms: 3,
        bathrooms: 2.5,
        parking: 2,
        area: 1850,
        price: "Coming Soon",
        emi: "—",
        availability: "Coming Soon",
        virtualTourUrl: "#townhome",
      },
      {
        name: "Single-Family Collection",
        seriesLetter: "S",
        image: "/images/hanover-park/gallery-03.jpg",
        bedrooms: 4,
        bathrooms: 3,
        parking: 2,
        area: 2300,
        price: "Coming Soon",
        emi: "—",
        availability: "Coming Soon",
        virtualTourUrl: "#single-family",
      },
    ],
    unitsList: [],
    nearbyPlaces: [],
    faqsList: [
      {
        question: "What home types are planned at Hanover Park?",
        answer:
          "The community will offer townhomes starting at a minimum of 1,850 sq. ft. and single-family homes starting at a minimum of 2,300 sq. ft. All homes include a 2-car garage.",
      },
      {
        question: "What amenities are included?",
        answer:
          "Planned amenities include a resort-style swimming pool with large paver decking, a PopStroke-inspired putting green, pickleball courts, an elegant clubhouse, a community sports field, and extensive green and open spaces.",
      },
      {
        question: "When will homes be available?",
        answer:
          "Hanover Park at Stockbridge is a completed community. Contact us for resale opportunities or to learn more about the neighborhood.",
      },
      {
        question: "Where is the community located?",
        answer:
          "Hanover Park at Stockbridge is located in Stockbridge, Georgia, with a master-planned layout designed for walkability and resort-inspired living.",
      },
    ],
    testimonialsList: [],
    coordinates: { lat: 33.5443, lng: -84.2339 },
    masterPlanComponents: [
      { name: "Clubhouse", desc: "Central gathering space for residents" },
      { name: "Resort Pool", desc: "Large paver deck and leisure zone" },
      { name: "Putting Green", desc: "PopStroke-inspired recreation" },
      { name: "Pickleball Courts", desc: "Active play for all ages" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug);
}
