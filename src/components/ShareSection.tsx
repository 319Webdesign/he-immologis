"use client";

import { Mail } from "lucide-react";

const PLACEHOLDER_URL = "{{url}}";
const PLACEHOLDER_QR_URL = "{{qrCodeUrl}}";
const QR_IMAGE_PATH = "/img/qr-he-immologis.png";

export type ShareSectionDict = {
  heading: string;
  subtitle: string;
  buttonLabel: string;
  mailSubject: string;
  mailBody: string;
};

interface ShareSectionProps {
  dict: ShareSectionDict;
}

const WEBSITE_URL = "https://www.he-immologis.de";

function buildMailtoLink(dict: ShareSectionDict): string {
  if (typeof window === "undefined") return "mailto:?";
  const qrCodeUrl = WEBSITE_URL + QR_IMAGE_PATH;
  const body = dict.mailBody
    .replace(PLACEHOLDER_URL, WEBSITE_URL)
    .replace(PLACEHOLDER_QR_URL, qrCodeUrl);
  const subject = encodeURIComponent(dict.mailSubject);
  const bodyEncoded = encodeURIComponent(body);
  return `mailto:?subject=${subject}&body=${bodyEncoded}`;
}

export default function ShareSection({ dict }: ShareSectionProps) {
  const handleClick = () => {
    const link = buildMailtoLink(dict);
    window.location.href = link;
  };

  return (
    <section
      className="border-t border-slate-200 bg-slate-50/90 px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      aria-labelledby="share-section-heading"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200/80 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
        <h2 id="share-section-heading" className="sr-only">
          {dict.heading}
        </h2>
        <p
          className="text-center text-base font-medium leading-relaxed text-slate-800 sm:text-lg"
          dangerouslySetInnerHTML={{ __html: dict.heading }}
        />
        {dict.subtitle && (
          <p
            className="mt-2 text-center text-sm text-slate-600 sm:text-base"
            dangerouslySetInnerHTML={{ __html: dict.subtitle }}
          />
        )}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B0E5C2] focus:ring-offset-2 active:opacity-95 sm:px-8 sm:py-4 sm:text-base"
            style={{ backgroundColor: "#D3EFDE" }}
            aria-label={dict.buttonLabel}
          >
            <Mail className="h-5 w-5 shrink-0" aria-hidden />
            <span>{dict.buttonLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
