"use client";

import { useEffect, useState } from "react";
import {
  getAllTeamMembers,
  type TeamMember,
  saveTeamMember,
  updateTeamMember,
  deleteTeamMember,
  updateTeamMemberOrder,
} from "@/lib/team";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TeamAdmin() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState(""); // New state for description
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllTeamMembers();
        setTeam(data);
      } catch (err) {
        console.error("Team Firestore Error:", err);
        setError("Failed to load team members. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    void fetchTeam();
  }, []);

  const refreshTeam = async () => {
    const data = await getAllTeamMembers();
    setTeam(data);
  };

  const handleSave = async () => {
    if (!name || !role || !description) {
      alert("Please provide name, role, and description.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await saveTeamMember(name, role, description, imageFile || undefined);
      await refreshTeam();
      setName("");
      setRole("");
      setDescription("");
      setImageFile(null);
      alert("Team member saved successfully.");
    } catch (err: any) {
      console.error("Save Error:", err);
      setError(err.message || "Failed to save team member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setDescription(member.description ?? "");
    setExistingImageUrl(member.imageUrl ?? "");
    setImageFile(null);
    setError(null);
  };

  const handleUpdate = async () => { // Added description parameter
    if (!editingId || !name || !role || !description) {
      alert("Please provide name, role, and description.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updateTeamMember(editingId, name, role, imageFile || undefined, existingImageUrl, description);
      await refreshTeam();
      setEditingId(null);
      setName("");
      setRole("");
      setDescription("");
      setImageFile(null);
      setExistingImageUrl("");
      alert("Team member updated successfully.");
    } catch (err) {
      console.error("Team member update error:", err);
      setError(
        err instanceof Error
          ? `Failed to update team member: ${err.message}`
          : "Failed to update team member. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await deleteTeamMember(id);
      await refreshTeam();
      alert("Team member deleted successfully.");
    } catch (err) {
      setError("Failed to delete team member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setDescription("");
    setImageFile(null);
    setExistingImageUrl("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }
      setImageFile(file);
    }
  };

  // DND Kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requires moving 8px before drag starts, allows button clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = team.findIndex((member) => member.id === active.id);
      const newIndex = team.findIndex((member) => member.id === over.id);

      const newTeam = arrayMove(team, oldIndex, newIndex);
      setTeam(newTeam);

      // Update order in Firestore
      setSaving(true);
      setError(null);
      try {
        for (let i = 0; i < newTeam.length; i++) {
          await updateTeamMemberOrder(newTeam[i].id, i);
        }
        alert("Team member order updated successfully.");
      } catch (err) {
        console.error("Error updating team member order:", err);
        setError("Failed to update team member order.");
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="seo-admin">
        <div className="pricing-header">
          <h2>Team</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seo-admin">
      <div className="pricing-header">
        <h2>Team</h2>
        <p>Manage team members shown on the site</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {!editingId && (
        <div className="pricing-form-card">
          <div className="form-grid">
          <input
            placeholder="Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Designation"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="team-image-upload"
            />
            <label htmlFor="team-image-upload" className="file-input-label">
              {imageFile ? imageFile.name : 'Upload Image'}
            </label>
            <span className="file-size-hint">
              Recommended: 400×400px (square images work best)
            </span>
          </div>
          </div>

          <button
            onClick={handleSave}
            className="btn btn-grad full-btn"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Team Member"}
          </button>
        </div>
      )}

      {editingId && (
        <div className="pricing-form-card edit-modal">
          <h3>Edit Team Member</h3>
          <div className="form-grid">
            <input
              placeholder="Member Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Designation"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />

            <div className="file-input-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="team-image-edit"
              />
              <label htmlFor="team-image-edit" className="file-input-label">
                {imageFile ? imageFile.name : existingImageUrl ? 'Change Image' : 'Upload Image'}
              </label>
              <span className="file-size-hint">
                Recommended: 400×400px (square images work best)
              </span>
            </div>
          </div>

          <div className="edit-buttons">
            <button onClick={handleUpdate} className="btn btn-grad" disabled={saving}>
              {saving ? "Updating..." : "Update"}
            </button>
            <button onClick={cancelEdit} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="service-list">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={team.map(member => member.id)} strategy={verticalListSortingStrategy}>
            <table className="testimonials-table">
              <thead>
                <tr>
                  <th aria-label="Reorder" />
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member) => (
                  <SortableItem key={member.id} member={member} handleEdit={handleEdit} handleDelete={handleDelete} saving={saving} />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

interface SortableItemProps {
  member: TeamMember;
  handleEdit: (member: TeamMember) => void;
  handleDelete: (id: string) => void;
  saving: boolean;
}

function SortableItem({ member, handleEdit, handleDelete, saving }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td>
        <button
          type="button"
          className="btn"
          style={{ cursor: "grab", minWidth: 36, padding: "0 8px" }}
          aria-label={`Reorder ${member.name}`}
          {...attributes}
          {...listeners}
        >
          Drag
        </button>
      </td>
      <td>{member.name}</td>
      <td>{member.role}</td>
      <td>{member.description}</td>
      <td>
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 8 }} />
        ) : (
          "No image"
        )}
      </td>
      <td>
        <div className="action-buttons">
          <button onClick={() => handleEdit(member)} className="btn btn-edit" disabled={saving}>
            Edit
          </button>
          <button onClick={() => handleDelete(member.id)} className="btn btn-delete" disabled={saving}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
