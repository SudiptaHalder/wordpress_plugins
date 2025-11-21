// import React from 'react';
// import Card from '../UI/Card.jsx';

// const OverviewTab = ({ data }) => {
//   if (!data) return null;

//   // Main Stats Cards
//   const mainStats = [
//     {
//       title: 'Total Visitors',
//       value: '12,485',
//       change: '+12.5%',
//       changeType: 'positive',
//       icon: '👥',
//       color: 'blue'
//     },
//     {
//       title: 'Page Views',
//       value: '54,328',
//       change: '+8.2%',
//       changeType: 'positive',
//       icon: '📄',
//       color: 'green'
//     },
//     {
//       title: 'Avg. Session',
//       value: '2m 34s',
//       change: '+15s',
//       changeType: 'positive',
//       icon: '⏱️',
//       color: 'purple'
//     },
//     {
//       title: 'Bounce Rate',
//       value: '42%',
//       change: '-3.2%',
//       changeType: 'positive',
//       icon: '↩️',
//       color: 'orange'
//     }
//   ];

//   // Performance Metrics
//   const performanceMetrics = [
//     { name: 'LCP', value: '2.1s', target: '2.5s', progress: 84, status: 'good' },
//     { name: 'FID', value: '80ms', target: '100ms', progress: 80, status: 'good' },
//     { name: 'CLS', value: '0.08', target: '0.1', progress: 80, status: 'good' },
//     { name: 'TTFB', value: '400ms', target: '800ms', progress: 50, status: 'average' }
//   ];

//   // Recent Activities
//   const activities = [
//     { time: '2 min ago', action: 'New visitor from United States', type: 'visit' },
//     { time: '5 min ago', action: 'Page view on /blog/post-title', type: 'pageview' },
//     { time: '12 min ago', action: 'Conversion on pricing page', type: 'conversion' },
//     { time: '1 hour ago', action: 'User registered from Google', type: 'registration' }
//   ];

//   // Traffic Sources
//   const trafficSources = [
//     { name: 'Organic Search', value: 45, color: '#8884d8' },
//     { name: 'Direct', value: 25, color: '#82ca9d' },
//     { name: 'Social Media', value: 15, color: '#ffc658' },
//     { name: 'Referral', value: 10, color: '#ff8042' },
//     { name: 'Email', value: 5, color: '#0088fe' }
//   ];

//   return (
//     <div className="modern-overview">
//       {/* Welcome Header */}
//       <div className="welcome-section">
//         <h1 className="welcome-title">Welcome back, Admin! 👋</h1>
//         <p className="welcome-subtitle">Here's what's happening with your analytics today.</p>
//       </div>

