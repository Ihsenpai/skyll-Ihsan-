// K6 Configuration for Skyll Laravel Application
export const config = {
  // Base URL for your Laravel application
  baseUrl: 'http://127.0.0.1:8000',
  
  // Alternative URLs for different environments
  environments: {
    local: 'http://localhost/skyll/public',
    dev: 'http://localhost:8000',  // php artisan serve
    testing: 'http://localhost:8000', // Testing environment
    staging: 'https://your-staging-url.com',
    production: 'https://your-production-url.com'
  },

  // Database Testing Configuration
  database: {
    // Use in-memory SQLite for fast testing (default)
    useTestingDb: true,
    // Environment file to use for testing
    testingEnv: 'testing', // or 'k6testing' for MySQL
    // Reset database before each test run
    resetBeforeRun: true
  },

  // Test users for authentication testing
  testUsers: {
    admin: {
      email: 'admin@skyll.com',
      password: 'password'
    },
    demo: {
      email: 'demo@skyll.com',
      password: 'password'
    },
    test: {
      email: 'test@example.com',
      password: 'password123'
    }
  },

  // Default headers
  defaultHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'K6-Skyll-LoadTest/1.0'
  },

  // Performance thresholds - Relaxed for development
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1000ms (relaxed)
    http_req_failed: ['rate<0.1'],     // Error rate should be less than 10%
    http_reqs: ['rate>1']              // Should handle at least 1 request per second (relaxed)
  },
  
  // Strict thresholds for production testing
  strictThresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.05'],   // Error rate should be less than 5%
    http_reqs: ['rate>10']            // Should handle at least 10 requests per second
  },

  // Load test scenarios
  scenarios: {
    light: {
      stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '30s', target: 0 },
      ]
    },
    moderate: {
      stages: [
        { duration: '1m', target: 20 },
        { duration: '3m', target: 20 },
        { duration: '1m', target: 0 },
      ]
    },
    heavy: {
      stages: [
        { duration: '2m', target: 50 },
        { duration: '5m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '2m', target: 0 },
      ]
    },
    spike: {
      stages: [
        { duration: '10s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 },
        { duration: '3m', target: 1400 },
        { duration: '10s', target: 100 },
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 },
      ]
    }
  }
};

export default config;