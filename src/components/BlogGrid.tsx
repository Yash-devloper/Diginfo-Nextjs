"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PublicBlog } from "@/lib/blogServer";

type Props = {
  blogs: PublicBlog[];
};

export default function BlogGrid({ blogs }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(
    () => Array.from(new Set(blogs.map((blog) => blog.category?.trim()).filter(Boolean))) as string[],
    [blogs],
  );
  const displayedBlogs = useMemo(
    () => blogs.filter((blog) => activeCategory === "All" || blog.category === activeCategory),
    [activeCategory, blogs],
  );

  return (
    <>
      <div className="blog-filter-bar" aria-label="Filter blogs by category">
        <div className="blog-filter-options">
          <span className="blog-filter-label">Browse by topic</span>
          {["All", ...categories].map((category) => (
            <button
              className={activeCategory === category ? "blog-filter-btn active" : "blog-filter-btn"}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {displayedBlogs.length > 0 ? (
        <div className="blog-grid">
          {displayedBlogs.map((blog) => (
            <article className="blog-card" key={blog.id}>
              <div className="blog-img">
                {blog.cover && (
                  <Image
                    src={blog.cover}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="img"
                  />
                )}
                <span className="category">{blog.category}</span>
              </div>
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{(blog.excerpt || blog.content || "").replace(/<[^>]+>/g, "").slice(0, 100)}...</p>
                <Link href={`/blog/${encodeURIComponent(blog.id)}`} className="read-btn">
                  Read More -&gt;
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="tc t-soft">No blogs found in this category yet.</p>
      )}
    </>
  );
}
