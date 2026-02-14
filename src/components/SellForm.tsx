"use client";

import { useState } from "react";

const IMMOBILIEN_TYPEN = [
  "Einfamilienhaus",
  "Reihenhaus",
  "Doppelhaushälfte",
  "Mehrfamilienhaus",
  "Eigentumswohnung",
  "Grundstück",
  "Gewerbeimmobilie",
  "Gewerbe / Wohnen",
] as const;

const ZUSTAENDE = [
  "gepflegt",
  "renoviert / modernisiert",
  "kernsaniert",
  "renovierungsbedürftig",
  "sanierungsbedürftig",
] as const;

interface FormData {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  immobilientyp: string;
  baujahr: string;
  zustand: string;
  nachricht: string;
  agbAkzeptiert: boolean;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export default function SellForm() {
  const [formData, setFormData] = useState<FormData>({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    immobilientyp: "",
    baujahr: "",
    zustand: "",
    nachricht: "",
    agbAkzeptiert: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
    if (errors[target.name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [target.name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = "E-Mail-Adresse ist ein Pflichtfeld.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (!formData.agbAkzeptiert) {
      newErrors.agbAkzeptiert =
        "Bitte akzeptieren Sie die AGB, um die Anfrage zu senden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Hier könnte die Formularverarbeitung (z.B. API-Call) erfolgen
    console.log("Verkaufsanfrage:", formData);
    setIsSubmitted(true);
  };

  const inputBase =
    "mt-2 block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#3d6d99] focus:ring-1 focus:ring-[#3d6d99]/30";
  const inputError = "border-red-400 focus:border-red-500 focus:ring-red-500/30";

  const Field = ({
    id,
    name,
    label,
    required,
    error,
    children,
    className = "",
  }: {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm sm:p-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3d6d99]/10">
          <svg
            className="h-8 w-8 text-[#3d6d99]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-6 font-sans text-xl font-semibold text-slate-800">
          Vielen Dank für Ihre Anfrage
        </h3>
        <p className="mt-3 max-w-md mx-auto text-slate-600">
          Holger Eberhard wird sich zeitnah bei Ihnen melden.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Gruppe 1: Persönliche Daten */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Persönliche Daten
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="vorname"
              name="vorname"
              label="Vorname"
            >
              <input
                type="text"
                id="vorname"
                name="vorname"
                value={formData.vorname}
                onChange={handleChange}
                className={inputBase}
                placeholder="Max"
              />
            </Field>
            <Field
              id="nachname"
              name="nachname"
              label="Nachname"
            >
              <input
                type="text"
                id="nachname"
                name="nachname"
                value={formData.nachname}
                onChange={handleChange}
                className={inputBase}
                placeholder="Mustermann"
              />
            </Field>
            <Field
              id="email"
              name="email"
              label="E-Mail-Adresse"
              required
              error={errors.email}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputBase} ${errors.email ? inputError : ""}`}
                placeholder="ihre@email.de"
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field
              id="telefon"
              name="telefon"
              label="Telefonnummer"
            >
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                className={inputBase}
                placeholder="+49 123 456789"
              />
            </Field>
          </div>
        </div>

        {/* Gruppe 2: Objektdaten (Adresse) */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Objektdaten (Adresse)
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="strasse"
              name="strasse"
              label="Straße"
            >
              <input
                type="text"
                id="strasse"
                name="strasse"
                value={formData.strasse}
                onChange={handleChange}
                className={inputBase}
                placeholder="Bergstraße"
              />
            </Field>
            <Field
              id="hausnummer"
              name="hausnummer"
              label="Hausnummer"
            >
              <input
                type="text"
                id="hausnummer"
                name="hausnummer"
                value={formData.hausnummer}
                onChange={handleChange}
                className={inputBase}
                placeholder="42"
              />
            </Field>
            <Field
              id="plz"
              name="plz"
              label="Postleitzahl"
            >
              <input
                type="text"
                id="plz"
                name="plz"
                value={formData.plz}
                onChange={handleChange}
                className={inputBase}
                placeholder="69469"
              />
            </Field>
            <Field
              id="ort"
              name="ort"
              label="Ort"
            >
              <input
                type="text"
                id="ort"
                name="ort"
                value={formData.ort}
                onChange={handleChange}
                className={inputBase}
                placeholder="Weinheim"
              />
            </Field>
          </div>
        </div>

        {/* Gruppe 3: Immobiliendetails */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Immobiliendetails
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="immobilientyp"
              name="immobilientyp"
              label="Immobilientyp"
            >
              <select
                id="immobilientyp"
                name="immobilientyp"
                value={formData.immobilientyp}
                onChange={handleChange}
                className={inputBase}
              >
                <option value="">Bitte wählen</option>
                {IMMOBILIEN_TYPEN.map((typ) => (
                  <option key={typ} value={typ}>
                    {typ}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              id="baujahr"
              name="baujahr"
              label="Baujahr Immobilie"
            >
              <input
                type="number"
                id="baujahr"
                name="baujahr"
                value={formData.baujahr}
                onChange={handleChange}
                className={inputBase}
                placeholder="1985"
                min={1800}
                max={new Date().getFullYear() + 1}
              />
            </Field>
            <Field
              id="zustand"
              name="zustand"
              label="Zustand Ihrer Immobilie"
            >
              <select
                id="zustand"
                name="zustand"
                value={formData.zustand}
                onChange={handleChange}
                className={inputBase}
              >
                <option value="">Bitte wählen</option>
                {ZUSTAENDE.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        {/* Gruppe 4: Zusatzinformationen */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Zusatzinformationen
          </h3>
          <Field
            id="nachricht"
            name="nachricht"
            label="Erste Informationen zur Immobilie / Nachricht an uns"
          >
            <textarea
              id="nachricht"
              name="nachricht"
              rows={6}
              value={formData.nachricht}
              onChange={handleChange}
              className={`${inputBase} resize-y min-h-[140px]`}
              placeholder="Beschreiben Sie Ihre Immobilie kurz oder teilen Sie uns weitere Wünsche mit..."
            />
          </Field>
        </div>

        {/* AGB-Checkbox */}
        <div className="pt-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agbAkzeptiert"
                name="agbAkzeptiert"
                checked={formData.agbAkzeptiert}
                onChange={handleChange}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-[#3d6d99] focus:ring-[#3d6d99]/30"
                aria-invalid={!!errors.agbAkzeptiert}
              />
              <label
                htmlFor="agbAkzeptiert"
                className="text-sm text-slate-700"
              >
                Ich habe die{" "}
                <a
                  href="/agb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d6d99] underline hover:opacity-80"
                >
                  AGB
                </a>{" "}
                gelesen und akzeptiere diese. <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
          {errors.agbAkzeptiert && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.agbAkzeptiert}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-lg px-6 py-4 text-base font-semibold text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#3d6d99]/40 focus:ring-offset-2 sm:w-auto sm:min-w-[200px]"
            style={{ backgroundColor: "#3d6d99" }}
          >
            Anfrage senden
          </button>
        </div>
      </form>
    </div>
  );
}
