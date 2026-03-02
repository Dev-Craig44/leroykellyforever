import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";

type UseInventoryResult = {
  available: number;
  loading: boolean;
  error: string | null;
  meta?: {
    count?: number;
    fetchedAt?: string;
    ttlMs?: number;
    cached?: boolean;
  };
};

const FALLBACK_AVAILABLE = 50;

let cache: { value: UseInventoryResult | null; expiresAt: number } = {
  value: null,
  expiresAt: 0,
};

function sumAvailable(items: any[] | undefined): number | null {
  if (!Array.isArray(items)) return null;

  let total = 0;
  let sawNumber = false;

  for (const item of items) {
    const n = item?.available;
    if (typeof n === "number" && Number.isFinite(n)) {
      total += n;
      sawNumber = true;
    }
  }

  return sawNumber ? total : null;
}

export function useInventory(options?: {
  limit?: number;
  ttlMs?: number;
  fallbackAvailable?: number;
}): UseInventoryResult {
  const limit = options?.limit ?? 50;
  const ttlMs = options?.ttlMs ?? 30_000;
  const fallbackAvailable = options?.fallbackAvailable ?? FALLBACK_AVAILABLE;

  const [state, setState] = useState<UseInventoryResult>(() => {
    const now = Date.now();
    if (cache.value && now < cache.expiresAt) return cache.value;
    return { available: fallbackAvailable, loading: true, error: null };
  });

  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;

    async function load() {
      const now = Date.now();

      if (cache.value && now < cache.expiresAt) {
        setState(cache.value);
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await api.inventorySummary(limit);

        if (!aliveRef.current) return;

        // Your summary returns { items: [{ available: number }], ... }
        // We compute allocation from items.
        const computed = sumAvailable(result?.items);

        const available =
          typeof computed === "number"
            ? Math.max(0, computed)
            : fallbackAvailable;

        const next: UseInventoryResult = {
          available,
          loading: false,
          error: null,
          meta: {
            count: result?.count,
            fetchedAt: result?.fetchedAt,
            ttlMs: result?.ttlMs,
            cached: result?.cached,
          },
        };

        cache = { value: next, expiresAt: Date.now() + ttlMs };
        setState(next);
      } catch (err: any) {
        if (!aliveRef.current) return;

        const next: UseInventoryResult = {
          available: fallbackAvailable,
          loading: false,
          error: String(err?.message || err),
        };

        cache = { value: next, expiresAt: Date.now() + 5_000 };
        setState(next);
      }
    }

    load();

    return () => {
      aliveRef.current = false;
    };
  }, [limit, ttlMs, fallbackAvailable]);

  return state;
}
