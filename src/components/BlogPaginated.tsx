"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PublicBlog } from "@/lib/blogServer";

const BLOGS_PER_PAGE = 9;

type Props = {
  blogs: PublicBlog[];
};

export default function BlogPaginated({ blogs }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  // Scroll to top of blog grid on page change
  useEffect(() => {
    const el = document.getElementById("blog-grid-top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  /** Build visible page numbers with ellipsis */
  function getPageNumbers(): (number | "...")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [];
    pages.push(1);
    if (currentPage > 4) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);
    return pages;
  }

  return (
    <>
      {/* Anchor so smooth scroll lands above the grid */}
      <div id="blog-grid-top" style={{ scrollMarginTop: "90px" }} />

      <div className="blog-grid">
        {currentBlogs.map((blog) => (
          <article className="blog-card" key={blog.id}>
            <div className="blog-img">
              {blog.cover ? (
                <Image
                  src={blog.cover}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="img"
                />
              ) : (
                <div className="blog-placeholder">DIGINFO</div>
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
                href={`/blog/${encodeURIComponent(blog.slug || blog.id)}`}
                className="blog-btn"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* ── Pagination controls ── */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Blog pagination">
          {/* Prev */}
          <button
            className="page-btn page-nav"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ← Prev
          </button>

          {/* Page numbers */}
          <div className="page-numbers">
            {getPageNumbers().map((item, idx) =>
              item === "..." ? (
                <span key={`ellipsis-${idx}`} className="page-ellipsis">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  className={`page-btn${currentPage === item ? " active" : ""}`}
                  onClick={() => goToPage(item)}
                  aria-label={`Go to page ${item}`}
                  aria-current={currentPage === item ? "page" : undefined}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* Next */}
          <button
            className="page-btn page-nav"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}

      {/* Blog count info */}
      <p className="page-info">
        Showing {startIndex + 1}–{Math.min(startIndex + BLOGS_PER_PAGE, blogs.length)} of{" "}
        {blogs.length} blogs
      </p>
    </>
  );
}

