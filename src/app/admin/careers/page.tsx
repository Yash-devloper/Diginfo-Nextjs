"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Edit3, Plus, Save, Trash2, X } from "lucide-react";
import { auth } from "@/lib/firebaseClient";
import toast from "react-hot-toast";
import {
  candidateTypes,
  employmentTypes,
  type Job,
  type JobInput,
} from "@/lib/jobs";

const emptyJob: JobInput = {
  title: "",
  candidateType: "Fresher",
  experienceRequired: "",
  description: "",
  location: "",
  employmentType: "Full-time",
};

function formatExperience(experience: string) {
  return experience.trim() || "Not required";
}

async function readError(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  return data?.error ?? "Something went wrong. Please try again.";
}

async function apiHeaders() {
  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error("Please sign in again before managing job openings.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState<JobInput>(emptyJob);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadJobs = useCallback(async () => {
    try {
      const response = await fetch("/api/jobs?includeInactive=true", {
        headers: await apiHeaders(),
        cache: "no-store",
      });
      if (!response.ok) throw new Error(await readError(response));

      const data = (await response.json()) as { jobs: Job[] };
      setJobs(data.jobs);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load job openings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  const updateField = <K extends keyof JobInput>(field: K, value: JobInput[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyJob);
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(editingId ? `/api/jobs/${editingId}` : "/api/jobs", {
        method: editingId ? "PATCH" : "POST",
        headers: await apiHeaders(),
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(await readError(response));

      toast.success(editingId ? "Job opening updated." : "Job opening posted.");
      resetForm();
      await loadJobs();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save the job opening.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (job: Job) => {
    setForm({
      title: job.title,
      candidateType: job.candidateType,
      experienceRequired: job.experienceRequired,
      description: job.description,
      location: job.location,
      employmentType: job.employmentType,
    });
    setEditingId(job.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isExperienceRequired = form.candidateType === "Experienced";

  const deleteJob = async (job: Job) => {
    if (!window.confirm(`Delete “${job.title}”? This cannot be undone.`)) return;

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
        headers: await apiHeaders(),
      });
      if (!response.ok) throw new Error(await readError(response));

      if (editingId === job.id) resetForm();
      toast.success("Job opening deleted.");
      await loadJobs();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete the job opening.");
    }
  };

  return (
    <div className="career-admin">
      <div className="admin-title-row">
        <div>
          <h2 className="admin-title">
            Job <span className="gt">Openings</span>
          </h2>
          <p>Create and manage the roles displayed on the public careers page.</p>
        </div>
      </div>

      <form className="career-admin-form" onSubmit={handleSubmit}>
        <div className="career-admin-field career-admin-field-wide">
          <label htmlFor="job-title">Job Title</label>
          <input
            id="job-title"
            className="input"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="e.g. Digital Marketing Executive"
            maxLength={120}
            required
          />
        </div>

        <div className="career-admin-field">
          <label htmlFor="candidate-type">Candidate Type</label>
          <select
            id="candidate-type"
            className="input"
            value={form.candidateType}
            onChange={(event) => updateField("candidateType", event.target.value as JobInput["candidateType"])}
          >
            {candidateTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>

        <div className="career-admin-field">
          <label htmlFor="experience-required">Experience Required</label>
          <input
            id="experience-required"
            className="input"
            value={form.experienceRequired}
            onChange={(event) => updateField("experienceRequired", event.target.value)}
            placeholder={isExperienceRequired ? "e.g. 2-4 years" : "Optional"}
            maxLength={100}
            required={isExperienceRequired}
          />
        </div>

        <div className="career-admin-field">
          <label htmlFor="job-location">Location</label>
          <input
            id="job-location"
            className="input"
            value={form.location}
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="e.g. Indore / Hybrid"
            maxLength={160}
            required
          />
        </div>

        <div className="career-admin-field">
          <label htmlFor="employment-type">Job Type</label>
          <select
            id="employment-type"
            className="input"
            value={form.employmentType}
            onChange={(event) => updateField("employmentType", event.target.value as JobInput["employmentType"])}
          >
            {employmentTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>

        <div className="career-admin-field career-admin-field-full">
          <label htmlFor="job-description">Job Description</label>
          <textarea
            id="job-description"
            className="input career-admin-textarea"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Describe the role, responsibilities, and what success looks like."
            maxLength={5000}
            minLength={20}
            required
          />
        </div>

        <div className="career-admin-form-actions">
          <button className="btn btn-grad" type="submit" disabled={saving}>
            {editingId ? <Save size={16} /> : <Plus size={16} />}
            {saving ? "Saving..." : editingId ? "Save Changes" : "Post Job"}
          </button>
          {editingId && (
            <button className="btn btn-edit" type="button" onClick={resetForm}>
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </form>

      <section className="career-admin-jobs" aria-labelledby="published-jobs-heading">
        <h3 id="published-jobs-heading">Published job openings</h3>
        {loading ? (
          <p className="career-admin-empty">Loading job openings...</p>
        ) : jobs.length ? (
          <div className="career-admin-jobs-list">
            {jobs.map((job) => (
              <article className="career-admin-job" key={job.id}>
                <div>
                  <strong>{job.title}</strong>
                  <span>
                    {job.candidateType} · {job.employmentType} · {formatExperience(job.experienceRequired)} · {job.location}
                  </span>
                </div>
                <div className="career-admin-actions">
                  <button className="btn btn-edit" type="button" onClick={() => startEditing(job)}>
                    <Edit3 size={15} /> Edit
                  </button>
                  <button className="btn btn-delete" type="button" onClick={() => void deleteJob(job)}>
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="career-admin-empty">No job openings have been posted yet.</p>
        )}
      </section>
    </div>
  );
}
