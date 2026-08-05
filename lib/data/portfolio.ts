export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category:
    | "Website"
    | "ERP"
    | "Automation"
    | "Branding"
    | "Marketing"
    | "Content"
    | "AI"
    | "Apps";
  industry: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  results: { kpi: string; value: string }[];
  technologies: string[];
  services: string[];
  gradient: string;
  testimonial?: { quote: string; name: string; role: string };
}

export const portfolio: PortfolioItem[] = [
  {
    id: "production-erp",
    title: "Production ERP for a Manufacturing Group",
    client: "Coimbatore-based manufacturing group",
    category: "ERP",
    industry: "Manufacturing",
    year: "2025",
    summary:
      "Connected inventory, production, and finance in one custom ERP with automated reporting.",
    problem:
      "The group ran operations across Excel sheets and disconnected tools. Production schedules, inventory levels, and job costing had no single source of truth, causing delays and costly stock errors.",
    solution:
      "We designed and built a modular ERP covering inventory, production planning, job costing, finance, and dashboards. Automated data entry, role-based access, and reconciliation removed the manual glue between departments.",
    results: [
      { kpi: "Manual data entry reduced", value: "42%" },
      { kpi: "Reporting time", value: "3 days → 5 min" },
      { kpi: "Stock accuracy", value: "98.5%" },
    ],
    technologies: ["Laravel", "PostgreSQL", "React", "Node.js"],
    services: ["ERP Development", "Custom Software", "Workflow Automation"],
    gradient: "bg-brand-gradient",
  },
  {
    id: "whatsapp-ai-realestate",
    title: "WhatsApp AI Assistant for Real Estate",
    client: "Real-estate brokerage",
    category: "AI",
    industry: "Real Estate",
    year: "2025",
    summary:
      "An AI chatbot on WhatsApp that qualifies leads and books site visits automatically.",
    problem:
      "Sales reps were drowning in repetitive WhatsApp enquiries, replying slowly and losing hot leads. After-hours enquiries went unanswered entirely.",
    solution:
      "We trained an AI assistant on the brokerage's inventory and FAQ, deployed it on WhatsApp with human handover, and synced every conversation to a CRM with lead scoring and reminders.",
    results: [
      { kpi: "Lead response time", value: "40 min → < 30 sec" },
      { kpi: "Enquiries qualified", value: "100% auto-triaged" },
      { kpi: "Site visits booked", value: "+3.2×" },
    ],
    technologies: [
      "OpenAI",
      "WhatsApp Business API",
      "Node.js",
      "Vector search",
    ],
    services: ["AI Chatbots", "WhatsApp Automation", "CRM Development"],
    gradient: "bg-brand-gradient",
  },
  {
    id: "saas-growth-engine",
    title: "Growth Engine for a SaaS Startup",
    client: "B2B SaaS startup",
    category: "Marketing",
    industry: "Startups / SaaS",
    year: "2025",
    summary:
      "Technical SEO, GEO/AEO content, and conversion optimisation that 5×'d organic traffic.",
    problem:
      "A strong product with almost no organic visibility. The startup was fully dependent on paid channels with rising CAC and no content engine.",
    solution:
      "We rebuilt technical SEO, mapped content to buyer intent, engineered answers for AI search (GEO/AEO), and optimised landing pages and funnels with continuous A/B testing.",
    results: [
      { kpi: "Organic traffic", value: "5.2× in 8 months" },
      { kpi: "CAC", value: "−37%" },
      { kpi: "AI-search citations", value: "0 → 180+" },
    ],
    technologies: ["Next.js", "GA4", "Schema.org", "Ahrefs"],
    services: ["SEO", "GEO & AEO", "Digital Marketing"],
    gradient: "bg-brand-gradient",
  },
  {
    id: "restaurant-app",
    title: "Mobile App for a Restaurant Chain",
    client: "Multi-outlet restaurant chain",
    category: "Apps",
    industry: "Hospitality",
    year: "2024",
    summary:
      "A Flutter app for orders, loyalty, and push promotions across iOS and Android.",
    problem:
      "The chain relied on third-party aggregators that took high commissions and gave them no customer data or direct relationship with diners.",
    solution:
      "We built a white-label Flutter app with in-app ordering, a loyalty programme, push notifications, and an admin panel to run campaigns and view sales by outlet.",
    results: [
      { kpi: "Commission saved", value: "₹9L+/year" },
      { kpi: "Repeat orders", value: "+46%" },
      { kpi: "App rating", value: "4.7★" },
    ],
    technologies: ["Flutter", "Firebase", "Node.js", "PostgreSQL"],
    services: ["Mobile Applications", "Web Applications", "Branding & Design"],
    gradient: "bg-brand-gradient",
  },
  {
    id: "healthcare-patient-portal",
    title: "Patient Portal for a Clinic Network",
    client: "Healthcare group",
    category: "Apps",
    industry: "Healthcare",
    year: "2024",
    summary:
      "A secure portal for appointments, records, and payments across multiple clinics.",
    problem:
      "Appointments, records, and billing were scattered across clinics, and patients had no self-service channel.",
    solution:
      "We delivered a secure patient portal and mobile app with online booking, digital records, payment links, and automated reminders - architected for data protection compliance.",
    results: [
      { kpi: "No-show rate", value: "−28%" },
      { kpi: "Front-desk load", value: "−35%" },
      { kpi: "Patient satisfaction", value: "4.8/5" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    services: ["Web Applications", "Mobile Applications", "Cloud Solutions"],
    gradient: "bg-brand-gradient",
  },
  {
    id: "brand-redesign",
    title: "Brand & Website Redesign for a B2B Firm",
    client: "Industrial services company",
    category: "Branding",
    industry: "Manufacturing",
    year: "2024",
    summary: "Full brand identity and a conversion-focused corporate website.",
    problem:
      "The company looked outdated online, losing credibility with enterprise buyers who judged them by their website and brand before first contact.",
    solution:
      "We designed a new identity and rebuilt their website around buyer journeys, with strong social proof, clear service architecture, and technical SEO from day one.",
    results: [
      { kpi: "Qualified enquiries", value: "+3.1×" },
      { kpi: "Bounce rate", value: "−41%" },
      { kpi: "Brand consistency", value: "Full suite delivered" },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Figma"],
    services: ["Branding & Design", "Website Development", "SEO"],
    gradient: "bg-brand-gradient",
  },
  {
    id: "crm-for-field-sales",
    title: "Field-Sales CRM with Offline Mode",
    client: "Consumer goods distributor",
    category: "Automation",
    industry: "Retail / Distribution",
    year: "2024",
    summary:
      "A mobile-first CRM for field reps with offline sync and automated follow-ups.",
    problem:
      "Field reps logged visits on paper, data reached the office days late, and follow-ups were forgotten - management had no real-time picture.",
    solution:
      "We built a mobile-first CRM with offline-first sync, geo-tagged visits, order capture, and automated follow-up reminders tied to WhatsApp.",
    results: [
      { kpi: "Data latency", value: "days → real-time" },
      { kpi: "Visit coverage", value: "+54%" },
      { kpi: "Follow-up rate", value: "+3.5×" },
    ],
    technologies: ["Flutter", "Laravel", "PostgreSQL", "WhatsApp API"],
    services: ["CRM Development", "Mobile Applications", "Workflow Automation"],
    gradient: "bg-brand-gradient",
  },
  {
    id: "ecommerce-content",
    title: "Content Engine for an E-commerce Brand",
    client: "D2C e-commerce brand",
    category: "Content",
    industry: "Retail",
    year: "2024",
    summary:
      "A content programme that ranked for high-intent buying keywords and lifted organic revenue.",
    problem:
      "The store had hundreds of products but thin, duplicate content that Google ignored, and no authority to rank competitively.",
    solution:
      "We built a scalable content engine - product briefs, category guides, and buying-intent articles - with internal linking and structured data.",
    results: [
      { kpi: "Organic revenue", value: "+2.8×" },
      { kpi: "Ranking keywords", value: "+640" },
      { kpi: "Content velocity", value: "12 pieces/mo" },
    ],
    technologies: ["Next.js", "Schema.org", "GA4"],
    services: ["Content Creation", "SEO", "Digital Marketing"],
    gradient: "bg-brand-gradient",
  },
];

export const portfolioCategories = [
  "All",
  "Website",
  "ERP",
  "Automation",
  "Branding",
  "Marketing",
  "Content",
  "AI",
  "Apps",
] as const;

export function getPortfolioById(id: string): PortfolioItem | undefined {
  return portfolio.find((p) => p.id === id);
}
