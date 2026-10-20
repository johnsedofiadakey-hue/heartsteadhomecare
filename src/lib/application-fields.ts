// Single source for the caregiver application: keys, labels and sections are shared by the
// public form, the admin inbox and the notification email.

export const shiftOptions = ["Days", "Evenings", "Nights", "Weekends", "Live-in"] as const;
export const skillRatings = ["Able to do", "Need review", "Never did"] as const;

export const skillAreas = [
  { area: "Vital signs", skills: [["temperaturePulseRespiration", "Temperature, pulse & respiration"], ["bloodPressure", "Blood pressure"]] },
  { area: "Personal care", skills: [["bedBath", "Bed bath"], ["showerAssist", "Shower or tub assistance"], ["mouthCare", "Mouth care"], ["groomingDressing", "Grooming & dressing"], ["toiletingContinence", "Toileting & incontinence care"], ["occupiedBedMaking", "Occupied bed making"]] },
  { area: "Mobility & safety", skills: [["transfersPositioning", "Transfers & repositioning"], ["hoyerLift", "Hoyer lift"], ["walkingAids", "Walking with a cane, walker or wheelchair"], ["rangeOfMotion", "Range of motion"], ["fallPrevention", "Fall prevention"]] },
  { area: "Special care", skills: [["dementiaClients", "Dementia clients"], ["hospiceClients", "Hospice clients"], ["psychiatricClients", "Psychiatric clients"], ["alcoholUseConcerns", "Clients with alcohol use concerns"], ["diabeticSupport", "Diabetic care support"]] },
  { area: "Infection control", skills: [["handHygiene", "Hand hygiene & glove use"], ["soiledLinens", "Handling soiled linens"]] },
  { area: "Daily living", skills: [["mealPreparation", "Meal preparation"], ["feedingAssistance", "Feeding assistance"], ["lightHousekeeping", "Light housekeeping"], ["laundry", "Laundry"], ["medicationReminders", "Medication reminders"], ["errandsShopping", "Errands & shopping"]] },
  { area: "Communication & records", skills: [["careNotes", "Writing care notes"], ["reportingChanges", "Reporting changes to the office"]] },
] as const;

export const skillKey = (key: string) => `skill_${key}`;

const yesNoKeys = ["age18OrOlder", "validDriverLicense", "reliableTransportation", "autoInsurance", "workEligible", "relativeWorksHere", "previouslyWorkedHere",
  "currentlyWorking", "onLayoffRecall", "cprCertified", "homeCareExperience", "comfortBathing", "comfortCookingHousekeeping", "comfortSmokingHome", "drugScreenWilling"] as const;
export const applicationYesNoKeys: readonly string[] = yesNoKeys;
export const requiredYesNoKeys: readonly string[] = yesNoKeys.filter((key) => key !== "autoInsurance");
export const requiredDetailKeys: readonly string[] = ["applicationDate", ...requiredYesNoKeys, "emergency1Name", "emergency1Relationship", "emergency1Phone", "reference1Name", "reference1Phone", "signatureName", "signatureDate"];

export const applicationDetailKeys: string[] = [
  "applicationDate", "timeAtAddress", "primaryLanguage", "otherLanguages", ...yesNoKeys, "relativeName",
  "otherPosition", "availableStartDate", "weeklyHours", "shiftDays", "shiftEvenings", "shiftNights", "shiftWeekends", "shiftLiveIn", "currentWorkHours",
  "offerToPosition", "problemHandled",
  "highestGrade", "chhaTrainingLocation", "chhaTrainingCompletion", "employmentHistoryAuthorized",
  "caregivingExperience", "whyHeartstead", "mostSatisfying", "leastSatisfying", "reliability", "signatureName", "signatureDate", "certified",
  ...[1, 2].flatMap((n) => [`emergency${n}Name`, `emergency${n}Relationship`, `emergency${n}Phone`]),
  ...[1, 2, 3].flatMap((n) => [`school${n}Name`, `school${n}Award`]),
  ...[1, 2, 3].flatMap((n) => [`license${n}Type`, `license${n}Authority`, `license${n}Number`, `license${n}Expiration`]),
  ...skillAreas.flatMap(({ skills }) => skills.map(([key]) => skillKey(key))),
  ...[1, 2, 3].flatMap((n) => [`employer${n}Name`, `employer${n}Title`, `employer${n}Address`, `employer${n}Phone`, `employer${n}Supervisor`, `employer${n}From`, `employer${n}To`, `employer${n}Duties`, `employer${n}Reason`, `employer${n}DoNotContact`]),
  ...[1, 2, 3].flatMap((n) => [`reference${n}Name`, `reference${n}YearsKnown`, `reference${n}Phone`, `reference${n}Address`]),
];

export const checkboxDetailKeys = new Set(["employmentHistoryAuthorized", "certified", "shiftDays", "shiftEvenings", "shiftNights", "shiftWeekends", "shiftLiveIn", "employer1DoNotContact", "employer2DoNotContact", "employer3DoNotContact"]);

// Fields from the earlier version of the form, kept so older applications still display.
const legacySkills = [["tpr", "T.P.R. (temperature, pulse & respiration)"], ["bedBath", "Bed bath"], ["mouthCare", "Mouth care"], ["rangeOfMotion", "Range of motion"], ["occupiedBedMaking", "Occupied bed making"], ["psychiatricClients", "Psychiatric clients"], ["grooming", "Grooming"], ["dementiaClients", "Dementia clients"], ["mealPreparation", "Meal preparation"], ["alcoholUseConcerns", "Alcohol use concerns"], ["hoyerLift", "Hoyer lift"], ["hospiceClients", "Hospice clients"]] as const;
const legacyDetailKeys = ["dateOfBirth", ...legacySkills.flatMap(([key]) => [`skill${key}`, `skill${key}Years`])];
export const displayDetailKeys: string[] = [...applicationDetailKeys, ...legacyDetailKeys];

