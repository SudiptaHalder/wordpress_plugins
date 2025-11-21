// import React from 'react';
// import Card from '../UI/Card.jsx';
// import './TrafficTab.css';


// const TrafficTab = ({ data }) => {
//   if (!data) return null;

//   // Traffic data for charts
//   const trafficData = [
//     { day: 'Mon', visitors: 400, pageviews: 2400, sessions: 450 },
//     { day: 'Tue', visitors: 300, pageviews: 1398, sessions: 320 },
//     { day: 'Wed', visitors: 200, pageviews: 9800, sessions: 280 },
//     { day: 'Thu', visitors: 278, pageviews: 3908, sessions: 310 },
//     { day: 'Fri', visitors: 189, pageviews: 4800, sessions: 260 },
//     { day: 'Sat', visitors: 239, pageviews: 3800, sessions: 290 },
//     { day: 'Sun', visitors: 349, pageviews: 4300, sessions: 330 }
//   ];

//   // Traffic sources
//   const trafficSources = [
//     { name: 'Organic Search', value: 45, visitors: 5642, color: '#8884d8' },
//     { name: 'Direct', value: 25, visitors: 3124, color: '#82ca9d' },
//     { name: 'Social Media', value: 15, visitors: 1873, color: '#ffc658' },
//     { name: 'Referral', value: 10, visitors: 1248, color: '#ff8042' },
//     { name: 'Email', value: 5, visitors: 624, color: '#0088fe' }
//   ];

//   // Top pages
//   const topPages = [
//     { page: '/home', visitors: 1245, bounceRate: '42%' },
//     { page: '/blog', visitors: 987, bounceRate: '38%' },
//     { page: '/about', visitors: 654, bounceRate: '45%' },
//     { page: '/contact', visitors: 432, bounceRate: '52%' },
//     { page: '/pricing', visitors: 321, bounceRate: '48%' }
//   ];

//   // Device distribution
//   const deviceData = [
//     { device: 'Desktop', value: 65, color: '#8884d8' },
//     { device: 'Mobile', value: 30, color: '#82ca9d' },
//     { device: 'Tablet', value: 5, color: '#ffc658' }
//   ];

//   // Geographic data
//   const geographicData = [
//     { country: 'United States', visitors: 3245, percent: 32 },
//     { country: 'United Kingdom', visitors: 1987, percent: 20 },
//     { country: 'Canada', visitors: 1543, percent: 15 },
//     { country: 'Australia', visitors: 987, percent: 10 },
//     { country: 'Germany', visitors: 765, percent: 8 }
//   ];

//   // Calculate max values for scaling
//   const maxVisitors = Math.max(...trafficData.map(item => item.visitors));
//   const maxPageviews = Math.max(...trafficData.map(item => item.pageviews));

//   return (
//     <div className="traffic-tab">
//       {/* Traffic Overview Cards */}
//       <div className="traffic-stats-grid">
//         <Card className="traffic-stat-card">
//           <div className="traffic-stat">
//             <div className="traffic-stat-icon" style={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}>
//               <span style={{ color: '#667eea' }}>👥</span>
//             </div>
//             <div className="traffic-stat-content">
//               <div className="traffic-stat-value">12,485</div>
//               <div className="traffic-stat-label">Total Visitors</div>
//               <div className="traffic-stat-change positive">+12.5%</div>
//             </div>
//           </div>
//         </Card>

//         <Card className="traffic-stat-card">
//           <div className="traffic-stat">
//             <div className="traffic-stat-icon" style={{ backgroundColor: 'rgba(72, 187, 120, 0.1)' }}>
//               <span style={{ color: '#48bb78' }}>📄</span>
//             </div>
//             <div className="traffic-stat-content">
//               <div className="traffic-stat-value">54,328</div>
//               <div className="traffic-stat-label">Page Views</div>
//               <div className="traffic-stat-change positive">+8.2%</div>
//             </div>
//           </div>
//         </Card>

