import { initializeApp, getApps } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCImqNlmLjU_SV3bmYzUd7wG8u2Hq3N6Hk",
  authDomain: "diginfowebproject.firebaseapp.com",
  projectId: "diginfowebproject",
  storageBucket: "diginfowebproject.firebasestorage.app",
  messagingSenderId: "903616025012",
  appId: "1:903616025012:web:f1efc7f5780064705a62e1",
};

const app =
  !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

//  ALWAYS initialize Firestore ONCE with settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Directly fixes "GRPC error has no .code" by bypassing gRPC streams
  ignoreUndefinedProperties: true,         // Prevents crashes if a query value is undefined
});

export const auth = getAuth(app);

//  Error handling for Firestore operations
export const handleFirestoreError = (error: any) => {
  // Safer logging for errors missing standard gRPC codes
  const code = error?.code || "transport-error";
  const message = error?.message || "The connection was interrupted by the network or a browser extension.";
  console.error(`[Firestore ${code}]: ${message}`, error);
};