"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AnalyticsRow } from "@/lib/analytics";

export default function AnalyticsChart({ title, data }: { title: string; data: AnalyticsRow[] }) {
  return <section className="analytics-panel analytics-chart"><h2>{title}</h2><ResponsiveContainer width="100%" height={280}><BarChart data={data}><CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} /><XAxis dataKey="name" stroke="#9e9aac" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#9e9aac" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} /><Tooltip contentStyle={{ background: "#171522", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} /><Bar dataKey="value" fill="#a855f7" radius={[7, 7, 0, 0]} /></BarChart></ResponsiveContainer></section>;
}
