import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange, isOpen }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊', badge: null },
    { id: 'traffic', label: 'Traffic', icon: '👥', badge: null },
    { id: 'performance', label: 'Performance', icon: '⚡', badge: '12' },
    { id: 'seo', label: 'SEO', icon: '🔍', badge: '3' },
    { id: 'realtime', label: 'Real-time', icon: '🕒', badge: '24' },
    { id: 'reports', label: 'Reports', icon: '📈', badge: null },
    { id: 'settings', label: 'Settings', icon: '⚙️', badge: null },
  ];

  return (
    <div className={`modern-sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-container">
          <div className="logo-icon">📊</div>
          <div className="logo-text">
            <span className="logo-main">AnalyticsPro</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-menu">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item-container">
            <button
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              {item.badge && (
                <span className="menu-badge">{item.badge}</span>
              )}
            </button>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="sidebar-profile">
        <div className="profile-container">
          <div className="profile-avatar">AS</div>
          <div className="profile-info">
            <div className="profile-name">Admin User</div>
            <div className="profile-role">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;