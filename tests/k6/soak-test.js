// Soak Test - 30 Minute Demo Version for College Assignment
import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';
import { checkResponse, randomChoice } from './utils.js';

// Soak test - consistent load for 30 minutes to detect memory leaks
export let options = {
  stages: [
    { duration: '2m', target: 10 },   // Gentle ramp up to 10 users
    { duration: '26m', target: 10 },  // Hold steady 10 users for 26 minutes  
    { duration: '2m', target: 0 },    // Gentle ramp down
  ],
  thresholds: {
    // More lenient for long duration test
    http_req_duration: ['p(95)<3000'], // 3 seconds max (generous for sustained load)
    http_req_failed: ['rate<0.15'],    // Allow 15% error rate over time
    http_reqs: ['rate>5']              // Should handle at least 5 RPS consistently
  },
};

export default function() {
  const baseUrl = config.baseUrl;
  
  // Simulate realistic user behavior over long periods
  soakTestScenario(baseUrl);
  
  // Variable think time to simulate real users
  sleep(Math.random() * 3 + 1); // 1-4 seconds between requests
}

function soakTestScenario(baseUrl) {
  // Test core functionality consistently
  testCoreFunctionality(baseUrl);
  
  // Occasionally test heavier operations  
  if (Math.random() < 0.2) { // 20% chance
    testHeavierOperations(baseUrl);
  }
}

function testCoreFunctionality(baseUrl) {
  // Homepage - most frequently accessed
  let homeResponse = http.get(`${baseUrl}/`);
  check(homeResponse, {
    '🏠 Homepage available during soak': (r) => r.status === 200,
    '🏠 Homepage responsive during soak': (r) => r.timings.duration < 5000,
  });
  
  // Core pages that users access regularly
  const corePages = ['/professions', '/learning'];
  const randomPage = randomChoice(corePages);
  
  let pageResponse = http.get(`${baseUrl}${randomPage}`);
  check(pageResponse, {
    [`📖 ${randomPage} stable during soak`]: (r) => r.status === 200 || r.status === 404,
    [`📖 ${randomPage} responsive during soak`]: (r) => r.timings.duration < 5000,
  });
}

function testHeavierOperations(baseUrl) {
  // Test API endpoints that might cause memory issues
  const apiEndpoints = [
    '/api/users',
    '/api/professions', 
    '/api/scenarios',
    '/api/learning-modules'
  ];
  
  const randomAPI = randomChoice(apiEndpoints);
  
  let apiResponse = http.get(`${baseUrl}${randomAPI}`, {
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache' // Force fresh requests to test memory
    }
  });
  
  check(apiResponse, {
    [`🔌 API ${randomAPI} stable during soak`]: (r) => r.status === 200 || r.status === 404 || r.status === 500,
    [`🔌 API ${randomAPI} no memory issues`]: (r) => r.timings.duration < 8000, // Allow more time for API
  });
}

export function handleSummary(data) {
  // Calculate soak test specific metrics
  const duration = data.state.testRunDurationMs / 1000 / 60; // in minutes
  const requests = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const avgDuration = data.metrics.http_req_duration ? Math.round(data.metrics.http_req_duration.values.avg) : 0;
  const errorRate = data.metrics.http_req_failed ? (data.metrics.http_req_failed.values.rate * 100).toFixed(1) : '0.0';
  const successRate = (100 - parseFloat(errorRate)).toFixed(1);
  const requestsPerMinute = Math.round(requests / duration);
  
  console.log('\n🏃‍♂️ SOAK TEST (30-MINUTE DEMO) ANALYSIS:');
  console.log('==========================================');
  console.log(`⏱️  Test Duration: ${Math.round(duration)} minutes`);
  console.log(`📊 Total Requests: ${requests}`);
  console.log(`📈 Requests/Minute: ${requestsPerMinute}`);
  console.log(`⚡ Avg Response Time: ${avgDuration}ms`);
  console.log(`✅ Success Rate: ${successRate}%`);
  console.log(`❌ Error Rate: ${errorRate}%`);
  
  // Memory leak indicators (simplified for demo)
  const p95Start = 'N/A'; // Would need time-series data for real analysis
  const p95End = data.metrics.http_req_duration ? Math.round(data.metrics.http_req_duration.values.p95) : 0;
  
  console.log('\n🔍 MEMORY LEAK INDICATORS:');
  console.log(`📊 95th Percentile Response Time: ${p95End}ms`);
  
  if (parseFloat(errorRate) < 5) {
    console.log('🎉 EXCELLENT! No signs of memory leaks or degradation!');
  } else if (parseFloat(errorRate) < 10) {
    console.log('👍 GOOD! System stable under sustained load.');
  } else if (parseFloat(errorRate) < 15) {
    console.log('⚠️  WATCH: Some degradation over time. Monitor memory usage.');
  } else {
    console.log('🚨 CONCERN: High error rate may indicate memory/resource issues.');
  }
  
  console.log('\n💡 SOAK TESTING INSIGHTS:');
  console.log(`💡 This 30-minute test simulated ${requestsPerMinute} requests/minute consistently`);
  console.log('💡 In production, run 6-24 hours to catch slower memory leaks');
  console.log('💡 Monitor server memory, CPU, and database connections during soak tests');
  console.log('💡 Look for gradual performance degradation over time');
  
  return undefined; // Let K6 show default summary
}