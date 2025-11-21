import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API methods
export const analyticsAPI = {
  // Overview data
  getOverview: (siteId, startDate, endDate) => 
    api.get(`/overview?site_id=${siteId}&start_date=${startDate}&end_date=${endDate}`),
  
  // Traffic data
  getTraffic: (siteId, startDate, endDate) => 
    api.get(`/traffic?site_id=${siteId}&start_date=${startDate}&end_date=${endDate}`),
  
  // Performance data
  getPerformance: (siteId) => 
    api.get(`/performance?site_id=${siteId}`),
  
  // Real-time data
  getActiveUsers: (siteId) => 
    api.get(`/realtime/active?site_id=${siteId}`),
  
  getRecentActivities: (siteId) => 
    api.get(`/realtime/activities?site_id=${siteId}`),
  
  // Track event
  trackEvent: (data) => 
    api.post('/track', data),
  
  // Health check
  healthCheck: () => 
    api.get('/health')
};

export default api;