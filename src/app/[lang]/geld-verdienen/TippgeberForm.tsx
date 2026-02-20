"use client";

import { useState } from "react";
import { Info, Send } from "lucide-react";

const BRAND_BLUE = "#4682B4";

export default function TippgeberForm() {
  const [formState, setFormState] = useState({
    nameTippgeber: "",
    email: "",
    phone: "",
    nameEmpfohlen: "",
    immobilienArt: "",
    lage: "",
    sonstiges: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tippgeber-Formular:", formState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    "mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/20 focus:outline-none";

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

        <div
          className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3"
          style={{ borderColor: `${BRAND_BLUE}30` }}
        >
          <Info className="h-5 w-5 shrink-0 mt-0.5" style={{ color: BRAND_BLUE }} />
          <p className="text-sm text-slate-700">
            Diskretion garantiert. Wir prüfen Ihren Tipp innerhalb von 24 Stunden.
          </p>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          <Send className="h-5 w-5" />
          Tipp jetzt sicher einreichen
        </button>
        <p className="text-center text-sm text-slate-600">
          Mit dem Absenden bestätigen Sie, dass Sie die Tippgeber-Bedingungen (siehe Download oben)
          zur Kenntnis genommen haben.
        </p>
      </form>
    </div>
  );
}