export const applicationLabels: Record<string, string> = {
  applicationDate: "Application date", timeAtAddress: "Time at address", primaryLanguage: "Primary language", otherLanguages: "Other languages spoken",
  age18OrOlder: "18 years old or older", validDriverLicense: "Valid driver license", reliableTransportation: "Reliable transportation", autoInsurance: "Current auto insurance",
  workEligible: "Eligible to work in the U.S.", relativeWorksHere: "Relative employed here", relativeName: "Relative's name", previouslyWorkedHere: "Previously worked here",
  otherPosition: "Other position", availableStartDate: "Available start date", weeklyHours: "Available hours per week",
  shiftDays: "Available: days", shiftEvenings: "Available: evenings", shiftNights: "Available: nights", shiftWeekends: "Available: weekends", shiftLiveIn: "Available: live-in",
  currentlyWorking: "Currently working", currentWorkHours: "Current hours per week", onLayoffRecall: "On layoff and subject to recall",
  homeCareExperience: "Has home care experience", comfortBathing: "Comfortable bathing or showering clients", comfortCookingHousekeeping: "Comfortable cooking & light housekeeping",
  comfortSmokingHome: "Comfortable in a home where the client smokes", drugScreenWilling: "Willing to take a pre-employment drug screen",
  offerToPosition: "What they can offer this position", problemHandled: "A problem they handled at work",
  highestGrade: "Highest grade completed", chhaTrainingLocation: "CHHA training location", chhaTrainingCompletion: "CHHA training completion", cprCertified: "CPR certified",
  employmentHistoryAuthorized: "Prior employer contact authorized", caregivingExperience: "Caregiving experience and qualifications", whyHeartstead: "Why Heartstead",
  mostSatisfying: "Most satisfying work", leastSatisfying: "Least satisfying work", reliability: "Reliability",
  signatureName: "Electronic signature", signatureDate: "Signature date", certified: "Affidavit accepted", dateOfBirth: "Date of birth",
};
for (const n of [1, 2]) Object.assign(applicationLabels, { [`emergency${n}Name`]: `Emergency contact ${n}: name`, [`emergency${n}Relationship`]: `Emergency contact ${n}: relationship`, [`emergency${n}Phone`]: `Emergency contact ${n}: phone` });
for (const n of [1, 2, 3]) Object.assign(applicationLabels, {
  [`school${n}Name`]: `School ${n}`, [`school${n}Award`]: `School ${n}: subject or degree`,
  [`license${n}Type`]: `License ${n}: type`, [`license${n}Authority`]: `License ${n}: state or authority`, [`license${n}Number`]: `License ${n}: number`, [`license${n}Expiration`]: `License ${n}: expiration`,
  [`employer${n}Name`]: `Employer ${n}: name`, [`employer${n}Title`]: `Employer ${n}: position`, [`employer${n}Address`]: `Employer ${n}: address`, [`employer${n}Phone`]: `Employer ${n}: phone`,
  [`employer${n}Supervisor`]: `Employer ${n}: supervisor`, [`employer${n}From`]: `Employer ${n}: from`, [`employer${n}To`]: `Employer ${n}: to`, [`employer${n}Duties`]: `Employer ${n}: duties`,
  [`employer${n}Reason`]: `Employer ${n}: reason for leaving`, [`employer${n}DoNotContact`]: `Employer ${n}: do not contact`,
  [`reference${n}Name`]: `Reference ${n}: name`, [`reference${n}YearsKnown`]: `Reference ${n}: years known`, [`reference${n}Phone`]: `Reference ${n}: phone`, [`reference${n}Address`]: `Reference ${n}: address`,
});
for (const { area, skills } of skillAreas) for (const [key, label] of skills) applicationLabels[skillKey(key)] = `${area}: ${label}`;
for (const [key, label] of legacySkills) { applicationLabels[`skill${key}`] = label; applicationLabels[`skill${key}Years`] = `${label}: years`; }

export const applicationGroups = ["Personal information", "Emergency contacts", "Position & availability", "Work preferences", "Education & training", "Skills assessment", "Employment history", "References & general information", "Authorization & signature"] as const;
export type ApplicationGroup = (typeof applicationGroups)[number];

export function applicationDetailGroup(key: string): ApplicationGroup {
  if (/^emergency/.test(key)) return "Emergency contacts";
  if (/^employer/.test(key)) return "Employment history";
  if (/^skill/.test(key)) return "Skills assessment";
  if (/^reference/.test(key) || ["caregivingExperience", "whyHeartstead", "mostSatisfying", "leastSatisfying", "reliability"].includes(key)) return "References & general information";
  if (/^school|^license/.test(key) || ["highestGrade", "chhaTrainingLocation", "chhaTrainingCompletion", "cprCertified"].includes(key)) return "Education & training";
  if (["homeCareExperience", "comfortBathing", "comfortCookingHousekeeping", "comfortSmokingHome", "drugScreenWilling", "offerToPosition", "problemHandled"].includes(key)) return "Work preferences";
  if (["employmentHistoryAuthorized", "signatureName", "signatureDate", "certified"].includes(key)) return "Authorization & signature";
  if (/^shift/.test(key) || ["otherPosition", "availableStartDate", "weeklyHours", "currentlyWorking", "currentWorkHours", "onLayoffRecall"].includes(key)) return "Position & availability";
  return "Personal information";
}

export const labelFor = (key: string) => applicationLabels[key] ?? key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/(\d+)/g, " $1 ").trim();
