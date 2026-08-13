import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  Sparkles,
} from "lucide-react";

import { getPublicBlog, getPublicBlogs } from "@/lib/blogServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

function stripHtml(value?: string) {
  return (value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getReadTime(content?: string) {
  const plainText = stripHtml(content);
  const words = plainText
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await getPublicBlog(slug);

    if (!blog) {
      return {
        title: "Blog | Diginfo",
        description:
          "Digital marketing, SEO, AI and technology insights from Diginfo.",
      };
    }

    const title =
      blog.metaTitle?.trim() || blog.title;

    const description = stripHtml(
      blog.metaDescription ||
        blog.excerpt ||
        blog.content
    ).slice(0, 160);

    return {
      title,
      description,

      alternates: {
        canonical: `https://diginfo.ai/blog/${encodeURIComponent(
          blog.slug || blog.id
        )}`,
      },

      openGraph: {
        title,
        description,
        type: "article",
        url: `https://diginfo.ai/blog/${encodeURIComponent(
          blog.slug || blog.id
        )}`,
        images: blog.cover
          ? [
              {
                url: blog.cover,
                alt: blog.title,
              },
            ]
          : undefined,
      },
    };
  } catch (error) {
    console.error("Blog metadata error:", error);

    return {
      title: "Diginfo Blog",
      description:
        "Digital marketing, SEO and AI insights from Diginfo.",
    };
  }
}

export default async function BlogDetail({
  params,
}: Props) {
  const { slug } = await params;

  let blog = null;

  try {
    blog = await getPublicBlog(slug);
  } catch (error) {
    console.error("Blog detail fetch error:", error);
  }

  if (!blog) {
    notFound();
  }

  const readTime = getReadTime(blog.content);

  let related: typeof blog[] = [];

  try {
    const blogs = await getPublicBlogs();

    related = blogs
      .filter(
        (item) =>
          item.id !== blog.id &&
          item.category &&
          blog.category &&
          item.category === blog.category
      )
      .slice(0, 3);
  } catch (error) {
    console.error("Related blogs fetch error:", error);
    related = [];
  }

  return (
    <section className="blog-detail">
      <div className="hero blog-detail-hero">
        {blog.cover ? (
          <Image
            src={blog.cover}
            alt={blog.title}
            fill
            priority
            className="hero-img"
            sizes="100vw"
          />
        ) : null}

        <div className="overlay" />

        <div className="hero-content">
          <div className="hero-inner blog-detail-hero-inner">
            <Link
              className="blog-detail-back"
              href="/blog"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              All insights
            </Link>

            <span className="category-pill">
              {blog.category || "Diginfo insights"}
            </span>

            <h1 className="hero-title">
              {blog.title}
            </h1>

            <div className="blog-detail-meta">
              <span>
                <Clock3 size={16} aria-hidden="true" />
                {readTime} min read
              </span>

              {blog.date ? (
                <span>{blog.date}</span>
              ) : null}

              {blog.author ? (
                <span>By {blog.author}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="blog-detail-layout">
        <aside
          className="blog-detail-aside"
          aria-label="Article details"
        >
          <div className="blog-detail-aside-card">
            <span className="blog-detail-aside-label">
              In this article
            </span>

            <p>
              Practical ideas and perspectives from
              the Diginfo team.
            </p>

            <div className="blog-detail-aside-rule" />

            <span className="blog-detail-aside-read">
              <Clock3
                size={15}
                aria-hidden="true"
              />
              {readTime} minute read
            </span>
          </div>

          <Link
            href="/contact"
            className="blog-detail-aside-cta"
          >
            <Sparkles size={17} aria-hidden="true" />
            Work with Diginfo
            <ArrowUpRight
              size={16}
              aria-hidden="true"
            />
          </Link>
        </aside>

        <article className="content-wrap">
          {blog.content ? (
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          ) : (
            <p className="tc t-soft">
              Blog content is currently unavailable.
            </p>
          )}
        </article>
      </div>

      {related.length > 0 ? (
        <div className="related">
          <div className="related-heading">
            <div>
              <span className="related-kicker">
                Keep exploring
              </span>

              <h2>
                More ideas for your next move
              </h2>
            </div>

            <Link href="/blog">
              View all insights
              <ArrowUpRight
                size={17}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="related-grid">
            {related.map((item) => (
              <Link
                href={`/blog/${encodeURIComponent(
                  item.slug || item.id
                )}`}
                key={item.id}
              >
                <div className="related-card">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      className="img"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}

                  <div className="rel-content">
                    <span>
                      {item.category || "Diginfo insights"}
                    </span>

                    <h4>{item.title}</h4>

                    <span className="rel-read">
                      Read article
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}