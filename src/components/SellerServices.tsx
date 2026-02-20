import Link from "next/link";
import {
  BarChart3,
  Camera,
  FileText,
  UserCheck,
  Gavel,
  Handshake,
  type LucideIcon,
} from "lucide-react";

const BRAND_BLUE = "#3d6d99";
const STEELBLUE = "#4682B4";

const ICONS: LucideIcon[] = [
  BarChart3,
  Camera,
  FileText,
  UserCheck,
  Gavel,
  Handshake,
];

type SellerServicesDict = {
  heading: string;
  subheading: string;
  buttonText: string;
  services: { title: string; text: string }[];
};

export default function SellerServices({
  dict,
  lang,
}: {
  dict: SellerServicesDict;
  lang: string;
}) {
  const prefix = `/${lang}`;
  return (
    <section
      className="border-t border-slate-200/80 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="seller-services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="seller-services-heading"
          className="text-center font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
        >
          {dict.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          {dict.subheading}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dict.services.map((service, i) => {
            const Icon = ICONS[i] ?? BarChart3;
            return (
              <div
                key={service.title}
                className="flex min-h-[200px] flex-col rounded-xl p-6 text-white shadow-md transition-shadow duration-200 hover:shadow-lg"
                style={{ backgroundColor: STEELBLUE }}
              >
                <div
                  className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center text-white"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 min-h-[2.75rem] flex-1 text-sm leading-relaxed text-white/90">
                  {service.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={`${prefix}/immobilien-services`}
            className="inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-semibold text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#3d6d99]/40 focus:ring-offset-2"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            {dict.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
