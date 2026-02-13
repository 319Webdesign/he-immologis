import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Kurzer Footer-Bereich */}
      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500 sm:px-6">
          <p>HE immologis UG · Weinheim · Bergstraße</p>
        </div>
      </footer>
    </>
  );
}
