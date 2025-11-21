import React from 'react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'traffic', label: 'Traffic', icon: '👥' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'realtime', label: 'Real-time', icon: '🕒' },
  ];

  return (
    <nav className="modern-nav">
      <div className="nav-container">
        <div className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-text">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="nav-actions">
          <button className="action-btn import-btn">
            <span className="action-icon">📥</span>
            Import
          </button>
          <button className="action-btn widget-btn">
            <span className="action-icon">➕</span>
            Add Widget
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;