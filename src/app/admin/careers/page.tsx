"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { BriefcaseBusiness, Plus, Trash2 } from "lucide-react";
import { db, handleFirestoreError } from "@/lib/firebaseClient";

type CareerCategory = "Graduate" | "Experienced";

type CareerOpening = {
  id: string;
  designation: string;
  category: CareerCategory;
  active?: boolean;
};

const categories: CareerCategory[] = ["Graduate", "Experienced"];

const sortOpenings = (a: CareerOpening, b: CareerOpening) =>
  a.category.localeCompare(b.category) || a.designation.localeCompare(b.designation);

export default function CareersAdminPage() {
  const [openings, setOpenings] = useState<CareerOpening[]>([]);
  const [designation, setDesignation] = useState("");
  const [category, setCategory] = useState<CareerCategory>("Graduate");
  const [saving, setSaving] = useState(false);

  const fetchOpenings = async () => {
    try {
      const snap = await getDocs(collection(db, "careers"));
      const data = snap.docs
        .map((item) => ({
          id: item.id,
          ...(item.data() as Omit<CareerOpening, "id">),
        }))
        .sort(sortOpenings);

      setOpenings(data);
    } catch (error) {
      handleFirestoreError(error);
      toast.error("Failed to load career openings");
    }
  };

  useEffect(() => {
    void fetchOpenings();
  }, []);

  const groupedOpenings = useMemo(
    () =>
      categories.map((item) => ({
        category: item,
        openings: openings.filter((opening) => opening.category === item),
      })),
    [openings]
  );

  const handleAdd = async () => {
    if (!designation.trim()) {
      toast.error("Please enter designation");
      return;
    }

    try {
      setSaving(true);
      await addDoc(collection(db, "careers"), {
        designation: designation.trim(),
        category,
        active: true,
        createdAt: new Date(),
      });
      setDesignation("");
      setCategory("Graduate");
      toast.success("Opening posted");
      void fetchOpenings();
    } catch (error) {
      handleFirestoreError(error);
      toast.error("Failed to post opening");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (opening: CareerOpening) => {
    try {
      await updateDoc(doc(db, "careers", opening.id), {
        active: !(opening.active !== false),
      });
      void fetchOpenings();
    } catch (error) {
      handleFirestoreError(error);
      toast.error("Failed to update opening");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this opening?")) return;

    try {
      await deleteDoc(doc(db, "careers", id));
      toast.success("Opening deleted");
      void fetchOpenings();
    } catch (error) {
      handleFirestoreError(error);
      toast.error("Failed to delete opening");
    }
  };

  return (
    <div className="career-admin">
      <div className="admin-title-row">
        <div>
          <h2 className="admin-title">
            Career <span className="gt">Openings</span>
          </h2>
          <p>Post roles here to show them on the public careers page.</p>
        </div>
      </div>

      <div className="career-admin-form">
        <div className="career-admin-field">
          <label>Designation</label>
          <input
            className="input"
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
            placeholder="e.g. Digital Marketing Executive"
          />
        </div>

        <div className="career-admin-field">
          <label>Category</label>
          <select
            className="input"
            value={category}
            onChange={(event) => setCategory(event.target.value as CareerCategory)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-grad" onClick={handleAdd} disabled={saving}>
          <Plus size={16} />
          {saving ? "Posting..." : "Post Opening"}
        </button>
      </div>

      <div className="career-admin-groups">
        {groupedOpenings.map((group) => (
          <section className="career-admin-group" key={group.category}>
            <h3>
              <BriefcaseBusiness size={18} />
              {group.category}
            </h3>

            {group.openings.length > 0 ? (
              group.openings.map((opening) => (
                <div className="career-admin-row" key={opening.id}>
                  <div>
                    <strong>{opening.designation}</strong>
                    <span>{opening.active === false ? "Hidden" : "Visible"}</span>
                  </div>

                  <div className="career-admin-actions">
                    <button className="btn btn-edit" onClick={() => toggleStatus(opening)}>
                      {opening.active === false ? "Show" : "Hide"}
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(opening.id)}
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="career-admin-empty">No openings in this category.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
