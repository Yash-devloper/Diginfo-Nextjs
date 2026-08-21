import type { Metadata } from "next";
import BlogSection from "@/components/BlogSection";
import HomeNewsletterSection from "@/components/HomeNewsletterSection";
import { getLatestBlogs } from "@/lib/blogServer";

export const metadata: Metadata = {
  title: "Diginfo Blog | SEO, Marketing & AI Insights",
  description:
    "Explore Diginfo's latest insights on SEO, AI search, digital marketing, web development and business growth.",
};

export const runtime = "nodejs";
// Blog posts are published directly from the admin panel. Render this route
// per request so a newly published post is visible immediately on the live site.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogs = await getLatestBlogs(100);

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
            <BlogSection blogs={blogs} />
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
