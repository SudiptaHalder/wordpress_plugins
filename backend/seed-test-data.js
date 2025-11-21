const mysql = require('mysql2/promise');

async function seedTestData() {
  // Database configuration - UPDATE THESE WITH YOUR CREDENTIALS
  const dbConfig = {
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password (leave empty if no password)
    database: 'analytics_dashboard'
  };

  console.log('🌱 Starting to seed test data...');
  console.log('📊 Database config:', { ...dbConfig, password: '***' });

  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully');

    // 1. First, make sure the database and tables exist
    console.log('🔧 Checking/Creating database tables...');
    
    // Create database if not exists
    await connection.execute('CREATE DATABASE IF NOT EXISTS analytics_dashboard');
    await connection.execute('USE analytics_dashboard');

    // Create sites table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_id VARCHAR(36) UNIQUE NOT NULL,
        domain VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        api_key VARCHAR(255),
        plan ENUM('free', 'pro') DEFAULT 'free',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create analytics_events table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_id VARCHAR(36) NOT NULL,
        url VARCHAR(500) NOT NULL,
        referrer VARCHAR(500),
        device VARCHAR(100),
        browser VARCHAR(100),
        ip VARCHAR(45),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_site_id (site_id),
        INDEX idx_timestamp (timestamp),
        INDEX idx_site_timestamp (site_id, timestamp)
      )
    `);

    // Create speed_reports table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS speed_reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_id VARCHAR(36) NOT NULL,
        score INT,
        lcp DECIMAL(5,2),
        ttfb DECIMAL(5,2),
        cls DECIMAL(5,3),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_site_id (site_id),
        INDEX idx_timestamp (timestamp)
      )
    `);

    console.log('✅ Database tables created/verified');

    // 2. Insert a test site (if not exists)
    console.log('🏠 Adding test site...');
    try {
      await connection.execute(
        `INSERT IGNORE INTO sites (site_id, domain, email, api_key, plan) 
         VALUES (?, ?, ?, ?, ?)`,
        ['test-site-123', 'yourwebsite.com', 'admin@yourwebsite.com', 'test-api-key-123', 'free']
      );
      console.log('✅ Test site added');
    } catch (siteError) {
      console.log('ℹ️ Test site already exists');
    }

    // 3. Clear existing test data (optional - uncomment if you want fresh data)
    // console.log('🧹 Clearing existing test data...');
    // await connection.execute('DELETE FROM analytics_events WHERE site_id = ?', ['test-site-123']);
    // await connection.execute('DELETE FROM speed_reports WHERE site_id = ?', ['test-site-123']);

    // 4. Insert sample analytics events
    console.log('📈 Adding analytics events...');
    const pages = ['/', '/home', '/about', '/contact', '/blog', '/pricing', '/services', '/products'];
    const referrers = ['', 'https://google.com', 'https://facebook.com', 'https://twitter.com', 'https://github.com', 'https://linkedin.com'];
    const devices = ['Desktop', 'Mobile', 'Tablet'];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];

    let eventsAdded = 0;
    const totalEvents = 500;

    for (let i = 0; i < totalEvents; i++) {
      const daysAgo = Math.floor(Math.random() * 30); // Last 30 days
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      
      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() - daysAgo);
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
      
      await connection.execute(
        `INSERT INTO analytics_events (site_id, url, referrer, device, browser, ip, timestamp) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'test-site-123',
          pages[Math.floor(Math.random() * pages.length)],
          referrers[Math.floor(Math.random() * referrers.length)],
          devices[Math.floor(Math.random() * devices.length)],
          browsers[Math.floor(Math.random() * browsers.length)],
          `192.168.1.${Math.floor(Math.random() * 255)}`,
          timestamp
        ]
      );
      
      eventsAdded++;
      
      // Show progress
      if (eventsAdded % 100 === 0) {
        console.log(`   ...added ${eventsAdded}/${totalEvents} events`);
      }
    }
    console.log(`✅ ${eventsAdded} analytics events added`);

    // 5. Insert sample performance data
    console.log('⚡ Adding performance data...');
    let performanceAdded = 0;
    const totalPerformance = 30;

    for (let i = 0; i < totalPerformance; i++) {
      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() - i);
      
      await connection.execute(
        `INSERT INTO speed_reports (site_id, score, lcp, ttfb, cls, timestamp) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          'test-site-123',
          80 + Math.floor(Math.random() * 20), // score between 80-100
          1.2 + (Math.random() * 2.0), // LCP between 1.2-3.2
          150 + Math.floor(Math.random() * 450), // TTFB between 150-600
          0.03 + (Math.random() * 0.12), // CLS between 0.03-0.15
          timestamp
        ]
      );
      
      performanceAdded++;
    }
    console.log(`✅ ${performanceAdded} performance records added`);

    // 6. Verify the data
    console.log('🔍 Verifying data...');
    
    const [eventCount] = await connection.execute(
      'SELECT COUNT(*) as count FROM analytics_events WHERE site_id = ?',
      ['test-site-123']
    );
    
    const [performanceCount] = await connection.execute(
      'SELECT COUNT(*) as count FROM speed_reports WHERE site_id = ?',
      ['test-site-123']
    );

    const [recentEvents] = await connection.execute(
      'SELECT url, device, browser, timestamp FROM analytics_events WHERE site_id = ? ORDER BY timestamp DESC LIMIT 3',
      ['test-site-123']
    );

    console.log('\n🎉 SEEDING COMPLETED SUCCESSFULLY!');
    console.log('====================================');
    console.log(`📊 Analytics Events: ${eventCount[0].count}`);
    console.log(`⚡ Performance Records: ${performanceCount[0].count}`);
    console.log(`🏠 Test Site: test-site-123`);
    console.log('\n📝 Recent events sample:');
    recentEvents.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.url} (${event.device} - ${event.browser}) - ${event.timestamp}`);
    });
    console.log('\n🚀 You can now start your backend and frontend to see the data!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Check your MySQL credentials in the dbConfig');
    console.log('   2. Make sure MySQL server is running');
    console.log('   3. Verify database name and permissions');
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the seeding
seedTestData().catch(console.error);