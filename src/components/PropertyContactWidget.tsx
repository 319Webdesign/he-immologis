import { Mail } from "lucide-react";

const CONTACT = {
  name: "Holger Eberhard",
  role: "Ihr persönlicher Immobilienexperte in Hessen",
  mail: "h.eberhard@immologis.de",
};

export function PropertyContactWidget({
  propertyTitle,
  subjectPrefix = "Anfrage",
}: {
  propertyTitle?: string;
  subjectPrefix?: string;
}) {
  const subject = propertyTitle
    ? `${subjectPrefix}: ${propertyTitle}`
    : "Immobilienanfrage";
  const mailto = `mailto:${CONTACT.mail}?subject=${encodeURIComponent(subject)}`;
  const initials = CONTACT.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-100 text-xl font-semibold text-amber-800">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-zinc-900">{CONTACT.name}</p>
          <p className="mt-0.5 text-sm text-zinc-600">{CONTACT.role}</p>
          <a
            href={mailto}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <Mail className="h-4 w-4" />
            E-Mail schreiben
          </a>
        </div>
      </div>
    </div>
  );
}
