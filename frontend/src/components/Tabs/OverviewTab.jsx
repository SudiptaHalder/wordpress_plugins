// import React from "react";
// import Card from "../UI/Card.jsx";

// const OverviewTab = ({ data }) => {
//   if (!data) return null;

//   // VALID backend fields
//   const overview = data.overview || {};
//   const timeline = data.traffic?.timeline || [];
//   const sources = data.traffic?.sources || [];
//   const devices = data.traffic?.devices || [];
//   const realtime = data.realTime || { activeUsers: 0, events: [] };

//   // ---- MAIN CARDS ----
//   const mainStats = [
//     {
//       title: "Total Visitors",
//       value: overview.visitors ?? 0,
//       change: "+0%",
//       changeType: "positive",
//       icon: "👥",
//       color: "blue",
//     },
//     {
//       title: "Page Views",
//       value: overview.pageviews ?? 0,
//       change: "+0%",
//       changeType: "positive",
//       icon: "📄",
//       color: "green",
//     },
//     {
//       title: "Avg. Session",
//       value: overview.avgSession ?? "0s",
//       change: "+0s",
//       changeType: "positive",
//       icon: "⏱️",
//       color: "purple",
//     },
//     {
//       title: "Bounce Rate",
//       value: overview.bounceRate ?? "0%",
//       change: "+0%",
//       changeType: "positive",
//       icon: "↩️",
//       color: "orange",
//     },
//   ];

//   // ---- PERFORMANCE METRICS (STATIC BECAUSE BACKEND DOES NOT RETURN PERFORMANCE YET) ----
//   const performanceMetrics = [
//     { name: "LCP", value: "2.1s", progress: 84, status: "good" },
//     { name: "TTFB", value: "400ms", progress: 70, status: "average" },
//     { name: "CLS", value: "0.08", progress: 80, status: "good" },
//     { name: "Score", value: "75", progress: 75, status: "average" },
//   ];

//   // ---- RECENT ACTIVITY ----
//   const activities = realtime.events.map((e) => ({
//     action: `Visited page`,
//     time: new Date(e.timestamp).toLocaleTimeString(),
//   }));

//   // ---- TRAFFIC SOURCES ----
//   const trafficSources = sources.map((s) => ({
//     name: s.source,
//     value: s.count ?? 0,
//     color: "#667eea",
//   }));

//   // ---- DEVICE DISTRIBUTION ----
//   const deviceStats = devices.map((d) => ({
//     name: d.device,
//     percent: d.count ?? 0,
//   }));

//   return (
//     <div className="modern-overview">
//       {/* HEADER */}
//       <div className="welcome-section">
//         <h1 className="welcome-title">Welcome back! 👋</h1>
//         <p className="welcome-subtitle">Your latest analytics overview</p>
//       </div>

//       {/* MAIN CARDS */}
//       <div className="main-stats-grid">
//         {mainStats.map((stat, i) => (
//           <Card key={i} className="main-stat-card">
//             <div className="stat-content">
//               <div className="stat-header">
//                 <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
//                 <div className={`stat-change ${stat.changeType}`}>{stat.change}</div>
//               </div>
//               <div className="stat-main">
//                 <div className="stat-value">{stat.value}</div>
//                 <div className="stat-title">{stat.title}</div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* TRAFFIC + PERFORMANCE + RECENT */}
//       <div className="charts-metrics-row">
//         {/* TRAFFIC */}
//         <Card className="chart-section">
//           <div className="section-header">
//             <h3>Traffic Overview (Last 7 Days)</h3>
//           </div>

//           <div className="traffic-chart">
//             <div className="chart-bars">
//               {timeline.length === 0 && <p>No traffic data</p>}
//               {timeline.map((day, i) => (
//                 <div key={i} className="chart-bar-group">
//                   <div
//                     className="chart-bar"
//                     style={{
//                       height:
//                         overview.visitors > 0
//                           ? `${(day.visitors / overview.visitors) * 100}%`
//                           : "10%",
//                     }}
//                   ></div>
//                   <div className="chart-label">{day.date}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* PERFORMANCE */}
//         <div className="middle-column">
//           <Card className="performance-section">
//             <div className="section-header">
//               <h3>Performance Metrics</h3>
//             </div>

