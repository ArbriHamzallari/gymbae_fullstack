const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5194';
const TOKEN_KEY = 'gymbae_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const headers = { ...options.headers };
  if (options.body != null && typeof headers['Content-Type'] === 'undefined') {
    headers['Content-Type'] = 'application/json';
  }
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, { ...options, headers });
    return res;
  } catch (err) {
    throw new Error('Unable to connect to server. Please check your internet connection and try again.');
  }
}
