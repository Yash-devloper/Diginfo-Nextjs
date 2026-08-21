"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseClient";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

interface Blog {
  id: string;
  title: string;
  content: string;
  cover: string;
  slug: string;
  category: string;
  createdAt?: { toMillis?: () => number; toDate?: () => Date };
}

function getCreatedAtMillis(blog: Blog): number {
  if (typeof blog.createdAt?.toMillis === "function") {
    return blog.createdAt.toMillis();
  }

  // All new posts use a `blog_<timestamp>` ID. This fallback keeps older
  // records without a Firestore timestamp in a sensible order as well.
  const idTimestamp = Number(blog.id.replace(/^blog_/, ""));
  return Number.isFinite(idTimestamp) ? idTimestamp : 0;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const itemsPerPage = 5;

  const fetchBlogs = async () => {
    try {
      const snap = await getDocs(collection(db, "blogs"));
      const data = snap.docs.map((d) => {
        const blogData = d.data();
        return {
          id: d.id,
          ...blogData,
        } as Blog;
      }).sort((first, second) => getCreatedAtMillis(second) - getCreatedAtMillis(first));

      setBlogs(data);
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {

    const matchesSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || blog.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedBlogs = filteredBlogs.slice(
  startIndex,
  startIndex + itemsPerPage
);



  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;

    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs();
  };


  return (
    <div className="blog-table-container">

      <h2 className="admin-title">
        All <span className="gt">Blogs</span>
      </h2>

      {/* FILTER BAR */}
      <div className="filter-bar">

        <input
          className="input"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="SEO">SEO</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Development">Development</option>
          <option value="Technology">Technology</option>
          <option value="IT News">IT News</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="table-card">

        <table className="blog-table">

          <thead>
            <tr>
              <th>Blog</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedBlogs.map((blog) => (
              <tr key={blog.id}>

                {/* BLOG INFO */}
                <td className="blog-info">
                  <Image
                    src={blog.cover}
                    alt={blog.title}
                    width={80}
                    height={60}
                    className="thumb"
                  />

                  <div>
                    <h4>{blog.title}</h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blog.content.slice(0, 80),
                      }}
                    />
                  </div>
                </td>

                {/* CATEGORY */}
                <td>
                  <span className="badge">
                    {blog.category?.trim() || "Uncategorized"}
                  </span>
                </td>

                {/* DATE */}
                <td className="date">
                  {blog.createdAt
                    ? blog.createdAt.toDate?.().toLocaleDateString() || "—"
                    : "—"}
                </td>

                {/* ACTIONS */}
                <td className="actions">

                  <button
                    className="btn btn-edit"
                    onClick={() =>
                      router.push(`/admin/blogs/edit/${blog.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

        <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    ← Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      className={currentPage === i + 1 ? "active" : ""}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    Next →
  </button>

</div>

      </div>

    </div>
  );
}