//             <div className="metrics-list">
//               {performanceMetrics.map((m, i) => (
//                 <div key={i} className="metric-item">
//                   <div className="metric-info">
//                     <span className="metric-name">{m.name}</span>
//                     <span className="metric-value">{m.value}</span>
//                   </div>
//                   <div className="progress-bar">
//                     <div
//                       className={`progress-fill ${m.status}`}
//                       style={{ width: `${m.progress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* QUICK STATS */}
//           <Card className="quick-stats-section">
//             <div className="quick-stats-grid">
//               <div className="quick-stat">
//                 <div className="quick-stat-value">{realtime.activeUsers}</div>
//                 <div className="quick-stat-label">Active Users</div>
//               </div>
//               <div className="quick-stat">
//                 <div className="quick-stat-value">{overview.bounceRate}</div>
//                 <div className="quick-stat-label">Bounce Rate</div>
//               </div>
//               <div className="quick-stat">
//                 <div className="quick-stat-value">{overview.newVisitors}</div>
//                 <div className="quick-stat-label">New</div>
//               </div>
//               <div className="quick-stat">
//                 <div className="quick-stat-value">{overview.returningVisitors}</div>
//                 <div className="quick-stat-label">Returning</div>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* RECENT ACTIVITY + SOURCES */}
//         <div className="right-column">
//           <Card className="activities-section">
//             <div className="section-header">
//               <h3>Recent Activity</h3>
//             </div>
//             <div className="activities-list">
//               {activities.length === 0 && <p>No activity found</p>}
//               {activities.map((a, i) => (
//                 <div key={i} className="activity-item">
//                   <div className="activity-icon">📄</div>
//                   <div className="activity-content">
//                     <div className="activity-text">{a.action}</div>
//                     <div className="activity-time">{a.time}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           <Card className="sources-section">
//             <div className="section-header">
//               <h3>Traffic Sources</h3>
//             </div>
//             <div className="sources-list">
//               {trafficSources.map((s, i) => (
//                 <div key={i} className="source-item">
//                   <div className="source-info">
//                     <div className="source-color" style={{ backgroundColor: s.color }}></div>
//                     <span className="source-name">{s.name}</span>
//                   </div>
//                   <div className="source-value">{s.value}</div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* DEVICE */}
//       <div className="bottom-metrics-row">
//         <Card className="device-metrics">
//           <div className="section-header">
//             <h3>Device Distribution</h3>
//           </div>

//           <div className="device-stats">
//             {deviceStats.map((d, i) => (
//               <div key={i} className="device-item">
//                 <div className="device-info">
//                   <span className="device-icon">📱</span>
//                   <span className="device-name">{d.name}</span>
//                 </div>
//                 <div className="device-percent">{d.percent}</div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default OverviewTab;
import React from "react";
import "./overview-dark.css";

export default function OverviewTab({ data }) {
  if (!data) return null;

  const overview = data.overview || {};
  const timeline = data.traffic?.timeline || [];
  const devices = data.traffic?.devices || [];

  return (
    <div className="layout-wrapper">

      {/* LEFT MAIN PURPLE ANALYTICS BOX */}
      <div className="big-analytics-box">
        <div className="box-header">
          <h3>Overview</h3>
          <span className="month-tag">Monthly</span>
        </div>

        <div className="chart-placeholder">
          {/* Fake curve for UI */}
          <div className="curve"></div>
          <div className="dot"></div>
        </div>

        <div className="sub-stats-row">
          <div className="sub-stat">
            <h2>{overview.pageviews ?? 0}</h2>
            <p>Total Views</p>
          </div>
          <div className="sub-stat">
            <h2>{overview.visitors ?? 0}</h2>
            <p>Total Visitors</p>
          </div>
          <div className="sub-stat">
            <h2>{overview.bounceRate ?? "0%"}</h2>
            <p>Bounce Rate</p>
          </div>
        </div>
      </div>

      {/* RIGHT TWO SMALL CARDS */}
      <div className="right-small-cards">
        <div className="small-card purple-card">
          <div className="circle-icon">👟</div>
          <p className="small-title">Daily Traffic</p>
          <h2>{overview.visitors ?? 0}</h2>
        </div>

        <div className="small-card pink-card">
          <div className="circle-icon">📱</div>
          <p className="small-title">Mobile Users</p>
          <h2>{devices[0]?.count ?? 0}</h2>
        </div>
      </div>

      {/* BOTTOM THREE BOXES */}
      <div className="bottom-triplet">

        <div className="bottom-box">
          <div className="bottom-icon">📅</div>
          <h3>Visitors</h3>
          <p>{overview.visitors ?? 0}</p>
          <div className="progress-bar">
            <div style={{ width: "45%" }}></div>
          </div>
        </div>

        <div className="bottom-box">
          <div className="bottom-icon">📄</div>
          <h3>Page Views</h3>
          <p>{overview.pageviews ?? 0}</p>
          <div className="progress-bar">
            <div style={{ width: "65%" }}></div>
          </div>
        </div>

        <div className="bottom-box">
          <div className="bottom-icon">⚡</div>
          <h3>Active Users</h3>
          <p>{data.realTime?.activeUsers ?? 0}</p>
          <div className="progress-bar">
            <div style={{ width: "90%" }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}


