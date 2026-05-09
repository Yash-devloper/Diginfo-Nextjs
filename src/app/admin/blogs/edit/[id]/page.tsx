"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebaseClient";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import toast from "react-hot-toast";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState("SEO");
  const [loading, setLoading] = useState(false);

  // ✅ EDITOR
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Update blog content...",
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  // ✅ FETCH BLOG DATA
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const ref = doc(db, "blogs", id as string);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          toast.error("Blog not found");
          return;
        }

        const data: any = snap.data();

        setTitle(data.title);
        setCover(data.cover);
        setCategory(data.category || "SEO");

        editor?.commands.setContent(data.content);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch blog");
      }
    };

    if (editor) fetchBlog();
  }, [editor, id]);

  // ✅ COVER UPLOAD
  const handleCoverUpload = async (file: File) => {
    setLoading(true);
    const url = await uploadImageToCloudinary(file);
    setCover(url);
    toast.success("Cover updated");
    setLoading(false);
  };

  // ✅ UPDATE BLOG
  const handleUpdate = async () => {
    if (!title || !cover || !editor) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await updateDoc(doc(db, "blogs", id as string), {
        title,
        cover,
        category,
        content: editor.getHTML(),
        updatedAt: new Date(),
      });

      toast.success("Blog updated 🚀");
      router.push("/admin/blogs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    }
  };

  // ✅ DELETE BLOG
  const handleDelete = async () => {
    if (!confirm("Delete this blog?")) return;

    try {
      await deleteDoc(doc(db, "blogs", id as string));
      toast.success("Blog deleted");
      router.push("/admin/blogs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  if (!editor) return null;

  return (
    <div className="admin-editor">

      <h2>Edit Blog</h2>

      {/* TITLE */}
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* CATEGORY */}
      <select
        className="input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>SEO</option>
        <option>Digital Marketing</option>
        <option>Development</option>
        <option>Technology</option>
        <option>IT News</option>
      </select>

      {/* COVER */}
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleCoverUpload(e.target.files[0]);
          }
        }}
      />

      {cover && <img src={cover} className="preview" />}

      {/* TOOLBAR */}
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          •
        </button>
      </div>

      {/* EDITOR */}
      <div className="editor-box">
        <EditorContent editor={editor} />
      </div>

      {/* ACTIONS */}
      <div className="edit-actions">

        <button className="btn btn-grad" onClick={handleUpdate}>
          {loading ? "Updating..." : "Update Blog"}
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          Delete Blog
        </button>

      </div>

    </div>
  );
}