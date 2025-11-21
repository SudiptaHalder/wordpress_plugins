(function () {
  const backendUrl = "https://meritless-charise-pseudodiphtheric.ngrok-free.dev";

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  }

  async function trackEvent() {
    const payload = {
      site_id: window._wpAnalyticsSiteId || "test-site-123",
      url: window.location.href,
      referrer: document.referrer || "",
      device: getDeviceType(),
      browser: navigator.userAgent,
      ip: "", 
    };

    try {
      await fetch(`${backendUrl}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Tracked:", payload);
    } catch (e) {
      console.error("Track error:", e);
    }
  }

  trackEvent();
})();
