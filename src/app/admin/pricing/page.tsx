"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db, handleFirestoreError } from "@/lib/firebaseClient";

type Service = {
  id: string;
  title: string;
  price: string;
  description?: string;
  features?: string[] | string;
  category?: string;
  active?: boolean;
  featured?: boolean;
  recommended?: boolean;
  order?: number;
};

export default function PricingAdmin() {
  const [services, setServices] = useState<Service[]>([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [features, setFeatures] = useState("");
  const [category, setCategory] = useState("");
  const [recommended, setRecommended] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  // 🔥 FETCH
  const fetchServices = async () => {
    try {
      const snap = await getDocs(collection(db, "services"));
      const data = snap.docs
        .map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Service, "id">),
        }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setServices(data);
    } catch (error) {
      handleFirestoreError(error);
      console.error("Failed to load services:", error);
    }
  };

  const saveOrder = async (items: Service[]) => {
    try {
      const batch = writeBatch(db);
      items.forEach((item, index) => {
        batch.update(doc(db, "services", item.id), {
          order: index,
        });
      });
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error);
      console.error("Failed to save order:", error);
    }
  };

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDropTargetId(null);
  };

  const handleDragEnter = (id: string) => {
    if (id !== draggingId) {
      setDropTargetId(id);
    }
  };

  const handleDrop = async (targetId: string) => {
    if (!draggingId || draggingId === targetId) {
      setDropTargetId(null);
      return;
    }

    const fromIndex = services.findIndex((service) => service.id === draggingId);
    const toIndex = services.findIndex((service) => service.id === targetId);
    if (fromIndex === -1 || toIndex === -1) {
      setDropTargetId(null);
      return;
    }

    const updated = [...services];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    setServices(updated);
    setDropTargetId(null);
    setDraggingId(null);

    await saveOrder(updated);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchServices();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // ➕ ADD SERVICE
  const handleAdd = async () => {
    if (!title || !price || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const nextOrder = services.length > 0 ? Math.max(...services.map((service) => service.order ?? 0)) + 1 : 0;

      await addDoc(collection(db, "services"), {
        title,
        price,
        description: desc,
        features: features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),
        category,
        recommended,
        active: true,
        order: nextOrder,
        createdAt: new Date(),
      });

      setTitle("");
      setPrice("");
      setDesc("");
      setFeatures("");
      setCategory("");
      setRecommended(false);

      fetchServices();
    } catch (error) {
      handleFirestoreError(error);
      alert("Failed to add service. Please try again.");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
      fetchServices();
    } catch (error) {
      handleFirestoreError(error);
      alert("Failed to delete service. Please try again.");
    }
  };

  // 🔄 TOGGLE
  const toggleActive = async (s: Service) => {
    try {
      await updateDoc(doc(db, "services", s.id), {
        active: !s.active,
      });
      fetchServices();
    } catch (error) {
      handleFirestoreError(error);
      alert("Failed to update service status. Please try again.");
    }
  };

  //Edit
  const handleEdit = (s: Service) => {
    setEditing(s);

    setTitle(s.title || "");
    setPrice(s.price || "");
    setDesc(s.description || "");
    setFeatures(Array.isArray(s.features) ? s.features.join(",") : s.features || "");
    setCategory(s.category || "");
    setRecommended(Boolean(s.recommended));
  };

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setPrice("");
    setDesc("");
    setFeatures("");
    setCategory("");
    setRecommended(false);
  };

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      await updateDoc(doc(db, "services", editing.id), {
        title,
        price,
        description: desc,
        features: features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),
        category,
        recommended,
      });

      resetForm();
      fetchServices();
    } catch (error) {
      handleFirestoreError(error);
      alert("Failed to update service. Please try again.");
    }
  };

  return (
    <div className="pricing-admin">
      <div className="pricing-header">
        <h2>Manage Pricing</h2>
        <p>Create and manage your service plans</p>
      </div>

      {/* FORM */}
      <div className="pricing-form-card">
        <div className="form-grid">
          <input
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="seo">SEO</option>
            <option value="social">Social</option>
            <option value="ads">Ads</option>
            <option value="website">Website</option>
          </select>

          <input
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <textarea
            placeholder="Features (comma separated)"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={recommended}
              onChange={(e) => setRecommended(e.target.checked)}
            />
            Recommended plan
          </label>
        </div>

        <button
          onClick={editing ? handleUpdate : handleAdd}
          className="btn btn-grad full-btn"
        >
          {editing ? "Update Service" : "+ Add Service"}
        </button>

        {editing && (
          <button
            onClick={resetForm}
            className="btn btn-dark full-btn"
          >
            Cancel
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="service-list">
        {services.map((s) => (
          <div
            key={s.id}
            className={`service-card ${s.id === draggingId ? "dragging" : ""} ${s.id === dropTargetId ? "drop-target" : ""}`}
            draggable
            onDragStart={() => handleDragStart(s.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(s.id)}
            onDrop={() => handleDrop(s.id)}
          >
            <div className="service-card-top">
              <div className="drag-handle">⋮⋮</div>
              {s.recommended && <div className="recommended-badge">RECOMMENDED</div>}
            </div>

            <h3>{s.title}</h3>
            <p className="price">{s.price}</p>
            <p className="cat">{s.category}</p>

            <ul>
              {(Array.isArray(s.features)
                ? s.features
                : s.features?.split(",")
              )?.map((f: string, i: number) => (
                <li key={i}>✔ {f.trim()}</li>
              ))}
            </ul>

            <div className="actions">
              <button className="btn btn-edit" onClick={() => handleEdit(s)}>
                Edit
              </button>

              <button className="btn btn-toggle" onClick={() => toggleActive(s)}>
                {s.active ? "Hide" : "Show"}
              </button>

              <button className="btn btn-delete" onClick={() => handleDelete(s.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
