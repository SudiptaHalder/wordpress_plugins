// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2/promise');
// require('dotenv').config();
// const path = require("path");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve tracking.js
// app.use(express.static(path.join(__dirname, "public")));

// const PORT = process.env.PORT || 5000;

// // ---------------------
// // DATABASE CONNECTION
// // ---------------------
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: { rejectUnauthorized: false } // ⭐ REQUIRED FOR RAILWAY
// });

// // Test connection
// async function testConnection() {
//   try {
//     const conn = await pool.getConnection();
//     console.log("✅ MySQL Connected Successfully");
//     conn.release();
//   } catch (err) {
//     console.error("❌ MySQL Connection Failed:", err.message);
//   }
// }

// // ---------------------
// // API ENDPOINTS
// // ---------------------

// // Overview analytics
// app.get('/api/overview', async (req, res) => {
//   try {
//     const { site_id, start_date, end_date } = req.query;

//     const [visitors] = await pool.execute(
//       `SELECT COUNT(DISTINCT ip) AS total_visitors 
//        FROM analytics_events 
//        WHERE site_id = ? AND timestamp BETWEEN ? AND ?`,
//       [site_id, start_date, end_date]
//     );

//     const [pageviews] = await pool.execute(
//       `SELECT COUNT(*) AS total_pageviews
//        FROM analytics_events 
//        WHERE site_id = ? AND timestamp BETWEEN ? AND ?`,
//       [site_id, start_date, end_date]
//     );

//     const [bounce] = await pool.execute(
//       `SELECT COUNT(*) AS bounce_count FROM (
//         SELECT ip FROM analytics_events
//         WHERE site_id = ? AND timestamp BETWEEN ? AND ?
//         GROUP BY ip HAVING COUNT(*) = 1
//       ) AS t`,
//       [site_id, start_date, end_date]
//     );

//     const totalVisitors = visitors[0].total_visitors;

//     res.json({
//       visitors: totalVisitors,
//       pageviews: pageviews[0].total_pageviews,
//       bounceRate: totalVisitors > 0 
//         ? ((bounce[0].bounce_count / totalVisitors) * 100).toFixed(1) + "%"
//         : "0%",
//       avgSession: "2m 34s",
//       newVisitors: Math.round(totalVisitors * 0.7),
//       returningVisitors: Math.round(totalVisitors * 0.3)
//     });

//   } catch (error) {
//     console.error("Error fetching overview:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Traffic data
// app.get('/api/traffic', async (req, res) => {
//   try {
//     const { site_id, start_date, end_date } = req.query;

//     const [timeline] = await pool.execute(
//       `SELECT DATE(timestamp) AS date,
//               COUNT(DISTINCT ip) AS visitors,
//               COUNT(*) AS pageviews
//        FROM analytics_events
//        WHERE site_id = ? AND timestamp BETWEEN ? AND ?
//        GROUP BY DATE(timestamp)
//        ORDER BY date DESC
//        LIMIT 7`,
//       [site_id, start_date, end_date]
//     );

//     const [sources] = await pool.execute(
//       `SELECT 
//          CASE 
//             WHEN referrer = '' OR referrer IS NULL THEN 'Direct'
//             WHEN referrer LIKE '%google%' THEN 'Organic Search'
//             WHEN referrer LIKE '%facebook%' OR referrer LIKE '%twitter%' THEN 'Social Media'
//             ELSE 'Referral'
//          END AS source,
//          COUNT(*) AS count
//        FROM analytics_events
//        WHERE site_id = ? AND timestamp BETWEEN ? AND ?
//        GROUP BY source`,
//       [site_id, start_date, end_date]
//     );

//     const [devices] = await pool.execute(
//       `SELECT device, COUNT(*) AS count
//        FROM analytics_events
//        WHERE site_id = ? AND timestamp BETWEEN ? AND ?
//        GROUP BY device`,
//       [site_id, start_date, end_date]
//     );

//     res.json({ timeline, sources, devices });

//   } catch (error) {
//     console.error("Error fetching traffic:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Real-time visitors
// app.get('/api/realtime/active', async (req, res) => {
//   try {
//     const { site_id } = req.query;

//     const [active] = await pool.execute(
//       `SELECT COUNT(DISTINCT ip) AS active_users
//        FROM analytics_events
//        WHERE site_id = ?
//        AND timestamp >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)`,
//       [site_id]
//     );

//     res.json({ activeUsers: active[0].active_users });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Recent activity
// app.get('/api/realtime/activities', async (req, res) => {
//   try {
//     const { site_id } = req.query;

//     const [rows] = await pool.execute(
//       `SELECT ip, url, referrer, device, browser, timestamp
//        FROM analytics_events
//        WHERE site_id = ?
//        ORDER BY timestamp DESC
//        LIMIT 20`,
//       [site_id]
//     );

