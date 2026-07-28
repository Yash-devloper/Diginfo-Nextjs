"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import HomeNewsletterSection from "@/components/HomeNewsletterSection";

interface Blog {
  id: string;
  slug: string;
  category: string;
  title: string;
  cover: string;
  content?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  createdAt?: { toDate: () => Date };
}

const getPublishedTime = (blog: Blog) => {
  if (blog.createdAt?.toDate) return blog.createdAt.toDate().getTime();

  const parsedDate = blog.date ? Date.parse(blog.date) : Number.NaN;
  return Number.isNaN(parsedDate) ? 0 : parsedDate;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snap = await getDocs(collection(db, "blogs"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];

        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    void fetchBlogs();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(blogs.map((blog) => blog.category?.trim()).filter(Boolean))) as string[],
    [blogs],
  );

  const displayedBlogs = useMemo(
    () => blogs
      .filter((blog) => activeCategory === "All" || blog.category === activeCategory)
      .sort((first, second) => getPublishedTime(second) - getPublishedTime(first)),
    [activeCategory, blogs],
  );

  return (
    <main className="blog-page">
      <section className="blog-section">
        <div className="container blog-page-container">
          <div className="blog-page-head">
            <span className="blog-page-kicker">Diginfo insights</span>
            <h1 className="blog-title">
              Our <span>Blogs</span>
            </h1>
            <p className="blog-subtitle">
              Insights, strategies & updates from our digital experts
            </p>
          </div>

          {error ? (
            <p className="tc t-soft">Failed to load blogs. Please try again later.</p>
          ) : blogs.length > 0 ? (
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
                {/* <span className="blog-sort-note">Latest first</span> */}
              </div>

              {displayedBlogs.length > 0 ? <div className="blog-grid">
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
                    <p>{blog.content?.replace(/<[^>]+>/g, "").slice(0, 100)}...</p>
                    <Link href={`/blog/${encodeURIComponent(blog.id)}`} className="read-btn">
                      Read More -&gt;
                    </Link>
                  </div>
                </article>
              ))}
              </div> : <p className="tc t-soft">No blogs found in this category yet.</p>}
            </>
          ) : (
            <p className="tc t-soft">No blogs found at the moment. Stay tuned!</p>
          )}
        </div>
      </section>

      <div className="blog-newsletter-wrap">
        <HomeNewsletterSection />
      </div>
    </main>
  );
}
