import axios from "axios";

const API = (endpoint, params = {}) => {
  return axios.get(`${window._backendUrl}${endpoint}`, {
    params: {
      site_id: window._wpAnalyticsSiteId,
      ...params
    }
  });
};

export default API;
