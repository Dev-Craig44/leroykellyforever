import { useEffect, useState } from "react";

interface InventoryData {
  available: number;
  total: number;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for fetching live inventory from Shopify.
 * Phase 1: Returns static inventory (50).
 * Phase 2: Uncomment API call to fetch live data.
 */
export function useInventory(variantId?: string): InventoryData {
  const [data, setData] = useState<InventoryData>({
    available: 50, // Static for Phase 1
    total: 50,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Phase 2: To enable live inventory, uncomment and implement API call
    // Example implementation:
    // if (!variantId) return;
    // const API_BASE = import.meta.env.VITE_API_BASE_URL;
    // fetch(`${API_BASE}/inventory/${variantId}`)
    //   .then(res => res.json())
    //   .then(result => setData({...}))
    //   .catch(err => setData({...}));
  }, [variantId, setData]);

  return data;
}
