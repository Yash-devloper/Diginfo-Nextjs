import "server-only";

import type { DocumentSnapshot } from "firebase-admin/firestore";
import { candidateTypes, type CandidateType, type Job } from "@/lib/jobs";

function readCandidateType(value: unknown): CandidateType {
  return candidateTypes.includes(value as CandidateType) ? (value as CandidateType) : "Experienced";
}

export function serializeJob(snapshot: DocumentSnapshot): Job {
  const data = snapshot.data() ?? {};
  const timestampToIso = (value: unknown) =>
    value && typeof value === "object" && "toDate" in value
      ? (value as { toDate: () => Date }).toDate().toISOString()
      : undefined;

  return {
    id: snapshot.id,
    title: typeof data.title === "string" ? data.title : "",
    candidateType: readCandidateType(data.candidateType),
    experienceRequired: typeof data.experienceRequired === "string" ? data.experienceRequired : "",
    description: typeof data.description === "string" ? data.description : "",
    location: typeof data.location === "string" ? data.location : "",
    employmentType:
      data.employmentType === "Part-time" || data.employmentType === "Contract"
        ? data.employmentType
        : "Full-time",
    active: data.active === true,
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
  };
}
