const mysql = require('mysql2/promise');

async function seedFinal() {
  console.log('🌱 Starting database seeding with your configuration...');

  // Database connection config
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',   // your MySQL password
    database: 'mysql'   // connect to default mysql DB first
  };

  console.log('📊 Using configuration:', { ...dbConfig, password: '***' });

  let connection;

  try {
    // Connect to MySQL
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL successfully!');

    // ================================
    // 1. CREATE DATABASE (FIXED)
    // ================================
    console.log('🗄️ Creating database...');
    await connection.query('CREATE DATABASE IF NOT EXISTS analytics_dashboard');
    console.log('✅ Database created');

    // Switch to new DB
    await connection.query('USE analytics_dashboard');
    console.log('✅ Using analytics_dashboard database');

    // ================================
    // 2. CREATE TABLES
    // ================================
    console.log('📋 Creating tables...');

    // Sites table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_id VARCHAR(36) UNIQUE NOT NULL,
        domain VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        api_key VARCHAR(255),
        plan ENUM('free', 'pro') DEFAULT 'free',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Analytics events table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_id VARCHAR(36) NOT NULL,
        url VARCHAR(500) NOT NULL,
        referrer VARCHAR(500),
        device VARCHAR(100),
        browser VARCHAR(100),
        ip VARCHAR(45),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Speed reports table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS speed_reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_id VARCHAR(36) NOT NULL,
        score INT,
        lcp DECIMAL(5,2),
        ttfb DECIMAL(5,2),
        cls DECIMAL(5,3),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Tables created successfully');

    // ================================
    // 3. Insert Test Site
    // ================================
    console.log('🏠 Adding test site...');

    await connection.query(
      `INSERT IGNORE INTO sites (site_id, domain, email, api_key, plan)
       VALUES (?, ?, ?, ?, ?)`,
      ['test-site-123', 'yourwebsite.com', 'admin@yourwebsite.com', 'test-api-key-123', 'free']
    );

    console.log('✅ Test site added');

    // ================================
    // 4. Insert Analytics Events
    // ================================
    console.log('📈 Adding analytics events...');

    const pages = ['/', '/home', '/about', '/contact', '/blog', '/pricing'];
    const referrers = ['', 'https://google.com', 'https://facebook.com'];
    const devices = ['Desktop', 'Mobile', 'Tablet'];
    const browsers = ['Chrome', 'Firefox', 'Safari'];

    let eventsCount = 0;
    const totalEvents = 100;

    for (let i = 0; i < totalEvents; i++) {
      const daysAgo = Math.floor(Math.random() * 7);
      const timestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      await connection.query(
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

      eventsCount++;
      if (eventsCount % 20 === 0) console.log(`   ...${eventsCount}/${totalEvents} events added`);
    }

    console.log(`✅ ${eventsCount} analytics events added`);

    // ================================
    // 5. Insert Performance Records
    // ================================
    console.log('⚡ Adding performance data...');

    let perfCount = 0;
    for (let i = 0; i < 7; i++) {
      const timestamp = new Date(Date.now() - i * 24 * 60 * 60 * 1000);

      await connection.query(
        `INSERT INTO speed_reports (site_id, score, lcp, ttfb, cls, timestamp)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          'test-site-123',
          80 + Math.floor(Math.random() * 20),
          1.2 + Math.random() * 2,
          150 + Math.floor(Math.random() * 450),
          0.03 + Math.random() * 0.12,
          timestamp
        ]
      );

      perfCount++;
    }

    console.log(`✅ ${perfCount} performance records added`);

    // ================================
    // 6. Summary
    // ================================
    console.log('\n🔍 Verifying data...');

    const [eventCount] = await connection.query(
      'SELECT COUNT(*) as count FROM analytics_events WHERE site_id = ?',
      ['test-site-123']
    );

    const [performanceCount] = await connection.query(
      'SELECT COUNT(*) as count FROM speed_reports WHERE site_id = ?',
      ['test-site-123']
    );

    const [recentEvents] = await connection.query(
      'SELECT url, device, timestamp FROM analytics_events WHERE site_id = ? ORDER BY timestamp DESC LIMIT 5',
      ['test-site-123']
    );

    console.log('\n🎉 SEEDING COMPLETED SUCCESSFULLY!');
    console.log('====================================');
    console.log(`📊 Total Analytics Events: ${eventCount[0].count}`);
    console.log(`⚡ Total Performance Records: ${performanceCount[0].count}`);
    console.log(`🔑 Site ID: test-site-123`);

    console.log('\n📅 Recent sample:');
    recentEvents.forEach((e, i) => {
      console.log(`   ${i + 1}. ${e.url} (${e.device})`);
    });

    console.log('\n🚀 NEXT STEPS:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Start frontend: npm run dev');
    console.log('   3. Visit: http://localhost:3000');

  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run seeder
seedFinal().catch(console.error);
