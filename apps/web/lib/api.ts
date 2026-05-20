export type AppHref =
  | "/"
  | "/about"
  | "/programs"
  | "/impact"
  | "/volunteer"
  | "/blog"
  | "/partners"
  | "/contact"
  | "/donate"
  | "/reports"
  | "/careers"
  | "/terms"
  | "/privacy";

export type LinkItem = {
  label: string;
  href: AppHref;
};

export type ResourceLink = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type TrustPillar = {
  icon: string;
  title: string;
  body: string;
};

export type DonationTier = {
  amount: number;
  label: string;
  impact: string;
};

export type DashboardPoint = {
  month: string;
  value: number;
};

export type DashboardRegion = {
  label: string;
  value: number;
};

export type DashboardReport = {
  title: string;
  type: string;
};

export type DashboardPayload = {
  totals: Metric[];
  growth: DashboardPoint[];
  regions: DashboardRegion[];
  reports: DashboardReport[];
};

export type ContactPayload = {
  phone: string;
  email: string;
  address: string;
  whatsappLabel: string;
  socials: { label: string; href: string }[];
};

export type FooterPayload = {
  summary: string;
  quickLinks: LinkItem[];
  resources: ResourceLink[];
};

export type ContentItem = {
  id: number;
  type: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  metadata: Record<string, unknown>;
};

export type SitePayload = {
  hero: {
    eyebrow: string;
    title: string;
    summary: string;
    primaryAction?: LinkItem;
    secondaryAction?: LinkItem;
  };
  impactMetrics: Metric[];
  trustPillars: TrustPillar[];
  donationTiers: DonationTier[];
  contact: ContactPayload;
  dashboard: DashboardPayload;
  footer: FooterPayload;
  programs: ContentItem[];
  stories: ContentItem[];
  campaigns: ContentItem[];
  partners: ContentItem[];
};

export type ContentType = "program" | "story" | "campaign" | "partner";

export const navigationLinks: LinkItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Blog", href: "/blog" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" }
];

export const mobileNavigationLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Programs", href: "/programs", icon: "layout-grid" },
  { label: "Impact", href: "/impact", icon: "chart-column" },
  { label: "Donate", href: "/donate", icon: "heart" },
  { label: "Contact", href: "/contact", icon: "phone" }
] as const satisfies ReadonlyArray<{ label: string; href: AppHref; icon: string }>;

