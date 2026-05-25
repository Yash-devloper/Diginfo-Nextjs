"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, getDocs } from "firebase/firestore";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const leadsSnap = await getDocs(collection(db, "leads"));
      const blogsSnap = await getDocs(collection(db, "blogs"));

      const leadsData = leadsSnap.docs.map((doc) => doc.data());
      const blogsData = blogsSnap.docs.map((doc) => doc.data());

      setLeads(leadsData);
      setBlogs(blogsData);
    };

    fetchData();
  }, []);

  // 📊 Leads per day
  const leadsPerDay: any = {};

  leads.forEach((l) => {
    const date = l.createdAt?.toDate().toLocaleDateString();

    if (!date) return;

    leadsPerDay[date] = (leadsPerDay[date] || 0) + 1;
  });

  const chartData = Object.keys(leadsPerDay).map((date) => ({
    date,
    leads: leadsPerDay[date],
  }));

  // 📊 Category chart
  const categoryCount: any = {};

  leads.forEach((l) => {
    const cat = l.service || "Other";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  const barData = Object.keys(categoryCount).map((c) => ({
    name: c,
    count: categoryCount[c],
  }));

  const todayLeads = leads.filter(
    (l) =>
      l.createdAt?.toDate().toDateString() ===
      new Date().toDateString()
  ).length;

  const stats = [
    {
      label: "Total Leads",
      value: leads.length,
      note: "All enquiries captured",
    },
    {
      label: "Total Blogs",
      value: blogs.length,
      note: "Published content assets",
    },
    {
      label: "Today Leads",
      value: todayLeads,
      note: "Fresh opportunities today",
    },
    {
      label: "Active Services",
      value: Object.keys(categoryCount).length,
      note: "Service interests tracked",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div>
          <span className="dashboard-kicker">Agency Command Center</span>
          <h1>Dashboard Overview</h1>
          <p>
            Track leads, content activity, and service demand from one polished
            admin workspace.
          </p>
        </div>

        <div className="dashboard-live-card">
          <span>Live Snapshot</span>
          <strong>{leads.length + blogs.length}</strong>
          <small>Total records synced</small>
        </div>
      </div>

      {/* CARDS */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card dashboard-stat-card" key={stat.label}>
            <div className="stat-icon">{String(index + 1).padStart(2, "0")}</div>
            <h4>{stat.label}</h4>
            <p>{stat.value}</p>
            <span>{stat.note}</span>
          </div>
        ))}

      </div>

      {/* CHARTS */}
      <div className="charts">

        {/* LINE CHART */}
        <div className="chart-card">
          <div className="chart-head">
            <div>
              <span>Performance</span>
              <h3>Leads Over Time</h3>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.48)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(9,8,15,0.92)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4, fill: "#a855f7", strokeWidth: 0 }}
                activeDot={{ r: 7, fill: "#f97316" }}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}
        <div className="chart-card">
          <div className="chart-head">
            <div>
              <span>Demand Mix</span>
              <h3>Service Distribution</h3>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.48)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(9,8,15,0.92)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="count" fill="#a855f7" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}
