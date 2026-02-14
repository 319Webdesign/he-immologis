import Hero from "@/components/Hero";
import LocalPresence from "@/components/LocalPresence";
import PhilosophyAlternative from "@/components/PhilosophyAlternative";
import ValueBanner from "@/components/ValueBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueBanner />
      <LocalPresence />
      <PhilosophyAlternative />
    </>
  );
}
