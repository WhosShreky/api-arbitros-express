const axios = require('axios');

const baseURL = process.env.SPRING_API_URL || '';

const client = axios.create({
  baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// Simple wrapper to call Spring API. Throws if baseURL not set or request fails.
module.exports = {
  get: async (path, opts) => {
    if (!baseURL) throw new Error('SPRING_API_URL not configured');
    return client.get(path, opts);
  },
  post: async (path, data, opts) => {
    if (!baseURL) throw new Error('SPRING_API_URL not configured');
    return client.post(path, data, opts);
  },
  put: async (path, data, opts) => {
    if (!baseURL) throw new Error('SPRING_API_URL not configured');
    return client.put(path, data, opts);
  },
  delete: async (path, opts) => {
    if (!baseURL) throw new Error('SPRING_API_URL not configured');
    return client.delete(path, opts);
  }
};
