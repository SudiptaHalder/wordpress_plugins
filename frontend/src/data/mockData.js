export const mockData = {
  overview: {
    visitors: 1245,
    pageviews: 5432,
    bounceRate: '42%',
    avgSession: '2m 34s',
    newVisitors: 867,
    returningVisitors: 378
  },
  traffic: {
    channels: [
      { name: 'Organic', value: 45, color: '#8884d8' },
      { name: 'Direct', value: 25, color: '#82ca9d' },
      { name: 'Social', value: 15, color: '#ffc658' },
      { name: 'Referral', value: 10, color: '#ff8042' },
      { name: 'Email', value: 5, color: '#0088fe' }
    ],
    timeline: [
      { date: 'Mon', visitors: 400, pageviews: 2400 },
      { date: 'Tue', visitors: 300, pageviews: 1398 },
      { date: 'Wed', visitors: 200, pageviews: 9800 },
      { date: 'Thu', visitors: 278, pageviews: 3908 },
      { date: 'Fri', visitors: 189, pageviews: 4800 },
      { date: 'Sat', visitors: 239, pageviews: 3800 },
      { date: 'Sun', visitors: 349, pageviews: 4300 }
    ]
  },
  performance: {
    scores: [
      { metric: 'LCP', score: 2.1, status: 'good', target: 2.5 },
      { metric: 'FID', score: 80, status: 'excellent', target: 100 },
      { metric: 'CLS', score: 0.08, status: 'good', target: 0.1 },
      { metric: 'TTFB', score: 400, status: 'needs-improvement', target: 800 }
    ]
  },
  seo: {
    issues: [
      { type: 'Missing Meta Tags', count: 3, severity: 'medium' },
      { type: 'Broken Links', count: 1, severity: 'high' },
      { type: 'Missing Alt Text', count: 12, severity: 'low' }
    ],
    keywords: [
      { keyword: 'wordpress analytics', position: 3, traffic: 1200 },
      { keyword: 'website dashboard', position: 8, traffic: 800 },
      { keyword: 'performance monitoring', position: 12, traffic: 450 }
    ]
  },
  realTime: {
    activeUsers: 24,
    events: [
      { time: '2s ago', page: '/home', country: 'US', device: 'Desktop' },
      { time: '5s ago', page: '/blog', country: 'UK', device: 'Mobile' },
      { time: '8s ago', page: '/pricing', country: 'CA', device: 'Tablet' }
    ]
  }
};