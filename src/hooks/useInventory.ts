import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";

type UseInventoryResult = {
  available: number;
  loading: boolean;
  error: string | null;
  meta?: {
    variants?: number;
    ts?: string;
    source?: string;
    cached?: boolean;
  };
};

const FALLBACK_AVAILABLE = 50;

// module-level cache so multiple mounts don't spam the API
let cache: { value: UseInventoryResult | null; expiresAt: number } = {
  value: null,
  expiresAt: 0,
};

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

      // serve cache if valid
      if (cache.value && now < cache.expiresAt) {
        setState(cache.value);
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // lighter + perfect for Drop page
        const result = await api.inventorySummary(limit);

        if (!aliveRef.current) return;

        const available =
          typeof result?.totalAvailable === "number"
            ? result.totalAvailable
            : typeof result?.totals?.totalAvailable === "number"
              ? result.totals.totalAvailable // tolerate alternate shape
              : fallbackAvailable;

        const next: UseInventoryResult = {
          available,
          loading: false,
          error: null,
          meta: {
            variants:
              typeof result?.variants === "number"
                ? result.variants
                : result?.totals?.variants,
            ts: result?.ts,
            source: result?.source,
            cached: result?.cached,
          },
        };

        cache = { value: next, expiresAt: Date.now() + ttlMs };
        setState(next);
      } catch (err: any) {
        if (!aliveRef.current) return;

        // fail-soft: never break Drop page
        const next: UseInventoryResult = {
          available: fallbackAvailable,
          loading: false,
          error: String(err?.message || err),
        };

        // short cache so we don't hammer during outage
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
