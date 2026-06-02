/** Leadership team shown in the Our Story founders strip. */
export const FOUNDERS = [
  {
    id: "yashesh-shah",
    name: "Yashesh Shah",
    role: "Founder & President",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    description: [
      "Yashesh Shah is the Founder and President of Shree Developers Group, a luxury real estate development firm specializing in the creation of distinctive residential communities and thoughtfully planned mixed-use developments throughout Georgia.",
      "Driven by a passion for placemaking and an unwavering commitment to excellence, Yashesh has built his reputation on transforming exceptional land into enduring communities. With extensive experience spanning land acquisition, entitlement, development, infrastructure, construction, and project execution, he brings a comprehensive vision to every project while maintaining a meticulous attention to detail.",
      "Under his leadership, Shree Developers Group has become known for delivering communities that blend timeless architecture, refined craftsmanship, and strategic location selection. By maintaining direct oversight of the development process and integrating key construction operations in-house, Yashesh ensures an unmatched level of quality control, efficiency, and execution from concept through completion.",
      "His philosophy centers on creating communities that offer more than just homes—they create a lifestyle. Each development is carefully curated to provide architectural distinction, lasting value, and an elevated living experience for homeowners and families.",
      "Yashesh's hands-on leadership approach, combined with his deep understanding of development and construction, has allowed Shree Developers Group to successfully navigate complex projects while maintaining the highest standards of design, functionality, and financial discipline. His ability to execute efficiently, anticipate challenges, and deliver exceptional results has positioned the company as a trusted name in luxury residential development.",
      "Today, Yashesh continues to lead Shree Developers Group with a vision focused on innovation, quality, and creating landmark communities that leave a lasting impact for generations to come.",
    ],
  },
  {
    id: "tejas-shah",
    name: "Tejas Shah",
    role: "Co-Founder & Managing Principal",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    description: [
      "Tejas Shah is the Co-Founder and Managing Principal of Shree Developers Group, a luxury real estate development firm specializing in strategic growth, investment leadership, and thoughtfully planned mixed-use developments throughout Georgia.",
      "He provides strategic leadership for the firm's growth, investment strategy, and long-term vision, overseeing financial operations, capital markets activities, investor partnerships, and overall business strategy from concept through execution.",
      "With a strong background in finance, investment management, and real estate development, Tejas has been instrumental in building the financial platform that supports the company's expanding portfolio of residential, mixed-use, and commercial projects. His expertise in capital structuring, project underwriting, risk management, and strategic planning enables Shree Developers Group to pursue transformative opportunities while maintaining disciplined financial stewardship.",
      "Tejas leads the firm's relationships with investors, lending institutions, and strategic partners, overseeing capital formation and investment management across the organization's development initiatives. Known for his transparent and relationship-driven approach, he has cultivated a strong network of partners who share the company's commitment to excellence, integrity, and long-term value creation.",
      "Beyond finance, Tejas is actively involved in guiding the overall direction of the company, evaluating new acquisitions, identifying growth opportunities, and shaping the strategic vision behind each development. His leadership philosophy centers on combining thoughtful investment decisions with exceptional execution to create projects that deliver lasting value for investors, homeowners, and the communities they serve.",
      "Under his leadership, Shree Developers Group has continued to expand its presence across Georgia, establishing a reputation for quality, innovation, and financial strength. Through a combination of strategic foresight, disciplined management, and an unwavering commitment to excellence, Tejas continues to drive the company's evolution as a premier real estate development firm.",
      "As Managing Principal, Tejas remains focused on positioning Shree Developers Group for sustained growth while creating enduring communities and investment opportunities that stand the test of time.",
    ],
  },
] as const;

export function getFounderBioPreview(
  paragraphs: readonly string[],
  expanded: boolean,
): { paragraphs: readonly string[]; hasMore: boolean } {
  const hasMore = paragraphs.length > 1;

  if (expanded) {
    return { paragraphs, hasMore };
  }

  return { paragraphs: paragraphs.slice(0, 1), hasMore };
}

export const PROFESSIONAL_PARTNERS_INTRO =
  "At Shree Developers Group, we believe exceptional communities are built through collaboration. While our leadership team oversees every stage of development, we work alongside a carefully selected network of industry-leading professionals who share our commitment to quality, innovation, and excellence.";

export const PROFESSIONAL_PARTNERS = [
  {
    id: "architecture-design",
    title: "Architecture & Design Partners",
    description:
      "Our architectural partners help transform vision into reality, creating thoughtfully designed homes and communities that blend timeless aesthetics with modern functionality. From initial concepts and floor plans to exterior elevations and interior layouts, our design team ensures every detail contributes to an elevated living experience.",
  },
  {
    id: "civil-engineering",
    title: "Civil Engineering & Planning Consultants",
    description:
      "Successful developments begin with thoughtful planning and engineering. Our engineering partners provide expertise in site design, grading, utility coordination, stormwater management, entitlement support, and municipal approvals. Their technical knowledge helps ensure each project is designed efficiently and responsibly.",
  },
  {
    id: "land-planning",
    title: "Land Planning & Entitlement Specialists",
    description:
      "Navigating zoning, entitlement, and regulatory approvals requires experience and strategic planning. Our land planning consultants work closely with local jurisdictions, planning commissions, and stakeholders to create communities that align with both municipal objectives and market demand.",
  },
  {
    id: "construction",
    title: "Construction & Infrastructure Partners",
    description:
      "Supported by experienced construction professionals, specialty contractors, and infrastructure experts, our team delivers projects with a focus on quality craftsmanship, efficiency, and attention to detail. This collaborative approach allows us to maintain high standards throughout every phase of construction.",
  },
  {
    id: "financial",
    title: "Financial & Capital Partners",
    description:
      "Our financial partners provide the resources and expertise necessary to execute projects responsibly and efficiently. Through relationships with lenders, private investors, and institutional capital providers, we are able to structure projects that create value while maintaining disciplined financial management.",
  },
  {
    id: "legal",
    title: "Legal & Risk Management Advisors",
    description:
      "Real estate development requires careful attention to contracts, compliance, and risk management. Our legal advisors provide guidance throughout acquisitions, financing, development, and construction, helping protect the interests of our stakeholders while supporting successful project execution.",
  },
  {
    id: "environmental",
    title: "Environmental & Surveying Consultants",
    description:
      "Our environmental and surveying professionals provide critical due diligence services, including boundary surveys, environmental assessments, permitting support, and site analysis. Their expertise helps ensure that projects are developed with a long-term perspective and respect for the surrounding environment.",
  },
] as const;

export const PROFESSIONAL_PARTNERS_CLOSING =
  "Together, our network of architects, engineers, planners, consultants, contractors, financial institutions, and professional advisors forms an integrated development platform that allows Shree Developers Group to deliver communities with exceptional quality, efficiency, and lasting value. By combining strategic leadership with best-in-class professional partnerships, we are able to guide each project from acquisition and planning through construction and final delivery while maintaining the highest standards of excellence.";
