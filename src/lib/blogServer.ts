import "server-only";

import { getFirebaseAdminFirestore } from "@/lib/firebaseAdmin";

export type PublicBlog = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  cover?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  metaTitle?: string;
  metaDescription?: string;
  /** A plain value safe to pass from Server Components to Client Components. */
  createdAtMs?: number;
};

function timestampToMillis(value: unknown): number | undefined {
  if (
    value &&
    typeof value === "object" &&
    "toMillis" in value &&
    typeof (value as { toMillis?: unknown }).toMillis === "function"
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }

  return undefined;
}

function normalizeBlog(id: string, data: Record<string, unknown>): PublicBlog {
  return {
    id,
    title: typeof data.title === "string" ? data.title : "",
    slug: typeof data.slug === "string" ? data.slug : id,
    category:
      typeof data.category === "string" ? data.category : "",
    cover:
      typeof data.cover === "string" ? data.cover : "",
    content:
      typeof data.content === "string" ? data.content : "",
    excerpt:
      typeof data.excerpt === "string" ? data.excerpt : "",
    author:
      typeof data.author === "string" ? data.author : "",
    date:
      typeof data.date === "string" ? data.date : "",
    metaTitle:
      typeof data.metaTitle === "string"
        ? data.metaTitle
        : "",
    metaDescription:
      typeof data.metaDescription === "string"
        ? data.metaDescription
        : "",
    // Firestore Timestamp instances cannot cross the Server/Client boundary.
    createdAtMs: timestampToMillis(data.createdAt),
  };
}

function sortNewestFirst(blogs: PublicBlog[]) {
  return blogs.sort((first, second) => {
    const firstDate = first.createdAtMs ?? (first.date ? Date.parse(first.date) : 0);
    const secondDate = second.createdAtMs ?? (second.date ? Date.parse(second.date) : 0);
    return secondDate - firstDate;
  });
}

/** Reads with Firebase Admin so deployed rendering does not depend on browser Firestore rules. */
export async function getPublicBlogs(count?: number): Promise<PublicBlog[]> {
  const snapshot = await getFirebaseAdminFirestore().collection("blogs").get();
  const blogs = sortNewestFirst(snapshot.docs.map((item) => normalizeBlog(item.id, item.data())));
  return typeof count === "number" ? blogs.slice(0, count) : blogs;
}

/** Supports document-ID URLs and legacy slug URLs. */
export async function getPublicBlog(identifier: string): Promise<PublicBlog | null> {
  let cleanIdentifier: string;

  try {
    cleanIdentifier = decodeURIComponent(identifier).trim();
  } catch {
    return null;
  }

  if (!cleanIdentifier) {
    return null;
  }

  const firestore = getFirebaseAdminFirestore();
  const directSnapshot = await firestore.collection("blogs").doc(cleanIdentifier).get();

  if (directSnapshot.exists) {
    return normalizeBlog(directSnapshot.id, directSnapshot.data() ?? {});
  }

  const slugSnapshot = await firestore
    .collection("blogs")
    .where("slug", "==", cleanIdentifier)
    .limit(1)
    .get();
  const matchingDoc = slugSnapshot.docs[0];

  return matchingDoc ? normalizeBlog(matchingDoc.id, matchingDoc.data()) : null;
}

/**
 * Used by the homepage to display the latest 4 blogs.
 */
export async function getLatestBlogs(count = 4): Promise<PublicBlog[]> {
  return getPublicBlogs(count);
}