//       {/* Main Stats Grid */}
//       <div className="main-stats-grid">
//         {mainStats.map((stat, index) => (
//           <Card key={index} className="main-stat-card">
//             <div className="stat-content">
//               <div className="stat-header">
//                 <div className={`stat-icon ${stat.color}`}>
//                   {stat.icon}
//                 </div>
//                 <div className={`stat-change ${stat.changeType}`}>
//                   {stat.change}
//                 </div>
//               </div>
//               <div className="stat-main">
//                 <div className="stat-value">{stat.value}</div>
//                 <div className="stat-title">{stat.title}</div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Charts and Metrics Row */}
//       <div className="charts-metrics-row">
//         {/* Left Column - Traffic Chart */}
//         <Card className="chart-section">
//           <div className="section-header">
//             <h3>Traffic Overview</h3>
//             <div className="time-filters">
//               <button className="time-filter active">Day</button>
//               <button className="time-filter">Week</button>
//               <button className="time-filter">Month</button>
//             </div>
//           </div>
//           <div className="traffic-chart">
//             <div className="chart-bars">
//               {[65, 80, 45, 90, 75, 60, 85].map((height, index) => (
//                 <div key={index} className="chart-bar-group">
//                   <div 
//                     className="chart-bar" 
//                     style={{ height: `${height}%` }}
//                     title={`${height} visitors`}
//                   ></div>
//                   <div className="chart-label">
//                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* Middle Column - Performance & Activities */}
//         <div className="middle-column">
//           {/* Performance Metrics */}
//           <Card className="performance-section">
//             <div className="section-header">
//               <h3>Performance Metrics</h3>
//             </div>
//             <div className="metrics-list">
//               {performanceMetrics.map((metric, index) => (
//                 <div key={index} className="metric-item">
//                   <div className="metric-info">
//                     <span className="metric-name">{metric.name}</span>
//                     <span className="metric-value">{metric.value}</span>
//                   </div>
//                   <div className="metric-progress">
//                     <div className="progress-bar">
//                       <div 
//                         className={`progress-fill ${metric.status}`}
//                         style={{ width: `${metric.progress}%` }}
//                       ></div>
//                     </div>
//                     <span className="metric-target">Target: {metric.target}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Quick Stats */}
//           <Card className="quick-stats-section">
//             <div className="quick-stats-grid">
//               <div className="quick-stat">
//                 <div className="quick-stat-value">92%</div>
//                 <div className="quick-stat-label">Performance</div>
//               </div>
//               <div className="quick-stat">
//                 <div className="quick-stat-value">88%</div>
//                 <div className="quick-stat-label">SEO Score</div>
//               </div>
//               <div className="quick-stat">
//                 <div className="quick-stat-value">99.9%</div>
//                 <div className="quick-stat-label">Uptime</div>
//               </div>
//               <div className="quick-stat">
//                 <div className="quick-stat-value">24</div>
//                 <div className="quick-stat-label">Active Users</div>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Right Column - Activities & Traffic Sources */}
//         <div className="right-column">
//           {/* Recent Activities */}
//           <Card className="activities-section">
//             <div className="section-header">
//               <h3>Recent Activities</h3>
//               <span className="live-badge">
//                 <span className="live-dot"></span>
//                 LIVE
//               </span>
//             </div>
//             <div className="activities-list">
//               {activities.map((activity, index) => (
//                 <div key={index} className="activity-item">
//                   <div className="activity-icon">
//                     {activity.type === 'visit' && '👤'}
//                     {activity.type === 'pageview' && '📄'}
//                     {activity.type === 'conversion' && '💰'}
//                     {activity.type === 'registration' && '👥'}
//                   </div>
//                   <div className="activity-content">
//                     <div className="activity-text">{activity.action}</div>
//                     <div className="activity-time">{activity.time}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Traffic Sources */}
//           <Card className="sources-section">
//             <div className="section-header">
//               <h3>Traffic Sources</h3>
//             </div>
//             <div className="sources-list">
//               {trafficSources.map((source, index) => (
//                 <div key={index} className="source-item">
//                   <div className="source-info">
//                     <div 
//                       className="source-color" 
//                       style={{ backgroundColor: source.color }}
//                     ></div>
//                     <span className="source-name">{source.name}</span>
//                   </div>
//                   <div className="source-value">{source.value}%</div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Bottom Row - Additional Metrics */}
//       <div className="bottom-metrics-row">
//         <Card className="device-metrics">
//           <div className="section-header">
//             <h3>Device Distribution</h3>
//           </div>
//           <div className="device-stats">
//             <div className="device-item">
//               <div className="device-info">
//                 <span className="device-icon">💻</span>
//                 <span className="device-name">Desktop</span>
//               </div>
//               <div className="device-percent">65%</div>
//             </div>
//             <div className="device-item">
//               <div className="device-info">
//                 <span className="device-icon">📱</span>
//                 <span className="device-name">Mobile</span>
//               </div>
//               <div className="device-percent">30%</div>
//             </div>
//             <div className="device-item">
//               <div className="device-info">
//                 <span className="device-icon">📱</span>
//                 <span className="device-name">Tablet</span>
//               </div>
//               <div className="device-percent">5%</div>
//             </div>
//           </div>
//         </Card>

//         <Card className="conversion-metrics">
//           <div className="section-header">
//             <h3>Conversion Metrics</h3>
//           </div>
//           <div className="conversion-stats">
//             <div className="conversion-item">
//               <div className="conversion-value">3.2%</div>
//               <div className="conversion-label">Conversion Rate</div>
//             </div>
//             <div className="conversion-item">
//               <div className="conversion-value">124</div>
//               <div className="conversion-label">Total Conversions</div>
//             </div>
//             <div className="conversion-item">
//               <div className="conversion-value">$2,458</div>
//               <div className="conversion-label">Revenue</div>
//             </div>
//           </div>
//         </Card>

//         <Card className="real-time-metrics">
//           <div className="section-header">
//             <h3>Real-time Stats</h3>
//           </div>
//           <div className="real-time-stats">
//             <div className="real-time-item">
//               <div className="real-time-value">18</div>
//               <div className="real-time-label">Pageviews/Min</div>
//             </div>
//             <div className="real-time-item">
//               <div className="real-time-value">42%</div>
//               <div className="real-time-label">Bounce Rate</div>
//             </div>
//             <div className="real-time-item">
//               <div className="real-time-value">1.2s</div>
//               <div className="real-time-label">Avg. Load Time</div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default OverviewTab;
import React from 'react';
import Card from '../UI/Card.jsx';

