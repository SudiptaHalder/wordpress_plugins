import { useState, useEffect } from "react";
import { analyticsAPI } from "../services/api";

export const useAnalytics = (siteId = "test-site-123") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDateRange = () => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    return { startDate, endDate };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { startDate, endDate } = getDateRange();

        // ONLY WORKING ENDPOINTS
        const overview = await analyticsAPI.getOverview(siteId, startDate, endDate);
        const traffic = await analyticsAPI.getTraffic(siteId, startDate, endDate);
        const active = await analyticsAPI.getActiveUsers(siteId);
        const activities = await analyticsAPI.getRecentActivities(siteId);

        setData({
          overview,
          traffic,
          realTime: {
            activeUsers: active?.activeUsers || 0,
            events: activities || []
          }
        });

      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [siteId]);

  return { data, loading, error };
};
