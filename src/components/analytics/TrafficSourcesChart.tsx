import AnalyticsChart from "./AnalyticsChart";
import type { AnalyticsRow } from "@/lib/analytics";
export default function TrafficSourcesChart({ sources }: { sources: AnalyticsRow[] }) { return <AnalyticsChart title="Traffic Sources" data={sources} />; }
