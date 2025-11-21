// import React from 'react';
// import Card from '../UI/Card.jsx';
// import './PerformanceTab.css';

// const PerformanceTab = ({ data }) => {
//   if (!data) return null;

//   // Core Web Vitals
//   const coreWebVitals = [
//     { 
//       metric: 'Largest Contentful Paint (LCP)', 
//       score: 2.1, 
//       status: 'good', 
//       target: 2.5,
//       description: 'Loading performance',
//       icon: '⚡'
//     },
//     { 
//       metric: 'First Input Delay (FID)', 
//       score: 80, 
//       status: 'good', 
//       target: 100,
//       description: 'Interactivity',
//       icon: '🎯'
//     },
//     { 
//       metric: 'Cumulative Layout Shift (CLS)', 
//       score: 0.08, 
//       status: 'good', 
//       target: 0.1,
//       description: 'Visual stability',
//       icon: '📐'
//     },
//     { 
//       metric: 'Time to First Byte (TTFB)', 
//       score: 400, 
//       status: 'needs-improvement', 
//       target: 800,
//       description: 'Server response time',
//       icon: '⏱️'
//     }
//   ];

//   // Performance Scores
//   const performanceScores = [
//     { category: 'Performance', score: 92, previous: 88, color: '#48bb78' },
//     { category: 'Accessibility', score: 95, previous: 92, color: '#4299e1' },
//     { category: 'Best Practices', score: 89, previous: 85, color: '#ed8936' },
//     { category: 'SEO', score: 96, previous: 94, color: '#9f7aea' }
//   ];

//   // Page Speed Metrics
//   const pageSpeedMetrics = [
//     { page: '/home', speed: 1.2, score: 95, trend: 'up' },
//     { page: '/blog', speed: 1.8, score: 88, trend: 'up' },
//     { page: '/about', speed: 1.5, score: 92, trend: 'stable' },
//     { page: '/contact', speed: 2.1, score: 82, trend: 'down' },
//     { page: '/pricing', speed: 1.9, score: 86, trend: 'up' }
//   ];

//   // Performance History
//   const performanceHistory = [
//     { week: 'Week 1', performance: 85, accessibility: 90, bestPractices: 88, seo: 92 },
//     { week: 'Week 2', performance: 82, accessibility: 92, bestPractices: 90, seo: 94 },
//     { week: 'Week 3', performance: 88, accessibility: 88, bestPractices: 86, seo: 90 },
//     { week: 'Week 4', performance: 91, accessibility: 94, bestPractices: 92, seo: 96 }
//   ];

//   // Recommendations
//   const recommendations = [
//     {
//       title: 'Optimize Images',
//       description: 'Compress and resize images to reduce LCP',
//       impact: 'High',
//       effort: 'Low',
//       status: 'pending'
//     },
//     {
//       title: 'Enable Caching',
//       description: 'Implement browser caching for static assets',
//       impact: 'Medium',
//       effort: 'Low',
//       status: 'in-progress'
//     },
//     {
//       title: 'Minify CSS/JS',
//       description: 'Reduce file sizes by minifying code',
//       impact: 'Medium',
//       effort: 'Medium',
//       status: 'completed'
//     },
//     {
//       title: 'Upgrade Hosting',
//       description: 'Move to faster hosting provider',
//       impact: 'High',
//       effort: 'High',
//       status: 'pending'
//     }
//   ];

//   return (
//     <div className="performance-tab">
//       {/* Performance Overview Cards */}
//       <div className="performance-overview">
//         <h1 className="performance-title">Performance Analytics</h1>
//         <p className="performance-subtitle">Monitor and optimize your website performance</p>
        
//         <div className="performance-stats-grid">
//           <Card className="performance-stat-card">
//             <div className="stat-main">
//               <div className="stat-value">92</div>
//               <div className="stat-label">Performance Score</div>
//               <div className="stat-change positive">+4 points</div>
//             </div>
//             <div className="stat-icon">🚀</div>
//           </Card>

//           <Card className="performance-stat-card">
//             <div className="stat-main">
//               <div className="stat-value">1.4s</div>
//               <div className="stat-label">Avg. Load Time</div>
//               <div className="stat-change positive">-0.3s</div>
//             </div>
//             <div className="stat-icon">⚡</div>
//           </Card>

//           <Card className="performance-stat-card">
//             <div className="stat-main">
//               <div className="stat-value">95%</div>
//               <div className="stat-label">Uptime</div>
//               <div className="stat-change stable">No change</div>
//             </div>
//             <div className="stat-icon">🟢</div>
//           </Card>

