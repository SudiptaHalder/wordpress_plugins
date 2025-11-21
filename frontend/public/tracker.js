(function() {
  // Configuration
  const SITE_ID = 'test-site-123'; // This should be dynamically set by WordPress
  const API_URL = 'http://localhost:5000/api/track';
  
  // Collect visitor data
  const collectData = () => {
    return {
      site_id: SITE_ID,
      url: window.location.href,
      referrer: document.referrer,
      device: getDeviceType(),
      browser: getBrowser(),
      ip: '0.0.0.0' // In production, get from server-side
    };
  };

  // Detect device type
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'Mobile';
    }
    return 'Desktop';
  };

  // Detect browser
  const getBrowser = () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    return browser;
  };

  // Send data to analytics server
  const trackVisit = async () => {
    try {
      const data = collectData();
      
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  // Track page view
  trackVisit();

  // Track additional events (optional)
  window.analyticsTrack = {
    event: (eventName, data) => {
      // Track custom events
      console.log('Tracking event:', eventName, data);
    }
  };
})();