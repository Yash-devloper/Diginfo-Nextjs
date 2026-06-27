import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseAdminConfigErrorMessage = "FIREBASE_SERVICE_ACCOUNT_KEY is missing or invalid.";

type ServiceAccount = Parameters<typeof cert>[0];

function normalizePrivateKey(value: string) {
  return value.replace(/\\n/g, "\n");
}

function decodeServiceAccount(value: string) {
  try {
    return Buffer.from(value, "base64").toString("utf8");
  } catch {
    return value;
  }
}

function normalizeServiceAccount(value: string) {
  const trimmed = value.trim();
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1)
      : trimmed;

  const maybeDecoded = unquoted.startsWith("{") ? unquoted : decodeServiceAccount(unquoted);

  // Accept legacy multi-line service-account values that omitted commas
  // between JSON properties. Proper JSON (the production format) is unchanged.
  return maybeDecoded.replace(/(["}\]])\s*\r?\n\s*(?=")/g, "$1,\n");
}

function getServiceAccount() {
  const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();

  if (!rawServiceAccount) {
    const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();

    if (projectId && clientEmail && privateKey) {
      return {
        projectId,
        clientEmail,
        privateKey: normalizePrivateKey(privateKey),
      } as ServiceAccount;
    }
  }

  if (!rawServiceAccount) {
    throw new Error(firebaseAdminConfigErrorMessage);
  }

  try {
    const normalizedServiceAccount = normalizeServiceAccount(rawServiceAccount);
    const serviceAccount = JSON.parse(normalizedServiceAccount);

    if (!serviceAccount || typeof serviceAccount !== "object") {
      throw new Error("Service account must be a JSON object.");
    }

    const privateKey = (serviceAccount as { private_key?: unknown }).private_key;
    if (typeof privateKey === "string") {
      (serviceAccount as { private_key: string }).private_key = normalizePrivateKey(privateKey);
    }

    return serviceAccount as ServiceAccount;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unable to parse JSON.";
    throw new Error(`${firebaseAdminConfigErrorMessage} ${detail}`);
  }
}

function getAdminApp() {
  if (getApps().length) return getApps()[0]!;

  return initializeApp({ credential: cert(getServiceAccount()) });
}

export function isFirebaseAdminConfigError(error: unknown) {
  return error instanceof Error && error.message.startsWith(firebaseAdminConfigErrorMessage);
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
