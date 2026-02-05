/**
 * API Client for backend communication
 *
 * Base URL is proxied through package.json to http://localhost:8000
 */

const API_BASE = '/api';

// Generic fetch wrapper with error handling
async function apiFetch(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Tasks API
export const tasksApi = {
  getAll: () => apiFetch('/tasks/'),
  getById: (id) => apiFetch(`/tasks/${id}`),
  create: (data) => apiFetch('/tasks/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/tasks/${id}`, { method: 'DELETE' }),
  updateStatus: (id, status) => apiFetch(`/tasks/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
};

// Todos API
export const todosApi = {
  getAll: () => apiFetch('/todos'),
  getById: (id) => apiFetch(`/todos/${id}`),
  create: (data) => apiFetch('/todos', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/todos/${id}`, { method: 'DELETE' }),
  toggleCompleted: (id) => apiFetch(`/todos/${id}/completed`, { method: 'PATCH' }),
};

// Brain Dump API
export const brainDumpApi = {
  getRecent: (limit = 10) => apiFetch(`/brain-dump?limit=${limit}`),
  create: (content) => apiFetch('/brain-dump', {
    method: 'POST',
    body: JSON.stringify({ content })
  }),
  update: (id, content) => apiFetch(`/brain-dump/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content })
  }),
  delete: (id) => apiFetch(`/brain-dump/${id}`, { method: 'DELETE' }),
};
