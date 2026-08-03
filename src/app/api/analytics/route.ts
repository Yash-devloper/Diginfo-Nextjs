import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminAuth } from "@/lib/firebaseAdmin";
import type { AnalyticsRow, WebsiteAnalytics } from "@/lib/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const date = (value: Date) => value.toISOString().slice(0, 10);
const startOfMonth = () => { const value = new Date(); value.setDate(1); return date(value); };
const adminEmails = () => (process.env.ADMIN_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);

function gaClient() {
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey || !process.env.GA_PROPERTY_ID) throw new Error("Google Analytics is not configured.");
  return new BetaAnalyticsDataClient({ credentials: { client_email: clientEmail, private_key: privateKey } });
}

const metricValue = (response: Awaited<ReturnType<BetaAnalyticsDataClient["runReport"]>>) => Number(response[0].rows?.[0]?.metricValues?.[0]?.value ?? 0);
const rows = (response: Awaited<ReturnType<BetaAnalyticsDataClient["runReport"]>>): AnalyticsRow[] =>
  (response[0].rows ?? []).map((row) => ({ name: row.dimensionValues?.[0]?.value || "(not set)", value: Number(row.metricValues?.[0]?.value ?? 0) }));

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await getFirebaseAdminAuth().verifyIdToken(token);
    const allowedEmails = adminEmails();
    const isAdmin = decoded.admin === true || (!!decoded.email && allowedEmails.includes(decoded.email.toLowerCase()));
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const client = gaClient();
    const property = `properties/${process.env.GA_PROPERTY_ID}`;
    const report = (startDate: string, endDate: string, metric: string, dimension?: string, limit = 10) => client.runReport({ property, dateRanges: [{ startDate, endDate }], metrics: [{ name: metric }], dimensions: dimension ? [{ name: dimension }] : undefined, limit, orderBys: dimension ? [{ metric: { metricName: metric }, desc: true }] : undefined });

    const [today, yesterday, last7Days, monthly, pageViews, topPages, trafficSources, devices, countries, cities, browsers] = await Promise.all([
      report("today", "today", "activeUsers"), report("yesterday", "yesterday", "activeUsers"), report("7daysAgo", "today", "activeUsers"), report(startOfMonth(), "today", "activeUsers"), report(startOfMonth(), "today", "screenPageViews"),
      report("30daysAgo", "today", "screenPageViews", "pagePath"), report("30daysAgo", "today", "sessions", "sessionDefaultChannelGroup"), report("30daysAgo", "today", "activeUsers", "deviceCategory"), report("30daysAgo", "today", "activeUsers", "country"), report("30daysAgo", "today", "activeUsers", "city"), report("30daysAgo", "today", "activeUsers", "browser"),
    ]);

    const analytics: WebsiteAnalytics = { updatedAt: new Date().toISOString(), summary: { today: metricValue(today), yesterday: metricValue(yesterday), last7Days: metricValue(last7Days), monthly: metricValue(monthly), pageViews: metricValue(pageViews) }, topPages: rows(topPages), trafficSources: rows(trafficSources), devices: rows(devices), countries: rows(countries), cities: rows(cities), browsers: rows(browsers) };
    return NextResponse.json(analytics, { headers: { "Cache-Control": "private, max-age=300" } });
  } catch (error) {
    console.error("Analytics API error", error);
    const message = error instanceof Error && error.message.includes("configured") ? error.message : "Unable to load Google Analytics data.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
