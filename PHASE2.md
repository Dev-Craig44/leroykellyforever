# 🎯 Phase 2 Implementation Guide

## Live Inventory Integration

### Prerequisites

- Backend API endpoint for Shopify inventory
- Shopify variant ID for the hat product
- API authentication configured

### Step 1: Update Environment Variables

```bash
# Add to .env
VITE_API_BASE_URL=https://your-api.com
```

### Step 2: Get Shopify Variant ID

1. Go to Shopify Admin → Products → Leroy Kelly Forever Hat
2. Click on the variant you want to sell
3. Copy the variant ID from the URL or API
4. Update in `src/sections/HatVideoCardSection/HatVideoCardSection.tsx`:

```typescript
const VARIANT_ID = "YOUR_ACTUAL_VARIANT_ID";
const SHOPIFY_CART_URL = `https://your-store.myshopify.com/cart/${VARIANT_ID}:1?discount=BACKERS50`;
```

### Step 3: Backend API Endpoint

Your backend should expose:

```
GET /inventory/:variantId

Response:
{
  "available": 37,
  "total": 50
}
```

### Step 4: Enable Live Inventory Hook

Edit `src/hooks/useInventory.ts` and uncomment the fetch logic:

```typescript
export function useInventory(variantId?: string): InventoryData {
  const [data, setData] = useState<InventoryData>({
    available: 50,
    total: 50,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!variantId) return;

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    if (!API_BASE) {
      setData((prev) => ({ ...prev, error: "API base URL not configured" }));
      return;
    }

    setData((prev) => ({ ...prev, loading: true }));

    fetch(`${API_BASE}/inventory/${variantId}`)
      .then((res) => res.json())
      .then((result) => {
        setData({
          available: result.available || 0,
          total: result.total || 50,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch inventory:", err);
        setData({
          available: 50,
          total: 50,
          loading: false,
          error: "Failed to load inventory",
        });
      });
  }, [variantId, setData]);

  return data;
}
```

### Step 5: Update HatVideoCardSection

Pass the variant ID to ScarcityBadge:

```typescript
<ScarcityBadge variantId={VARIANT_ID} />
```

### Step 6: Test

1. Start dev server: `npm run dev`
2. Check Network tab for API calls
3. Verify inventory updates display
4. Test error handling (disconnect API to see fallback)

## Backend Implementation (Node.js Example)

```typescript
// Example Express.js endpoint
app.get("/inventory/:variantId", async (req, res) => {
  const { variantId } = req.params;

  try {
    // Call Shopify Admin API
    const response = await fetch(
      `https://your-store.myshopify.com/admin/api/2024-01/variants/${variantId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
      },
    );

    const data = await response.json();
    const available = data.variant.inventory_quantity;

    res.json({
      available: Math.max(0, available),
      total: 50,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});
```

## Considerations

### Caching

Add caching to reduce API calls:

- Cache inventory for 30-60 seconds
- Use Redis or in-memory cache on backend

### Rate Limiting

- Shopify API has rate limits (2 requests/second for REST)
- Implement queue or debounce on frontend

### Real-time Updates

For better UX, consider:

- WebSocket connection for live updates
- Server-Sent Events (SSE)
- Polling with exponential backoff

### Error States

The hook handles:

- Missing API URL (shows static 50)
- Network errors (falls back to static)
- Invalid responses (falls back to static)

This ensures the site never breaks even if API fails.
