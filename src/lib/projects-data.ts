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
  locationMap: string;
};

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
    summary: "A private, high-performance enclave where architectural precision meets the quiet seclusion of North Georgia's wooded landscape.",
    brief: "Elysian Gates is a premiere gated enclave in Forsyth County, designed for those who seek both architectural performance and natural seclusion. Each home is built with high-efficiency systems and features expansive wooded backyards, offering a level of privacy rarely found in modern developments. The community is defined by its commitment to quiet luxury and structural excellence.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82",
    plans: [
      { label: "Master Site Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "5BHK Estate Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Entrance Gate Render", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80" },
      { label: "Aerial Woods View", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "May 2026", note: "Final landscaping for Phase 1 completed", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" },
      { date: "Feb 2026", note: "Model home interiors finalized" },
    ],
    amenities: ["Gated Perimeter", "High-Performance Homes", "Private Wooded Lots", "Underground Utilities", "24/7 Security"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
    plans: [
      { label: "Community Layout", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
      { label: "4BHK Farmhouse Plan", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" },
    ],
    renders: [
      { label: "Street View Render", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
      { label: "Park & Trail Visualization", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", isVideo: true },
    ],
    progress: [
      { date: "Apr 2026", note: "Paving of Oak Ridge Trail completed", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
      { date: "Jan 2026", note: "Underground utility lines installed" },
    ],
    amenities: ["Estate-Sized Lots", "Modern Farmhouse Design", "Landscaped Avenues", "Natural Trail Access", "Family-Focused Planning"],
    locationMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug);
}
