const BASE_URL = "https://api.pikuanalytics.site";

export const getGeneralTraffic = async () => {
  const response = await fetch(`${BASE_URL}/api/general-traffic?site_id=test-site-123`);
  return response.json();
};
