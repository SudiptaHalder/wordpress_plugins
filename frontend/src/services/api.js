// FRONTEND DASHBOARD API CLIENT
const BASE_URL = "https://api.pikuanalytics.site";

async function request(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  console.log("FETCHING:", url);

  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
}

export const analyticsAPI = {
  getOverview: (siteId) =>
    request(`/api/overview?site_id=${siteId}`),

  getTraffic: (siteId) =>
    request(`/api/traffic?site_id=${siteId}`),

  getActiveUsers: (siteId) =>
    request(`/api/realtime/active?site_id=${siteId}`),

  getRecentActivities: (siteId) =>
    request(`/api/realtime/activities?site_id=${siteId}`),
};
