"use client";

import { useCallback, useEffect, useState } from "react";
import { BarChart3, CalendarDays, MonitorSmartphone, RefreshCw, Users } from "lucide-react";
import { auth } from "@/lib/firebaseClient";
import type { WebsiteAnalytics } from "@/lib/analytics";
import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";
import CountryTable from "@/components/analytics/CountryTable";
import DevicePieChart from "@/components/analytics/DevicePieChart";
import TopPagesTable from "@/components/analytics/TopPagesTable";
import TrafficSourcesChart from "@/components/analytics/TrafficSourcesChart";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<WebsiteAnalytics | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadAnalytics = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Your session has expired. Please sign in again.");
      const response = await fetch("/api/analytics", { headers: { Authorization: `Bearer ${await user.getIdToken()}` }, cache: "no-store" });
      const data = await response.json() as WebsiteAnalytics & { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to load analytics.");
      setAnalytics(data);
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to load analytics."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadAnalytics(); }, [loadAnalytics]);
  const cards = analytics ? [
    ["Today's Visitors", analytics.summary.today, "Active users today", <Users key="today" />],
    ["Yesterday's Visitors", analytics.summary.yesterday, "Previous calendar day", <CalendarDays key="yesterday" />],
    ["Last 7 Days", analytics.summary.last7Days, "Active users", <BarChart3 key="week" />],
    ["Monthly Visitors", analytics.summary.monthly, "Month to date", <Users key="month" />],
    ["Page Views", analytics.summary.pageViews, "Month to date", <MonitorSmartphone key="pages" />],
  ] as const : [];

  return <div className="analytics-dashboard">
    <header className="analytics-hero"><div><span>Google Analytics 4</span><h1>Website Analytics</h1><p>Live reporting from your Google Analytics property. No visitor data is stored in Firestore.</p></div><button type="button" className="analytics-refresh" onClick={() => void loadAnalytics()} disabled={loading}><RefreshCw size={16} className={loading ? "is-spinning" : ""} /> Refresh</button></header>
    {error && <div className="analytics-error"><strong>Analytics needs attention</strong><p>{error}</p><small>Check the server environment variables and confirm the GA service account has Viewer access to your property.</small></div>}
    {loading && !analytics ? <div className="analytics-loading">Loading Google Analytics data…</div> : analytics && <><div className="analytics-cards">{cards.map(([label, value, note, icon]) => <AnalyticsCard key={label} label={label} value={value} note={note} icon={icon} />)}</div><p className="analytics-updated">Last updated {new Date(analytics.updatedAt).toLocaleString()}</p><div className="analytics-grid analytics-grid-two"><TopPagesTable pages={analytics.topPages} /><TrafficSourcesChart sources={analytics.trafficSources} /><DevicePieChart devices={analytics.devices} /><AnalyticsChart title="Browsers" data={analytics.browsers} /><CountryTable title="Countries" rows={analytics.countries} /><CountryTable title="Cities" rows={analytics.cities} /></div></>}
  </div>;
}
