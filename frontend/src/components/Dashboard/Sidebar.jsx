import React from "react";
import "./Sidebar.css";

const Sidebar = ({ activeTab, onTabChange, isOpen }) => {
  const menuItems = [
    { id: "overview", icon: "🏠" },
    { id: "traffic", icon: "📊" },
    { id: "performance", icon: "⚡" },
    { id: "seo", icon: "🔍" },
    { id: "realtime", icon: "⏱️" },
    { id: "reports", icon: "📈" },
    { id: "settings", icon: "⚙️" },
  ];

  return (
    <div className={`screenshot-sidebar ${isOpen ? "open" : "closed"}`}>
      {/* LEFT PURPLE BAR */}
      <div className="screenshot-sidebar-bar"></div>

      {/* MAIN CONTAINER */}
      <div className="screenshot-sidebar-inner">
        {/* TOP LOGO */}
        <div className="ss-logo">
          <div className="ss-logo-circle">📊</div>
        </div>

        {/* MENU ICONS */}
        <nav className="ss-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`ss-icon-btn ${
                activeTab === item.id ? "active" : ""
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="ss-icon">{item.icon}</span>
            </button>
          ))}
        </nav>

        {/* PROFILE */}
        <div className="ss-profile">
          <div className="ss-avatar">AS</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
