import type { ReactNode } from "react";

export default function AnalyticsCard({ label, value, note, icon }: { label: string; value: number; note: string; icon: ReactNode }) {
  return <article className="analytics-card"><div className="analytics-card-icon">{icon}</div><p>{label}</p><strong>{new Intl.NumberFormat().format(value)}</strong><span>{note}</span></article>;
}
