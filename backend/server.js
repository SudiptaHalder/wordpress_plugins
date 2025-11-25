// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2/promise");
// require("dotenv").config();
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Serve tracker.js
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
//   ssl: { rejectUnauthorized: false },
// });

// // Test DB
// async function testConnection() {
//   try {
//     await pool.getConnection();
//     console.log("✅ MySQL Connected");
//   } catch (err) {
//     console.error("❌ DB Failed:", err.message);
//   }
// }

// // ---------------------
// // IP DETECTION FUNCTION
// // ---------------------
// function getRealIp(req) {
//   return (
//     req.headers["cf-connecting-ip"] || 
//     req.headers["x-forwarded-for"]?.split(",")[0] ||
//     req.ip || ""
//   );
// }

// // ---------------------
// // API ENDPOINTS
// // ---------------------

// // Overview
// app.get("/api/overview", async (req, res) => {
//   try {
//     const { site_id } = req.query;

//     const [visitors] = await pool.execute(
//       `SELECT COUNT(DISTINCT ip) AS total_visitors 
//        FROM analytics_events WHERE site_id = ?`,
//       [site_id]
//     );

//     const [pageviews] = await pool.execute(
//       `SELECT COUNT(*) AS total_pageviews
//        FROM analytics_events WHERE site_id = ?`,
//       [site_id]
//     );

//     const [bounce] = await pool.execute(
//       `SELECT COUNT(*) AS bounce_count FROM (
//           SELECT ip FROM analytics_events 
//           WHERE site_id = ?
//           GROUP BY ip HAVING COUNT(*) = 1
//        ) t`,
//       [site_id]
//     );

//     const totalVisitors = visitors[0].total_visitors || 0;

//     res.json({
//       visitors: totalVisitors,
//       pageviews: pageviews[0].total_pageviews || 0,
//       bounceRate:
//         totalVisitors > 0
//           ? ((bounce[0].bounce_count / totalVisitors) * 100).toFixed(1) + "%"
//           : "0%",
//       avgSession: "2m 34s",
//       newVisitors: Math.round(totalVisitors * 0.7),
//       returningVisitors: Math.round(totalVisitors * 0.3),
//     });
//   } catch (e) {
//     console.error("overview error:", e);
//     res.status(500).json({ error: "internal error" });
//   }
// });

// // Traffic
// app.get("/api/traffic", async (req, res) => {
//   try {
//     const { site_id } = req.query;

//     const [timeline] = await pool.execute(
//       `SELECT DATE(timestamp) AS date,
//               COUNT(DISTINCT ip) AS visitors,
//               COUNT(*) AS pageviews
//        FROM analytics_events 
//        WHERE site_id = ?
//        GROUP BY DATE(timestamp)
//        ORDER BY date DESC
//        LIMIT 7`,
//       [site_id]
//     );

//     const [sources] = await pool.execute(
//       `SELECT 
//          CASE 
//            WHEN referrer = '' OR referrer IS NULL THEN 'Direct'
//            WHEN referrer LIKE '%google%' THEN 'Organic Search'
//            WHEN referrer LIKE '%facebook%' OR referrer LIKE '%twitter%' THEN 'Social Media'
//            ELSE 'Referral'
//          END AS source,
//          COUNT(*) AS count
//        FROM analytics_events
//        WHERE site_id = ?
//        GROUP BY source`,
//       [site_id]
//     );

//     const [devices] = await pool.execute(
//       `SELECT device AS device, COUNT(*) AS count
//        FROM analytics_events
//        WHERE site_id = ?
//        GROUP BY device`,
//       [site_id]
//     );

//     res.json({ timeline, sources, devices });
//   } catch (e) {
//     console.error("traffic error:", e);
//     res.status(500).json({ error: "internal error" });
//   }
// });

// // Active Users
// app.get("/api/realtime/active", async (req, res) => {
//   try {
//     const { site_id } = req.query;

//     const [active] = await pool.execute(
//       `SELECT COUNT(DISTINCT ip) AS active_users
//        FROM analytics_events 
//        WHERE site_id = ?
//        AND timestamp >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)`,
//       [site_id]
//     );

