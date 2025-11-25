(function () {
  const backendUrl = "https://api.pikuanalytics.site";

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  }

  async function getIp() {
    try {
      const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
      const txt = await res.text();
      return txt.match(/ip=(.*)/)[1].trim();
    } catch {
      return "";
    }
  }

  async function trackEvent() {
    const ip = await getIp();

    const payload = {
      site_id: window._wpAnalyticsSiteId || "test-site-123",
      url: window.location.href,
      referrer: document.referrer || "",
      device: getDeviceType(),
      browser: navigator.userAgent,
      ip,
    };

    try {
      await fetch(`${backendUrl}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Tracked:", payload);
    } catch (err) {
      console.error("Track error:", err);
    }
  }

  trackEvent();
})();
