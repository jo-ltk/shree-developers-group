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
  statusBadge?: "Ready to Move" | "Ongoing" | "Coming Soon";
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
    image: string;
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
  highlightCriteria?: { title: string; desc: string }[];
  locationConnectivityBlurb?: string;
  sitePlanSvg?: string;
  configurationLabel?: string;
  keyAdvantages?: { title: string; description: string }[];
  /** Hero-only copy; other sections keep using summary/brief until updated */
  heroDescription?: string;
  heroKeySpecs?: string[];
  heroLocationLabel?: string;
  heroHideStatusBadge?: boolean;
  heroCtaSecondary?: string;
};

export const DEDICATED_PROJECT_SLUGS = ["sydney-oaks", "elysian-gates"] as const;
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
    highlight: "48 villa plots with private garden setbacks and 40-ft internal roads",
    summary:
      "A calm, gated address planned around generous internal roads, garden edges, and homes that feel private without feeling closed off.",
    brief:
      "Shree Vistaa is our flagship villa community — a gated 12-acre enclave featuring 48 individually designed plots with private garden setbacks, 40-ft landscaped internal roads, and a curated amenity cluster at its heart. Every home is oriented to maximize natural light and cross-ventilation, with Vastu-compliant layouts and premium-grade construction. The community includes a clubhouse, children's play zone, landscaped walking paths, and 24/7 security infrastructure. RERA registered and bank-loan approved.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
    plans: [
      { label: "Master Site Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "3BHK Floor Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "4BHK Duplex Plan", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
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
    type: "Plotted Community",
    year: "Limited Release",
    status: "active",
    highlight: "72 open plots with underground utilities and tree-lined avenues",
    summary:
      "Open plots, thoughtful services, and a quieter streetscape for families planning their own long-term home.",
    brief:
      "Shree Greens offers 72 open residential plots in a nature-forward community. Underground utilities ensure clean streetscapes, while tree-lined avenues and central greens create a park-like setting. Infrastructure includes storm-water drainage, street lighting, and dedicated utility corridors. Ideal for families who want to design their own home on a trusted, fully-serviced platform.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Plot Layout Map", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
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
      { date: "Dec 2025", note: "Plot demarcation and boundary stones placed" },
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
      "Shree Skyline is a 14-storey residential tower in the city's most connected corridor. Features include a rooftop sky lounge, EV-ready basement parking, rainwater harvesting, and a landscaped podium deck. Unit options range from 2BHK compact homes to 3BHK premium corners and a signature penthouse. Designed for urban professionals who want convenience without compromising on quality of living.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=82",
    plans: [
      { label: "Tower Floor Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "2BHK Layout", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "3BHK Layout", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
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
      { label: "Ground Floor Layout", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "First Floor Layout", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
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
      { label: "2BHK Garden Unit", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
      { label: "3BHK Corner Unit", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80" },
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
    highlight: "2,400–3,600 sq ft plots with mature neem and banyan landscaping",
    summary:
      "Generous plot sizes, mature landscaping, and a gated perimeter that creates a sense of seclusion minutes from everyday conveniences.",
    brief:
      "Shree Haven is a completed luxury villa community set across 8 acres of mature landscaping. Plot sizes range from 2,400 to 3,600 sq ft, with existing neem and banyan trees preserved within the layout. The gated community features a clubhouse, swimming pool, multi-purpose court, and 24/7 manned security. Every villa enjoys a private garden and covered car park.",
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
    location: "Forsyth County, GA",
    type: "Gated Enclave",
    year: "Ongoing",
    status: "active",
    highlight: "Exclusive gated living featuring high-performance homes and private wooded backyards",
    summary:
      "A private, high-performance enclave where architectural precision meets the quiet seclusion of North Georgia's wooded landscape.",
    brief:
      "Elysian Gates is a premiere gated enclave in Forsyth County, designed for those who seek both architectural performance and natural seclusion. Each home is built with high-efficiency systems and features expansive wooded backyards, offering a level of privacy rarely found in modern developments. The community is defined by its commitment to quiet luxury and structural excellence.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
    plans: [
      { label: "Community Layout", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "5BHK Estate Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Entrance Gate Render", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80" },
      { label: "Aerial Woods View", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "May 2026", note: "Final landscaping for Phase 1 completed", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" },
      { date: "Feb 2026", note: "Model home interiors finalized" },
    ],
    amenities: [
      "Swimming Pool",
      "Club House",
      "Gym",
      "Kids Play Area",
      "Walking Track",
      "Basketball Court",
      "Garden Area",
      "Security",
      "CCTV",
      "Indoor Games",
      "Co-working Space",
      "Party Hall",
    ],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
    name: "Elysian Gates",
    priceText: "From mid $500s",
    statusBadge: "Ongoing",
    tagline: "Where Quiet Luxury Meets Wooded Seclusion",
    reraNumber: "RERA-GA-7841",
    possessionDate: "Q2 2027",
    projectArea: "18 Acres",
    totalUnits: "42 Estate Homes",
    priceRange: "$550k - $780k",
    propertyType: "Luxury Estate Homes",
    sitePlanPdfUrl: "/pdfs/site-plan.pdf",
    floorPlansPdfUrl: "/pdfs/aspen-plan-set.pdf",
    sitePlanSvg: "/svg/elysian-gates.svg",
    configurationLabel: "4 & 5 BHK",
    overviewParagraphs: [
      "Elysian Gates is conceived as a private sanctuary for families seeking architectural performance and natural seclusion in Forsyth County. Designed with contemporary estate architecture as the foundation, each residence leverages high-efficiency systems, premium stonework, and expansive glazing that frames the protected wooded backdrop.",
      "Each home is positioned to capture optimal ventilation and daylight throughout the seasons, ensuring comfortable living and bright gathering spaces. Connectivity runs deep here — residents enjoy secure access to Forsyth trail networks, acclaimed schools, and Cumming's civic amenities, all within a fully gated enclave framework.",
    ],
    highlightCriteria: [
      {
        title: "Top Forsyth County Schools",
        desc: "Within reach of Lambert, West Forsyth, and South Forsyth school zones known for academic excellence.",
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
    locationConnectivityBlurb:
      "Positioned along Forsyth County's premier residential corridors, Elysian Gates bridges the boundary between wooded seclusion and rapid north-metro reach.",
    keyAdvantages: [
      {
        title: "Premium Location",
        description:
          "Forsyth County address with quick access to wooded trails, schools, healthcare, and daily essentials.",
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
    masterPlanComponents: [
      {
        name: "Plot Layout",
        desc: "Premium, low-density layout comprising 42 estate homesites structured for privacy, natural ventilation, and wooded setbacks.",
      },
      {
        name: "Amenities Zoning",
        desc: "A central community core grouping the swimming pool, fully-equipped gym, children's play court, and outdoor walking path.",
      },
      {
        name: "Entry & Exit",
        desc: "Single-point gated access lobby with 24/7 security cabin control, perimeter sensor arrays, and video surveillance.",
      },
    ],
    highlightsList: [
      "Expansive wooded backyard retreats bordering natural corridors",
      "Curated lifestyle amenities at the private community core",
      "High-efficiency HVAC and eco-conscious construction standards",
      "Open-concept estate floor plans designed by award-winning architects",
    ],
    floorPlansDetails: [
      {
        name: "The Cypress Estate",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        bedrooms: 4,
        bathrooms: 3.5,
        parking: 2,
        area: 4200,
        price: "$550,000",
        emi: "$2,850/mo",
        availability: "Available",
        virtualTourUrl: "#tour-cypress",
      },
      {
        name: "The Magnolia Villa",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        bedrooms: 5,
        bathrooms: 4.5,
        parking: 3,
        area: 5200,
        price: "$665,000",
        emi: "$3,450/mo",
        availability: "Available",
        virtualTourUrl: "#tour-magnolia",
      },
      {
        name: "The Laurel Grand Estate",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
        bedrooms: 5,
        bathrooms: 5,
        parking: 3,
        area: 5800,
        price: "$780,000",
        emi: "$4,050/mo",
        availability: "Coming Soon",
        virtualTourUrl: "#tour-laurel",
      },
    ],
    unitsList: [
      {
        id: "Unit 201-A",
        name: "The Magnolia Villa (Lot 08)",
        bhk: 5,
        area: 5200,
        facing: "East-Facing",
        price: "$665,000",
        availability: "Available",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "Unit 204-B",
        name: "The Cypress Estate (Lot 19)",
        bhk: 4,
        area: 4200,
        facing: "North-Facing",
        price: "$550,000",
        availability: "Booking Open",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "Unit 207-C",
        name: "The Laurel Grand Estate (Lot 03)",
        bhk: 5,
        area: 5800,
        facing: "West-Facing",
        price: "$780,000",
        availability: "Available",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "Unit 211-D",
        name: "The Cypress Estate (Lot 14)",
        bhk: 4,
        area: 4200,
        facing: "South-Facing",
        price: "$558,000",
        availability: "Sold Out",
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    nearbyPlaces: [
      { category: "Schools", name: "Lambert High School", distance: "3.1 miles", time: "7 min" },
      { category: "Schools", name: "South Forsyth High School", distance: "4.2 miles", time: "9 min" },
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
        answer: "Maintenance is estimated at $165/month, covering common park landscaping, road paving care, clubhouse upkeep, and 24/7 security guard services.",
      },
      {
        question: "Are all legal approvals and RERA clearances in place?",
        answer: "Yes, the development holds a verified clear title deed and is registered under state housing regulatory authority (RERA Ref: RERA-GA-7841).",
      },
      {
        question: "Does the booking cost cover access to all clubhouse amenities?",
        answer: "Yes, ownership includes lifetime resident membership to the swimming pool, fitness center, basketball courts, and common co-working lounges.",
      },
    ],
    testimonialsList: [
      {
        name: "Rachel & James Whitmore",
        review: "The estate architecture and wooded setbacks are exactly what we wanted. Forsyth's trail access and school districts made Elysian Gates an easy choice for our family.",
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
        review: "Quiet, private, yet minutes from Northside Forsyth and Halcyon. Outstanding planning for long-term family living.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      },
    ],
    coordinates: { lat: 34.2071, lng: -84.1402 },
  },
  {
    index: "10",
    slug: "sydney-oaks",
    title: "Sydney Oaks",
    location: "Gwinnett County, GA",
    type: "89 Town Homes",
    year: "Ongoing",
    status: "active",
    highlight: "Thoughtfully planned neighborhood with spacious lots and modern farmhouse architecture",
    summary: "Spacious estate lots and modern farmhouse architecture blending seamlessly into the natural Gwinnett landscape.",
    brief: "Sydney Oaks brings modern farmhouse architecture to a thoughtfully planned neighborhood in Gwinnett County. With spacious estate lots and a focus on blending the built environment with the natural landscape, Sydney Oaks offers a balanced lifestyle. The homes feature open-concept floor plans, premium materials, and a design language that feels both current and timeless.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82",
    plans: [
      { label: "Community Layout", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "4BHK Farmhouse Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
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
    tagline: "Luxury Mixed-Use Townhome Community in Forsyth County, Georgia",
    heroDescription:
      "Modern townhomes designed for connected living with integrated retail, office spaces, green landscapes, and walkable community planning. Located in the heart of Cumming, Sydney Oaks combines residential comfort with convenience, lifestyle, and long-term value.",
    heroLocationLabel: "Forsyth County / Cumming, GA",
    heroHideStatusBadge: true,
    heroKeySpecs: [
      "Premium mixed-use development",
      "Located in Forsyth County / Cumming, GA",
      "Retail + Office + Residential integration",
      "Family-oriented community",
      "HOA maintained landscape and exteriors",
      "Starting from the low $500s",
    ],
    heroCtaSecondary: "Schedule a Visit",
    reraNumber: "RERA-GA-8923",
    possessionDate: "Q4 2026",
    projectArea: "12 Acres",
    totalUnits: "89 Town Homes",
    priceRange: "$410k - $580k",
    propertyType: "Luxury Villas",
    sitePlanPdfUrl: "/pdfs/site-plan.pdf",
    floorPlansPdfUrl: "/pdfs/aspen-plan-set.pdf",
    sitePlanSvg: "/svg/siteMap-final.svg",
    configurationLabel: "3 & 4 BHK",
    overviewParagraphs: [
      "Sydney Oaks is conceived as a sanctuary for families seeking a balanced, nature-integrated lifestyle in Gwinnett County. Designed with modern farmhouse architecture as the foundation, each residence leverages natural wood siding, limestone masonry, and expansive double-glazed panels that showcase the protected oak forests.",
      "Each townhome is positioned to capture optimal ventilation and sun exposure throughout the seasons, ensuring natural temperature regulation and bright common spaces. Connectivity runs deep here — residents enjoy secure access to local hiking trails, premier Gwinnett schools, and local civic centers, all within a fully gated community framework.",
    ],
    highlightCriteria: [
      {
        title: "Top Gwinnett County Schools",
        desc: "Directly within district zones of North Gwinnett schools, renowned for excellence.",
      },
      {
        title: "Healthcare Integration",
        desc: "Under 10 minutes drive from Emory Johns Creek Hospital, providing premium care.",
      },
      {
        title: "Duluth Tech Connectivity",
        desc: "Quick commutes to Duluth and Suwanee technical offices and commercial business parks.",
      },
      {
        title: "Lush Park & Trail access",
        desc: "The gated layout wraps around direct private paths into the scenic Oak Ridge Trailway.",
      },
    ],
    locationConnectivityBlurb:
      "Positioned along Gwinnett County's central access ways, Sydney Oaks bridges the boundary between natural seclusion and rapid civic reach.",
    keyAdvantages: [
      {
        title: "Premium Location",
        description:
          "Gwinnett County address with quick access to wooded trails, schools, healthcare, and daily essentials.",
      },
      {
        title: "Smart Planning",
        description:
          "Low-density planning, open layouts, efficient systems, and a design language built for long-term comfort.",
      },
      {
        title: "High Appreciation",
        description:
          "Positioned in a growing residential corridor with strong demand for family-focused communities.",
      },
      {
        title: "Trusted Developer",
        description:
          "Delivered by Shree Developers Group with transparent documentation and responsive site support.",
      },
    ],
    masterPlanComponents: [
      { name: "Plot Layout", desc: "Premium, low-density layout comprising 89 beautifully proportioned estate townhome plots structured for high natural ventilation and spacing." },
      { name: "Amenities Zoning", desc: "A central 2-acre community park core grouping the swimming pool, fully-equipped gym, children's play court, and outdoor walking path." },
      { name: "Entry & Exit", desc: "Single-point gated access lobby with 24/7 security cabin control, perimeter sensor arrays, and video surveillance." }
    ],
    highlightsList: [
      "Wooded backyard retreats bordering natural trails",
      "Curated lifestyle amenities at our private community core",
      "High-efficiency HVAC and eco-conscious construction standards",
      "Open-concept family floor plans designed by award-winning architects"
    ],
    floorPlansDetails: [
      {
        name: "The Maple Townhome",
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80",
        bedrooms: 3,
        bathrooms: 2.5,
        parking: 2,
        area: 2400,
        price: "$410,000",
        emi: "$2,150/mo",
        availability: "Available",
        virtualTourUrl: "#tour-maple"
      },
      {
        name: "Oak Ridge Villa",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        bedrooms: 4,
        bathrooms: 3.5,
        parking: 2,
        area: 3600,
        price: "$495,000",
        emi: "$2,650/mo",
        availability: "Available",
        virtualTourUrl: "#tour-oakridge"
      },
      {
        name: "The Sequoia Estate",
        image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&w=1200&q=80",
        bedrooms: 5,
        bathrooms: 4,
        parking: 3,
        area: 4200,
        price: "$580,000",
        emi: "$3,100/mo",
        availability: "Coming Soon",
        virtualTourUrl: "#tour-sequoia"
      }
    ],
    unitsList: [
      {
        id: "Unit 102-A",
        name: "Oak Ridge Villa (Lot 12)",
        bhk: 4,
        area: 3600,
        facing: "East-Facing",
        price: "$495,000",
        availability: "Available",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "Unit 105-B",
        name: "The Maple Townhome (Lot 34)",
        bhk: 3,
        area: 2400,
        facing: "North-Facing",
        price: "$410,000",
        availability: "Booking Open",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "Unit 108-C",
        name: "The Sequoia Estate (Lot 05)",
        bhk: 5,
        area: 4200,
        facing: "West-Facing",
        price: "$580,000",
        availability: "Available",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "Unit 112-D",
        name: "The Maple Townhome (Lot 21)",
        bhk: 3,
        area: 2400,
        facing: "South-Facing",
        price: "$415,000",
        availability: "Sold Out",
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    nearbyPlaces: [
      { category: "Schools", name: "North Gwinnett High School", distance: "2.3 miles", time: "5 min" },
      { category: "Schools", name: "Riverside Elementary School", distance: "1.5 miles", time: "4 min" },
      { category: "Hospitals", name: "Emory Johns Creek Hospital", distance: "4.8 miles", time: "10 min" },
      { category: "Metro", name: "MARTA Station - Doraville", distance: "15 miles", time: "22 min" },
      { category: "Shopping", name: "Sugarloaf Mills Mall", distance: "6.2 miles", time: "12 min" },
      { category: "Tech Parks", name: "Duluth Tech Corridor", distance: "5.1 miles", time: "9 min" }
    ],
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
        answer: "You can reserve a villa plot or completed townhouse layout with an initial refundable reservation deposit of $5,000, followed by a 10% builder contract signing within 15 days."
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
    coordinates: { lat: 34.0531, lng: -84.0624 }
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug);
}
