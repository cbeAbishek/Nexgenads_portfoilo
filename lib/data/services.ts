export interface Service {
  slug: string;
  title: string;
  category: string;
  short: string;
  icon: string;
  description: string;
  benefits: string[];
  features: string[];
  technologies: string[];
  useCases: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    category: "Development",
    short:
      "High-performance websites and landing pages engineered for speed, SEO, and conversion.",
    icon: "code",
    description:
      "We design and build fast, secure, and SEO-ready websites that convert visitors into customers. From corporate sites to product landing pages, every build is engineered for performance and maintainability.",
    benefits: [
      "Pagespeed and Core Web Vitals optimised from day one",
      "Search-engine-first architecture and structured data",
      "Mobile-first responsive experience on every device",
      "CMS-ready builds your team can update without developers",
    ],
    features: [
      "Next.js / React frontends",
      "Headless CMS integration",
      "Analytics & conversion tracking",
      "Accessibility (WCAG AA)",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "Node.js",
    ],
    useCases: [
      "Corporate websites",
      "SaaS landing pages",
      "E-commerce storefronts",
      "Startup MVPs",
    ],
    faqs: [
      {
        q: "How long does a website take to build?",
        a: "A typical corporate website takes 2–4 weeks; larger or data-driven builds take 6–8 weeks depending on scope.",
      },
      {
        q: "Do you handle SEO during development?",
        a: "Yes. Every site ships with technical SEO, structured data, sitemaps, and an internal linking strategy built in.",
      },
    ],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    category: "Development",
    short:
      "Scalable web apps with real-time features, dashboards, and robust backends.",
    icon: "layout",
    description:
      "Complex business logic, dashboards, real-time collaboration, and third-party integrations - delivered as reliable, scalable web applications.",
    benefits: [
      "Built to scale from MVP to enterprise",
      "Real-time data and live dashboards",
      "Secure by design (auth, RBAC, data protection)",
    ],
    features: [
      "Custom dashboards",
      "Role-based access control",
      "API design & integration",
      "Real-time sync",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    useCases: [
      "Internal tools",
      "Client portals",
      "Analytics platforms",
      "B2B SaaS frontends",
    ],
    faqs: [
      {
        q: "Do you migrate existing apps?",
        a: "Yes. We assess, modernise, and migrate legacy applications to modern, maintainable stacks.",
      },
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    category: "Development",
    short:
      "iOS and Android apps built once, shipped everywhere - native-feel with cross-platform speed.",
    icon: "smartphone",
    description:
      "From idea to app store, we build polished mobile experiences using Flutter and React Native that feel native on both iOS and Android.",
    benefits: [
      "Single codebase for iOS & Android",
      "Offline-first and push-ready",
      "App store submission handled end-to-end",
    ],
    features: [
      "Cross-platform development",
      "Push notifications",
      "Offline sync",
      "In-app analytics",
    ],
    technologies: ["Flutter", "React Native", "Firebase", "Node.js", "AWS"],
    useCases: [
      "Consumer apps",
      "Field & logistics apps",
      "On-demand services",
      "Employee apps",
    ],
    faqs: [
      {
        q: "Can you build for both iOS and Android?",
        a: "Yes - cross-platform builds ship to both stores from one codebase, saving time and cost.",
      },
    ],
  },
  {
    slug: "erp-development",
    title: "ERP Development",
    category: "Development",
    short:
      "Integrated ERP systems that connect finance, operations, inventory, and reporting.",
    icon: "boxes",
    description:
      "We design and implement ERP solutions tailored to your operations - connecting departments with one source of truth for inventory, finance, and reporting.",
    benefits: [
      "One source of truth across departments",
      "Automated reporting and reconciliation",
      "Modular - adopt what you need",
    ],
    features: [
      "Inventory & supply chain",
      "Finance & accounting modules",
      "Production & job costing",
      "Executive dashboards",
    ],
    technologies: ["Laravel", "Node.js", "PostgreSQL", "React", "AWS"],
    useCases: [
      "Manufacturing",
      "Distribution & wholesale",
      "Retail chains",
      "Services firms",
    ],
    faqs: [
      {
        q: "ERP sounds expensive - is it?",
        a: "We build modular ERPs so you start with the modules you need today and add more as you grow.",
      },
    ],
  },
  {
    slug: "crm-development",
    title: "CRM Development",
    category: "Development",
    short: "Custom CRMs that match your exact sales process - not a template.",
    icon: "users",
    description:
      "Off-the-shelf CRMs force you to adapt your process. We build CRMs that adapt to you - with pipelines, automation, and insights built around how you sell.",
    benefits: [
      "Pipelines that mirror your sales process",
      "Automated follow-ups and lead scoring",
      "Deep integration with calls, WhatsApp, and email",
    ],
    features: [
      "Custom pipelines & stages",
      "Lead scoring & routing",
      "Activity history",
      "Sales analytics",
    ],
    technologies: ["Laravel", "React", "Node.js", "PostgreSQL", "WhatsApp API"],
    useCases: ["B2B sales teams", "Real estate", "Agencies", "Field sales"],
    faqs: [
      {
        q: "Can we migrate from HubSpot/Salesforce?",
        a: "Yes - we migrate your data, customise the workflow, and train your team on the new system.",
      },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    category: "Development",
    short:
      "Purpose-built software for processes no off-the-shelf product can solve.",
    icon: "terminal",
    description:
      "When nothing on the market fits, we build it. Custom software designed around your unique process, data, and growth goals.",
    benefits: [
      "Built around your exact workflow",
      "Own your code and your data",
      "Integrates with your existing tools",
    ],
    features: [
      "Requirement engineering",
      "MVP to enterprise builds",
      "Legacy modernisation",
      "Dedicated product team",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Laravel",
      "Python",
      "PostgreSQL",
      "Docker",
    ],
    useCases: [
      "Complex workflows",
      "Data-heavy platforms",
      "Niche industry tools",
      "Internal systems",
    ],
    faqs: [
      {
        q: "How do you scope a custom project?",
        a: "We run a short discovery phase, deliver a written scope and estimate, then build in weekly increments you can review.",
      },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    category: "AI & Automation",
    short:
      "Intelligent agents and pipelines that handle repetitive work and free your team.",
    icon: "brain",
    description:
      "We deploy AI agents, document processing, and intelligent workflows that reduce manual effort and remove human error from routine operations.",
    benefits: [
      "Hours saved per week on repetitive tasks",
      "Faster, consistent decision-making",
      "Scales with your transaction volume",
    ],
    features: [
      "LLM-powered agents",
      "Document extraction",
      "AI lead qualification",
      "Smart routing & enrichment",
    ],
    technologies: [
      "OpenAI",
      "Python",
      "LangChain",
      "Node.js",
      "Vector databases",
    ],
    useCases: [
      "Back-office automation",
      "Document processing",
      "Customer support triage",
      "Sales intelligence",
    ],
    faqs: [
      {
        q: "Will AI replace my team?",
        a: "No - the goal is to remove repetitive work so your team focuses on judgement and relationships.",
      },
    ],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    category: "AI & Automation",
    short:
      "Conversational AI for websites, WhatsApp, and support - in your brand voice.",
    icon: "bot",
    description:
      "Chatbots that actually help. Trained on your business, connected to your data, and deployed where your customers already are.",
    benefits: [
      "Instant 24/7 response to customers",
      "Trained on your business, not generic data",
      "Hands off to humans when needed",
    ],
    features: [
      "Website live chat",
      "WhatsApp bot",
      "Knowledge-base training",
      "Human handover",
    ],
    technologies: [
      "OpenAI",
      "WhatsApp Business API",
      "Node.js",
      "Vector search",
    ],
    useCases: [
      "Lead capture on websites",
      "WhatsApp ordering & support",
      "HR & internal FAQs",
      "Appointment booking",
    ],
    faqs: [
      {
        q: "What platforms do chatbots work on?",
        a: "Website, WhatsApp, Instagram, and Messenger - we can also build custom channel integrations.",
      },
    ],
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    category: "AI & Automation",
    short:
      "Automated campaigns, broadcasts, and support on the channel your customers use most.",
    icon: "message",
    description:
      "Send, reply, and nurture on WhatsApp automatically - with approved templates, smart broadcasting, and two-way conversations.",
    benefits: [
      "Reach customers on their most-used app",
      "Automated replies 24/7",
      "Templates that comply with WhatsApp policies",
    ],
    features: [
      "Broadcasts & sequences",
      "Two-way chat automation",
      "CRM sync",
      "Order & payment links",
    ],
    technologies: ["WhatsApp Business API", "Node.js", "CRM integrations"],
    useCases: [
      "Order updates",
      "Appointment reminders",
      "Marketing broadcasts",
      "Support resolution",
    ],
    faqs: [
      {
        q: "Is WhatsApp automation allowed for marketing?",
        a: "Yes - when using approved business templates and opted-in contacts, which we manage for you.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    category: "AI & Automation",
    short: "Connect your tools and eliminate manual handoffs between systems.",
    icon: "workflow",
    description:
      "We automate the hand-offs between your apps - approvals, notifications, data syncs, and reporting - so nothing slips through the cracks.",
    benefits: [
      "Fewer manual steps between tools",
      "Faster approvals and escalations",
      "Full audit trail of every workflow",
    ],
    features: [
      "Approval workflows",
      "Multi-tool integrations",
      "Scheduled data syncs",
      "Alerts & escalation",
    ],
    technologies: ["Node.js", "n8n", "Zapier", "Webhooks", "APIs"],
    useCases: [
      "Invoice approvals",
      "Onboarding sequences",
      "Cross-team notifications",
      "Data pipeline syncs",
    ],
    faqs: [
      {
        q: "Do we need to change our current tools?",
        a: "No. We connect the tools you already use so workflows move data automatically between them.",
      },
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    category: "Development",
    short:
      "From idea to subscription - multi-tenant SaaS with billing, dashboards, and scale.",
    icon: "cloud",
    description:
      "We build multi-tenant SaaS products with onboarding, subscription billing, analytics, and infrastructure that scales with your customers.",
    benefits: [
      "Multi-tenant architecture from day one",
      "Subscription billing & usage metering",
      "Admin dashboards and self-serve onboarding",
    ],
    features: [
      "Tenant isolation & onboarding",
      "Stripe/Razorpay billing",
      "Usage analytics",
      "CI/CD & auto-scaling",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    useCases: [
      "B2B SaaS products",
      "Vertical SaaS",
      "Marketplace platforms",
      "Subscription tools",
    ],
    faqs: [
      {
        q: "Can you take our SaaS from idea to launch?",
        a: "Yes - we handle product design, development, billing, and launch infrastructure.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Marketing",
    short:
      "Full-funnel campaigns across paid, organic, and social that drive measurable revenue.",
    icon: "megaphone",
    description:
      "We plan and run marketing that is tied to revenue - paid ads, social, email, and content working together across the funnel.",
    benefits: [
      "Campaigns tied to pipeline, not vanity metrics",
      "Full-funnel coordination",
      "Transparent monthly reporting",
    ],
    features: [
      "Performance campaigns",
      "Social media management",
      "Email & automation",
      "Landing page optimisation",
    ],
    technologies: ["Google Ads", "Meta Ads", "GA4", "Email platforms"],
    useCases: [
      "Lead generation",
      "Brand awareness",
      "Product launches",
      "Retention campaigns",
    ],
    faqs: [
      {
        q: "What budget do we need?",
        a: "We start with paid pilots from ₹50k–₹1L/month, scaling what proves to return.",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    category: "Marketing",
    short:
      "Technical SEO, content, and authority building that compounds organic growth.",
    icon: "search",
    description:
      "We grow organic traffic with technical SEO, on-page optimisation, and content that targets the queries your buyers actually search.",
    benefits: [
      "Compounding organic traffic",
      "Technical health that ranks",
      "Content mapped to buying intent",
    ],
    features: [
      "Technical SEO audits",
      "On-page optimisation",
      "Content strategy & briefs",
      "Local SEO",
    ],
    technologies: ["GA4", "Search Console", "Screaming Frog", "Ahrefs"],
    useCases: [
      "SaaS & tech companies",
      "Local businesses",
      "E-commerce",
      "B2B lead generation",
    ],
    faqs: [
      {
        q: "When do we see SEO results?",
        a: "Real movement typically starts at 3 months and compounds over 6–12 months.",
      },
    ],
  },
  {
    slug: "geo-aeo",
    title: "GEO & AEO",
    category: "Marketing",
    short:
      "Get found in AI search - Generative and Answer Engine Optimisation.",
    icon: "search",
    description:
      "As buyers increasingly ask ChatGPT, Perplexity, and AI Overviews, we optimise your brand to be the answer - not just ranked in a list.",
    benefits: [
      "Visible in AI answers & citations",
      "Schema and structured content done right",
      "Positioning for the next search era",
    ],
    features: [
      "GEO content engineering",
      "Answer schema & FAQs",
      "AI search monitoring",
      "Entity & citation building",
    ],
    technologies: ["Schema.org", "Structured content", "AI search platforms"],
    useCases: [
      "Brands in competitive research-heavy niches",
      "SaaS & professional services",
      "Marketplace listings",
    ],
    faqs: [
      {
        q: "What is GEO vs AEO?",
        a: "GEO optimises how generative engines cite you; AEO optimises structured answers for voice and AI assistants.",
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding & Design",
    category: "Creative",
    short:
      "Brand identity, UI/UX, and design systems that make your product feel premium.",
    icon: "palette",
    description:
      "From logo and identity to product UI/UX, we craft cohesive brands and interfaces that build trust and convert.",
    benefits: [
      "Cohesive identity across every touchpoint",
      "Interfaces designed around users",
      "Design systems your team can reuse",
    ],
    features: [
      "Brand identity & guidelines",
      "UI/UX design",
      "Design systems",
      "Prototyping & testing",
    ],
    technologies: ["Figma", "Design tokens", "Prototyping tools"],
    useCases: [
      "Startup branding",
      "Product UI/UX",
      "Rebrands",
      "Design systems",
    ],
    faqs: [
      {
        q: "Do you do UX research?",
        a: "Yes - discovery, user interviews, and usability testing inform every design we ship.",
      },
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    category: "Infrastructure",
    short:
      "AWS and Azure architecture, deployment, and DevOps that keep you fast and secure.",
    icon: "server",
    description:
      "We architect, migrate, and run your infrastructure on AWS and Azure - with CI/CD, monitoring, and security baked in.",
    benefits: [
      "Cost-efficient, auto-scaling infrastructure",
      "Reliable CI/CD and zero-downtime deploys",
      "Security, backups, and monitoring",
    ],
    features: [
      "Cloud architecture",
      "CI/CD pipelines",
      "Containerisation (Docker/Kubernetes)",
      "Monitoring & incident response",
    ],
    technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
    useCases: [
      "SaaS scaling",
      "Cloud migration",
      "High-availability apps",
      "Compliance-ready hosting",
    ],
    faqs: [
      {
        q: "Can you manage our infrastructure?",
        a: "Yes - we offer ongoing DevOps and SRE-style support alongside deployments.",
      },
    ],
  },
];

export const serviceCategories = [
  "All",
  "Development",
  "AI & Automation",
  "Marketing",
  "Creative",
  "Infrastructure",
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
