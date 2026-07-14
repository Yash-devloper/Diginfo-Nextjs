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

async function getBlogMetadata(slug: string): Promise<BlogMetadata | null> {
  try {
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
                value: { stringValue: slug },
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
    const fields = results[0]?.document?.fields;
    const title = getStringField(fields, "title");

    if (!title) return null;

    return {
      title,
      metaTitle: getStringField(fields, "metaTitle"),
      metaDescription: getStringField(fields, "metaDescription"),
      cover: getStringField(fields, "cover"),
    };
  } catch (error) {
    console.error("Unable to load blog metadata", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogMetadata(slug);

  if (!blog) {
    return { title: "Blog | Diginfo" };
  }

  const title = blog.metaTitle?.trim() || blog.title;
  const description = blog.metaDescription?.trim() || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${slug}`,
      images: blog.cover ? [{ url: blog.cover }] : undefined,
    },
  };
}

export default function BlogDetailLayout({ children }: Props) {
  return children;
}
