"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const BRAND_BLUE = "#4682B4";

const OBJEKTTYPEN = [
  "Einfamilienhaus",
  "Zweifamilienhaus",
  "Reihenhaus",
  "Mehrfamilienhaus",
  "Wohnung",
  "Grundstück",
  "Gewerbeimmobilie",
  "Gewerbewohnung",
  "Gewerbefläche",
] as const;

const OBJEKTTYPEN_EN = [
  "Single-family house",
  "Two-family house",
  "Terraced house",
  "Multi-family house",
  "Apartment",
  "Plot / land",
  "Commercial property",
  "Commercial residential",
  "Commercial space",
] as const;

const LAGEPRAEFERENZEN = [
  "Ländlich",
  "Dorfkern",
  "Ruhige Wohnlage",
  "Familienfreundliche Wohngegend",
  "Stadtrand",
  "Zentral",
  "Innenstadt / urban",
  "Neubaugebiet",
  "Gewachsene Wohnlage / Altbauumfeld",
  "Naturnah / im Grünen",
  "Aussichtslage / Hanglage",
  "Wasserlage / Nähe zu Gewässer",
  "Gute ÖPNV-Anbindung wichtig",
  "Kurze Wege (Einkauf, Schule, Ärzte)",
  "Egal / offen für Vorschläge",
] as const;

const LAGEPRAEFERENZEN_EN = [
  "Rural",
  "Village centre",
  "Quiet residential area",
  "Family-friendly neighbourhood",
  "Outskirts",
  "Central",
  "Town centre / urban",
  "New development area",
  "Established residential / period building",
  "Close to nature / green",
  "View / hillside location",
  "Waterside / near water",
  "Good public transport important",
  "Short distances (shops, school, doctors)",
  "No preference / open to suggestions",
] as const;

