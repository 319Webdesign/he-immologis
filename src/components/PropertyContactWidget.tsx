import Image from "next/image";
import { FileText } from "lucide-react";

const CONTACT = {
  name: "Holger Eberhard",
  role: "Ihr persönlicher Immobilienexperte in Hessen",
  imageSrc: "/img/holger.jpeg",
};

export function PropertyContactWidget({
  propertyTitle,
  subjectPrefix = "Anfrage",
}: {
  propertyTitle?: string;
  subjectPrefix?: string;
}) {
  return (
    <div className="p-6">
      <div className="flex items-start gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-zinc-100">
          <Image
            src={CONTACT.imageSrc}
            alt={CONTACT.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-zinc-900">{CONTACT.name}</p>
          <p className="mt-1 text-base text-zinc-600">{CONTACT.role}</p>
          <a
            href="#expose-anfordern"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#FF6600] px-5 py-2.5 text-base font-medium text-white transition hover:bg-[#e55a00]"
          >
            <FileText className="h-4 w-4" />
            Details anfordern
          </a>
        </div>
      </div>
    </div>
  );
}
