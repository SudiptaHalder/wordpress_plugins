import axios from "axios";

const API = "https://api.pikuanalytics.site";

export const getSeoData = async (siteId = "test-site-123") => {
  const res = await axios.get(`${API}/api/seo?site_id=${siteId}`);
  return res.data;
};
