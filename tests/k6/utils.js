// Utility functions for K6 tests
import { check } from 'k6';

export function checkResponse(response, name, expectedStatus = 200) {
  return check(response, {
    [`${name} - Status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    [`${name} - Response time < 500ms`]: (r) => r.timings.duration < 500,
    [`${name} - Response has body`]: (r) => r.body && r.body.length > 0,
  });
}

export function checkApiResponse(response, name, expectedStatus = 200) {
  return check(response, {
    [`${name} - Status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    [`${name} - Response time < 300ms`]: (r) => r.timings.duration < 300,
    [`${name} - Content-Type is JSON`]: (r) => r.headers['Content-Type']?.includes('application/json'),
    [`${name} - Response has body`]: (r) => r.body && r.body.length > 0,
  });
}

export function checkHtmlResponse(response, name, expectedStatus = 200) {
  return check(response, {
    [`${name} - Status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    [`${name} - Response time < 1000ms`]: (r) => r.timings.duration < 1000,
    [`${name} - Content-Type is HTML`]: (r) => r.headers['Content-Type']?.includes('text/html'),
    [`${name} - Response has body`]: (r) => r.body && r.body.length > 0,
  });
}

export function extractCsrfToken(response) {
  // Extract CSRF token from Laravel response
  const csrfMatch = response.body.match(/name="_token"\s+value="([^"]+)"/);
  return csrfMatch ? csrfMatch[1] : null;
}

export function extractSessionCookie(response) {
  // Extract Laravel session cookie
  const setCookieHeader = response.headers['Set-Cookie'];
  if (!setCookieHeader) return null;
  
  const sessionMatch = setCookieHeader.match(/laravel_session=([^;]+)/);
  return sessionMatch ? sessionMatch[1] : null;
}

export function generateRandomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `test${timestamp}${random}@example.com`;
}

export function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function sleep(min = 1, max = 3) {
  const sleepTime = Math.random() * (max - min) + min;
  return sleepTime;
}