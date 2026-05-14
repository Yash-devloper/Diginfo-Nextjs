"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Image from "next/image";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  cover?: string;
  content?: string;
  createdAt?: any;
};

export default function BlogSection() {

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Blog, "id">),
        }));

        setBlogs(data);

      } catch (error) {
        console.error("Blog fetch error:", error);
      }

    };

    fetchBlogs();

  }, []);

  return (
    <section id="blog" className="blog-sec">

      <div className="wrap">

        {/* HEADING */}
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

        {/* BLOG GRID */}
        <div className="blog-grid">

          {blogs.map((blog) => (

            <div className="blog-card" key={blog.id}>

              {/* IMAGE */}
              <div className="blog-image">

                {blog.cover ? (

                  <Image
                    src={blog.cover}
                    alt={blog.title}
                    fill
                    className="blog-img"
                  />

                ) : (

                  <div className="blog-placeholder">
                    DIGINFO
                  </div>

                )}

              </div>

              {/* CONTENT */}
              <div className="blog-content">

                <span className="blog-category">
                  {blog.category || "Digital Marketing"}
                </span>

                <h3>
                  {blog.title}
                </h3>

                <p>
                  {blog.content
                    ?.replace(/<[^>]+>/g, "")
                    .slice(0, 110)}...
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="blog-btn"
                >
                  Read More →
                </Link>

              </div>

            </div>

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