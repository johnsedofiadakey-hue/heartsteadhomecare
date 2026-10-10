export type Service = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  image: string;
  category: "Care schedules" | "Everyday support" | "Specialized care" | "Care guides";
  featured?: boolean;
};

export type Job = {
  id: string;
  title: string;
  employmentType: string;
  location: string;
  summary: string;
  published: boolean;
};

export type Testimonial = { id: string; quote: string; name: string; location?: string; published: boolean };
export type Post = { slug: string; title: string; excerpt: string; body: string; image: string; published: boolean };

export type SiteData = {
  settings: {
    brandName: string;
    tagline: string;
    phone: string;
    publicEmail: string;
    address: string;
    serviceArea: string;
    heroImage: string;
    heroImageAlt: string;
    heroCoverImage: string;
    heroCoverImageAlt: string;
    heroMobileImage: string;
    heroMobileImageAlt: string;
    familyImage: string;
    familyImageAlt: string;
    caregiverImage: string;
    caregiverImageAlt: string;
    paymentImage: string;
    paymentImageAlt: string;
    instagramUrl: string;
    tiktokUrl: string;
    facebookUrl: string;
  };
  home: {
    heroTitle: string;
    introTitle: string;
    introText: string;
    careTitle: string;
    careText: string;
    teamTitle: string;
    teamText: string;
    serviceTitle: string;
    serviceText: string;
    promiseTitle: string;
    promiseText: string;
    benefitsTitle: string;
    benefit1Title: string;
    benefit1Text: string;
    benefit2Title: string;
    benefit2Text: string;
    benefit3Title: string;
    benefit3Text: string;
    benefit4Title: string;
    benefit4Text: string;
  };
  about: { lead: string; mission: string; story: string; team: string; approach: string; note: string };
  pages: {
    servicesLead: string;
    contactLead: string;
    contactFollowUp: string;
    careersLead: string;
    careersWhyJoin: string;
    careersResources: string;
    careersBenefits: string;
    careersQualifications: string;
    paymentLead: string;
    paymentIntro: string;
    paymentHowWeHelp: string;
    paymentChecklist: string;
    serviceAreaLead: string;
    testimonialsLead: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  services: Service[];
  jobs: Job[];
  testimonials: Testimonial[];
  posts: Post[];
};

const img = {
  hero: "/images/brand/hero.webp",
  home: "/images/brand/care-at-home.webp",
  planning: "/images/brand/care-planning.webp",
  daily: "/images/brand/daily-support.webp",
  mobility: "/images/brand/mobility-support.webp",
  companionship: "/images/brand/companionship.webp",
};

const service = (slug: string, title: string, summary: string, category: Service["category"], image = img.home, featured = false): Service => ({
  slug, title, summary, category, image, featured,
  intro: `${title} can be shaped around a person’s home, routines, and goals. Talk with Heartstead Home Care about the support your family needs and what is available in your area.`,
});

export const defaultSite: SiteData = {
  settings: {
    brandName: "Heartstead Home Care",
    tagline: "Compassionate care. Comfort at home.",
    phone: "609-910-2632",
    publicEmail: "Heartsteadh@gmail.com",
    address: "23 Orchard Rd, Suite 210, Skillman, New Jersey 08558",
    serviceArea: "Skillman and surrounding New Jersey communities",
    heroImage: img.hero,
    heroImageAlt: "Heartstead caregiver laughing with an older man on the sofa at home",
    heroCoverImage: "/images/family-care.webp",
    heroCoverImageAlt: "An older woman smiling with her daughter at home",
    heroMobileImage: "/images/care-pair.webp",
    heroMobileImageAlt: "An older woman smiling with her caregiver at home",
    familyImage: img.home,
    familyImageAlt: "Heartstead caregiver making tea with an older woman in her kitchen",
    caregiverImage: img.daily,
    caregiverImageAlt: "Heartstead caregiver preparing a fresh meal with an older man in his kitchen",
    paymentImage: img.planning,
    paymentImageAlt: "Heartstead care coordinator reviewing a care plan with an older woman and her daughter",
    instagramUrl: "https://www.instagram.com/heartstead_homecare/",
    tiktokUrl: "https://www.tiktok.com/@n.j.heartstead.ho",
    facebookUrl: "https://www.facebook.com/share/1FFWHVDVVj/?mibextid=wwXIfr",
  },
  home: {
    heroTitle: "Live-in & Hourly Home Care Always Available for Your Loved Ones",
    introTitle: "Why Choose Heartstead Home Care?",
    introText: "At Heartstead Home Care, we believe care should feel personal, respectful, and reassuring. We take time to understand each person’s needs, preferences, and daily routines, then help families find support that fits.\n\nOur caregivers provide compassionate assistance to help clients feel comfortable and supported in the place they call home. Families can count on clear communication, thoughtful care, and a team that treats every client with dignity.\n\nChoose Heartstead for care centered on your loved one.",
    careTitle: "Care for Every Situation",
    careText: "From a few hours of companionship to consistent daily help, our care options can be tailored to your loved one’s needs and preferred routine.",
    teamTitle: "Compassionate Care Team",
    teamText: "Care begins with people who listen, respect routines, and bring warmth into each visit.",
    serviceTitle: "Care designed around your needs",
    serviceText: "Explore the support options available to discuss with Heartstead Home Care.",
    promiseTitle: "Comfort at home begins with listening.",
    promiseText: "We believe care should be personal, respectful, and shaped around the person receiving it. You can tell us what matters most to your family when we talk.",
    benefitsTitle: "With Heartstead Home Care You Get…",
    benefit1Title: "Personalized Support",
    benefit1Text: "Care conversations begin with your loved one’s own needs and routines.",
    benefit2Title: "Comfort at Home",
    benefit2Text: "Practical help in familiar surroundings.",
    benefit3Title: "Flexible Care Options",
    benefit3Text: "Explore schedules and services that fit your family.",
    benefit4Title: "Clear Communication",
    benefit4Text: "Know who to contact and what happens next.",
  },
  about: {
    lead: "Heartstead Home Care brings thoughtful support into the place people know best. We listen to each family's needs, respect the routines that make a house feel like home, and help loved ones explore care with confidence.",
    mission: "To support each person with dignity, warmth, and practical care that fits their life at home.",
    story: "Heartstead Home Care is based in Skillman, New Jersey. We believe families deserve clear conversations and care shaped around the person receiving it. Our story, leadership, and team biographies will be added as they are supplied and approved.",
    team: "Good care begins with people who pay attention. We work to understand what matters to each client, communicate with their family, and make the daily routine feel familiar and respectful.",
    approach: "Every person's needs and preferences are different. We begin with a conversation about daily life, the support that would help, and the schedule the family has in mind. Together, we can discuss the next steps.",
    note: "When you invite care into your home, trust matters. Heartstead is here to listen carefully, answer your questions, and help you understand the options available for your loved one.",
  },
  pages: {
    servicesLead: "At Heartstead Home Care, we believe support should fit the person, not the other way around. Explore care options ranging from companionship and help with everyday routines to more involved support at home, then speak with our team about what is available for your family.",
    contactLead: "At Heartstead Home Care, we care for your family with warmth and respect. We’re here to answer your questions about in-home care, our services, and the next steps for someone you love.",
    contactFollowUp: "Reach out today to tell us what your family is looking for. We’ll help you explore the support that may be right for your loved one.",
    careersLead: "Make a meaningful difference in someone’s life every day. Join the Heartstead Home Care team and help clients feel supported, respected, and comfortable at home.\n\nWe’d love to learn about your caregiving experience, skills, and availability. Explore our open positions and apply to join our team.",
    careersWhyJoin: "Caregiving is personal work. Our team will share current roles, requirements, schedules, and pay details during the hiring process.",
    careersResources: "Looking for information about a role or already part of the team? Contact the Skillman office for current caregiver resources, policies, and scheduling questions.",
    careersBenefits: "Meaningful work supporting people at home\nA chance to build lasting relationships\nRole details and schedules discussed during hiring\nA local office to answer your questions",
    careersQualifications: "A warm and respectful approach to care\nDependable communication with clients and families\nEligibility to work in the United States\nAny credentials required for the role you apply for",
    paymentLead: "Understanding the cost of home care can feel overwhelming. We’re here to help you explore the options available and discuss a care plan that fits your loved one’s needs and your family’s budget.",
    paymentIntro: "Our team will explain the costs clearly, answer your questions, and help you understand the next steps. Contact us to talk through your options.",
    paymentHowWeHelp: "Start with the support your loved one needs and the schedule you have in mind. Our team can discuss the services available, explain the next steps, and share current payment details directly with you before care is arranged.",
    paymentChecklist: "Current rates and minimum visit length\nHow changes to the schedule are handled\nWhich payment methods Heartstead accepts\nAny documents an insurer or benefit program requires",
    serviceAreaLead: "Home care rooted in Skillman, New Jersey.",
    testimonialsLead: "Hear from clients and families about their experiences with Heartstead Home Care.",
    privacyPolicy: "DRAFT FOR OWNER REVIEW. Heartstead Home Care receives the details you choose to submit through this website’s inquiry and application forms. We use that information to respond to your request. Website administrators authorized by Heartstead can access these submissions. Please do not submit Social Security numbers, medical records, or detailed health information through public forms. Heartstead must approve this policy, including retention, vendors, and contact rights, before public launch.",
    termsOfService: "DRAFT FOR OWNER REVIEW. This website provides general information about Heartstead Home Care and a way to contact the team. Submitting a form does not establish a care relationship or guarantee service availability. The details of any care arrangement will be confirmed directly with Heartstead. Heartstead must approve final terms before public launch.",
  },
  services: [
    service("live-in-care", "Live-In Care", "Consistent support and companionship at home.", "Care schedules", img.home, true),
    service("hourly-care", "Hourly Care", "Flexible visits for daily tasks and personal routines.", "Care schedules", img.daily, true),
    service("overnight-care", "Overnight Care", "Reassuring help during the night.", "Care schedules", img.companionship, true),
    service("always-on-virtual-care", "Always On Virtual Care", "Technology-supported care options to discuss with our team.", "Care schedules", img.planning),
    service("24-hour-home-care", "24-Hour Home Care", "Around-the-clock support through scheduled shifts.", "Care schedules", img.hero),
    service("personal-care", "Personal Care", "Respectful help with everyday personal routines.", "Everyday support", img.daily),
    service("mobility-care", "Mobility Care", "Support with movement and getting around the home.", "Everyday support", img.mobility),
    service("companion-care", "Companion Care", "Meaningful connection and help with daily life.", "Everyday support", img.companionship, true),
    service("homemaker-services", "Homemaker Services", "Practical help with meals and the home environment.", "Everyday support", img.daily),
    service("elderly-sitter-services", "Sitters for the Elderly", "Attentive company when a loved one should not be alone.", "Everyday support", img.companionship),
    service("caregiver-services", "Caregiver Services", "Find dependable support for life at home.", "Everyday support"),
    service("private-duty-caregiver", "Private Duty Caregiver", "Dedicated one-to-one assistance at home.", "Everyday support", img.mobility),
    service("home-health-aide", "Home Health Aide", "Aide support suited to an individual care plan.", "Everyday support", img.planning),
    service("personal-care-aide", "Personal Care Aide", "Personal assistance delivered with dignity.", "Everyday support", img.mobility),
    service("alzheimers-dementia-care", "Alzheimer’s & Dementia Care", "Support for people living with memory changes.", "Specialized care", img.companionship),
    service("in-home-memory-care", "In-Home Memory Care", "Care built around familiar surroundings and routines.", "Specialized care", img.companionship),
    service("hospital-to-home-care", "Hospital-to-Home Transition Care", "Practical support during the move back home.", "Specialized care", img.mobility),
    service("palliative-care", "Palliative Care Support", "Comfort-focused daily support alongside a care team.", "Specialized care"),
    service("parkinsons-care", "Parkinson’s Home Care", "Home support for routines affected by Parkinson’s.", "Specialized care"),
    service("stroke-recovery-care", "Stroke Recovery Home Care", "Assistance with daily routines during recovery.", "Specialized care", img.mobility),
    service("respite-care", "Respite Care", "A planned break for family caregivers.", "Specialized care", img.planning),
    service("veterans-home-care", "Veterans Home Care", "Home care options for veterans and their families.", "Specialized care"),
    service("specialized-complex-care", "Specialized & Complex Care", "Discuss more involved care needs with our team.", "Specialized care", img.planning),
    service("home-care-for-disabled-adults", "Home Care for Disabled Adults", "Personalized help that supports independence at home.", "Specialized care"),
    service("non-medical-home-care", "Non-Medical Home Care", "Everyday assistance and companionship at home.", "Care guides"),
    service("aging-in-place-home-care", "Aging in Place Home Care", "Support for remaining in a familiar home.", "Care guides"),
    service("in-home-assisted-living", "In-Home Assisted Living", "Explore home-based alternatives to facility living.", "Care guides", img.daily),
    service("home-health-care-vs-home-care", "Home Health Care vs. Home Care", "Understand the difference between two common care terms.", "Care guides", img.planning),
  ],
  jobs: [],
  testimonials: [],
  posts: [
    { slug: "choosing-home-care", title: "How to Choose Home Care for a Loved One", excerpt: "Questions to help families compare care options and plan the first conversation.", body: "Start by writing down the help your loved one needs each day. Ask each provider how they match caregivers, handle changes in the schedule, and keep families informed. Confirm the services available in your area, how care is supervised, and what the agreement includes. A good first conversation should leave you with clear next steps and room to ask more questions.", image: img.planning, published: true },
    { slug: "planning-care-at-home", title: "Planning Support at Home", excerpt: "A simple way to turn daily concerns into a useful care plan.", body: "Look at the moments of the day when support would make the biggest difference: getting up, meals, mobility, appointments, and evenings. Include your loved one’s preferences and existing routines. Share this list when you speak with a care coordinator so the discussion starts with the person, not just a schedule.", image: img.home, published: true },
    { slug: "first-care-visit", title: "What to Discuss Before a First Care Visit", excerpt: "Practical information to share before someone begins helping at home.", body: "Prepare a short list of contacts, household routines, access instructions, and preferences that help the visit go smoothly. Explain what support is expected and where supplies are kept. Leave time for your loved one and caregiver to meet, ask questions, and agree on the routine together.", image: img.daily, published: true },
  ],
};
