import "server-only";

import { createRequire } from "node:module";
import type { ServiceAccount } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";

// Use Firebase Admin's CommonJS entry points in the Node.js server runtime.
// Next 16's ESM external-module wrapper can otherwise try loading the SDK's
// ESM facade on Vercel and fail before a request reaches Firestore.
const requireFirebaseAdmin = createRequire(`${process.cwd()}/package.json`);
const { cert, getApps, initializeApp } = requireFirebaseAdmin("firebase-admin/app") as typeof import("firebase-admin/app");
const { getFirestore } = requireFirebaseAdmin("firebase-admin/firestore") as typeof import("firebase-admin/firestore");

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} server environment variable.`);
  return value;
}

function getFirebaseAdminApp() {
  if (!getApps().length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccountJson) {
      try {
        return initializeApp({
          credential: cert(JSON.parse(serviceAccountJson) as ServiceAccount),
        });
      } catch (error) {
        throw new Error(
          "FIREBASE_SERVICE_ACCOUNT_KEY must contain valid service-account JSON.",
          { cause: error },
        );
      }
    }

    return initializeApp({
      credential: cert({
        // Prefer the explicit ADMIN names, but support the established
        // FIREBASE_* names used by this project's server modules as well.
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || required("FIREBASE_PROJECT_ID"),
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || required("FIREBASE_CLIENT_EMAIL"),
        privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || required("FIREBASE_PRIVATE_KEY")).replace(/\\n/g, "\n"),
      }),
    });
  }

  return getApps()[0];
}

/** Server-only Firestore access. This is intentionally not the browser SDK. */
export function getFirebaseAdminFirestore(): Firestore {
  return getFirestore(getFirebaseAdminApp());
}
