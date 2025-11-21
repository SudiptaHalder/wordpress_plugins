// import React from 'react';
// import Card from '../UI/Card.jsx';

// const RealTimeTab = ({ data }) => {
//   if (!data) return null;

//   return (
//     <div className="tab-content">
//       <div className="realtime-grid">
//         <Card className="realtime-card">
//           <div className="realtime-header">
//             <h3>👥 Active Users Right Now</h3>
//             <div className="active-users-count">{data.realTime.activeUsers}</div>
//           </div>
//           <div className="users-map">
//             <div className="map-placeholder">
//               🌍 Real-time user map would appear here
//             </div>
//           </div>
//         </Card>

//         <Card className="realtime-card">
//           <h3>Live Activity Stream</h3>
//           <div className="activity-stream">
//             {data.realTime.events.map((event, index) => (
//               <div key={index} className="activity-item">
//                 <div className="activity-time">{event.time}</div>
//                 <div className="activity-details">
//                   <span className="activity-page">{event.page}</span>
//                   <span className="activity-meta">
//                     {event.country} • {event.device}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RealTimeTab;
import React from "react";

export default function RealTimeTab({ data }) {
  const active = data.realtime.active;
  const activity = data.realtime.activity;

  return (
    <div className="tab-container">
      <h2>Realtime Visitors</h2>

      <h1>{active} active users</h1>

      <h3>Recent Activity</h3>
      {activity.map((a, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <strong>{a.page}</strong> – {a.device} – {a.browser}
        </div>
      ))}
    </div>
  );
}
