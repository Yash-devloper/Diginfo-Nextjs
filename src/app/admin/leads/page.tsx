"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Mail,
  Phone,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { db, handleFirestoreError } from "@/lib/firebaseClient";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import toast from "react-hot-toast";
import styles from "./leads.module.css";

type Lead = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  createdAt?: { toDate: () => Date };
};

const LEADS_PER_PAGE = 8;

const formatDate = (lead: Lead) =>
  lead.createdAt?.toDate().toLocaleString() ?? "—";

const csvValue = (value: unknown) =>
  `"${String(value ?? "").replaceAll('"', '""')}"`;

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leadsQuery = query(collection(db, "leads"), orderBy("createdAt", "desc"));

    return onSnapshot(
      leadsQuery,
      (snapshot) => {
        setLeads(snapshot.docs.map((lead) => ({ id: lead.id, ...lead.data() })) as Lead[]);
      },
      (error) => {
        handleFirestoreError(error);
        console.warn("Firestore Syncing: Client is in offline mode.");
      },
    );
  }, []);

  const filteredLeads = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        !searchTerm ||
        lead.name?.toLowerCase().includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm) ||
        lead.phone?.includes(searchTerm);
      const matchesFilter = filter === "All" || lead.service === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, leads, search]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / LEADS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * LEADS_PER_PAGE;
  const visibleLeads = filteredLeads.slice(startIndex, startIndex + LEADS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    tableScrollRef.current?.scrollTo({ left: 0 });
  }, [activePage]);

  const changePage = (page: number) => {
    // Reset before React swaps rows, then remount the scroller below as a fallback.
    // This avoids carrying horizontal scroll into the next page of leads.
    if (tableScrollRef.current) tableScrollRef.current.scrollLeft = 0;
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;

    try {
      await deleteDoc(doc(db, "leads", id));
      if (selectedLead?.id === id) setSelectedLead(null);
      toast.success("Lead deleted");
    } catch (error) {
      handleFirestoreError(error);
      toast.error("Failed to delete lead");
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Service", "Message", "Date"],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.service,
        lead.message,
        formatDate(lead),
      ]),
    ];
    const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "leads.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Inbox</p>
          <h2>Leads CRM</h2>
          <p className={styles.subtitle}>Review and follow up on every incoming enquiry.</p>
        </div>

        <div className={styles.controls}>
          <label className={styles.search}>
            <Search size={17} aria-hidden="true" />
            {/* <span className="sr-only">Search leads</span> */}
            <input placeholder="Search leads" value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }} />
          </label>
          <select aria-label="Filter leads by service" value={filter} onChange={(event) => { setFilter(event.target.value); setCurrentPage(1); }}>
            <option>All</option><option>SEO</option><option>Social Media</option><option>Ads / PPC</option>
            <option>Website</option><option>App Development</option><option>AEO/GEO</option>
          </select>
          <button className={styles.exportButton} onClick={exportCSV} type="button">
            <Download size={16} aria-hidden="true" /> Export CSV
          </button>
        </div>
      </header>

      <div className={styles.tableCard}>
        <div className={styles.tableMeta}>
          <span>{filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"}</span>
          <span>Scroll horizontally to see every field</span>
        </div>
        <div className={styles.tableScroll} key={`leads-page-${activePage}`} ref={tableScrollRef}>
          <table className={styles.table}>
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Date received</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {visibleLeads.map((lead) => (
                <tr key={lead.id}>
                  <td><div className={styles.person}><span className={styles.avatar}>{lead.name?.charAt(0).toUpperCase() ?? "?"}</span><span>{lead.name || "Unnamed lead"}</span></div></td>
                  <td className={styles.muted}>{lead.email || "—"}</td>
                  <td>{lead.phone || "—"}</td>
                  <td><span className={styles.badge}>{lead.service || "General enquiry"}</span></td>
                  <td className={styles.muted}>{formatDate(lead)}</td>
                  <td><div className={styles.rowActions}><button className={styles.viewButton} onClick={() => setSelectedLead(lead)} type="button"><Eye size={15} /> View</button><button className={styles.deleteButton} onClick={() => handleDelete(lead.id)} aria-label={`Delete ${lead.name || "lead"}`} type="button"><Trash2 size={16} /></button></div></td>
                </tr>
              ))}
              {!visibleLeads.length && <tr><td className={styles.empty} colSpan={6}>No leads match your search or filter.</td></tr>}
            </tbody>
          </table>
        </div>

        {filteredLeads.length > 0 && <nav className={styles.pagination} aria-label="Leads pagination">
          <p>Showing <strong>{startIndex + 1}–{Math.min(startIndex + LEADS_PER_PAGE, filteredLeads.length)}</strong> of <strong>{filteredLeads.length}</strong></p>
          <div className={styles.pageControls}>
            <button onClick={() => changePage(activePage - 1)} disabled={activePage === 1} type="button" aria-label="Previous page"><ChevronLeft size={18} /></button>
            <div className={styles.pageNumbers}>
              {pageNumbers.map((page) => <button key={page} className={page === activePage ? styles.currentPage : undefined} onClick={() => changePage(page)} type="button" aria-label={`Go to page ${page}`} aria-current={page === activePage ? "page" : undefined}>{page}</button>)}
            </div>
            <button onClick={() => changePage(activePage + 1)} disabled={activePage === totalPages} type="button" aria-label="Next page"><ChevronRight size={18} /></button>
          </div>
        </nav>}
      </div>

      {selectedLead && <div className={styles.drawerLayer} role="presentation" onMouseDown={() => setSelectedLead(null)}>
        <aside className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="lead-details-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className={styles.drawerHeader}><div><p className={styles.eyebrow}>Lead details</p><h3 id="lead-details-title">{selectedLead.name || "Unnamed lead"}</h3></div><button className={styles.closeButton} onClick={() => setSelectedLead(null)} aria-label="Close lead details" type="button"><X size={20} /></button></div>
          <div className={styles.detailList}>
            <div><Mail size={18} /><div><span>Email</span><a href={`mailto:${selectedLead.email}`}>{selectedLead.email || "Not provided"}</a></div></div>
            <div><Phone size={18} /><div><span>Phone</span><a href={`tel:${selectedLead.phone}`}>{selectedLead.phone || "Not provided"}</a></div></div>
            <div><CalendarDays size={18} /><div><span>Received</span><strong>{formatDate(selectedLead)}</strong></div></div>
            <div><span className={styles.detailIcon}>✦</span><div><span>Interested in</span><strong>{selectedLead.service || "General enquiry"}</strong></div></div>
          </div>
          <div className={styles.message}><span>Message</span><p>{selectedLead.message || "No message was included with this enquiry."}</p></div>
          <div className={styles.drawerFooter}><button className={styles.deleteTextButton} onClick={() => handleDelete(selectedLead.id)} type="button"><Trash2 size={16} /> Delete lead</button><button className={styles.doneButton} onClick={() => setSelectedLead(null)} type="button">Done</button></div>
        </aside>
      </div>}
    </section>
  );
}
