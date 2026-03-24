import Image from "next/image";
import { FileText } from "lucide-react";

const CONTACT = {
  name: "Holger Eberhard",
  imageSrc: "/img/Holger73.jpg",
};

export type PropertyContactDict = {
  managingDirector: string;
  tagline: string;
  requestDetails: string;
};

export function PropertyContactWidget({
  propertyTitle,
  subjectPrefix = "Anfrage",
  dict,
}: {
  propertyTitle?: string;
  subjectPrefix?: string;
  dict?: PropertyContactDict;
}) {
  const role = dict?.managingDirector ?? "Geschäftsführer";
  const tagline = dict?.tagline ?? "Verlässlich an Ihrer Seite.";
  const requestDetails = dict?.requestDetails ?? "Details anfordern";
  return (
    <div className="p-6">
      <div className="flex items-start gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-24 sm:w-24">
          <Image
            src={CONTACT.imageSrc}
            alt="Holger Eberhard – Immobilienmakler Weinheim und Rhein-Neckar – HE-immologis"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80px, 96px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-zinc-900">{CONTACT.name}</p>
          <p className="mt-1 text-base text-zinc-600">{role}</p>
          <p className="mt-0.5 text-base text-zinc-600">{tagline}</p>
          <div className="mt-4">
            <a
              href="#expose-anfordern"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#F9423A" }}
            >
              <FileText className="h-3.5 w-3.5" />
              {requestDetails}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