//         <Card className="traffic-stat-card">
//           <div className="traffic-stat">
//             <div className="traffic-stat-icon" style={{ backgroundColor: 'rgba(237, 137, 54, 0.1)' }}>
//               <span style={{ color: '#ed8936' }}>⏱️</span>
//             </div>
//             <div className="traffic-stat-content">
//               <div className="traffic-stat-value">2m 34s</div>
//               <div className="traffic-stat-label">Avg. Session</div>
//               <div className="traffic-stat-change positive">+15s</div>
//             </div>
//           </div>
//         </Card>

//         <Card className="traffic-stat-card">
//           <div className="traffic-stat">
//             <div className="traffic-stat-icon" style={{ backgroundColor: 'rgba(229, 62, 62, 0.1)' }}>
//               <span style={{ color: '#e53e3e' }}>↩️</span>
//             </div>
//             <div className="traffic-stat-content">
//               <div className="traffic-stat-value">42%</div>
//               <div className="traffic-stat-label">Bounce Rate</div>
//               <div className="traffic-stat-change negative">+3.2%</div>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Main Charts Row */}
//       <div className="traffic-charts-row">
//         {/* Traffic Timeline Chart */}
//         <Card className="traffic-chart-card large">
//           <div className="section-header">
//             <h3>Traffic Timeline</h3>
//             <div className="time-filters">
//               <button className="time-filter">Day</button>
//               <button className="time-filter active">Week</button>
//               <button className="time-filter">Month</button>
//             </div>
//           </div>
//           <div className="timeline-chart">
//             <div className="chart-bars-container">
//               <div className="chart-bars">
//                 {trafficData.map((day, index) => (
//                   <div key={index} className="chart-bar-group">
//                     <div className="bars-container">
//                       <div 
//                         className="chart-bar visitors-bar" 
//                         style={{ height: `${(day.visitors / maxVisitors) * 80}%` }}
//                         title={`${day.visitors} visitors`}
//                       >
//                         <div className="bar-value">{day.visitors}</div>
//                       </div>
//                       <div 
//                         className="chart-bar pageviews-bar" 
//                         style={{ height: `${(day.pageviews / maxPageviews) * 80}%` }}
//                         title={`${day.pageviews} pageviews`}
//                       >
//                         <div className="bar-value">{day.pageviews}</div>
//                       </div>
//                     </div>
//                     <div className="chart-label">{day.day}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="chart-legend">
//               <div className="legend-item">
//                 <div className="legend-color visitors-color"></div>
//                 <span>Visitors</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-color pageviews-color"></div>
//                 <span>Pageviews</span>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Traffic Sources */}
//         <Card className="traffic-chart-card">
//           <div className="section-header">
//             <h3>Traffic Sources</h3>
//           </div>
//           <div className="sources-chart">
//             <div className="sources-list">
//               {trafficSources.map((source, index) => (
//                 <div key={index} className="source-item">
//                   <div className="source-info">
//                     <div 
//                       className="source-color" 
//                       style={{ backgroundColor: source.color }}
//                     ></div>
//                     <div className="source-details">
//                       <div className="source-name">{source.name}</div>
//                       <div className="source-visitors">{source.visitors.toLocaleString()} visitors</div>
//                     </div>
//                   </div>
//                   <div className="source-percent">{source.value}%</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Second Row - Devices and Top Pages */}
//       <div className="traffic-charts-row">
//         {/* Device Distribution */}
//         <Card className="traffic-chart-card">
//           <div className="section-header">
//             <h3>Device Distribution</h3>
//           </div>
//           <div className="device-chart">
//             <div className="device-list">
//               {deviceData.map((device, index) => (
//                 <div key={index} className="device-item">
//                   <div className="device-info">
//                     <div 
//                       className="device-color" 
//                       style={{ backgroundColor: device.color }}
//                     ></div>
//                     <div className="device-details">
//                       <div className="device-name">{device.device}</div>
//                     </div>
//                   </div>
//                   <div className="device-percent">{device.value}%</div>
//                 </div>
//               ))}
//             </div>
//             <div className="device-visual">
//               <div className="device-pie">
//                 {deviceData.map((device, index) => (
//                   <div
//                     key={index}
//                     className="device-segment"
//                     style={{
//                       backgroundColor: device.color,
//                       width: `${device.value}%`
//                     }}
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Top Pages */}
//         <Card className="traffic-chart-card">
//           <div className="section-header">
//             <h3>Top Pages</h3>
//           </div>
//           <div className="pages-list">
//             {topPages.map((page, index) => (
//               <div key={index} className="page-item">
//                 <div className="page-info">
//                   <div className="page-name">{page.page}</div>
//                   <div className="page-bounce">Bounce: {page.bounceRate}</div>
//                 </div>
//                 <div className="page-visitors">{page.visitors.toLocaleString()}</div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Geographic Distribution */}
//         <Card className="traffic-chart-card">
//           <div className="section-header">
//             <h3>Top Countries</h3>
//           </div>
//           <div className="countries-list">
//             {geographicData.map((country, index) => (
//               <div key={index} className="country-item">
//                 <div className="country-info">
//                   <div className="country-name">{country.country}</div>
//                   <div className="country-visitors">{country.visitors.toLocaleString()} visitors</div>
//                 </div>
//                 <div className="country-progress">
//                   <div 
//                     className="progress-bar"
//                     style={{ width: `${country.percent}%` }}
//                   ></div>
//                   <span className="country-percent">{country.percent}%</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//       {/* Additional Metrics */}
//       <div className="traffic-metrics-row">
//         <Card className="metric-card">
//           <div className="metric-header">
//             <h4>New vs Returning</h4>
//           </div>
//           <div className="metric-content">
//             <div className="visitor-types">
//               <div className="visitor-type">
//                 <div className="type-value">68%</div>
//                 <div className="type-label">New Visitors</div>
//               </div>
//               <div className="visitor-type">
//                 <div className="type-value">32%</div>
//                 <div className="type-label">Returning</div>
//               </div>
//             </div>
//           </div>
//         </Card>

