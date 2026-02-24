export default function MietenGridSkeleton() {
  return (
    <div className="space-y-10">
      <div className="h-14 rounded-xl bg-zinc-100 animate-pulse" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
            aria-hidden
          >
            <div className="aspect-[4/3] bg-zinc-200 animate-pulse" />
            <div className="space-y-3 p-6">
              <div className="h-6 w-24 rounded bg-amber-100 animate-pulse" />
              <div className="h-5 w-3/4 rounded bg-zinc-200 animate-pulse" />
              <div className="flex flex-wrap gap-4">
                <div className="h-4 w-20 rounded bg-zinc-100 animate-pulse" />
                <div className="h-4 w-16 rounded bg-zinc-100 animate-pulse" />
                <div className="h-4 w-24 rounded bg-zinc-100 animate-pulse" />
              </div>
              <div className="mt-4 h-10 w-full rounded-lg bg-zinc-100 animate-pulse sm:w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
