const app = require('./app');
const http = require('http');

async function runTests() {
  console.log('[TEST] Starting MOBILAI Backend API Test Suite...');
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api`;

  let passed = 0;
  let failed = 0;

  async function testEndpoint(name, url, options = {}) {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      if (res.ok && json.success) {
        console.log(` ✅ PASS: ${name} [HTTP ${res.status}]`);
        passed++;
        return json;
      } else {
        console.error(` ❌ FAIL: ${name} [HTTP ${res.status}]`, json);
        failed++;
        return null;
      }
    } catch (e) {
      console.error(` ❌ ERROR: ${name}:`, e.message);
      failed++;
      return null;
    }
  }

  // 1. Health check
  await testEndpoint('GET /api/health', `${baseUrl}/health`);

  // 2. Dashboard
  await testEndpoint('GET /api/dashboard', `${baseUrl}/dashboard`);

  // 3. Traffic nodes
  await testEndpoint('GET /api/traffic', `${baseUrl}/traffic`);

  // 4. Specific location traffic
  await testEndpoint('GET /api/traffic/Sitabuldi', `${baseUrl}/traffic/Sitabuldi`);

  // 5. Route optimization
  await testEndpoint('POST /api/route/optimize', `${baseUrl}/route/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'Sitabuldi', destination: 'Airport Road', mode: 'car' })
  });

  // 6. Traffic prediction
  await testEndpoint('POST /api/traffic/predict', `${baseUrl}/traffic/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: 'Sitabuldi', day: 'Monday', time: '10:00' })
  });

  // 7. Mobility recommendation
  await testEndpoint('POST /api/mobility/recommend', `${baseUrl}/mobility/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ distance: 12.4, traffic: 'heavy' })
  });

  // 8. Alerts
  await testEndpoint('GET /api/alerts', `${baseUrl}/alerts`);

  // 9. Eco stats
  await testEndpoint('GET /api/eco-stats', `${baseUrl}/eco-stats`);

  server.close();
  console.log(`\n[TEST SUMMARY] Tests completed: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
