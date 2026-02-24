"use client";

import { useState } from "react";
import Link from "next/link";

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

export type SellFormDict = {
  sectionPersonal: string;
  sectionObject: string;
  sectionProperty: string;
  sectionAdditional: string;
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  immobilienTypen: string[];
  zustaende: string[];
  errors: { emailRequired: string; emailInvalid: string; agbRequired: string };
  successTitle: string;
  successMessage: string;
  agbLabelPrefix: string;
  agbLabelSuffix: string;
  agbLinkText: string;
  submitButton: string;
};

interface SellFormProps {
  dict: SellFormDict;
  lang: string;
  initialObjekttypIndex?: number;
  initialZustandIndex?: number;
}

export default function SellForm({
  dict,
  lang,
  initialObjekttypIndex,
  initialZustandIndex,
}: SellFormProps) {
  const typen = dict.immobilienTypen;
  const zustaende = dict.zustaende;
  const initialTyp =
    initialObjekttypIndex != null && typen[initialObjekttypIndex] != null
      ? typen[initialObjekttypIndex]
      : "";
  const initialZustand =
    initialZustandIndex != null && zustaende[initialZustandIndex] != null
      ? zustaende[initialZustandIndex]
      : "";

  const [formData, setFormData] = useState<FormData>({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    immobilientyp: initialTyp,
    baujahr: "",
    zustand: initialZustand,
    nachricht: "",
    agbAkzeptiert: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
      newErrors.email = dict.errors.emailRequired;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = dict.errors.emailInvalid;
    }

    if (!formData.agbAkzeptiert) {
      newErrors.agbAkzeptiert = dict.errors.agbRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSending(true);
    try {
      const payload = {
        type: "sell" as const,
        name: [formData.vorname, formData.nachname].filter(Boolean).join(" ").trim() || formData.email,
        ...formData,
      };
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrors({ email: data.error ?? dict.errors.emailRequired });
        setIsSending(false);
        return;
      }
      setIsSubmitted(true);
    } catch {
      setErrors({ email: "Verbindungsfehler. Bitte später erneut versuchen." });
    } finally {
      setIsSending(false);
    }
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

  const p = dict.placeholders;
  const l = dict.labels;
  const prefix = `/${lang}`;

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
          {dict.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          {dict.successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            {dict.sectionPersonal}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="vorname" name="vorname" label={l.vorname}>
              <input
                type="text"
                id="vorname"
                name="vorname"
                value={formData.vorname}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.vorname}
              />
            </Field>
            <Field id="nachname" name="nachname" label={l.nachname}>
              <input
                type="text"
                id="nachname"
                name="nachname"
                value={formData.nachname}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.nachname}
              />
            </Field>
            <Field id="email" name="email" label={l.email} required error={errors.email}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputBase} ${errors.email ? inputError : ""}`}
                placeholder={p.email}
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field id="telefon" name="telefon" label={l.telefon}>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.telefon}
              />
            </Field>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            {dict.sectionObject}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="strasse" name="strasse" label={l.strasse}>
              <input
                type="text"
                id="strasse"
                name="strasse"
                value={formData.strasse}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.strasse}
              />
            </Field>
            <Field id="hausnummer" name="hausnummer" label={l.hausnummer}>
              <input
                type="text"
                id="hausnummer"
                name="hausnummer"
                value={formData.hausnummer}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.hausnummer}
              />
            </Field>
            <Field id="plz" name="plz" label={l.plz}>
              <input
                type="text"
                id="plz"
                name="plz"
                value={formData.plz}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.plz}
              />
            </Field>
            <Field id="ort" name="ort" label={l.ort}>
              <input
                type="text"
                id="ort"
                name="ort"
                value={formData.ort}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.ort}
              />
            </Field>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            {dict.sectionProperty}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="immobilientyp" name="immobilientyp" label={l.immobilientyp}>
              <select
                id="immobilientyp"
                name="immobilientyp"
                value={formData.immobilientyp}
                onChange={handleChange}
                className={inputBase}
              >
                <option value="">{p.pleaseChoose}</option>
                {dict.immobilienTypen.map((typ) => (
                  <option key={typ} value={typ}>
                    {typ}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="baujahr" name="baujahr" label={l.baujahr}>
              <input
                type="number"
                id="baujahr"
                name="baujahr"
                value={formData.baujahr}
                onChange={handleChange}
                className={inputBase}
                placeholder={p.baujahr}
                min={1800}
                max={new Date().getFullYear() + 1}
              />
            </Field>
            <Field id="zustand" name="zustand" label={l.zustand}>
              <select
                id="zustand"
                name="zustand"
                value={formData.zustand}
                onChange={handleChange}
                className={inputBase}
              >
                <option value="">{p.pleaseChoose}</option>
                {dict.zustaende.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            {dict.sectionAdditional}
          </h3>
          <Field id="nachricht" name="nachricht" label={l.nachricht}>
            <textarea
              id="nachricht"
              name="nachricht"
              rows={6}
              value={formData.nachricht}
              onChange={handleChange}
              className={`${inputBase} min-h-[140px] resize-y`}
              placeholder={p.nachricht}
            />
          </Field>
        </div>

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
              <label htmlFor="agbAkzeptiert" className="text-sm text-slate-700">
                {dict.agbLabelPrefix}
                <Link
                  href={`${prefix}/agb`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d6d99] underline hover:opacity-80"
                >
                  {dict.agbLinkText}
                </Link>
                {dict.agbLabelSuffix}
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
            disabled={isSending}
            className="w-full rounded-lg px-6 py-4 text-base font-semibold text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#3d6d99]/40 focus:ring-offset-2 disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
            style={{ backgroundColor: "#3d6d99" }}
          >
            {isSending ? "Wird gesendet…" : dict.submitButton}
          </button>
        </div>
      </form>
    </div>
  );
}
