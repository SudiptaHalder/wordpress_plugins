(function () {
  if (window.location.pathname.includes("wp-admin")) return;

  const SITE_ID = window._wpAnalyticsSiteId;
  if (!SITE_ID) return;

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return "Mobile";
    if (/iPad|Tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  }

  const payload = {
    site_id: SITE_ID,
    url: window.location.pathname + window.location.search,
    referrer: document.referrer || "",
    device: getDeviceType(),
    browser: navigator.userAgent,
    ip: ""
  };

  fetch("http://localhost:5000/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
})();
