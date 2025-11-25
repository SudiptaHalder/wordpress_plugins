// import React from 'react';
// import './Header.css';


// const Header = ({ timeRange, onTimeRangeChange, onMenuToggle, sidebarOpen }) => {
//   return (
//     <header className="modern-header">
//       <div className="header-left">
//         <button className="menu-toggle-btn" onClick={onMenuToggle}>
//           <span className="menu-icon">☰</span>
//         </button>
//         <div className="header-breadcrumb">
//           <span className="breadcrumb-text">Dashboard</span>
//           <span className="breadcrumb-separator">/</span>
//           <span className="breadcrumb-active">Analytics</span>
//         </div>
//       </div>

//       <div className="header-center">
//         <div className="time-display">
//           <span className="time-text">Last 7 days</span>
//         </div>
//       </div>

//       <div className="header-right">
//         <div className="header-actions">
//           <div className="action-group">
//             <button className="action-btn notification-btn">
//               <span className="btn-icon">🔔</span>
//               <span className="notification-badge">3</span>
//             </button>
            
//             <button className="action-btn message-btn">
//               <span className="btn-icon">💬</span>
//               <span className="message-badge">7</span>
//             </button>
//           </div>

//           <select 
//             value={timeRange} 
//             onChange={(e) => onTimeRangeChange(e.target.value)}
//             className="time-select"
//           >
//             <option value="24h">Last 24 Hours</option>
//             <option value="7d">Last 7 Days</option>
//             <option value="30d">Last 30 Days</option>
//             <option value="90d">Last 90 Days</option>
//           </select>
          
//           <button className="export-btn">
//             <span className="export-icon">📊</span>
//             Export Report
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import "./Header.css";

const Header = ({ timeRange, onTimeRangeChange, onMenuToggle }) => {
  return (
    <header className="soft-header">

      {/* LEFT AREA */}
      <div className="soft-left">
        <button className="soft-menu-btn" onClick={onMenuToggle}>
          ☰
        </button>

        <div className="soft-breadcrumb">
          <span>Dashboard</span>
          <span className="soft-separator">/</span>
          <span className="active">Analytics</span>
        </div>
      </div>

      {/* CENTER AREA */}
      <div className="soft-center">
        <div className="soft-timerange-box">
          <span>Last 7 days</span>
        </div>
      </div>

      {/* RIGHT AREA */}
      <div className="soft-right">

        <div className="soft-icon-group">
          <button className="soft-icon-btn">
            🔔
            <span className="soft-badge">3</span>
          </button>

          <button className="soft-icon-btn">
            💬
            <span className="soft-badge">7</span>
          </button>
        </div>

        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          className="soft-select"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>

        <button className="soft-export-btn">
          📊 Export
        </button>

      </div>

    </header>
  );
};

export default Header;