//     res.json(rows);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Track Event
// app.post('/api/track', async (req, res) => {
//   try {
//     const { site_id, url, referrer, device, browser, ip } = req.body;

//     await pool.execute(
//       `INSERT INTO analytics_events (site_id, url, referrer, device, browser, ip, timestamp)
//        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//       [site_id, url, referrer || '', device, browser, ip || ""]
//     );

//     res.json({ status: "success" });
//   } catch (error) {
//     console.error("Track error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: "OK", message: "Analytics API is running" });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   testConnection();
// });
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve tracking.js
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

// ---------------------
// DATABASE CONNECTION
// ---------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }
});

// Test connection
async function testConnection() {
  try {
    await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  }
}

// ---------------------
// API ENDPOINTS
// ---------------------

// =============== OVERVIEW (NO DATE FILTER) ===============
app.get('/api/overview', async (req, res) => {
  try {
    const { site_id } = req.query;

    const [visitors] = await pool.execute(
      `SELECT COUNT(DISTINCT ip) AS total_visitors 
       FROM analytics_events WHERE site_id = ?`,
      [site_id]
    );

    const [pageviews] = await pool.execute(
      `SELECT COUNT(*) AS total_pageviews
       FROM analytics_events WHERE site_id = ?`,
      [site_id]
    );

    const [bounce] = await pool.execute(
      `SELECT COUNT(*) AS bounce_count FROM (
         SELECT ip FROM analytics_events 
         WHERE site_id = ?
         GROUP BY ip HAVING COUNT(*) = 1
       ) AS t`,
      [site_id]
    );

    const totalVisitors = visitors[0].total_visitors || 0;

    res.json({
      visitors: totalVisitors,
      pageviews: pageviews[0].total_pageviews || 0,
      bounceRate: totalVisitors > 0 ?
        ((bounce[0].bounce_count / totalVisitors) * 100).toFixed(1) + "%" :
        "0%",
      avgSession: "2m 34s",
      newVisitors: Math.round(totalVisitors * 0.7),
      returningVisitors: Math.round(totalVisitors * 0.3)
    });

  } catch (err) {
    console.error("Overview error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =============== TRAFFIC (NO DATE FILTER) ===============
app.get('/api/traffic', async (req, res) => {
  try {
    const { site_id } = req.query;

    const [timeline] = await pool.execute(
      `SELECT DATE(timestamp) AS date,
              COUNT(DISTINCT ip) AS visitors,
              COUNT(*) AS pageviews
       FROM analytics_events 
       WHERE site_id = ?
       GROUP BY DATE(timestamp)
       ORDER BY date DESC
       LIMIT 7`,
      [site_id]
    );

    const [sources] = await pool.execute(
      `SELECT 
         CASE 
           WHEN referrer = '' OR referrer IS NULL THEN 'Direct'
           WHEN referrer LIKE '%google%' THEN 'Organic Search'
           WHEN referrer LIKE '%facebook%' OR referrer LIKE '%twitter%' THEN 'Social Media'
           ELSE 'Referral'
         END AS source,
         COUNT(*) AS visitors,
         0 as percentage
       FROM analytics_events
       WHERE site_id = ?
       GROUP BY source`,
      [site_id]
    );

    const [devices] = await pool.execute(
      `SELECT device AS device, COUNT(*) AS visitors, 0 as percentage
       FROM analytics_events
       WHERE site_id = ?
       GROUP BY device`,
      [site_id]
    );

    res.json({ timeline, sources, devices });

  } catch (err) {
    console.error("Traffic error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =============== REALTIME ACTIVE USERS ===============
app.get('/api/realtime/active', async (req, res) => {
  try {
    const { site_id } = req.query;

    const [active] = await pool.execute(
      `SELECT COUNT(DISTINCT ip) AS active_users
       FROM analytics_events 
       WHERE site_id = ?
       AND timestamp >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)`,
      [site_id]
    );

    res.json({ activeUsers: active[0].active_users || 0 });
  } catch (err) {
    console.error("Realtime error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =============== RECENT ACTIVITY ===============
app.get('/api/realtime/activities', async (req, res) => {
  try {
    const { site_id } = req.query;

    const [rows] = await pool.execute(
      `SELECT ip, url, referrer, device, browser, timestamp
       FROM analytics_events
       WHERE site_id = ?
       ORDER BY timestamp DESC
       LIMIT 20`,
      [site_id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Activities error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =============== TRACK EVENT ===============
app.post('/api/track', async (req, res) => {
  try {
    const { site_id, url, referrer, device, browser, ip } = req.body;

    await pool.execute(
      `INSERT INTO analytics_events (site_id, url, referrer, device, browser, ip, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [site_id, url, referrer || "", device, browser, ip || ""]
    );

    res.json({ status: "success" });
  } catch (err) {
    console.error("Track error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =============== HEALTH CHECK ===============
app.get('/api/health', (req, res) => {
  res.json({ status: "OK", message: "API running" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  testConnection();
});
