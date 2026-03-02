// src/lib/api.js
const API =
  import.meta.env.VITE_API_BASE_URL || "https://api.leroykellyforever.com";

async function getJson(path) {
  const url = `${API}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} on ${url}\n${text}`);
  }

  return res.json();
}

export const api = {
  health: () => getJson("/health"),
  products: (limit = 5) => getJson(`/products?limit=${limit}`),
  inventorySummary: (limit = 50) =>
    getJson(`/inventory/summary?limit=${limit}`),
  lowStock: (threshold = 10, limit = 50) =>
    getJson(`/inventory/low-stock?threshold=${threshold}&limit=${limit}`),
  inventoryDashboard: (limit = 50) =>
    getJson(`/dashboard/inventory?limit=${limit}`),
};
