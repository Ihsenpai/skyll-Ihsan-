# K6 Load Testing Suite for Skyll Application

This directory contains a comprehensive K6 load testing suite for the Skyll Laravel application. The tests cover various scenarios from basic API testing to complex user workflows.

## 📁 Test Files Overview

| File | Description | Test Type | Load Level |
|------|-------------|-----------|------------|
| `config.js` | Configuration and settings | Configuration | - |
| `utils.js` | Utility functions and helpers | Utilities | - |
| `basic-load-test.js` | Basic API and page load testing | Load Test | Moderate |
| `auth-flow-test.js` | Authentication and authorization testing | Functional | Light |
| `simulation-workflow-test.js` | Complete user journey simulation | E2E Test | Moderate |
| `stress-test.js` | High-load and stress testing | Stress Test | Heavy |

## 🚀 Quick Start

### Prerequisites

1. **Install K6**:
   ```bash
   # Windows (Chocolatey)
   choco install k6
   
   # Windows (Scoop)
   scoop install k6
   
   # Or download from: https://k6.io/docs/get-started/installation/
   ```

2. **Setup Testing Database** (Recommended):
   ```bash
   cd tests/k6
   .\setup-database.ps1
   ```
   This creates isolated testing databases so your main data stays safe.

3. **Alternative - Use Main Database**:
   ```bash
   # In Laravel project root
   php artisan serve
   # Or use Laragon/XAMPP/WAMP
   
   # Seed main database
   php artisan migrate:fresh --seed
   ```

### Running Tests

#### **Option 1: With Testing Database (Recommended)** 🗄️
```bash
# Navigate to K6 tests directory
cd tests/k6

# Setup testing database first
.\setup-database.ps1

# Run all tests with testing database
.\run-with-database.ps1

# Run specific test with testing database
.\run-with-database.ps1 -TestFile "basic-load-test.js"
```

#### **Option 2: Manual Testing** ⚙️
```bash
# Setup database first
.\setup-database.ps1

# Run tests manually
k6 run basic-load-test.js
k6 run auth-flow-test.js
k6 run simulation-workflow-test.js
k6 run stress-test.js

# Or run all tests
.\run-all-tests.ps1
```

## 🔧 Configuration

Edit `config.js` to match your environment:

```javascript
export const config = {
  // Update this to match your Laravel app URL
  baseUrl: 'http://localhost/skyll/public',  // Laragon
  // baseUrl: 'http://localhost:8000',       // artisan serve
  
  // Update test user credentials
  testUsers: {
    admin: {
      email: 'admin@skyll.com',
      password: 'password'
    },
    demo: {
      email: 'demo@skyll.com', 
      password: 'password'
    }
  }
};
```

## 📊 Test Scenarios

### 1. Basic Load Test (`basic-load-test.js`)
- **Purpose**: Test basic API endpoints and static assets
- **Load**: 20 concurrent users for 3 minutes
- **Tests**: Homepage, API endpoints, static assets
- **Usage**: `k6 run basic-load-test.js`

### 2. Authentication Flow Test (`auth-flow-test.js`)
- **Purpose**: Test login, registration, and admin access
- **Load**: 5 concurrent users for 2 minutes
- **Tests**: Login forms, CSRF tokens, session handling
- **Usage**: `k6 run auth-flow-test.js`

### 3. Simulation Workflow Test (`simulation-workflow-test.js`)
- **Purpose**: Test complete user journey
- **Load**: 20 concurrent users for 5 minutes
- **Tests**: Full user workflow from login to simulation completion
- **Usage**: `k6 run simulation-workflow-test.js`

### 4. Stress Test (`stress-test.js`)
- **Purpose**: Test application under high load
- **Load**: Up to 100 concurrent users, spike to 1400
- **Tests**: Performance under stress, error rates
- **Usage**: `k6 run stress-test.js`

## 🎯 Custom Test Scenarios

### Run with Custom Load
```bash
# Light load (5 users)
k6 run --vus 5 --duration 30s basic-load-test.js

# Heavy load (50 users)
k6 run --vus 50 --duration 2m basic-load-test.js

# Spike test (quick burst)
k6 run --vus 100 --duration 10s stress-test.js
```

