import React from 'react';

const MetricCard = ({ icon, title, value, change, changeType, chart }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <h3>{title}</h3>
      <div className="metric-value">{value}</div>
      {change && (
        <div className={`metric-change ${changeType}`}>{change}</div>
      )}
      {chart && (
        <div className="metric-chart">
          {chart}
        </div>
      )}
    </div>
  );
};

export default MetricCard;