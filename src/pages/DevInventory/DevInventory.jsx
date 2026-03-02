import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function InventoryTest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState("mounted");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setStep("calling API…");

        const result = await api.inventoryDashboard(50);

        if (!alive) return;

        setData(result);
        setStep("success ✅");
      } catch (err) {
        if (!alive) return;
        setError(String(err?.message || err));
        setStep("error ❌");
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 20 }}>
      <h2>Inventory Dashboard</h2>

      <p>
        <b>Status:</b> {step}
      </p>

      {error && (
        <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{error}</pre>
      )}

      {!data && !error && <p>Loading...</p>}

      {data && (
        <>
          <p>
            <b>Total Available:</b> {data?.totals?.totalAvailable}
          </p>
          <p>
            <b>Variants:</b> {data?.totals?.variants}
          </p>
          <p>
            <b>Low stock ≤10:</b> {data?.lowStockCounts?.["10"]}
          </p>

          <h3>Products</h3>

          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(data.products, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
