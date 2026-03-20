"use client";

import { useState } from "react";
import { Info, Send } from "lucide-react";

const BRAND_BLUE = "#F9423A";

export default function TippgeberForm() {
  const [formState, setFormState] = useState({
    nameTippgeber: "",
    email: "",
    phone: "",
    nameEmpfohlen: "",
    immobilienArt: "",
    lage: "",
    sonstiges: "",
    donatePremium: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "tippgeber", ...formState }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error ?? "Beim Senden ist ein Fehler aufgetreten.");
        return;
      }
      setStatus("success");
      setFormState({
        nameTippgeber: "",
        email: "",
        phone: "",
        nameEmpfohlen: "",
        immobilienArt: "",
        lage: "",
        sonstiges: "",
        donatePremium: false,
      });
    } catch {
      setStatus("error");
      setErrorMessage("Verbindungsfehler. Bitte später erneut versuchen.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormState((prev) => ({ ...prev, [target.name]: value }));
  };

  const inputClass =
    "mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#F9423A] focus:ring-2 focus:ring-[#F9423A]/20 focus:outline-none";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="nameTippgeber" className="block text-sm font-medium text-slate-700">
            Name des Tippgebers *
          </label>
          <input
            type="text"
            id="nameTippgeber"
            name="nameTippgeber"
            required
            value={formState.nameTippgeber}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ihr Name"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="ihre@email.de"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="+49 123 456789"
            />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Angaben zur empfohlenen Person & Immobilie
          </p>
          <div className="space-y-5">
            <div>
              <label htmlFor="nameEmpfohlen" className="block text-sm font-medium text-slate-600">
                Name der empfohlenen Person (optional)
              </label>
              <input
                type="text"
                id="nameEmpfohlen"
                name="nameEmpfohlen"
                value={formState.nameEmpfohlen}
                onChange={handleChange}
                className={inputClass}
                placeholder="Name des potenziellen Verkäufers"
              />
            </div>
            <div>
              <label htmlFor="immobilienArt" className="block text-sm font-medium text-slate-600">
                Art der Immobilie *
              </label>
              <select
                id="immobilienArt"
                name="immobilienArt"
                required
                value={formState.immobilienArt}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Bitte wählen</option>
                <option value="wohnung">Wohnung</option>
                <option value="haus">Haus / Einfamilienhaus</option>
                <option value="gewerbe">Gewerbe / Büro</option>
                <option value="grundstueck">Grundstück</option>
                <option value="sonstige">Sonstige</option>
              </select>
            </div>
            <div>
              <label htmlFor="lage" className="block text-sm font-medium text-slate-600">
                Lage / Ort *
              </label>
              <input
                type="text"
                id="lage"
                name="lage"
                required
                value={formState.lage}
                onChange={handleChange}
                className={inputClass}
                placeholder="z. B. Weinheim, Bergstraße, Ortsteil"
              />
            </div>
            <div>
              <label htmlFor="sonstiges" className="block text-sm font-medium text-slate-600">
                Weitere Infos (optional)
              </label>
              <textarea
                id="sonstiges"
                name="sonstiges"
                rows={3}
                value={formState.sonstiges}
                onChange={handleChange}
                className={inputClass}
                placeholder="Weitere Angaben zur Immobilie oder zum Verkäufer"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="donatePremium"
            name="donatePremium"
            checked={formState.donatePremium}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#F9423A] focus:ring-[#F9423A]"
          />
          <label htmlFor="donatePremium" className="text-sm text-slate-700">
            Ich möchte auf meine Prämie verzichten und den Betrag für ein regionales Projekt spenden.
          </label>
        </div>

        <div
          className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3"
          style={{ borderColor: `${BRAND_BLUE}30` }}
        >
          <Info className="h-5 w-5 shrink-0 mt-0.5" style={{ color: BRAND_BLUE }} />
          <p className="text-sm text-slate-700">
            Diskretion garantiert. Wir prüfen Ihren Tipp innerhalb von 24 Stunden.
          </p>
        </div>
        {status === "success" && (
          <div
            className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-800"
            dangerouslySetInnerHTML={{
              __html: "Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb der nächsten 24 Stunden bei Ihnen.<br>Ihr<br>Holger Eberhard",
            }}
          />
        )}
        {status === "error" && errorMessage && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F9423A] focus:ring-offset-2 disabled:opacity-70"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          <Send className="h-5 w-5" />
          {status === "sending" ? "Wird gesendet…" : "Tipp jetzt sicher einreichen"}
        </button>
        <p className="text-center text-sm text-slate-600">
          Mit dem Absenden bestätigen Sie, dass Sie die Tippgeber-Bedingungen (siehe Download oben)
          zur Kenntnis genommen haben.
        </p>
      </form>
    </div>
  );
}
