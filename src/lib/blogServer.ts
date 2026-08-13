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
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  date?: string;
  createdAtMs?: number;
};

function normalizeBlog(id: string, data: Record<string, unknown>): PublicBlog {
  const createdAt = data.createdAt;
  const createdAtMs = createdAt && typeof createdAt === "object" && "toMillis" in createdAt && typeof (createdAt as { toMillis?: unknown }).toMillis === "function"
    ? (createdAt as { toMillis: () => number }).toMillis()
    : undefined;

  return {
    id,
    title: typeof data.title === "string" ? data.title : "",
    slug: typeof data.slug === "string" ? data.slug : id,
    category: typeof data.category === "string" ? data.category : "",
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

function sortNewestFirst(blogs: PublicBlog[]) {
  return blogs.sort((first, second) => {
    const firstDate = first.createdAtMs ?? (first.date ? Date.parse(first.date) : 0);
    const secondDate = second.createdAtMs ?? (second.date ? Date.parse(second.date) : 0);
    return secondDate - firstDate;
  });
}

/** Public reads run through Firebase Admin, independent of browser login state. */
export async function getPublicBlogs(count?: number): Promise<PublicBlog[]> {
  const snapshot = await getFirebaseAdminFirestore().collection("blogs").get();
  const blogs = sortNewestFirst(snapshot.docs.map((item) => normalizeBlog(item.id, item.data())));
  return typeof count === "number" ? blogs.slice(0, count) : blogs;
}

/** Supports current document-ID URLs and older slug URLs. */
export async function getPublicBlog(identifier: string): Promise<PublicBlog | null> {
  const firestore = getFirebaseAdminFirestore();
  const direct = await firestore.collection("blogs").doc(identifier).get();
  if (direct.exists) return normalizeBlog(direct.id, direct.data() ?? {});

  const matchingSlug = await firestore.collection("blogs").where("slug", "==", identifier).limit(1).get();
  const blog = matchingSlug.docs[0];
  return blog ? normalizeBlog(blog.id, blog.data()) : null;
}

export async function getLatestBlogs(count = 4): Promise<PublicBlog[]> {
  return getPublicBlogs(count);
}
