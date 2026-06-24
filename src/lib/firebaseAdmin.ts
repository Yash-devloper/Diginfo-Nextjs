import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseAdminConfigErrorMessage = "FIREBASE_SERVICE_ACCOUNT_KEY is missing or invalid.";

function getServiceAccount() {
  const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();

  if (!rawServiceAccount) {
    throw new Error(firebaseAdminConfigErrorMessage);
  }

  try {
    // Accept legacy multi-line service-account values that omitted commas
    // between JSON properties. Proper JSON (the production format) is unchanged.
    const normalizedServiceAccount = rawServiceAccount.replace(
      /(["}\]])\s*\r?\n\s*(?=")/g,
      "$1,\n"
    );
    const serviceAccount = JSON.parse(normalizedServiceAccount);

    if (!serviceAccount || typeof serviceAccount !== "object") {
      throw new Error("Service account must be a JSON object.");
    }

    return serviceAccount;
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