const ANREDEN = ["Herr", "Frau", "Divers"] as const;
const ANREDEN_EN = ["Mr", "Ms", "Diverse"] as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function SearchRequestForm() {
  const pathname = usePathname() ?? "";
  const isEn = pathname.startsWith("/en");
  const [objekttyp, setObjekttyp] = useState("");
  const [lagePraef, setLagePraef] = useState<Set<string>>(new Set());
  const [wohnflaeche, setWohnflaeche] = useState("");
  const [zimmeranzahl, setZimmeranzahl] = useState("");
  const [lageRegion, setLageRegion] = useState("");
  const [weitereWuensche, setWeitereWuensche] = useState("");
  const [anrede, setAnrede] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [strasse, setStrasse] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toggleLage = (value: string) => {
    setLagePraef((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = isEn ? "Email address is required." : "E-Mail-Adresse ist ein Pflichtfeld.";
    else if (!isValidEmail(email)) e.email = isEn ? "Please enter a valid email address." : "Bitte eine gültige E-Mail-Adresse eingeben.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSending(true);
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "search",
          objekttyp,
          lagePraef: Array.from(lagePraef),
          wohnflaeche,
          zimmeranzahl,
          lageRegion,
          weitereWuensche,
          anrede,
          vorname,
          nachname,
          strasse,
          plz,
          ort,
          telefon,
          email,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrors({ email: data.error ?? (isEn ? "Sending failed." : "Senden fehlgeschlagen.") });
        setIsSending(false);
        return;
      }
      setIsSubmitted(true);
    } catch {
      setErrors({ email: isEn ? "Connection error. Please try again later." : "Verbindungsfehler. Bitte später erneut versuchen." });
    } finally {
      setIsSending(false);
    }
  };

  const inputBase =
    "mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#4682B4] focus:ring-1 focus:ring-[#4682B4]/30";
  const labelBase = "block text-sm font-medium text-slate-700";

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm sm:p-16">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${BRAND_BLUE}20` }}
        >
          <svg className="h-8 w-8" style={{ color: BRAND_BLUE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 font-sans text-xl font-semibold text-slate-800">
          {isEn ? "Search request received" : "Suchauftrag erhalten"}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          {isEn ? "We will get in touch as soon as a property matches your criteria." : "Wir melden uns umgehend, sobald ein Objekt zu Ihren Kriterien passt."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      {/* Suchkriterien */}
      <div>
        <h3 className="font-sans text-lg font-semibold text-slate-800">
          {isEn ? "Search criteria" : "Suchkriterien"}
        </h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="objekttyp" className={labelBase}>
              {isEn ? "What are you looking for?" : "Was suchen Sie?"}
            </label>
            <select
              id="objekttyp"
              value={objekttyp}
              onChange={(e) => setObjekttyp(e.target.value)}
              className={inputBase}
            >
              <option value="">{isEn ? "Please select" : "Bitte wählen"}</option>
              {(isEn ? OBJEKTTYPEN_EN : OBJEKTTYPEN).map((o, i) => (
                <option key={o} value={isEn ? OBJEKTTYPEN[i] : o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <span className={labelBase}>
            {isEn ? "Location preference (multiple selection possible)" : "Lagepräferenz (Mehrfachauswahl möglich)"}
          </span>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {(isEn ? LAGEPRAEFERENZEN_EN : LAGEPRAEFERENZEN).map((opt, i) => {
              const value = isEn ? LAGEPRAEFERENZEN[i] : opt;
              return (
                <label key={value} className="flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pr-2 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={lagePraef.has(value)}
                    onChange={() => toggleLage(value)}
                    className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#4682B4] focus:ring-[#4682B4]"
                  />
                  <span className="text-sm text-slate-700 lg:whitespace-nowrap">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="wohnflaeche" className={labelBase}>
              {isEn ? "Living area (approx. m²)" : "Wohnfläche (ca. in m²)"}
            </label>
            <input
              id="wohnflaeche"
              type="text"
              inputMode="numeric"
              value={wohnflaeche}
              onChange={(e) => setWohnflaeche(e.target.value)}
              className={inputBase}
              placeholder={isEn ? "e.g. 120" : "z. B. 120"}
            />
          </div>
          <div>
            <label htmlFor="zimmeranzahl" className={labelBase}>
              {isEn ? "Number of rooms" : "Zimmeranzahl"}
            </label>
            <input
              id="zimmeranzahl"
              type="text"
              value={zimmeranzahl}
              onChange={(e) => setZimmeranzahl(e.target.value)}
              className={inputBase}
              placeholder={isEn ? "e.g. 3–4" : "z. B. 3–4"}
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="lageRegion" className={labelBase}>
            {isEn ? "Preferred location / region" : "Bevorzugte Lage / Region"}
          </label>
          <textarea
            id="lageRegion"
            rows={3}
            value={lageRegion}
            onChange={(e) => setLageRegion(e.target.value)}
            className={inputBase}
            placeholder={isEn ? "Town, region or area – range from/to also possible" : "Ort, Region oder Umkreis – gerne auch von/bis"}
          />
        </div>

        <div className="mt-6">
          <label htmlFor="weitereWuensche" className={labelBase}>
            {isEn ? "Further requirements or criteria" : "Weitere Wünsche oder Kriterien"}
          </label>
          <textarea
            id="weitereWuensche"
            rows={4}
            value={weitereWuensche}
            onChange={(e) => setWeitereWuensche(e.target.value)}
            className={inputBase}
            placeholder={isEn ? "e.g. garden, balcony, parking, accessibility, investment property" : "z. B. Garten, Balkon, Stellplatz, Barrierefreiheit, Renditeobjekt"}
          />
        </div>
      </div>

      {/* Kontaktdaten */}
      <div className="mt-10 border-t border-slate-200 pt-10">
        <h3 className="font-sans text-lg font-semibold text-slate-800">
          {isEn ? "Your contact details" : "Ihre Kontaktdaten"}
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="anrede" className={labelBase}>
              {isEn ? "Title" : "Anrede"}
            </label>
            <select
              id="anrede"
              value={anrede}
              onChange={(e) => setAnrede(e.target.value)}
              className={inputBase}
            >
              <option value="">{isEn ? "Please select" : "Bitte wählen"}</option>
              {(isEn ? ANREDEN_EN : ANREDEN).map((a, i) => (
                <option key={a} value={isEn ? ANREDEN[i] : a}>{a}</option>
              ))}
            </select>
          </div>
          <div />
          <div>
            <label htmlFor="vorname" className={labelBase}>{isEn ? "First name" : "Vorname"}</label>
            <input
              id="vorname"
              type="text"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="nachname" className={labelBase}>{isEn ? "Last name" : "Nachname"}</label>
            <input
              id="nachname"
              type="text"
              value={nachname}
              onChange={(e) => setNachname(e.target.value)}
              className={inputBase}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="strasse" className={labelBase}>{isEn ? "Street and number" : "Straße und Hausnummer"}</label>
            <input
              id="strasse"
              type="text"
              value={strasse}
              onChange={(e) => setStrasse(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="plz" className={labelBase}>{isEn ? "Postal code" : "Postleitzahl"}</label>
            <input
              id="plz"
              type="text"
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
              className={inputBase}
              placeholder={isEn ? "ZIP" : "PLZ"}
            />
          </div>
          <div>
            <label htmlFor="ort" className={labelBase}>{isEn ? "City" : "Ort"}</label>
            <input
              id="ort"
              type="text"
              value={ort}
              onChange={(e) => setOrt(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="telefon" className={labelBase}>{isEn ? "Phone number" : "Telefonnummer"}</label>
            <input
              id="telefon"
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelBase}>{isEn ? "Email address" : "E-Mail-Adresse"} <span className="text-red-500">*</span></label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputBase + (errors.email ? " border-red-400" : "")}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded-lg px-6 py-4 text-base font-semibold text-white transition-colors hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2 disabled:opacity-70 sm:w-auto sm:min-w-[220px]"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          {isSending ? (isEn ? "Sending…" : "Wird gesendet…") : (isEn ? "Submit search request" : "Suchauftrag absenden")}
        </button>
        <p className="mt-3 text-center text-sm text-slate-500">
          {isEn ? "We will treat your details in strict confidence." : "Wir behandeln Ihre Angaben selbstverständlich vertraulich."}
        </p>
      </div>
    </form>
  );
}
