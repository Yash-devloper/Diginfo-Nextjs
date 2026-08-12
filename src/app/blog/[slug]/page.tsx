import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Clock3, Sparkles } from "lucide-react";
import { getPublicBlog, getPublicBlogs } from "@/lib/blogServer";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublicBlog(slug);

  if (!blog) return { title: "Blog | Diginfo" };

  const title = blog.metaTitle?.trim() || blog.title;
  const description = (blog.metaDescription || blog.excerpt || blog.content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

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

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params;
  const blog = await getPublicBlog(slug);

  if (!blog) notFound();

  const related = (await getPublicBlogs())
    .filter((item) => item.category === blog.category && item.id !== blog.id)
    .slice(0, 3);
  const plainText = (blog.content || "").replace(/<[^>]+>/g, " ").trim();
  const readTime = Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 200));

  return (
    <section className="blog-detail">
      <div className="hero blog-detail-hero">
        {blog.cover && <Image src={blog.cover} alt={blog.title} fill className="hero-img" priority />}
        <div className="overlay" />
        <div className="hero-content">
          <div className="hero-inner blog-detail-hero-inner">
            <Link className="blog-detail-back" href="/blog">
              <ArrowLeft size={16} aria-hidden="true" /> All insights
            </Link>
            <span className="category-pill">{blog.category || "Diginfo insights"}</span>
            <h1 className="hero-title">{blog.title}</h1>
            <div className="blog-detail-meta">
              <span><Clock3 size={16} aria-hidden="true" /> {readTime} min read</span>
              {blog.date && <span>{blog.date}</span>}
              {blog.author && <span>By {blog.author}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="blog-detail-layout">
        <aside className="blog-detail-aside" aria-label="Article details">
          <div className="blog-detail-aside-card">
            <span className="blog-detail-aside-label">In this article</span>
            <p>Practical ideas and perspectives from the Diginfo team.</p>
            <div className="blog-detail-aside-rule" />
            <span className="blog-detail-aside-read"><Clock3 size={15} aria-hidden="true" /> {readTime} minute read</span>
          </div>
          <Link href="/contact" className="blog-detail-aside-cta">
            <Sparkles size={17} aria-hidden="true" /> Work with Diginfo <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </aside>

        <article className="content-wrap">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
        </article>
      </div>

      {related.length > 0 && (
        <div className="related">
          <div className="related-heading">
            <div>
              <span className="related-kicker">Keep exploring</span>
              <h2>More ideas for your next move</h2>
            </div>
            <Link href="/blog">View all insights <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/blog/${encodeURIComponent(item.id)}`} key={item.id}>
                <div className="related-card">
                  {item.cover && <Image src={item.cover} alt={item.title} fill className="img" />}
                  <div className="rel-content">
                    <span>{item.category || "Diginfo insights"}</span>
                    <h4>{item.title}</h4>
                    <span className="rel-read">Read article <ArrowUpRight size={16} aria-hidden="true" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
