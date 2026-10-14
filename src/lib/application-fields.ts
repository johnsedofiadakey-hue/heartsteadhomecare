export const shiftOptions = ["Days", "Evenings", "Nights", "Weekends", "Live-in"] as const;

export const caregivingSkills = [
  ["bedBath", "Bed bath"], ["tpr", "T.P.R. (temperature, pulse & respiration)"],
  ["mouthCare", "Mouth care"], ["rangeOfMotion", "Range of motion"],
  ["occupiedBedMaking", "Occupied bed making"], ["psychiatricClients", "Psychiatric clients"],
  ["grooming", "Grooming"], ["dementiaClients", "Dementia clients"],
  ["mealPreparation", "Meal preparation"], ["alcoholUseConcerns", "Alcohol use concerns"],
  ["hoyerLift", "Hoyer lift"], ["hospiceClients", "Hospice clients"],
] as const;

export const applicationDetailKeys = [
  "applicationDate", "dateOfBirth", "timeAtAddress", "age18OrOlder", "validDriverLicense",
  "reliableTransportation", "workEligible", "relativeWorksHere", "relativeName", "previouslyWorkedHere",
  "otherPosition", "availableStartDate", "weeklyHours", "shiftDays", "shiftEvenings", "shiftNights",
  "shiftWeekends", "shiftLiveIn", "currentlyWorking", "currentWorkHours", "onLayoffRecall",
  "highestGrade", "chhaTrainingLocation", "chhaTrainingCompletion", "cprCertified",
  "employmentHistoryAuthorized", "caregivingExperience", "whyHeartstead", "mostSatisfying",
  "leastSatisfying", "reliability", "signatureName", "signatureDate", "certified",
  ...[1, 2, 3].flatMap((number) => [`school${number}Name`, `school${number}Award`]),
  ...[1, 2, 3].flatMap((number) => [`license${number}Type`, `license${number}Authority`, `license${number}Number`, `license${number}Expiration`]),
  ...caregivingSkills.flatMap(([key]) => [`skill${key}`, `skill${key}Years`]),
  ...[1, 2, 3].flatMap((number) => [`employer${number}Name`, `employer${number}Title`, `employer${number}Address`, `employer${number}Phone`, `employer${number}Supervisor`, `employer${number}From`, `employer${number}To`, `employer${number}Duties`, `employer${number}Reason`, `employer${number}DoNotContact`]),
  ...[1, 2].flatMap((number) => [`reference${number}Name`, `reference${number}Address`, `reference${number}Phone`]),
] as const;