//           <Card className="performance-stat-card">
//             <div className="stat-main">
//               <div className="stat-value">124ms</div>
//               <div className="stat-label">Server Response</div>
//               <div className="stat-change positive">-28ms</div>
//             </div>
//             <div className="stat-icon">💻</div>
//           </Card>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="performance-content-grid">
//         {/* Left Column - Core Web Vitals */}
//         <div className="performance-left-column">
//           <Card className="core-vitals-card">
//             <div className="card-header">
//               <h3>Core Web Vitals</h3>
//               <div className="vitals-legend">
//                 <div className="legend-item">
//                   <div className="legend-dot good"></div>
//                   <span>Good</span>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-dot needs-improvement"></div>
//                   <span>Needs Improvement</span>
//                 </div>
//               </div>
//             </div>
//             <div className="vitals-list">
//               {coreWebVitals.map((vital, index) => (
//                 <div key={index} className="vital-item">
//                   <div className="vital-header">
//                     <div className="vital-info">
//                       <span className="vital-icon">{vital.icon}</span>
//                       <div className="vital-details">
//                         <div className="vital-metric">{vital.metric}</div>
//                         <div className="vital-description">{vital.description}</div>
//                       </div>
//                     </div>
//                     <div className={`vital-score ${vital.status}`}>
//                       {typeof vital.score === 'number' ? vital.score.toFixed(2) : vital.score}
//                     </div>
//                   </div>
//                   <div className="vital-progress">
//                     <div className="progress-info">
//                       <span className="current-value">
//                         {typeof vital.score === 'number' ? vital.score.toFixed(2) : vital.score}
//                       </span>
//                       <span className="target-value">Target: {vital.target}</span>
//                     </div>
//                     <div className="progress-bar">
//                       <div 
//                         className={`progress-fill ${vital.status}`}
//                         style={{ 
//                           width: `${(vital.score / vital.target) * 100}%` 
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Performance History */}
//           <Card className="performance-history-card">
//             <div className="card-header">
//               <h3>Performance History</h3>
//               <div className="time-filters">
//                 <button className="time-filter active">4W</button>
//                 <button className="time-filter">3M</button>
//                 <button className="time-filter">1Y</button>
//               </div>
//             </div>
//             <div className="history-chart">
//               <div className="chart-lines">
//                 {performanceHistory.map((week, index) => (
//                   <div key={index} className="chart-week">
//                     <div className="week-metrics">
//                       <div 
//                         className="metric-bar performance" 
//                         style={{ height: `${week.performance}%` }}
//                         title={`Performance: ${week.performance}`}
//                       ></div>
//                       <div 
//                         className="metric-bar accessibility" 
//                         style={{ height: `${week.accessibility}%` }}
//                         title={`Accessibility: ${week.accessibility}`}
//                       ></div>
//                       <div 
//                         className="metric-bar best-practices" 
//                         style={{ height: `${week.bestPractices}%` }}
//                         title={`Best Practices: ${week.bestPractices}`}
//                       ></div>
//                       <div 
//                         className="metric-bar seo" 
//                         style={{ height: `${week.seo}%` }}
//                         title={`SEO: ${week.seo}`}
//                       ></div>
//                     </div>
//                     <div className="week-label">{week.week}</div>
//                   </div>
//                 ))}
//               </div>
//               <div className="chart-legend">
//                 <div className="legend-item">
//                   <div className="legend-color performance"></div>
//                   <span>Performance</span>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-color accessibility"></div>
//                   <span>Accessibility</span>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-color best-practices"></div>
//                   <span>Best Practices</span>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-color seo"></div>
//                   <span>SEO</span>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Right Column - Scores & Recommendations */}
//         <div className="performance-right-column">
//           {/* Performance Scores */}
//           <Card className="scores-card">
//             <div className="card-header">
//               <h3>Performance Scores</h3>
//             </div>
//             <div className="scores-grid">
//               {performanceScores.map((score, index) => (
//                 <div key={index} className="score-item">
//                   <div className="score-info">
//                     <div className="score-category">{score.category}</div>
//                     <div className="score-comparison">
//                       <span className="current-score" style={{ color: score.color }}>
//                         {score.score}
//                       </span>
//                       <span className="previous-score">Prev: {score.previous}</span>
//                     </div>
//                   </div>
//                   <div className="score-visual">
//                     <div 
//                       className="score-circle"
//                       style={{ 
//                         background: `conic-gradient(${score.color} ${score.score * 3.6}deg, #e2e8f0 0deg)` 
//                       }}
//                     >
//                       <div className="score-value">{score.score}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Page Speed Metrics */}
//           <Card className="page-speed-card">
//             <div className="card-header">
//               <h3>Page Speed Analysis</h3>
//             </div>
//             <div className="speed-metrics">
//               {pageSpeedMetrics.map((page, index) => (
//                 <div key={index} className="speed-item">
//                   <div className="page-info">
//                     <div className="page-name">{page.page}</div>
//                     <div className="page-speed">{page.speed}s</div>
//                   </div>
//                   <div className="page-score">
//                     <div className={`score-badge ${page.trend}`}>
//                       {page.score}
//                     </div>
//                     <div className={`trend-indicator ${page.trend}`}>
//                       {page.trend === 'up' ? '↗' : page.trend === 'down' ? '↘' : '→'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Recommendations */}
//           <Card className="recommendations-card">
//             <div className="card-header">
//               <h3>Optimization Recommendations</h3>
//             </div>
//             <div className="recommendations-list">
//               {recommendations.map((rec, index) => (
//                 <div key={index} className="recommendation-item">
//                   <div className="rec-main">
//                     <div className="rec-title">{rec.title}</div>
//                     <div className="rec-description">{rec.description}</div>
//                     <div className="rec-meta">
//                       <span className={`impact-tag ${rec.impact.toLowerCase()}`}>
//                         Impact: {rec.impact}
//                       </span>
//                       <span className={`effort-tag ${rec.effort.toLowerCase()}`}>
//                         Effort: {rec.effort}
//                       </span>
//                     </div>
//                   </div>
//                   <div className={`rec-status ${rec.status}`}>
//                     {rec.status === 'completed' ? '✅' : 
//                      rec.status === 'in-progress' ? '🔄' : '⏳'}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Bottom Section - Additional Metrics */}
//       <div className="performance-bottom-section">
//         <Card className="resource-metrics">
//           <div className="card-header">
//             <h3>Resource Loading Times</h3>
//           </div>
//           <div className="resource-stats">
//             <div className="resource-item">
//               <div className="resource-name">CSS Files</div>
//               <div className="resource-time">420ms</div>
//               <div className="resource-size">1.2MB</div>
//             </div>
//             <div className="resource-item">
//               <div className="resource-name">JavaScript</div>
//               <div className="resource-time">680ms</div>
//               <div className="resource-size">2.1MB</div>
//             </div>
//             <div className="resource-item">
//               <div className="resource-name">Images</div>
//               <div className="resource-time">1.2s</div>
//               <div className="resource-size">4.8MB</div>
//             </div>
//             <div className="resource-item">
//               <div className="resource-name">Fonts</div>
//               <div className="resource-time">320ms</div>
//               <div className="resource-size">580KB</div>
//             </div>
//           </div>
//         </Card>

