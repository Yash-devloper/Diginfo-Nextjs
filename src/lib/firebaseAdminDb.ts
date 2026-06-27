import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const errorMessage = "FIREBASE_SERVICE_ACCOUNT_KEY is missing or invalid.";

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error(errorMessage);
  }

  const serviceAccount = JSON.parse(raw);

  serviceAccount.private_key =
    serviceAccount.private_key.replace(/\\n/g, "\n");

  return serviceAccount;
}

function getAdminApp() {
  if (getApps().length) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert(getServiceAccount()),
  });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}