export const fallbackSite: SitePayload = {
  hero: {
    eyebrow: "Novessa Empowerment Foundation",
    title: "Every child deserves a future. Help us build theirs.",
    summary:
      "Empowering vulnerable communities across Nigeria through mental wellbeing, education access, skills development, and practical support.",
    primaryAction: { label: "Donate Now", href: "/donate" },
    secondaryAction: { label: "Learn Our Story", href: "/about" }
  },
  impactMetrics: [
    { label: "Lives Impacted", value: "12.8k" },
    { label: "Raised", value: "N42M" },
    { label: "Partners", value: "23" },
    { label: "Programs", value: "6" }
  ],
  trustPillars: [
    {
      icon: "shield-check",
      title: "Trust You Can See",
      body: "Quarterly reporting, audited stewardship, and transparent public accountability."
    },
    {
      icon: "wallet",
      title: "Give in Your Currency",
      body: "Supporters can donate in NGN, USD, and GBP through a secure checkout flow."
    },
    {
      icon: "gauge",
      title: "Impact in 72 Hours",
      body: "Emergency support is routed quickly through our local partner network."
    }
  ],
  donationTiers: [
    { amount: 5000, label: "Basic", impact: "Supply school kits for 2 children" },
    { amount: 15000, label: "Impact", impact: "Provide 30 hot meals this month" },
    { amount: 50000, label: "Hero", impact: "Fund counseling and outreach sessions" },
    { amount: 100000, label: "Legacy", impact: "Support vocational training grants" }
  ],
  contact: {
    phone: "+234 907 555 0144",
    email: "hello@novessafoundation.org",
    address: "Lagos, Nigeria",
    whatsappLabel: "Live support available 9AM - 5PM WAT",
    socials: [
      { label: "Instagram", href: "https://instagram.com/novessafoundation" },
      { label: "LinkedIn", href: "https://linkedin.com/company/novessafoundation" },
      { label: "Facebook", href: "https://facebook.com/novessafoundation" }
    ]
  },
  dashboard: {
    totals: [
      { label: "Funds Raised", value: "N842.5M" },
      { label: "Lives Impacted", value: "128,400+" },
      { label: "Education Projects", value: "342" },
      { label: "Locations Reached", value: "56 Villages" }
    ],
    growth: [
      { month: "Jan", value: 22 },
      { month: "Feb", value: 31 },
      { month: "Mar", value: 44 },
      { month: "Apr", value: 42 },
      { month: "May", value: 58 },
      { month: "Jun", value: 67 }
    ],
    regions: [
      { label: "Lagos", value: 36 },
      { label: "Ogun", value: 24 },
      { label: "Oyo", value: 18 },
      { label: "Kaduna", value: 12 },
      { label: "Enugu", value: 10 }
    ],
    reports: [
      { title: "2023 Annual Impact Report", type: "PDF" },
      { title: "Q4 2023 Financial Audit", type: "PDF" },
      { title: "Governance & Ethical Guidelines", type: "PDF" }
    ]
  },
  footer: {
    summary: "Empowering Nigerian communities through sustainable impact and radical empathy.",
    quickLinks: [
      { label: "About Us", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Impact", href: "/impact" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Blog", href: "/blog" },
      { label: "Partners", href: "/partners" }
    ],
    resources: [
      { label: "Annual Reports", href: "/reports" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Careers", href: "/careers" }
    ]
  },
  programs: [
    {
      id: 1001,
      type: "program",
      slug: "mental-health-awareness",
      title: "Mental Health Awareness",
      summary: "Breaking stigma through community workshops, safe-space sessions, and culturally aware counseling.",
      body: "Novessa works with schools, healthcare workers, and community leaders to normalize support and connect people to care.",
      category: "Mental Health",
      imageUrl: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: {
        statusLabel: "Active",
        raised: "N42.5M",
        goal: "N50M",
        progressPercent: 85,
        heroMetrics: [
          { label: "Beneficiaries reached", value: "12.4k" },
          { label: "Stigma reduction rate", value: "84%" }
        ],
        whyItMatters: [
          "Mental health challenges are still misunderstood in many communities, and silence often replaces support.",
          "Novessa creates informed, practical routes to care that are rooted in empathy and local trust."
        ],
        howItWorks: [
          { title: "Community Outreach", body: "Awareness sessions led with schools, faith leaders, and local advocates." },
          { title: "Safe Access", body: "Confidential counseling entry points online and in person." },
          { title: "Direct Counseling", body: "Subsidized support for individuals needing more sustained care." }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80"
        ],
        supportAmounts: [25000, 50000, 100000, 250000]
      }
    },
    {
      id: 1002,
      type: "program",
      slug: "educational-scholarships",
      title: "Educational Scholarships",
      summary: "Removing financial barriers through school fees support, supplies, and mentorship.",
      body: "Our scholarship pathway backs high-potential learners with the resources and confidence they need to remain in school and thrive.",
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: { statusLabel: "Active", raised: "N18.2M", goal: "N28M", progressPercent: 65 }
    },
    {
      id: 1003,
      type: "program",
      slug: "vocational-training",
      title: "Vocational Training",
      summary: "Practical training in digital, technical, and leadership skills for independent futures.",
      body: "We equip young people and women with employable skills, confidence, and access to tools for economic self-reliance.",
      category: "Skills",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: { statusLabel: "Active", raised: "N9.8M", goal: "N20M", progressPercent: 49 }
    },
    {
      id: 1004,
      type: "program",
      slug: "community-outreach",
      title: "Community Outreach",
      summary: "School, rural, and neighborhood outreach that opens conversation and connects people to care.",
      body: "Program teams run awareness drives, caregiver sessions, and referral pathways across Nigeria.",
      category: "Outreach",
      imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metadata: { statusLabel: "Active", raised: "N6.4M", goal: "N12M", progressPercent: 53 }
    },
    {
      id: 1005,
      type: "program",
      slug: "neurodiversity-support",
      title: "Neurodiversity Support",
      summary: "Resources and guidance for neurodivergent people, families, and educators.",
      body: "This work helps caregivers and schools respond with more informed, compassionate support.",
      category: "Inclusive Care",
      imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metadata: { statusLabel: "Active", raised: "N4.9M", goal: "N10M", progressPercent: 49 }
    },
    {
      id: 1006,
      type: "program",
      slug: "women-leadership",
      title: "Women Leadership Circles",
      summary: "Mentoring, confidence-building, and leadership pathways for women and girls.",
      body: "Leadership circles combine education, peer support, and practical development goals.",
      category: "Women",
      imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metadata: { statusLabel: "Active", raised: "N7.1M", goal: "N15M", progressPercent: 47 }
    }
  ],
  stories: [
    {
      id: 2001,
      type: "story",
      slug: "how-n5000-changed-aminas-school-year",
      title: "How N5,000 Changed Amina's Entire School Year",
      summary: "A single scholarship intervention reopened the path back to school for a bright ten-year-old learner.",
      body: "Amina's story shows how small, direct support can remove the hidden costs that keep children from school.",
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: {
        readTime: "5 min read",
        authorName: "Sarah Jenkins",
        authorRole: "Program Lead",
        publishedAt: "2024-05-15",
        pullQuote: "I used to stay home three days a week because I did not have what I needed for school.",
        stats: [
          { label: "Cost to enroll", value: "N5,000" },
          { label: "Days out of school", value: "14" },
          { label: "Current grade", value: "A+" }
        ],
        article: [
          "In many parts of Nigeria, the transition from one school year to the next is blocked by uniforms, books, and small school fees that families cannot absorb.",
          "Novessa's micro-grant support focuses on those invisible barriers. In Amina's case, one targeted grant covered notebooks, a uniform, and shoes within 48 hours.",
          "The immediate result was attendance. The deeper result was confidence, belonging, and a renewed sense that school was still hers to claim."
        ],
        relatedSlugs: [
          "lagos-literacy-drive-phase-one",
          "clean-water-for-twelve-villages",
          "digital-horizons-for-young-builders"
        ],
        tags: ["Education", "Nigeria", "Micro-donations"]
      }
    },
    {
      id: 2002,
      type: "story",
      slug: "lagos-literacy-drive-phase-one",
      title: "Lagos Literacy Drive: Phase 1 Complete",
      summary: "Five school clusters now have reading materials, teacher support, and peer-led learning circles.",
      body: "The first phase of our literacy drive focused on practical reading access and consistent volunteer support.",
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metadata: { readTime: "6 min read", authorName: "Fatima Yusuf", authorRole: "Programs Director" }
    },
    {
      id: 2003,
      type: "story",
      slug: "clean-water-for-twelve-villages",
      title: "Clean Water for 12 Villages in Northern Nigeria",
      summary: "Community-managed boreholes are cutting illness rates and travel time for women and children.",
      body: "This story traces a local partnership model that keeps water access community-owned and maintained.",
      category: "Sustainability",
      imageUrl: "https://images.unsplash.com/photo-1495555687392-47f9e1f88b5e?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metadata: { readTime: "8 min read", authorName: "Samuel Bankole", authorRole: "Operations Lead" }
    },
    {
      id: 2004,
      type: "story",
      slug: "digital-horizons-for-young-builders",
      title: "Digital Horizons for Young Builders",
      summary: "A new cohort of trainees is turning creative and technical skills into steady work.",
      body: "From design fundamentals to client delivery, this track is helping participants build real momentum.",
      category: "Skills",
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metadata: { readTime: "4 min read", authorName: "Samson Adedeji", authorRole: "Founder" }
    }
  ],
  campaigns: [
    {
      id: 3001,
      type: "campaign",
      slug: "community-care-fund",
      title: "Community Care Fund",
      summary: "Fund outreach, counseling pathways, school support, and practical care resources.",
      body: "Every gift helps Novessa sustain long-term programs built around dignity, wellbeing, and opportunity.",
      category: "Donations",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: {
        messageToDonors: "Your generosity fuels sustainable change across Nigeria.",
        monthlyPlans: [
          { name: "Seed Partner", amount: 2500, description: "Plant the foundation of change." },
          { name: "Harvest Partner", amount: 10000, description: "Fuel active programs month after month." },
          { name: "Legacy Partner", amount: 50000, description: "Help fund large-scale, long-term work." }
        ]
      }
    }
  ],
  partners: [
    {
      id: 4001,
      type: "partner",
      slug: "apex-financial-group",
      title: "Apex Financial Group",
      summary: "Helping power transparent giving infrastructure and donor stewardship systems.",
      body: "Apex supports payment operations, reporting, and compliance workflows for campaign delivery.",
      category: "Financial Inclusion",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: { categoryLabel: "Financial Inclusion", ctaLabel: "Banking Partner" }
    },
    {
      id: 4002,
      type: "partner",
      slug: "flowpay-solutions",
      title: "FlowPay Solutions",
      summary: "Enabling smoother donation experiences and digital transaction confidence.",
      body: "FlowPay works with us on checkout experience, payment routing, and supporter trust.",
      category: "Tech Infrastructure",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: { categoryLabel: "Tech Infrastructure", ctaLabel: "Technology Lead" }
    },
    {
      id: 4003,
      type: "partner",
      slug: "global-reach-logistics",
      title: "Global Reach Logistics",
      summary: "Supporting warehousing, field delivery, and local distribution logistics.",
      body: "This partnership helps resources move reliably from coordination to community use.",
      category: "Supply Logistics",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      metadata: { categoryLabel: "Supply Logistics", ctaLabel: "Logistics Partner" }
    },
    {
      id: 4004,
      type: "partner",
      slug: "community-health-network",
      title: "Community Health Network",
      summary: "Collaborating on referral systems, workshops, and local clinical guidance.",
      body: "Our health partnerships ground mental wellness work in practical, trusted local systems.",
      category: "Healthcare",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      metadata: { categoryLabel: "Healthcare", ctaLabel: "Clinical Partner" }
    }
  ]
};

export async function getSitePayload(): Promise<SitePayload> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) return fallbackSite;
  try {
    const response = await fetch(`${baseUrl}/content/site/`, { next: { revalidate: 60 } });
    if (!response.ok) return fallbackSite;
    return response.json();
  } catch {
    return fallbackSite;
  }
}

export async function getContentItem(
  contentType: ContentType,
  slug: string
): Promise<ContentItem | null> {
  const fallbackItem =
    fallbackSite[`${contentType === "story" ? "stories" : `${contentType}s`}` as keyof SitePayload];
  const fallbackMatch = Array.isArray(fallbackItem)
    ? (fallbackItem as ContentItem[]).find((item) => item.slug === slug) ?? null
    : null;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) return fallbackMatch;
  try {
    const response = await fetch(`${baseUrl}/content/${contentType}/${slug}/`, { cache: "no-store" });
    if (!response.ok) return fallbackMatch;
    return response.json();
  } catch {
    return fallbackMatch;
  }
}

export async function getDonation(reference: string): Promise<Record<string, unknown> | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) return null;
  try {
    const response = await fetch(`${baseUrl}/donations/${reference}/`, { cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
  return response.json();
}