//         <Card className="browser-metrics">
//           <div className="card-header">
//             <h3>Browser Performance</h3>
//           </div>
//           <div className="browser-stats">
//             <div className="browser-item">
//               <div className="browser-name">Chrome</div>
//               <div className="browser-score">94</div>
//               <div className="browser-progress">
//                 <div className="progress-bar">
//                   <div className="progress-fill" style={{ width: '94%' }}></div>
//                 </div>
//               </div>
//             </div>
//             <div className="browser-item">
//               <div className="browser-name">Firefox</div>
//               <div className="browser-score">89</div>
//               <div className="browser-progress">
//                 <div className="progress-bar">
//                   <div className="progress-fill" style={{ width: '89%' }}></div>
//                 </div>
//               </div>
//             </div>
//             <div className="browser-item">
//               <div className="browser-name">Safari</div>
//               <div className="browser-score">91</div>
//               <div className="browser-progress">
//                 <div className="progress-bar">
//                   <div className="progress-fill" style={{ width: '91%' }}></div>
//                 </div>
//               </div>
//             </div>
//             <div className="browser-item">
//               <div className="browser-name">Edge</div>
//               <div className="browser-score">93</div>
//               <div className="browser-progress">
//                 <div className="progress-bar">
//                   <div className="progress-fill" style={{ width: '93%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PerformanceTab;
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function PerformanceTab({ data }) {
  const perf = data.performance;

  if (!perf.current) return <p>No performance data</p>;

  return (
    <div className="tab-container">
      <h2>Performance Metrics</h2>

      <div className="stats-grid">
        <PerfCard title="Score" value={perf.current.score} />
        <PerfCard title="LCP" value={perf.current.lcp + "s"} />
        <PerfCard title="TTFB" value={perf.current.ttfb + "ms"} />
        <PerfCard title="CLS" value={perf.current.cls} />
      </div>

      <h3 style={{ marginTop: "30px" }}>Performance History</h3>

      <Line
        data={{
          labels: perf.history.map((h) => h.date),
          datasets: [
            {
              label: "LCP",
              data: perf.history.map((h) => h.lcp),
              borderColor: "red",
            },
            {
              label: "TTFB",
              data: perf.history.map((h) => h.ttfb),
              borderColor: "orange",
            },
            {
              label: "CLS",
              data: perf.history.map((h) => h.cls),
              borderColor: "purple",
            },
          ],
        }}
      />
    </div>
  );
}

function PerfCard({ title, value }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
