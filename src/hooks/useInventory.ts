import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";
type UseInventoryResult = {
  available: number;
  loading: boolean;
  error: string | null;
  // optional debug metadata
  meta?: {
    variants?: number;
    lowStock10?: number;
    ts?: string;
    source?: string;
    cached?: boolean;
  };
};

const FALLBACK_AVAILABLE = 50;

// simple module-level cache to avoid re-fetching on every mount
let cache: { value: UseInventoryResult | null; expiresAt: number } = {
  value: null,
  expiresAt: 0,
};

export function useInventory(ttlMs = 30_000): UseInventoryResult {
  const [state, setState] = useState<UseInventoryResult>(() => {
    const now = Date.now();
    if (cache.value && now < cache.expiresAt) return cache.value;
    return { available: FALLBACK_AVAILABLE, loading: true, error: null };
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
        // NOTE: your api.inventoryDashboard(50) signature stays
        const result = await api.inventoryDashboard(50);

        if (!aliveRef.current) return;

        const available =
          typeof result?.totals?.totalAvailable === "number"
            ? result.totals.totalAvailable
            : FALLBACK_AVAILABLE;

        const next: UseInventoryResult = {
          available,
          loading: false,
          error: null,
          meta: {
            variants: result?.totals?.variants,
            lowStock10: result?.lowStockCounts?.["10"],
            ts: result?.ts,
            source: result?.source,
            cached: result?.cached,
          },
        };

        cache = { value: next, expiresAt: Date.now() + ttlMs };

        setState(next);
      } catch (err: any) {
        if (!aliveRef.current) return;

        // fail-soft: never break drop page
        const next: UseInventoryResult = {
          available: FALLBACK_AVAILABLE,
          loading: false,
          error: String(err?.message || err),
        };

        // cache the fallback briefly so we don't hammer the API during an outage
        cache = { value: next, expiresAt: Date.now() + 5_000 };

        setState(next);
      }
    }

    load();

    return () => {
      aliveRef.current = false;
    };
  }, [ttlMs]);

  return state;
}
