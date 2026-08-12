import "server-only";

import { getFirebaseAdminFirestore } from "@/lib/firebaseAdmin";

export type PublicBlog = {
  id: string;
  slug: string;
  category: string;
  title: string;
  cover: string;
  content?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  date?: string;
  createdAtMs?: number;
};

export async function getPublicBlogs(): Promise<PublicBlog[]> {
  const snapshot = await getFirebaseAdminFirestore().collection("blogs").get();

  const blogs: PublicBlog[] = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    let createdAtMs: number | undefined;

    const createdAt = data.createdAt;

    if (
      createdAt &&
      typeof createdAt === "object" &&
      "toMillis" in createdAt &&
      typeof (createdAt as { toMillis?: unknown }).toMillis === "function"
    ) {
      createdAtMs = (createdAt as { toMillis: () => number }).toMillis();
    }

    return {
      id: docSnap.id,
      slug: typeof data.slug === "string" ? data.slug : docSnap.id,
      category: typeof data.category === "string" ? data.category : "",
      title: typeof data.title === "string" ? data.title : "",
      cover: typeof data.cover === "string" ? data.cover : "",
      content: typeof data.content === "string" ? data.content : "",
      excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
      metaTitle: typeof data.metaTitle === "string" ? data.metaTitle : "",
      metaDescription: typeof data.metaDescription === "string" ? data.metaDescription : "",
      author: typeof data.author === "string" ? data.author : "",
      date: typeof data.date === "string" ? data.date : "",
      createdAtMs,
    };
  });

  return blogs.sort((a, b) => {
    const aTime =
      a.createdAtMs ??
      (a.date ? Date.parse(a.date) : 0);

    const bTime =
      b.createdAtMs ??
      (b.date ? Date.parse(b.date) : 0);

    return bTime - aTime;
  });
}

/**
 * Looks up both the current document-ID URLs and the legacy title-slug URLs.
 * The Admin SDK makes this public rendering independent of browser login state
 * and Firestore client security rules.
 */
export async function getPublicBlog(identifier: string): Promise<PublicBlog | null> {
  const firestore = getFirebaseAdminFirestore();
  const directSnapshot = await firestore.collection("blogs").doc(identifier).get();

  if (directSnapshot.exists) {
    return toPublicBlog(directSnapshot.id, directSnapshot.data() ?? {});
  }

  const slugSnapshot = await firestore
    .collection("blogs")
    .where("slug", "==", identifier)
    .limit(1)
    .get();
  const slugDocument = slugSnapshot.docs[0];

  return slugDocument
    ? toPublicBlog(slugDocument.id, slugDocument.data())
    : null;
}

function toPublicBlog(id: string, data: Record<string, unknown>): PublicBlog {
  let createdAtMs: number | undefined;
  const createdAt = data.createdAt;

  if (
    createdAt &&
    typeof createdAt === "object" &&
    "toMillis" in createdAt &&
    typeof (createdAt as { toMillis?: unknown }).toMillis === "function"
  ) {
    createdAtMs = (createdAt as { toMillis: () => number }).toMillis();
  }

  return {
    id,
    slug: typeof data.slug === "string" ? data.slug : id,
    category: typeof data.category === "string" ? data.category : "",
    title: typeof data.title === "string" ? data.title : "",
    cover: typeof data.cover === "string" ? data.cover : "",
    content: typeof data.content === "string" ? data.content : "",
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    metaTitle: typeof data.metaTitle === "string" ? data.metaTitle : "",
    metaDescription: typeof data.metaDescription === "string" ? data.metaDescription : "",
    author: typeof data.author === "string" ? data.author : "",
    date: typeof data.date === "string" ? data.date : "",
    createdAtMs,
  };
}
