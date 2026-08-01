"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebaseClient";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Sparkles } from "lucide-react";

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
      const routeValue = Array.isArray(slug) ? slug[0] : slug;
      if (!routeValue) return;

      // Each Firestore document ID is unique. Prefer it over a title-based slug,
      // which can be duplicated by two posts with the same title.
      const directSnapshot = await getDoc(doc(db, "blogs", routeValue));

      if (directSnapshot.exists()) {
        const current = {
          id: directSnapshot.id,
          ...directSnapshot.data(),
        } as Blog;

        setBlog(current);

        const allBlogsSnapshot = await getDocs(collection(db, "blogs"));
        const relatedBlogs = allBlogsSnapshot.docs
          .map((blogDoc) => ({ id: blogDoc.id, ...blogDoc.data() } as Blog))
          .filter((item) => item.category === current.category && item.id !== current.id)
          .slice(0, 3);
        setRelated(relatedBlogs);
        return;
      }

      // Preserve existing shared/indexed URLs that use the older slug format.
      const snap = await getDocs(collection(db, "blogs"));

      const blogs = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Blog));

      const current = blogs.find((b) => b.slug === routeValue);
      setBlog(current || null);

      // related blogs (same category)
      const rel = blogs
        .filter(
          (b) => b.category === current?.category && b.id !== current?.id
        )
        .slice(0, 3);

      setRelated(rel);
    };

    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <div className="loading">Loading...</div>;
  }

  const plainText = (blog.content || "").replace(/<[^>]+>/g, " ").trim();
  const readTime = Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 200));

  return (
    <section className="blog-detail">

      {/* HERO */}
      <div className="hero blog-detail-hero">

        <Image
          src={blog.cover}
          alt={blog.title}
          fill
          className="hero-img"
        />

        <div className="overlay"></div>

        <div className="hero-content">
          <div className="hero-inner blog-detail-hero-inner">

            <Link className="blog-detail-back" href="/blog">
              <ArrowLeft size={16} aria-hidden="true" /> All insights
            </Link>

            <span className="category-pill">
              {blog.category || "Diginfo insights"}
            </span>

            <h1 className="hero-title">
              {blog.title}
            </h1>

            <div className="blog-detail-meta">
              <span><Clock3 size={16} aria-hidden="true" /> {readTime} min read</span>
              {blog.date && <span>{blog.date}</span>}
              {blog.author && <span>By {blog.author}</span>}
            </div>
          </div>
        </div>

      </div>

      {/* CONTENT */}
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
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </article>
      </div>

      {/* RELATED */}
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

                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="img"
                  />

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
