"use client";

import { useEffect, useState } from "react";
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
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState(false);

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
            <div className="blog-grid">
              {blogs.map((blog) => (
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
            </div>
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
