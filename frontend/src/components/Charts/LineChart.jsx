import React from 'react';

const LineChart = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="line-chart" style={{ height: `${height}px` }}>
      <svg width="100%" height="100%">
        <polyline
          fill="none"
          stroke="#8884d8"
          strokeWidth="2"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 100},${100 - (item.value / maxValue) * 80}`
          ).join(' ')}
        />
        {data.map((item, index) => (
          <circle
            key={index}
            cx={`${(index / (data.length - 1)) * 100}%`}
            cy={`${100 - (item.value / maxValue) * 80}%`}
            r="3"
            fill="#8884d8"
          />
        ))}
      </svg>
    </div>
  );
};

export default LineChart;