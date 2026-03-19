export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[280px] rounded-[20px] bg-card border border-border animate-pulse" />
      ))}
    </div>
  );
}