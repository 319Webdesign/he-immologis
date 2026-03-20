"use client";

import { ArrowRight, Home } from "lucide-react";

const SECTION_BG = "#85b09a";
const BUTTON_BG = "#F9423A";

type FinalCTADict = {
  title: string;
  description: string;
  buttonText: string;
  callText: string;
};

export default function FinalCTA({ dict }: { dict: FinalCTADict }) {
  const scrollToForm = () => {
    const el = document.getElementById("anfrage-formular");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      style={{ backgroundColor: SECTION_BG }}
      aria-labelledby="final-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
        aria-hidden
      >
        <Home className="h-[min(50vw,320px)] w-[min(50vw,320px)] text-white" strokeWidth={0.75} />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2
          id="final-cta-heading"
          className="font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl"
        >
          {dict.title}
        </h2>
        <p
          className="mt-3 text-base leading-relaxed text-white/95 sm:text-lg"
          dangerouslySetInnerHTML={{ __html: dict.description }}
        />

        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={scrollToForm}
            className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:opacity-95 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#85b09a]"
            style={{ backgroundColor: BUTTON_BG }}
          >
            {dict.buttonText}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <p className="text-sm text-white/90">
            {dict.callText}{" "}
            <a
              href="tel:+491776361394"
              className="font-bold no-underline"
              style={{ color: "#F9423A" }}
            >
              +49 177 636 1394
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
