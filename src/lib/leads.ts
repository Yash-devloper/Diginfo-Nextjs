import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebaseClient";

export const saveLead = async (data: any) => {

  return await addDoc(
    collection(db, "leads"),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );

};