### Different Output Formats
```bash
# JSON output
k6 run --out json=results.json basic-load-test.js

# InfluxDB output (if you have InfluxDB setup)
k6 run --out influxdb=http://localhost:8086/k6 basic-load-test.js

# CSV output
k6 run --out csv=results.csv basic-load-test.js
```

## 📈 Understanding Results

### Key Metrics
- **http_req_duration**: Response time (should be < 500ms for good UX)
- **http_req_failed**: Error rate (should be < 5%)
- **http_reqs**: Requests per second
- **vus**: Virtual users (concurrent users)

### Sample Output
```
✓ Homepage - Status is 200
✓ Homepage - Response time < 500ms
✓ Professions API - Status is 200
✓ Professions API - Response time < 300ms

checks.........................: 95.00% ✓ 380      ✗ 20  
data_received..................: 2.1 MB 35 kB/s
data_sent......................: 180 kB 3.0 kB/s
http_req_blocked...............: avg=1.2ms   min=0s     med=0s     max=45ms   p(90)=0s     p(95)=12ms  
http_req_connecting............: avg=0.5ms   min=0s     med=0s     max=15ms   p(90)=0s     p(95)=5ms   
http_req_duration..............: avg=123ms   min=45ms   med=98ms   max=890ms  p(90)=234ms  p(95)=345ms 
http_req_failed................: 5.00%  ✓ 20       ✗ 380 
http_req_receiving.............: avg=1.2ms   min=0.2ms  med=0.8ms  max=12ms   p(90)=2.1ms  p(95)=3.2ms 
http_req_sending...............: avg=0.1ms   min=0.01ms med=0.05ms max=2ms    p(90)=0.2ms  p(95)=0.3ms 
http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s     p(90)=0s     p(95)=0s    
http_req_waiting...............: avg=122ms   min=44ms   med=97ms   max=889ms  p(90)=233ms  p(95)=344ms 
http_reqs......................: 400    6.67/s
iteration_duration.............: avg=3.1s    min=2.8s   med=3.0s   max=4.2s   p(90)=3.5s   p(95)=3.8s  
iterations.....................: 400    6.67/s
vus............................: 20     min=0      max=20
vus_max........................: 20     min=20     max=20
```

## 🔍 Troubleshooting

### Common Issues

1. **Connection Refused**
   ```
   ERRO[0001] Get "http://localhost/skyll/public": dial tcp [::1]:80: connectex: No connection could be made
   ```
   - **Solution**: Ensure Laravel app is running and URL is correct

2. **404 Errors**
   ```
   ✗ Professions API - Status is 200
   ```
   - **Solution**: Check if API routes exist in `routes/api.php`

3. **CSRF Token Issues**
   ```
   ✗ Login successful
   ```
   - **Solution**: Ensure CSRF middleware is properly configured

4. **Database Errors**
   ```
   ✗ Simulation submitted
   ```
   - **Solution**: Run `php artisan migrate:fresh --seed`

### Performance Issues
- **Slow Response Times**: Check database queries, add indexes
- **High Error Rates**: Check server logs, increase timeout limits
- **Memory Issues**: Monitor server resources during tests

## 📚 Educational Context

This K6 suite is designed for educational purposes and demonstrates:

1. **Load Testing Concepts**:
   - Virtual users simulation
   - Response time measurement
   - Error rate monitoring
   - Throughput testing

2. **Real-world Scenarios**:
   - User authentication flows
   - Complex user journeys
   - API performance testing
   - Stress testing methodologies

3. **Laravel-specific Testing**:
   - CSRF token handling
   - Session management
   - Eloquent model performance
   - Filament admin panel testing

## 🎓 Assignment Ideas

1. **Basic Assignment**: Run all tests and analyze results
2. **Intermediate**: Modify test scenarios for different loads
3. **Advanced**: Create custom test scenarios for specific features
4. **Research**: Compare K6 results with other tools (JMeter, Artillery)

## 📝 Reports and Documentation

After running tests, document:
- Performance bottlenecks identified
- Recommended improvements
- Comparison between different test scenarios
- Scalability conclusions

---

**Happy Load Testing! 🚀**