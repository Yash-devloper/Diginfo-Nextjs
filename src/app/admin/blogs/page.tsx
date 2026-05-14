"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/firebaseClient";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function BlogUpload() {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState("SEO");
  const [loading, setLoading] = useState(false);

  // ✅ TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      Link,
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  // ✅ Wait for editor
  if (!editor) {
    return <div className="editor-loading">Loading editor...</div>;
  }

  // ✅ Upload cover image
  const handleCoverUpload = async (file: File) => {
    setLoading(true);

    try {
      const url = await uploadImageToCloudinary(file);

      if (!url) {
        toast.error("Image upload failed");
        return;
      }

      setCover(url);
      toast.success("Cover uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }

    setLoading(false);
  };

  // ✅ Insert image inside editor
  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const url = await uploadImageToCloudinary(file);
      editor.chain().focus().setImage({ src: url }).run();
    };
  };

  // ✅ Add link
  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // ✅ Submit blog
  const handleSubmit = async () => {
    if (!editor) {
      toast.error("Editor not ready");
      return;
    }

    const contentText = editor.getText().trim();

    // 🔒 Validation
    if (!title.trim()) {
      toast.error("Please enter blog title");
      return;
    }

    if (!cover) {
      toast.error("Please upload cover image");
      return;
    }

    if (contentText.length === 0) {
      toast.error("Please write blog content");
      return;
    }

    try {
      setLoading(true);

      const blogId = `blog_${Date.now()}`;
      const slug = title.toLowerCase().replace(/\s+/g, "-");

      const blogData = {
        title,
        slug,
        content: editor.getHTML(),
        cover,
        category,
        createdAt: serverTimestamp(),
      };

      console.log("🚀 Publishing blog...", blogData);

      await setDoc(doc(db, "blogs", blogId), blogData);

      console.log("✅ Blog saved successfully");
      toast.success("Blog Published 🚀");

      // 🔄 Reset form
      setTitle("");
      setCover("");
      setCategory("SEO");
      editor.commands.clearContent();

    } catch (error) {
      console.error("❌ Firestore error:", error);
      toast.error("Failed to publish blog");
    }

    setLoading(false);
  };

  return (
    <div className="admin-editor">

      <h2 className="editor-title">
        Create New <span className="gt">Blog</span>
      </h2>

      {/* TITLE */}
      <input
        className="input"
        placeholder="Enter Blog Title"
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

      {/* COVER IMAGE */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleCoverUpload(file);
        }}
      />

      {/* PREVIEW */}
      {cover && <img src={cover} className="preview" />}

      {/* TOOLBAR */}
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={addLink}>🔗</button>
        <button onClick={addImage}>🖼</button>
      </div>

      {/* EDITOR */}
      <div className="editor-box">
        <EditorContent editor={editor} />
      </div>

      {/* SUBMIT */}
      <button
        className="btn btn-grad publish-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish Blog"}
      </button>

    </div>
  );
}