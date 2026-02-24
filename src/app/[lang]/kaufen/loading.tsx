export default function KaufenLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-14 rounded-xl bg-zinc-100 animate-pulse" />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
            aria-hidden
          >
            <div className="aspect-[4/3] bg-zinc-200 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-6 bg-zinc-200 rounded w-3/4 animate-pulse" />
              <div className="flex flex-wrap gap-4">
                <div className="h-4 bg-zinc-100 rounded w-24 animate-pulse" />
                <div className="h-4 bg-zinc-100 rounded w-16 animate-pulse" />
              </div>
              <div className="h-6 bg-amber-100 rounded w-28 animate-pulse mt-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
