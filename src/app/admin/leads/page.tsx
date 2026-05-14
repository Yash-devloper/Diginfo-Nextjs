"use client";

import { useEffect, useState } from "react";
import { db, handleFirestoreError } from "@/lib/firebaseClient";
import {
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import toast from "react-hot-toast";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));

    // Use onSnapshot for automatic offline-to-online syncing
    const unsubscribe = onSnapshot(q, 
      (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeads(data);
      }, 
      (error) => {
        handleFirestoreError(error);
        // We don't toast error here because the SDK will automatically 
        // retry and use cache in the meantime.
        console.warn("Firestore Syncing: Client is in offline mode.");
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "leads", id));
      toast.success("Lead deleted");
    } catch (error) {
      handleFirestoreError(error);
      toast.error("Failed to delete lead");
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search);

    const matchFilter = filter === "All" ? true : l.service === filter;

    return matchSearch && matchFilter;
  });

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Service", "Message", "Date"],
      ...filteredLeads.map((l) => [
        l.name,
        l.email,
        l.phone,
        l.service,
        l.message,
        l.createdAt?.toDate().toLocaleString(),
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "leads.csv";
    link.click();
  };

  return (
    <div className="leads-container">

      {/* HEADER */}
      <div className="leads-header">
        <div>
          <h2>Leads CRM</h2>
          <p className="sub">Manage and review all incoming enquiries</p>
        </div>

        <div className="controls">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>SEO</option>
            <option>Social Media</option>
            <option>Ads / PPC</option>
            <option>Website</option>
          </select>

          <button className="export-btn" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="leads-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>

                <td className="name">
                  <div className="avatar">
                    {lead.name?.charAt(0).toUpperCase()}
                  </div>
                  {lead.name}
                </td>

                <td className="email">{lead.email}</td>

                <td>{lead.phone}</td>

                <td>
                  <span className="service-badge">
                    {lead.service || "N/A"}
                  </span>
                </td>

                <td className="date">
                  {lead.createdAt?.toDate().toLocaleString()}
                </td>

                <td className="actions">
                  <button
                    className="view-btn"
                    onClick={() => setSelectedLead(lead)}
                  >
                    View
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(lead.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {selectedLead && (
        <div className="modal">
          <div className="modal-box">

            <h3>Lead Details</h3>

            <div className="modal-content">
              <p><b>Name:</b> {selectedLead.name}</p>
              <p><b>Email:</b> {selectedLead.email}</p>
              <p><b>Phone:</b> {selectedLead.phone}</p>
              <p><b>Service:</b> {selectedLead.service}</p>
              <p><b>Message:</b> {selectedLead.message}</p>
            </div>

            <div className="modal-actions">
              <button onClick={() => setSelectedLead(null)}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}