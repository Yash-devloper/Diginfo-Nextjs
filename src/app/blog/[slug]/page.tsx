"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebaseClient";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

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

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const snap = await getDocs(collection(db, "blogs"));

      const blogs = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Blog));

      const current = blogs.find((b) => b.slug === slug);
      setBlog(current || null);

      // related blogs (same category)
      const rel = blogs
        .filter(
          (b) => b.category === current?.category && b.slug !== slug
        )
        .slice(0, 3);

      setRelated(rel);
    };

    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="blog-detail">

      {/* HERO */}
      <div className="hero">

        <Image
          src={blog.cover}
          alt={blog.title}
          fill
          className="hero-img"
        />

        <div className="overlay"></div>

        <div className="hero-content">
          <div className="hero-inner">

    <span className="category-pill">
      {blog.category}
    </span>

    <h1 className="hero-title">
      {blog.title}
    </h1>

  </div>
        </div>

      </div>

      {/* CONTENT */}
      <article className="content-wrap">

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />

      </article>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="related">

          <h2>Related Blogs</h2>

          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/blog/${item.slug}`} key={item.id}>

                <div className="related-card">

                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="img"
                  />

                  <div className="rel-content">
                    <h4>{item.title}</h4>
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
