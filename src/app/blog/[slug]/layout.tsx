import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

type BlogMetadata = {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  cover?: string;
};

const FIREBASE_PROJECT_ID = "diginfowebproject";
const FIREBASE_WEB_API_KEY = "AIzaSyCImqNlmLjU_SV3bmYzUd7wG8u2Hq3N6Hk";

const getStringField = (
  fields: Record<string, { stringValue?: string }> | undefined,
  fieldName: string,
) => fields?.[fieldName]?.stringValue;

const toBlogMetadata = (
  fields: Record<string, { stringValue?: string }> | undefined,
): BlogMetadata | null => {
  const title = getStringField(fields, "title");
  if (!title) return null;

  return {
    title,
    metaTitle: getStringField(fields, "metaTitle"),
    metaDescription: getStringField(fields, "metaDescription"),
    cover: getStringField(fields, "cover"),
  };
};

async function getBlogMetadata(identifier: string): Promise<BlogMetadata | null> {
  try {
    // New internal links use the document ID, avoiding collisions between posts
    // that share a title-derived slug.
    const documentResponse = await fetch(
      `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/blogs/${encodeURIComponent(identifier)}?key=${FIREBASE_WEB_API_KEY}`,
      { cache: "no-store" },
    );

    if (documentResponse.ok) {
      const document = (await documentResponse.json()) as {
        fields?: Record<string, { stringValue?: string }>;
      };
      return toBlogMetadata(document.fields);
    }

    // Keep metadata for legacy URLs that still use a slug.
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery?key=${FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "blogs" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "slug" },
                op: "EQUAL",
                value: { stringValue: identifier },
              },
            },
            limit: 1,
          },
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const results = (await response.json()) as Array<{
      document?: {
        fields?: Record<string, { stringValue?: string }>;
      };
    }>;
    return toBlogMetadata(results[0]?.document?.fields);
  } catch (error) {
    console.error("Unable to load blog metadata", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: identifier } = await params;
  const blog = await getBlogMetadata(identifier);

  if (!blog) {
    return { title: "Blog | Diginfo" };
  }

  const title = blog.metaTitle?.trim() || blog.title;
  const description = blog.metaDescription?.trim() || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${identifier}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${identifier}`,
      images: blog.cover ? [{ url: blog.cover }] : undefined,
    },
  };
}

export default function BlogDetailLayout({ children }: Props) {
  return children;
}
