import React from 'react';
import MiniSparkline from '../Charts/MiniSparkline.jsx';

const ModernStatsGrid = ({ data }) => {
  if (!data) return null;

  const sparklineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [65, 59, 80, 81, 56, 55, 40]
  };

  const metrics = [
    {
      icon: '👥',
      title: 'Total Visitors',
      value: data.overview.visitors.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      sparkline: sparklineData,
      color: '#8884d8'
    },
    {
      icon: '📄',
      title: 'Page Views',
      value: data.overview.pageviews.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      sparkline: sparklineData,
      color: '#82ca9d'
    },
    {
      icon: '💰',
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+2.1%',
      changeType: 'positive',
      sparkline: sparklineData,
      color: '#ffc658'
    },
    {
      icon: '⏱️',
      title: 'Avg. Session',
      value: data.overview.avgSession,
      change: '+15s',
      changeType: 'positive',
      sparkline: sparklineData,
      color: '#ff8042'
    }
  ];

  return (
    <div className="modern-stats-grid">
      {metrics.map((metric, index) => (
        <div key={index} className="modern-metric-card">
          <div className="metric-header">
            <div className="metric-icon" style={{ backgroundColor: metric.color + '20' }}>
              <span style={{ color: metric.color }}>{metric.icon}</span>
            </div>
            <div className="metric-trend">
              <span className={`trend ${metric.changeType}`}>
                {metric.change}
              </span>
            </div>
          </div>
          <div className="metric-content">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-title">{metric.title}</div>
          </div>
          <div className="metric-chart">
            <MiniSparkline data={metric.sparkline} color={metric.color} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernStatsGrid;