import { Check } from "lucide-react";

interface ListingSuccessBannerProps {
  label: string;
  /** overlay: Balken über dem Bild. inline: eigener Balken unter dem Titel. */
  variant?: "overlay" | "inline";
}

export function ListingSuccessBanner({ label, variant = "overlay" }: ListingSuccessBannerProps) {
  if (variant === "inline") {
    return (
      <p className="mt-4 inline-flex max-w-full items-center gap-2 rounded-lg bg-[#F9423A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm sm:text-base">
        <Check className="h-4 w-4 shrink-0" aria-hidden />
        <span>{label}</span>
      </p>
    );
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-2 bg-[#F9423A]/95 px-3 py-2 text-center text-xs font-semibold tracking-wide text-white shadow-[0_-6px_16px_rgba(0,0,0,0.18)] sm:py-2.5 sm:text-sm">
      <Check className="h-4 w-4 shrink-0" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
