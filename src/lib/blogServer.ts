import "server-only";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { serverDb } from "@/lib/firebaseServer";

export type ServerBlog = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  cover?: string;
  content?: string;
  createdAt?: unknown;
};

export async function getLatestBlogs(
  count = 4
): Promise<ServerBlog[]> {
  const q = query(
    collection(serverDb, "blogs"),
    orderBy("createdAt", "desc"),
    limit(count)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ServerBlog, "id">),
  }));
}