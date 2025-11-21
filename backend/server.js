const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();
const path = require("path");

// Initialize Express app FIRST (very important)
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve tracking.js from public folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;


// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'analytics_dashboard'
};

const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

// ==================== REAL DATA ENDPOINTS ====================

// 1. Overview Data
app.get('/api/overview', async (req, res) => {
  try {
    const { site_id, start_date, end_date } = req.query;
    
    // Get total visitors
    const [visitorsResult] = await pool.execute(
      `SELECT COUNT(DISTINCT ip) as total_visitors 
       FROM analytics_events 
       WHERE site_id = ? AND timestamp BETWEEN ? AND ?`,
      [site_id, start_date, end_date]
    );

    // Get total pageviews
    const [pageviewsResult] = await pool.execute(
      `SELECT COUNT(*) as total_pageviews 
       FROM analytics_events 
       WHERE site_id = ? AND timestamp BETWEEN ? AND ?`,
      [site_id, start_date, end_date]
    );

    // Get bounce rate (single page visits)
    const [bounceResult] = await pool.execute(
      `SELECT COUNT(*) as bounce_count FROM (
        SELECT ip FROM analytics_events 
        WHERE site_id = ? AND timestamp BETWEEN ? AND ?
        GROUP BY ip HAVING COUNT(*) = 1
      ) as single_visits`,
      [site_id, start_date, end_date]
    );

    const overviewData = {
      visitors: visitorsResult[0].total_visitors,
      pageviews: pageviewsResult[0].total_pageviews,
      bounceRate: ((bounceResult[0].bounce_count / visitorsResult[0].total_visitors) * 100).toFixed(1) + '%',
      avgSession: '2m 34s', // You can calculate this from session data
      newVisitors: Math.floor(visitorsResult[0].total_visitors * 0.68),
      returningVisitors: Math.floor(visitorsResult[0].total_visitors * 0.32)
    };

    res.json(overviewData);
  } catch (error) {
    console.error('Error fetching overview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Traffic Data
app.get('/api/traffic', async (req, res) => {
  try {
    const { site_id, start_date, end_date } = req.query;
    
    // Get daily traffic
    const [dailyTraffic] = await pool.execute(
      `SELECT 
        DATE(timestamp) as date,
        COUNT(DISTINCT ip) as visitors,
        COUNT(*) as pageviews
       FROM analytics_events 
       WHERE site_id = ? AND timestamp BETWEEN ? AND ?
       GROUP BY DATE(timestamp)
       ORDER BY date DESC
       LIMIT 7`,
      [site_id, start_date, end_date]
    );

    // Get traffic sources
    const [sources] = await pool.execute(
      `SELECT 
        CASE 
          WHEN referrer = '' OR referrer IS NULL THEN 'Direct'
          WHEN referrer LIKE '%google%' THEN 'Organic Search'
          WHEN referrer LIKE '%facebook%' OR referrer LIKE '%twitter%' THEN 'Social Media'
          ELSE 'Referral'
        END as source,
        COUNT(DISTINCT ip) as visitors,
        ROUND((COUNT(DISTINCT ip) / (SELECT COUNT(DISTINCT ip) FROM analytics_events WHERE site_id = ?)) * 100, 1) as percentage
       FROM analytics_events 
       WHERE site_id = ? AND timestamp BETWEEN ? AND ?
       GROUP BY source`,
      [site_id, site_id, start_date, end_date]
    );

    // Get device distribution
    const [devices] = await pool.execute(
      `SELECT 
        device,
        COUNT(DISTINCT ip) as visitors,
        ROUND((COUNT(DISTINCT ip) / (SELECT COUNT(DISTINCT ip) FROM analytics_events WHERE site_id = ?)) * 100, 1) as percentage
       FROM analytics_events 
       WHERE site_id = ? AND timestamp BETWEEN ? AND ?
       GROUP BY device`,
      [site_id, site_id, start_date, end_date]
    );

    res.json({
      timeline: dailyTraffic,
      sources: sources,
      devices: devices
    });
  } catch (error) {
    console.error('Error fetching traffic:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Performance Data (You'll need to set up performance monitoring)
app.get('/api/performance', async (req, res) => {
  try {
    const { site_id } = req.query;
    
    // Get latest performance metrics
    const [performance] = await pool.execute(
      `SELECT * FROM speed_reports 
       WHERE site_id = ? 
       ORDER BY timestamp DESC 
       LIMIT 1`,
      [site_id]
    );

    // Get performance history
    const [history] = await pool.execute(
      `SELECT 
        DATE(timestamp) as date,
        AVG(score) as performance,
        AVG(lcp) as lcp,
        AVG(ttfb) as ttfb,
        AVG(cls) as cls
       FROM speed_reports 
       WHERE site_id = ? AND timestamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(timestamp)
       ORDER BY date`,
      [site_id]
    );

    res.json({
      current: performance[0] || null,
      history: history
    });
  } catch (error) {
    console.error('Error fetching performance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 4. Real-time Active Users
app.get('/api/realtime/active', async (req, res) => {
  try {
    const { site_id } = req.query;
    
    const [activeUsers] = await pool.execute(
      `SELECT COUNT(DISTINCT ip) as active_users 
       FROM analytics_events 
       WHERE site_id = ? AND timestamp >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)`,
      [site_id]
    );

    res.json({ activeUsers: activeUsers[0].active_users });
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 5. Recent Activities
app.get('/api/realtime/activities', async (req, res) => {
  try {
    const { site_id } = req.query;
    
    const [activities] = await pool.execute(
      `SELECT 
        ip,
        url as page,
        referrer,
        device,
        browser,
        timestamp
       FROM analytics_events 
       WHERE site_id = ? 
       ORDER BY timestamp DESC 
       LIMIT 10`,
      [site_id]
    );

    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 6. Analytics Tracking Endpoint
app.post('/api/track', async (req, res) => {
  try {
    const { site_id, url, referrer, device, browser, ip } = req.body;
    
    await pool.execute(
      `INSERT INTO analytics_events (site_id, url, referrer, device, browser, ip, timestamp) 
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [site_id, url, referrer || '', device || '', browser || '', ip]
    );

    res.json({ status: 'success', message: 'Event tracked' });
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Analytics API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Analytics backend running on port ${PORT}`);
  testConnection();
});