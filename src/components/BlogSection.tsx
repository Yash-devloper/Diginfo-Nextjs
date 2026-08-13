"use client";

import Image from "next/image";
import Link from "next/link";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  cover?: string;
  content?: string;
  createdAt?: unknown;
};

type BlogSectionProps = {
  blogs: Blog[];
};

export default function BlogSection({
  blogs,
}: BlogSectionProps) {
  return (
    <section id="blog" className="blog-sec">
      <div className="wrap">
        <div className="blog-head">
          <div className="pill-label">
            LATEST INSIGHTS
          </div>

          <h2 className="blog-title">
            Latest Blogs &
            <span> Industry Updates</span>
          </h2>

          <p className="blog-sub">
            Insights, strategies, and digital trends
            from the Diginfo team.
          </p>
        </div>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <article className="blog-card" key={blog.id}>
              <div className="blog-image">
                {blog.cover ? (
                  <Image
                    src={blog.cover}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="blog-img"
                  />
                ) : (
                  <div className="blog-placeholder">
                    DIGINFO
                  </div>
                )}
              </div>

              <div className="blog-content">
                <span className="blog-category">
                  {blog.category || "Digital Marketing"}
                </span>

                <h3>{blog.title}</h3>

                <p>
                  {(blog.content || "")
                    .replace(/<[^>]+>/g, "")
                    .slice(0, 110)}
                  {(blog.content || "").replace(/<[^>]+>/g, "").length > 110
                    ? "..."
                    : ""}
                </p>

                <Link
                  href={`/blog/${encodeURIComponent(blog.id)}`}
                  className="blog-btn"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="blog-more">
        <Link href="/blog" className="view-blog-btn">
          View All Blogs →
        </Link>
      </div>
    </section>
  );
}