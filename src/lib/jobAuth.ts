import "server-only";

import type { DecodedIdToken } from "firebase-admin/auth";
import { getAdminAuth } from "@/lib/firebaseAdmin";

export class JobAuthError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = "JobAuthError";
    this.status = status;
  }
}

function getBearerToken(request: Request) {
  const header = request.headers.get("authorization");
  if (!header?.toLowerCase().startsWith("bearer ")) return null;
  return header.slice(7).trim();
}

function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function isAllowedAdmin(token: DecodedIdToken) {
  if (token.admin === true) return true;

  const allowedEmails = getAllowedAdminEmails();
  if (!allowedEmails.length) return true;

  return typeof token.email === "string" && allowedEmails.includes(token.email.toLowerCase());
}

export async function requireJobsAdmin(request: Request) {
  const token = getBearerToken(request);
  if (!token) {
    throw new JobAuthError("Please sign in again before managing job openings.");
  }

  const decodedToken = await getAdminAuth().verifyIdToken(token);
  if (!isAllowedAdmin(decodedToken)) {
    throw new JobAuthError("You do not have permission to manage job openings.", 403);
  }

  return decodedToken;
}

export function isJobAuthError(error: unknown): error is JobAuthError {
  return error instanceof JobAuthError;
}
