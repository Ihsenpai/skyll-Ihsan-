// Stress Test for Skyll Application
import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';
import { checkResponse, checkApiResponse, randomChoice } from './utils.js';

export let options = {
  stages: config.scenarios.heavy.stages,
  thresholds: {
    http_req_duration: ['p(95)<1000'], // More lenient for stress test
    http_req_failed: ['rate<0.15'],     // Allow 15% error rate under stress
    http_reqs: ['rate>20']              // Should handle at least 20 RPS under load
  },
};

// Different user behaviors under load
export default function() {
  const baseUrl = config.baseUrl;
  const userType = Math.random();
  
  if (userType < 0.3) {
    // 30% - Heavy API users
    heavyApiUser(baseUrl);
  } else if (userType < 0.6) {
    // 30% - Simulation takers
    simulationUser(baseUrl);
  } else if (userType < 0.8) {
    // 20% - Browsers/learners
    casualBrowser(baseUrl);
  } else {
    // 20% - Admin users
    adminUser(baseUrl);
  }
  
  sleep(Math.random() * 1 + 0.5); // Shorter sleep for stress test
}

function heavyApiUser(baseUrl) {
  const headers = config.defaultHeaders;
  
  // Rapid fire API requests
  const apiEndpoints = [
    '/api/professions',
    '/api/scenarios',
    '/api/badges',
    '/api/users',
    '/api/learning-modules'
  ];
  
  // Make multiple rapid requests
  for (let i = 0; i < 5; i++) {
    const endpoint = randomChoice(apiEndpoints);
    let response = http.get(`${baseUrl}${endpoint}`, { headers });
    
    check(response, {
      [`API ${endpoint} under stress`]: (r) => r.status === 200 || r.status === 404,
      [`API ${endpoint} responds within 2s`]: (r) => r.timings.duration < 2000,
    });
    
    // Very short sleep between requests
    sleep(0.1);
  }
}

function simulationUser(baseUrl) {
  // Simulate user taking multiple simulations rapidly
  
  // Get scenarios
  let scenariosResponse = http.get(`${baseUrl}/api/scenarios`, {
    headers: config.defaultHeaders
  });
  
  if (scenariosResponse.status === 200) {
    try {
      const scenarios = JSON.parse(scenariosResponse.body);
      if (scenarios.data && scenarios.data.length > 0) {
        // Take multiple scenarios quickly
        for (let i = 0; i < 3; i++) {
          const scenario = randomChoice(scenarios.data);
          
          // Access simulation page
          let simulationResponse = http.get(`${baseUrl}/simulation/${scenario.id}`);
          check(simulationResponse, {
            'Simulation page under load': (r) => r.status === 200,
          });
          
          // Submit quick answers (simulate rapid clicking)
          submitQuickAnswers(baseUrl, scenario.id);
          
          sleep(0.2);
        }
      }
    } catch (e) {
      console.log('Stress test scenario parsing error:', e);
    }
  }
}

function submitQuickAnswers(baseUrl, scenarioId) {
  // Simulate rapid answer submission
  const quickAnswers = {
    scenario_id: scenarioId,
    answers: [
      { scenario_option_id: 1, answer: 'A' },
      { scenario_option_id: 2, answer: 'B' },
      { scenario_option_id: 3, answer: 'C' }
    ]
  };
  
  let submitResponse = http.post(`${baseUrl}/api/simulations`, JSON.stringify(quickAnswers), {
    headers: {
      ...config.defaultHeaders,
      'Content-Type': 'application/json'
    }
  });
  
  // Don't fail if simulation submission fails under stress
  check(submitResponse, {
    'Quick submission processed': (r) => r.status >= 200 && r.status < 500,
  });
}

function casualBrowser(baseUrl) {
  // Simulate users browsing around the site rapidly
  const pages = [
    '/',
    '/professions',
    '/learning',
    '/badges',
    '/leaderboard'
  ];
  
  // Visit multiple pages quickly
  pages.forEach(page => {
    let response = http.get(`${baseUrl}${page}`);
    check(response, {
      [`Page ${page} under load`]: (r) => r.status === 200 || r.status === 404,
      [`Page ${page} loads under 3s`]: (r) => r.timings.duration < 3000,
    });
    
    sleep(0.1);
  });
}

function adminUser(baseUrl) {
  // Simulate admin users accessing admin panel under load
  const adminPages = [
    '/admin',
    '/admin/users',
    '/admin/professions',
    '/admin/scenarios',
    '/admin/badges',
    '/admin/user-simulations'
  ];
  
  adminPages.forEach(page => {
    let response = http.get(`${baseUrl}${page}`);
    // Admin pages might require auth, so don't fail on 401/403
    check(response, {
      [`Admin ${page} responds`]: (r) => r.status < 500,
      [`Admin ${page} responds quickly`]: (r) => r.timings.duration < 3000,
    });
    
    sleep(0.1);
  });
}

// Spike test scenario - sudden traffic surge
export function spikeTest() {
  return {
    stages: config.scenarios.spike.stages,
    thresholds: {
      http_req_duration: ['p(95)<2000'], // Very lenient for spike
      http_req_failed: ['rate<0.25'],     // Allow 25% error rate during spike
      http_reqs: ['rate>50']              // High request rate target
    }
  };
}

// Database stress test
export function databaseStressTest() {
  const baseUrl = config.baseUrl;
  const headers = config.defaultHeaders;
  
  // Heavy database operations
  const dbIntensiveEndpoints = [
    '/api/users?per_page=100',
    '/api/user-simulations?include=scenario,user',
    '/api/professions?include=learning_modules,scenarios',
    '/api/leaderboard',
    '/api/user-badges?include=user,badge'
  ];
  
  // Concurrent database requests
  dbIntensiveEndpoints.forEach(endpoint => {
    let response = http.get(`${baseUrl}${endpoint}`, { headers });
    check(response, {
      [`DB intensive ${endpoint}`]: (r) => r.status === 200 || r.status === 404,
      [`DB ${endpoint} under 5s`]: (r) => r.timings.duration < 5000,
    });
  });
}