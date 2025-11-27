import React, { useEffect, useState } from "react";
import { getSeoData } from "../../services/Seo";
import "./SeoTab.css";

export default function SeoTab() {
  const [seo, setSeo] = useState(null);

 useEffect(() => {
  getSeoData("test-site-123").then(setSeo).catch(console.error);
}, []);


  if (!seo) return <p className="loading">Loading SEO insights...</p>;

  return (
    <div className="seo-container">

      {/* SEO SCORE */}
      <div className="seo-score-card">
        <h2>SEO Score</h2>
        <div className="seo-score">{seo.seoScore}/100</div>
        <p className="seo-score-label">
          Your site SEO health is {seo.seoScore > 75 ? "Good" : "Needs Improvement"}
        </p>
      </div>

      {/* TOP LANDING PAGES */}
      <div className="seo-section">
        <h3>Top Landing Pages</h3>
        <ul>
          {seo.landingPages.map((p, i) => (
            <li key={i}>
              <span>{p.url}</span>
              <strong>{p.visits} visits</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* EXIT PAGES */}
      <div className="seo-section">
        <h3>Top Exit Pages</h3>
        <ul>
          {seo.exitPages.map((p, i) => (
            <li key={i}>
              <span>{p.url}</span>
              <strong>{p.exits} exits</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* TRAFFIC SOURCES */}
      <div className="seo-metrics-row">
        <div className="seo-metric orange">
          <h4>Organic Traffic</h4>
          <div className="metric-value">{seo.organicTraffic}</div>
        </div>
        <div className="seo-metric blue">
          <h4>Social Traffic</h4>
          <div className="metric-value">{seo.socialTraffic}</div>
        </div>
        <div className="seo-metric purple">
          <h4>Referral Traffic</h4>
          <div className="metric-value">{seo.referralTraffic}</div>
        </div>
      </div>

      {/* KEYWORDS */}
      <div className="seo-section">
        <h3>Top Search Keywords</h3>

        {seo.keywords.length === 0 && <p>No keyword data found.</p>}

        <ul>
          {seo.keywords.map((k, i) => (
            <li key={i}>
              <span>{k.keyword}</span>
              <strong>{k.searches}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
