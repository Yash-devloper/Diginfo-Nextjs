import type { Metadata } from "next";
import HomeNewsletterSection from "@/components/HomeNewsletterSection";
import BlogGrid from "@/components/BlogGrid";
import { getPublicBlogs } from "@/lib/blogServer";

export const metadata: Metadata = {
  title: "Diginfo Blog | SEO, Marketing & AI Insights",
  description:
    "Explore Diginfo's latest insights on SEO, AI search, digital marketing, web development and business growth.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // Do not convert a database error into an empty list: that produces a false
  // "No blogs found" page for visitors and search-engine crawlers.
  const blogs = await getPublicBlogs();

  return (
    <main className="blog-page">
      <section className="blog-section">
        <div className="container blog-page-container">
          <div className="blog-page-head">
            <span className="blog-page-kicker">
              Diginfo insights
            </span>

            <h1 className="blog-title">
              Our <span>Blogs</span>
            </h1>

            <p className="blog-subtitle">
              Insights, strategies & updates from our digital experts
            </p>
          </div>

          {blogs.length > 0 ? (
            <BlogGrid blogs={blogs} />
          ) : (
            <p className="tc t-soft">
              No blogs found at the moment. Stay tuned!
            </p>
          )}
        </div>
      </section>

      <div className="blog-newsletter-wrap">
        <HomeNewsletterSection />
      </div>
    </main>
  );
}
