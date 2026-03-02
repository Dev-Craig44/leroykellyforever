// src/lib/api.ts

const RAW_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://api.leroykellyforever.com";

// normalize so `${API}${path}` is always correct
const API = String(RAW_BASE).replace(/\/+$/, "");

// default timeout: keep UI snappy even if API is down
const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS || 4000);

interface GetJsonOptions {
  timeoutMs?: number;
}

async function getJson<T = any>(
  path: string,
  { timeoutMs = DEFAULT_TIMEOUT_MS }: GetJsonOptions = {},
): Promise<T> {
  const url = `${API}${path}`;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API ${res.status} on ${url}\n${text}`);
    }

    return res.json();
  } catch (err) {
    // make timeout errors readable
    if ((err as any)?.name === "AbortError") {
      throw new Error(`API timeout after ${timeoutMs}ms on ${url}`);
    }
    throw err;
  } finally {
    clearTimeout(t);
  }
}

// Type definitions for API responses
export interface HealthResponse {
  status: string;
  timestamp?: string;
}

export interface InventoryDashboardResponse {
  totals: {
    totalAvailable: number;
    variants: number;
  };
  lowStockCounts: {
    "5": number;
    "10": number;
    "20": number;
  };
  products: any[];
  // Optional metadata from backend
  ts?: string;
  source?: string;
  cached?: boolean;
}

export const api = {
  // basic
  health: () => getJson<HealthResponse>("/health"),

  // shopify-derived views
  products: (limit = 5) => getJson(`/products?limit=${limit}`),

  inventorySummary: (limit = 50) =>
    getJson(`/inventory/summary?limit=${limit}`),

  lowStock: (threshold = 10, limit = 50) =>
    getJson(`/inventory/low-stock?threshold=${threshold}&limit=${limit}`),

  inventoryDashboard: (limit = 50) =>
    getJson<InventoryDashboardResponse>(`/dashboard/inventory?limit=${limit}`),
};
