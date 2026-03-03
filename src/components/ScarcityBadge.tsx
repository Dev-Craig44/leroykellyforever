import { useInventory } from "../../src/hooks/useInventory";

interface ScarcityBadgeProps {
  className?: string;
}

export default function ScarcityBadge({ className = "" }: ScarcityBadgeProps) {
  const { available, loading } = useInventory({
    limit: 50,
    ttlMs: 30_000,
    fallbackAvailable: 50,
  });

  const safeAvailable = Math.max(available ?? 0, 0);
  const lowStock = safeAvailable <= 10 && safeAvailable > 0;
  const soldOut = safeAvailable === 0;

  return (
    <div
      className={`inline-flex flex-col items-center gap-1 animate-fadeIn ${className}`}
    >
      <div className="flex items-baseline gap-2">
        <span
          className={`text-5xl font-bold tracking-tight drop-shadow-sm ${
            soldOut
              ? "text-red-600"
              : lowStock
                ? "text-amber-600"
                : "text-zinc-900"
          }`}
        >
          {loading ? "..." : safeAvailable}
        </span>

        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
          Available
        </span>
      </div>

      <p className="text-xs text-zinc-500 tracking-wide">
        Remaining in Edition I
      </p>

      <p className="mt-1 text-[10px] text-zinc-400">
        Inventory updates at checkout
      </p>

      {soldOut && (
        <p className="mt-1 text-xs font-semibold text-red-600 uppercase tracking-wide">
          Allocation complete
        </p>
      )}
    </div>
  );
}
