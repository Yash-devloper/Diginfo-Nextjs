export const candidateTypes = ["Fresher", "Experienced", "Internship"] as const;
export const employmentTypes = ["Full-time", "Part-time", "Contract"] as const;

export type CandidateType = (typeof candidateTypes)[number];
export type EmploymentType = (typeof employmentTypes)[number];

export type JobInput = {
  title: string;
  candidateType: CandidateType;
  experienceRequired: string;
  description: string;
  location: string;
  employmentType: EmploymentType;
};

export type Job = JobInput & {
  id: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type ValidationResult =
  | { data: JobInput; errors: [] }
  | { data: null; errors: string[] };

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateJobInput(value: unknown): ValidationResult {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const data = {
    title: text(source.title),
    candidateType: text(source.candidateType),
    experienceRequired: text(source.experienceRequired),
    description: text(source.description),
    location: text(source.location),
    employmentType: text(source.employmentType),
  };
  const errors: string[] = [];

  if (data.title.length < 2 || data.title.length > 120) {
    errors.push("Job title must be between 2 and 120 characters.");
  }
  if (!candidateTypes.includes(data.candidateType as CandidateType)) {
    errors.push("Select Fresher, Experienced, or Internship.");
  }
  if (data.candidateType === "Experienced" && data.experienceRequired.length < 2) {
    errors.push("Experience is required for experienced candidates.");
  }
  if (data.experienceRequired.length > 100) {
    errors.push("Experience required must be 100 characters or fewer.");
  }
  if (data.description.length < 20 || data.description.length > 5000) {
    errors.push("Job description must be between 20 and 5,000 characters.");
  }
  if (data.location.length < 2 || data.location.length > 160) {
    errors.push("Location must be between 2 and 160 characters.");
  }
  if (!employmentTypes.includes(data.employmentType as EmploymentType)) {
    errors.push("Select a valid job type.");
  }

  if (errors.length) return { data: null, errors };

  return {
    data: {
      title: data.title,
      candidateType: data.candidateType as CandidateType,
      experienceRequired: data.experienceRequired,
      description: data.description,
      location: data.location,
      employmentType: data.employmentType as EmploymentType,
    },
    errors: [],
  };
}
