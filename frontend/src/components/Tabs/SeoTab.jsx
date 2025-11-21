// import React from 'react';
// import Card from '../UI/Card.jsx';

// const SeoTab = ({ data }) => {
//   if (!data) return null;

//   return (
//     <div className="tab-content">
//       <div className="seo-grid">
//         <Card className="seo-card">
//           <h3>Top Performing Keywords</h3>
//           <div className="keywords-list">
//             {data.seo.keywords.map((keyword, index) => (
//               <div key={index} className="keyword-item">
//                 <div className="keyword-info">
//                   <span className="keyword-text">{keyword.keyword}</span>
//                   <span className="keyword-position">Position #{keyword.position}</span>
//                 </div>
//                 <div className="keyword-traffic">{keyword.traffic} visits/mo</div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         <Card className="seo-card">
//           <h3>SEO Issues</h3>
//           <div className="seo-issues-vertical">
//             {data.seo.issues.map((issue, index) => (
//               <div key={index} className={`seo-issue-vertical ${issue.severity}`}>
//                 <div className="issue-header">
//                   <span className="issue-type">{issue.type}</span>
//                   <span className="issue-count">{issue.count} issues</span>
//                 </div>
//                 <div className="issue-bar">
//                   <div 
//                     className={`issue-progress ${issue.severity}`}
//                     style={{ width: `${(issue.count / 15) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SeoTab;
import React from "react";

export default function SeoTab() {
  return (
    <div className="tab-container">
      <h2>SEO Insights</h2>
      <p>SEO module coming soon...</p>
    </div>
  );
}