//     res.json({ activeUsers: active[0].active_users || 0 });
//   } catch (e) {
//     console.error("realtime error:", e);
//     res.status(500).json({ error: "internal error" });
//   }
// });

// // Recent Events
// app.get("/api/realtime/activities", async (req, res) => {
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
//   } catch (e) {
//     console.error("activities error:", e);
//     res.status(500).json({ error: "internal error" });
//   }
// });

// // Track event
// app.post("/api/track", async (req, res) => {
//   try {
//     const realIp = getRealIp(req);
//     const { site_id, url, referrer, device, browser } = req.body;

//     await pool.execute(
//       `INSERT INTO analytics_events (site_id, url, referrer, device, browser, ip, timestamp)
//        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//       [site_id, url, referrer || "", device, browser, realIp]
//     );

//     res.json({ status: "success" });
//   } catch (e) {
//     console.error("track error:", e);
//     res.status(500).json({ error: "internal error" });
//   }
// });

// // Health
// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK" });
// });

// // Start server (IMPORTANT CHANGE HERE ⬇⬇⬇)
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Backend running on ${PORT}`);
//   testConnection();
// });
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve tracker.js
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

// ---------------------
// ROOT ROUTE (FIX FOR "Cannot GET /")
// ---------------------
app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "🚀 Piku Analytics API Live",
    time: new Date().toISOString(),
  });
});

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
  ssl: { rejectUnauthorized: false },
});

// Test DB
async function testConnection() {
  try {
    await pool.getConnection();
    console.log("✅ MySQL Connected");
  } catch (err) {
    console.error("❌ DB Failed:", err.message);
  }
}

// ---------------------
// IP DETECTION FUNCTION
// ---------------------
function getRealIp(req) {
  return (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.ip ||
    ""
  );
}

// ---------------------
// API ENDPOINTS
// ---------------------

// Overview
app.get("/api/overview", async (req, res) => {
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
       ) t`,
      [site_id]
    );

    const totalVisitors = visitors[0].total_visitors || 0;

    res.json({
      visitors: totalVisitors,
      pageviews: pageviews[0].total_pageviews || 0,
      bounceRate:
        totalVisitors > 0
          ? ((bounce[0].bounce_count / totalVisitors) * 100).toFixed(1) + "%"
          : "0%",
      avgSession: "2m 34s",
      newVisitors: Math.round(totalVisitors * 0.7),
      returningVisitors: Math.round(totalVisitors * 0.3),
    });
  } catch (e) {
    console.error("overview error:", e);
    res.status(500).json({ error: "internal error" });
  }
});

// Traffic
app.get("/api/traffic", async (req, res) => {
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
         COUNT(*) AS count
       FROM analytics_events
       WHERE site_id = ?
       GROUP BY source`,
      [site_id]
    );

    const [devices] = await pool.execute(
      `SELECT device AS device, COUNT(*) AS count
       FROM analytics_events
       WHERE site_id = ?
       GROUP BY device`,
      [site_id]
    );

    res.json({ timeline, sources, devices });
  } catch (e) {
    console.error("traffic error:", e);
    res.status(500).json({ error: "internal error" });
  }
});

// Active Users
app.get("/api/realtime/active", async (req, res) => {
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
  } catch (e) {
    console.error("realtime error:", e);
    res.status(500).json({ error: "internal error" });
  }
});

// Recent Events
app.get("/api/realtime/activities", async (req, res) => {
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
  } catch (e) {
    console.error("activities error:", e);
    res.status(500).json({ error: "internal error" });
  }
});

// Track event
app.post("/api/track", async (req, res) => {
  try {
    const realIp = getRealIp(req);
    const { site_id, url, referrer, device, browser } = req.body;

    await pool.execute(
      `INSERT INTO analytics_events (site_id, url, referrer, device, browser, ip, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [site_id, url, referrer || "", device, browser, realIp]
    );

    res.json({ status: "success" });
  } catch (e) {
    console.error("track error:", e);
    res.status(500).json({ error: "internal error" });
  }
});

// Health
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on ${PORT}`);
  testConnection();
});
