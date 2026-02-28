import { useInventory } from "../../src/hooks/useInventory";

interface ScarcityBadgeProps {
  variantId?: string;
  className?: string;
}

export default function ScarcityBadge({
  variantId,
  className = "",
}: ScarcityBadgeProps) {
  const { available, loading } = useInventory(variantId);

  return (
    <div
      className={`inline-flex flex-col items-center gap-1 animate-fadeIn ${className}`}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold tracking-tight text-zinc-900">
          {loading ? "..." : available}
        </span>
        <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
          Available
        </span>
      </div>
      <p className="text-xs text-zinc-500 tracking-wide">
        Remaining in Edition I
      </p>
      <p className="mt-1 text-[10px] text-zinc-400">
        Inventory updates at checkout
      </p>
    </div>
  );
}
