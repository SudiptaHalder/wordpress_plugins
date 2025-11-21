const BASE_URL = "http://localhost:5000"; 
// if using ngrok for backend use: "https://xxxxx.ngrok-free.dev"

async function request(endpoint) {
  const url = `${BASE_URL}${endpoint}`;

  console.log("FETCHING:", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    return response.json();

  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
}

export const analyticsAPI = {
  getOverview: (siteId, start, end) =>
    request(`/api/overview?site_id=${siteId}&start_date=${start}&end_date=${end}`),

  getTraffic: (siteId, start, end) =>
    request(`/api/traffic?site_id=${siteId}&start_date=${start}&end_date=${end}`),

  getActiveUsers: (siteId) =>
    request(`/api/realtime/active?site_id=${siteId}`),

  getRecentActivities: (siteId) =>
    request(`/api/realtime/activities?site_id=${siteId}`),
};
