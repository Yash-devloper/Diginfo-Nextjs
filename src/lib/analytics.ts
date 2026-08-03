export type AnalyticsRow = { name: string; value: number };

export type WebsiteAnalytics = {
  updatedAt: string;
  summary: { today: number; yesterday: number; last7Days: number; monthly: number; pageViews: number };
  topPages: AnalyticsRow[];
  trafficSources: AnalyticsRow[];
  devices: AnalyticsRow[];
  countries: AnalyticsRow[];
  cities: AnalyticsRow[];
  browsers: AnalyticsRow[];
};
