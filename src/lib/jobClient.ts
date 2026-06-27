import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import {
  candidateTypes,
  employmentTypes,
  validateJobInput,
  type CandidateType,
  type EmploymentType,
  type Job,
  type JobInput,
} from "@/lib/jobs";

export type JobApplication = {
  id: string;
  jobId?: string;
  jobTitle?: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  message?: string;
  createdAt?: string;
};

function toIso(value: unknown) {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return undefined;
}

function readCandidateType(value: unknown): CandidateType {
  return candidateTypes.includes(value as CandidateType) ? (value as CandidateType) : "Experienced";
}

function readEmploymentType(value: unknown): EmploymentType {
  return employmentTypes.includes(value as EmploymentType) ? (value as EmploymentType) : "Full-time";
}

export function serializeJob(snapshot: DocumentSnapshot<DocumentData> | QueryDocumentSnapshot<DocumentData>): Job {
  const data = snapshot.data() ?? {};

  return {
    id: snapshot.id,
    title: typeof data.title === "string" ? data.title : "",
    candidateType: readCandidateType(data.candidateType),
    experienceRequired: typeof data.experienceRequired === "string" ? data.experienceRequired : "",
    description: typeof data.description === "string" ? data.description : "",
    location: typeof data.location === "string" ? data.location : "",
    employmentType: readEmploymentType(data.employmentType),
    active: data.active === true,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export function serializeJobApplication(
  snapshot: QueryDocumentSnapshot<DocumentData>
): JobApplication {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    jobId: typeof data.jobId === "string" ? data.jobId : undefined,
    jobTitle: typeof data.jobTitle === "string" ? data.jobTitle : undefined,
    name: typeof data.name === "string" ? data.name : "Applicant",
    email: typeof data.email === "string" ? data.email : "",
    phone: typeof data.phone === "string" ? data.phone : undefined,
    resumeUrl: typeof data.resumeUrl === "string" ? data.resumeUrl : undefined,
    message: typeof data.message === "string" ? data.message : undefined,
    createdAt: toIso(data.createdAt),
  };
}

export async function getJobs(options: { includeInactive?: boolean } = {}) {
  const jobsQuery = options.includeInactive
    ? query(collection(db, "jobs"), orderBy("createdAt", "desc"))
    : query(collection(db, "jobs"), where("active", "==", true));
  const snapshot = await getDocs(jobsQuery);
  const jobs = snapshot.docs.map(serializeJob);

  return jobs.sort((first, second) => {
    return (second.createdAt ?? "").localeCompare(first.createdAt ?? "");
  });
}

export async function getActiveJob(jobId: string) {
  const jobs = await getJobs();
  return jobs.find((job) => job.id === jobId) ?? null;
}

export async function createJob(input: JobInput) {
  const validation = validateJobInput(input);
  if (!validation.data) throw new Error(validation.errors[0]);

  const reference = await addDoc(collection(db, "jobs"), {
    ...validation.data,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return reference.id;
}

export async function updateJob(jobId: string, input: JobInput) {
  const validation = validateJobInput(input);
  if (!validation.data) throw new Error(validation.errors[0]);

  await updateDoc(doc(db, "jobs", jobId), {
    ...validation.data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteJobById(jobId: string) {
  await deleteDoc(doc(db, "jobs", jobId));
}

export async function getJobApplications() {
  const snapshot = await getDocs(query(collection(db, "jobApplications"), orderBy("createdAt", "desc")));
  return snapshot.docs.map(serializeJobApplication);
}