//         <Card className="metric-card">
//           <div className="metric-header">
//             <h4>Peak Hours</h4>
//           </div>
//           <div className="metric-content">
//             <div className="peak-hours">
//               <div className="peak-hour">
//                 <div className="hour">2:00 PM</div>
//                 <div className="traffic">Highest traffic</div>
//               </div>
//               <div className="peak-hour">
//                 <div className="hour">8:00 AM</div>
//                 <div className="traffic">Morning peak</div>
//               </div>
//             </div>
//           </div>
//         </Card>

//         <Card className="metric-card">
//           <div className="metric-header">
//             <h4>Engagement</h4>
//           </div>
//           <div className="metric-content">
//             <div className="engagement-stats">
//               <div className="engagement-stat">
//                 <div className="stat-value">3.4</div>
//                 <div className="stat-label">Pages/Session</div>
//               </div>
//               <div className="engagement-stat">
//                 <div className="stat-value">72%</div>
//                 <div className="stat-label">Engagement Rate</div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default TrafficTab;
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function TrafficTab({ data }) {
  const timeline = data.traffic.timeline;
  const devices = data.traffic.devices;
  const sources = data.traffic.sources;

  return (
    <div className="tab-container">
      <h2>Traffic Insights</h2>

      <h3>Daily Traffic</h3>
      <Line
        data={{
          labels: timeline.map((t) => t.date),
          datasets: [
            {
              label: "Visitors",
              data: timeline.map((t) => t.visitors),
              borderColor: "#2563eb",
            },
            {
              label: "Pageviews",
              data: timeline.map((t) => t.pageviews),
              borderColor: "#16a34a",
            },
          ],
        }}
      />

      <h3 style={{ marginTop: "30px" }}>Traffic Sources</h3>
      <ul>
        {sources.map((s, i) => (
          <li key={i}>
            {s.source}: {s.visitors} visitors ({s.percentage}%)
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "30px" }}>Devices</h3>
      <ul>
        {devices.map((d, i) => (
          <li key={i}>
            {d.device}: {d.visitors} visitors ({d.percentage}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
