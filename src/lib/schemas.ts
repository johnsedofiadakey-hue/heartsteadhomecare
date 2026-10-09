import { z } from "zod";

const text = (max = 1000) => z.string().trim().min(1).max(max);
const optionalText = (max = 1000) => z.string().trim().max(max);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100);

export const siteSchema = z.object({
  settings: z.object({
    brandName: text(120), tagline: text(200), phone: text(30), publicEmail: z.email().max(200),
    address: text(250), serviceArea: text(250), heroImage: text(1000), heroImageAlt: text(250), familyImage: text(1000), familyImageAlt: text(250), caregiverImage: text(1000), caregiverImageAlt: text(250), paymentImage: text(1000), paymentImageAlt: text(250),
  }),
  home: z.object({
    heroTitle: text(220), introTitle: text(180), introText: text(2000), careTitle: text(180), careText: text(2000), teamTitle: text(180), teamText: text(2000),
    serviceTitle: text(180), serviceText: text(2000), promiseTitle: text(180), promiseText: text(2000), benefitsTitle: text(180),
    benefit1Title: text(120), benefit1Text: text(1000), benefit2Title: text(120), benefit2Text: text(1000),
    benefit3Title: text(120), benefit3Text: text(1000), benefit4Title: text(120), benefit4Text: text(1000),
  }),
  about: z.object({ lead: text(2000), mission: text(3000), story: text(5000), team: text(3000), approach: text(3000), note: text(3000) }),
  pages: z.object({
    servicesLead: text(2000), contactLead: text(2000), contactFollowUp: text(1000),
    careersLead: text(2000), careersWhyJoin: text(3000), careersResources: text(2000), careersBenefits: text(3000), careersQualifications: text(3000), paymentLead: text(2000),
    paymentIntro: text(3000), paymentHowWeHelp: text(3000), paymentChecklist: text(3000), serviceAreaLead: text(1000), testimonialsLead: text(1000),
    privacyPolicy: text(20000), termsOfService: text(20000),
  }),
  services: z.array(z.object({ slug, title: text(120), summary: text(500), intro: text(5000), image: text(1000), category: z.enum(["Care schedules", "Everyday support", "Specialized care", "Care guides"]), featured: z.boolean().optional() })).max(100),
  jobs: z.array(z.object({ id: slug, title: text(140), employmentType: text(100), location: text(150), summary: text(3000), published: z.boolean() })).max(200),
  testimonials: z.array(z.object({ id: slug, quote: text(2000), name: text(120), location: optionalText(120), published: z.boolean() })).max(200),
  posts: z.array(z.object({ slug, title: text(180), excerpt: text(500), body: text(30000), image: text(1000), published: z.boolean() })).max(200),
}).superRefine((site, ctx) => {
  for (const [name, items] of [["services", site.services], ["jobs", site.jobs], ["testimonials", site.testimonials], ["posts", site.posts]] as const) {
    const values = items.map((item) => "slug" in item ? item.slug : item.id);
    if (new Set(values).size !== values.length) ctx.addIssue({ code: "custom", message: `Duplicate ${name} identifier.` });
  }
});

export const inquirySchema = z.object({
  firstName: text(80), lastName: text(80), email: z.email().max(200), phone: text(30), careZipCode: z.string().regex(/^\d{5}$/), typeOfCare: text(120), intent: z.enum(["care", "work", "question"]), website: z.string().max(200).optional(), smsOptIn: z.boolean().optional(),
});

export const applicationSchema = z.object({
  firstName: text(80), lastName: text(80), email: z.email().max(200), phone: text(30), address1: text(200), address2: optionalText(200), city: text(100), state: text(40), zipCode: text(10), position: text(120), drives: z.enum(["Yes", "No"]), hasStateLicense: z.enum(["Yes", "No", "In progress"]), referralSource: optionalText(120), jobId: text(100), website: z.string().max(200).optional(),
});
