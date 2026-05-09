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

  return (
    <div className="dashboard">

      {/* CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h4>Total Leads</h4>
          <p>{leads.length}</p>
        </div>

        <div className="stat-card">
          <h4>Total Blogs</h4>
          <p>{blogs.length}</p>
        </div>

        <div className="stat-card">
          <h4>Today Leads</h4>
          <p>
            {
              leads.filter(
                (l) =>
                  l.createdAt?.toDate().toDateString() ===
                  new Date().toDateString()
              ).length
            }
          </p>
        </div>

        <div className="stat-card">
          <h4>Active Services</h4>
          <p>{Object.keys(categoryCount).length}</p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="charts">

        {/* LINE CHART */}
        <div className="chart-card">
          <h3>Leads Over Time</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <Tooltip />
              <Line type="monotone" dataKey="leads" />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}
        <div className="chart-card">
          <h3>Service Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}