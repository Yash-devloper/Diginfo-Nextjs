"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { getAllTestimonials, type Testimonial, saveTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/testimonials";

export default function TestimonialsAdmin() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editReview, setEditReview] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Testimonials Firestore Error:", err);
        setError("Failed to load testimonials. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    void fetchTestimonials();
  }, []);

  const handleSave = async () => {
    if (!name || !review) {
      alert("Please provide both name and review.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await saveTestimonial(name, review);
      const updated = await getAllTestimonials();
      setTestimonials(updated);
      setName("");
      setReview("");
      alert("Testimonial saved successfully.");
    } catch (err) {
      setError("Failed to save testimonial. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditName(testimonial.name);
    setEditReview(testimonial.review);
  };

  const handleUpdate = async () => {
    if (!editName || !editReview || !editingId) {
      alert("Please provide both name and review.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updateTestimonial(editingId, editName, editReview);
      const updated = await getAllTestimonials();
      setTestimonials(updated);
      setEditingId(null);
      setEditName("");
      setEditReview("");
      alert("Testimonial updated successfully.");
    } catch (err) {
      setError("Failed to update testimonial. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await deleteTestimonial(id);
      const updated = await getAllTestimonials();
      setTestimonials(updated);
      alert("Testimonial deleted successfully.");
    } catch (err) {
      setError("Failed to delete testimonial. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditReview("");
  };

  if (loading) {
    return (
      <div className="seo-admin">
        <div className="pricing-header">
          <h2>Testimonials</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seo-admin">
      <div className="pricing-header">
        <h2>Testimonials</h2>
        <p>Manage client testimonials</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="pricing-form-card">
        <div className="form-grid">
          <input
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
          />
        </div>

        <button
          onClick={handleSave}
          className="btn btn-grad full-btn"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Testimonial"}
        </button>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="pricing-form-card edit-modal">
          <h3>Edit Testimonial</h3>
          <div className="form-grid">
            <input
              placeholder="Client Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <textarea
              placeholder="Review"
              value={editReview}
              onChange={(e) => setEditReview(e.target.value)}
              rows={5}
            />
          </div>

          <div className="edit-buttons">
            <button
              onClick={handleUpdate}
              className="btn btn-grad"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update"}
            </button>
            <button
              onClick={cancelEdit}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="service-list">
        <table className="testimonials-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td>{testimonial.name}</td>
                <td>{testimonial.review}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="btn btn-edit"
                      disabled={saving}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="btn btn-delete"
                      disabled={saving}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}