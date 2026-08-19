import "server-only";

import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (
  !config.apiKey ||
  !config.authDomain ||
  !config.projectId ||
  !config.appId
) {
  throw new Error(
    "Missing NEXT_PUBLIC_FIREBASE_* environment variables."
  );
}

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp(config);

export const serverDb = getFirestore(app);