const OverviewTab = ({ data }) => {
  if (!data) return null;

  const overview = data.overview;
  const timeline = data.traffic.timeline;
  const performance = data.performance.current;
  const devices = data.traffic.devices;
  const realtime = data.realTime;

  // ----------- MAIN CARDS (REAL DATA) ----------
  const mainStats = [
    {
      title: "Total Visitors",
      value: overview.visitors,
      change: "+0%",
      changeType: "positive",
      icon: "👥",
      color: "blue",
    },
    {
      title: "Page Views",
      value: overview.pageviews,
      change: "+0%",
      changeType: "positive",
      icon: "📄",
      color: "green",
    },
    {
      title: "Avg. Session",
      value: overview.avgSession,
      change: "+0s",
      changeType: "positive",
      icon: "⏱️",
      color: "purple",
    },
    {
      title: "Bounce Rate",
      value: overview.bounceRate,
      change: "+0%",
      changeType: "positive",
      icon: "↩️",
      color: "orange",
    },
  ];

  // ---------- PERFORMANCE METRICS (REAL DATA) ----------
  const performanceMetrics = performance
    ? [
        {
          name: "LCP",
          value: performance.lcp + "s",
          target: "2.5s",
          progress: Math.min((2.5 / performance.lcp) * 100, 100),
          status: "good",
        },
        {
          name: "TTFB",
          value: performance.ttfb + "ms",
          target: "800ms",
          progress: Math.min((800 / performance.ttfb) * 100, 100),
          status: "good",
        },
        {
          name: "CLS",
          value: performance.cls,
          target: "0.1",
          progress: Math.min((0.1 / performance.cls) * 100, 100),
          status: "good",
        },
        {
          name: "Score",
          value: performance.score,
          target: "100",
          progress: performance.score,
          status: "average",
        },
      ]
    : [];

  // ---------- RECENT ACTIVITY (REAL DATA) ----------
  const activities = realtime.events.map((e) => ({
    type: "pageview",
    action: `Visited ${e.page} (${e.device})`,
    time: new Date(e.timestamp).toLocaleTimeString(),
  }));

  // ---------- TRAFFIC SOURCES (REAL DATA) ----------
  const trafficSources = data.traffic.sources.map((s) => ({
    name: s.source,
    value: s.percentage,
    color: "#667eea",
  }));

  // ---------- DEVICE DISTRIBUTION (REAL DATA) ----------
  const deviceStats = devices.map((d) => ({
    name: d.device,
    percent: d.percentage,
  }));

  return (
    <div className="modern-overview">

      {/* Welcome Header */}
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back! 👋</h1>
        <p className="welcome-subtitle">Here's the latest analytics for your site.</p>
      </div>

      {/* ------- MAIN STATS ------- */}
      <div className="main-stats-grid">
        {mainStats.map((stat, index) => (
          <Card key={index} className="main-stat-card">
            <div className="stat-content">
              <div className="stat-header">
                <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                <div className={`stat-change ${stat.changeType}`}>{stat.change}</div>
              </div>
              <div className="stat-main">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ------- TRAFFIC + PERFORMANCE + RECENT ACTIVITY ------- */}
      <div className="charts-metrics-row">

        {/* Traffic Chart */}
        <Card className="chart-section">
          <div className="section-header">
            <h3>Traffic Overview (Last 7 Days)</h3>
          </div>

          <div className="traffic-chart">
            <div className="chart-bars">
              {timeline.map((day, index) => (
                <div key={index} className="chart-bar-group">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(day.visitors / overview.visitors) * 100}%`,
                      background: "linear-gradient(to top, #667eea, #764ba2)",
                    }}
                  ></div>
                  <div className="chart-label">{day.date.substring(5)}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Performance */}
        <div className="middle-column">
          <Card className="performance-section">
            <div className="section-header">
              <h3>Performance Metrics</h3>
            </div>

            <div className="metrics-list">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="metric-item">
                  <div className="metric-info">
                    <span className="metric-name">{metric.name}</span>
                    <span className="metric-value">{metric.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${metric.status}`}
                      style={{ width: `${metric.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats — REAL TIME */}
          <Card className="quick-stats-section">
            <div className="quick-stats-grid">
              <div className="quick-stat">
                <div className="quick-stat-value">{realtime.activeUsers}</div>
                <div className="quick-stat-label">Active Users</div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-value">{overview.bounceRate}</div>
                <div className="quick-stat-label">Bounce Rate</div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-value">{overview.newVisitors}</div>
                <div className="quick-stat-label">New Visitors</div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-value">{overview.returningVisitors}</div>
                <div className="quick-stat-label">Returning</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity + Sources */}
        <div className="right-column">

          {/* Recent Activity */}
          <Card className="activities-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <span className="live-badge">
                <span className="live-dot"></span>LIVE
              </span>
            </div>
            <div className="activities-list">
              {activities.map((act, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon">📄</div>
                  <div className="activity-content">
                    <div className="activity-text">{act.action}</div>
                    <div className="activity-time">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Traffic Sources */}
          <Card className="sources-section">
            <div className="section-header">
              <h3>Traffic Sources</h3>
            </div>
            <div className="sources-list">
              {trafficSources.map((src, i) => (
                <div key={i} className="source-item">
                  <div className="source-info">
                    <div className="source-color" style={{ backgroundColor: src.color }}></div>
                    <span className="source-name">{src.name}</span>
                  </div>
                  <div className="source-value">{src.value}%</div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>

      {/* Device Distribution */}
      <div className="bottom-metrics-row">
        <Card className="device-metrics">
          <div className="section-header">
            <h3>Device Distribution</h3>
          </div>
          <div className="device-stats">
            {deviceStats.map((d, i) => (
              <div key={i} className="device-item">
                <div className="device-info">
                  <span className="device-icon">📱</span>
                  <span className="device-name">{d.name}</span>
                </div>
                <div className="device-percent">{d.percent}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
};

export default OverviewTab;
