"use client";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { AnalyticsRow } from "@/lib/analytics";
const colors = ["#a855f7", "#f97316", "#22d3ee", "#facc15"];
export default function DevicePieChart({ devices }: { devices: AnalyticsRow[] }) { return <section className="analytics-panel analytics-chart"><h2>Device Types</h2><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={devices} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>{devices.map((device, index) => <Cell key={device.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip contentStyle={{ background: "#171522", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} /><Legend /></PieChart></ResponsiveContainer></section>; }
