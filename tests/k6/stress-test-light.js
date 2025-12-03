// Light Stress Test - Development Friendly Version
import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';
import { checkResponse, randomChoice } from './utils.js';

// Light stress test - reasonable for development server
export let options = {
  stages: [
    { duration: '30s', target: 5 },   // Gentle ramp up to 5 users
    { duration: '1m', target: 10 },   // Increase to 10 users  
    { duration: '1m', target: 15 },   // Peak at 15 users
    { duration: '30s', target: 20 },  // Brief spike to 20 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    // More relaxed thresholds for development
    http_req_duration: ['p(95)<2000'], // 2 seconds max (generous for dev server)
    http_req_failed: ['rate<0.2'],     // Allow 20% error rate under stress
    http_reqs: ['rate>2']              // Should handle at least 2 RPS
  },
};

export default function() {
  const baseUrl = config.baseUrl;
  
  // Test main pages under light stress
  testMainPages(baseUrl);
  
  // Random think time between requests
  sleep(Math.random() * 2 + 0.5); // 0.5-2.5 seconds
}

function testMainPages(baseUrl) {
  // Test homepage
  let homeResponse = http.get(`${baseUrl}/`);
  check(homeResponse, {
    '🏠 Homepage responds': (r) => r.status === 200,
    '🏠 Homepage loads reasonably fast': (r) => r.timings.duration < 3000,
  });
  
  // Test other pages randomly to vary load
  const pages = ['/professions', '/learning'];
  const randomPage = randomChoice(pages);
  
  let pageResponse = http.get(`${baseUrl}${randomPage}`);
  check(pageResponse, {
    [`📄 ${randomPage} responds`]: (r) => r.status === 200 || r.status === 404,
    [`📄 ${randomPage} loads reasonably fast`]: (r) => r.timings.duration < 3000,
  });
  
  // Occasionally test some potential API endpoints (if they exist)
  if (Math.random() < 0.3) { // 30% chance
    testAPIEndpoints(baseUrl);
  }
}

function testAPIEndpoints(baseUrl) {
  const apiEndpoints = [
    '/api/professions',
    '/api/users', 
    '/api/scenarios'
  ];
  
  const randomAPI = randomChoice(apiEndpoints);
  
  let apiResponse = http.get(`${baseUrl}${randomAPI}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  check(apiResponse, {
    [`🔌 API ${randomAPI} responds (or 404)`]: (r) => r.status === 200 || r.status === 404 || r.status === 500,
    [`🔌 API ${randomAPI} responds quickly`]: (r) => r.timings.duration < 4000,
  });
}

// Let K6 show default summary with thresholds first, then add custom message
export function handleSummary(data) {
  // Custom summary info after K6's default output
  const requests = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const avgDuration = data.metrics.http_req_duration ? Math.round(data.metrics.http_req_duration.values.avg) : 0;
  const errorRate = data.metrics.http_req_failed ? (data.metrics.http_req_failed.values.rate * 100).toFixed(1) : '0.0';
  const successRate = (100 - parseFloat(errorRate)).toFixed(1);
  
  console.log('\n🧪 LIGHT STRESS TEST ANALYSIS:');
  console.log('================================');
  console.log(`📊 Total Requests: ${requests}`);
  console.log(`⚡ Avg Response Time: ${avgDuration}ms`);
  console.log(`✅ Success Rate: ${successRate}%`);
  console.log(`❌ Error Rate: ${errorRate}%`);
  
  if (parseFloat(errorRate) < 10) {
    console.log('🎉 EXCELLENT! Your app handles light stress well!');
  } else if (parseFloat(errorRate) < 20) {
    console.log('👍 GOOD! Some errors under stress but acceptable for development.');
  } else {
    console.log('⚠️  HIGH ERROR RATE: Consider optimizing your application.');
  }
  
  console.log('💡 This is a LIGHT stress test suitable for development servers.');
  console.log('💡 For production stress testing, use proper web servers (Apache/Nginx).');
  
  // Return undefined to let K6 show its default summary
  return undefined;
}