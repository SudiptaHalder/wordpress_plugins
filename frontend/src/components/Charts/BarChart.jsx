import React from 'react';

const BarChart = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="bar-chart" style={{ height: `${height}px` }}>
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="bar-container">
            <div
              className="bar"
              style={{
                height: `${(item.value / maxValue) * 80}%`,
                backgroundColor: item.color
              }}
            ></div>
            <div className="bar-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;