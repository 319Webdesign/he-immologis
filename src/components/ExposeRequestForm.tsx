"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export type ExposeRequestDict = {
  intro?: string;
  successTitle?: string;
  successMessage?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  zip?: string;
  city?: string;
  email?: string;
  phone?: string;
  privacyPrefix?: string;
  privacyLink?: string;
  privacySuffix?: string;
  submitButton?: string;
  sending?: string;
  popupTitle?: string;
  widerrufsverzicht?: string;
  popupIntro?: string;
  popupWiderrufsbelehrung?: string;
  widerrufsbelehrung?: string;
  popupWiderrufsbelehrungSuffix?: string;
  popupAusfuehrungPrefix?: string;
  widerrufsfrist?: string;
  popupAusfuehrungSuffix?: string;
  popupVerlustPrefix?: string;
  widerrufsrecht?: string;
  popupVerlustSuffix?: string;
  cancel?: string;
  confirmSend?: string;
  close?: string;
  errFirstName?: string;
  errLastName?: string;
  errStreet?: string;
  errZip?: string;
  errCity?: string;
  errEmail?: string;
  errEmailInvalid?: string;
  errPhone?: string;
  errPhoneInvalid?: string;
  errPrivacy?: string;
  errWiderrufsbelehrung?: string;
  errAusfuehrung?: string;
  errVerlust?: string;
  errSend?: string;
  errConnection?: string;
};

interface ExposeRequestFormProps {
  /** Objekt-Nr oder ID für die Anzeige (z. B. onOffice-Id oder statische ImmoNr) */
  objectNumber: string;
  /** Optional: onOffice-Estate-ID für die API */
  estateId?: number | string;
  /** Objekttitel für E-Mail/Anfrage */
  propertyTitle?: string;
  /** Intro-Text nicht anzeigen, wenn die Sektion ihn bereits rendert */
  hideIntro?: boolean;
  /** Sprachcode für Links (z. B. datenschutz) und onOffice remaxAgentLanguages */
  locale?: string;
  /** Kaufen / Mieten → ArtDaten in onOffice */
  section?: "kaufen" | "mieten";
  /** Weiße Labels für dunklen Hintergrund (z. B. Steel Blue) */
  lightLabels?: boolean;
  /** Übersetzungen für EN/TR */
  dict?: ExposeRequestDict;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone: string): boolean {
  return phone.trim().length >= 5;
}

export function ExposeRequestForm({
  objectNumber,
  estateId,
  propertyTitle,
  hideIntro = false,
  locale = "de",
  section = "kaufen",
  lightLabels = false,
  dict,
}: ExposeRequestFormProps) {
  const t = (key: keyof ExposeRequestDict, fallback: string) => dict?.[key] ?? fallback;
  const [formState, setFormState] = useState({
    vorname: "",
    name: "",
    strasse: "",
    plz: "",
    ort: "",
    email: "",
    telefon: "",
    datenschutz: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = useCallback(() => {
    const v = formState;
    return (
      v.vorname.trim() !== "" &&
      v.name.trim() !== "" &&
      v.strasse.trim() !== "" &&
      v.plz.trim() !== "" &&
      v.ort.trim() !== "" &&
      validateEmail(v.email) &&
      validatePhone(v.telefon) &&
      v.datenschutz
    );
  }, [formState]);

  const runValidation = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const v = formState;

    if (!v.vorname.trim())
      newErrors.vorname = t("errFirstName", "Vorname ist ein Pflichtfeld.");
    if (!v.name.trim()) newErrors.name = t("errLastName", "Name ist ein Pflichtfeld.");
    if (!v.strasse.trim())
      newErrors.strasse = t("errStreet", "Straße ist ein Pflichtfeld.");
    if (!v.plz.trim()) newErrors.plz = t("errZip", "PLZ ist ein Pflichtfeld.");
    if (!v.ort.trim()) newErrors.ort = t("errCity", "Ort ist ein Pflichtfeld.");
    if (!v.email.trim())
      newErrors.email = t("errEmail", "E-Mail-Adresse ist ein Pflichtfeld.");
    else if (!validateEmail(v.email))
      newErrors.email = t("errEmailInvalid", "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    if (!v.telefon.trim())
      newErrors.telefon = t("errPhone", "Telefonnummer ist ein Pflichtfeld.");
    else if (!validatePhone(v.telefon))
      newErrors.telefon = t("errPhoneInvalid", "Bitte geben Sie eine gültige Telefonnummer ein (mind. 5 Zeichen).");
    if (!v.datenschutz)
      newErrors.datenschutz = t("errPrivacy", "Bitte bestätigen Sie, dass Sie die Datenschutzerklärung zur Kenntnis genommen haben.");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState, dict]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const doSubmit = useCallback(async () => {
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/expose-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vorname: formState.vorname.trim(),
          name: formState.name.trim(),
          strasse: formState.strasse.trim(),
          plz: formState.plz.trim(),
          ort: formState.ort.trim(),
          email: formState.email.trim(),
          telefon: formState.telefon.trim(),
          objectNumber,
          estateId: estateId != null ? String(estateId) : undefined,
          propertyTitle: propertyTitle ?? undefined,
          websiteLocale: locale.trim().toLowerCase().slice(0, 2) || "de",
          vermarktungsart: section === "mieten" ? "miete" : "kauf",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error ?? t("errSend", "Beim Senden ist ein Fehler aufgetreten."));
        return;
      }
      setStatus("success");
      setFormState({
        vorname: "",
        name: "",
        strasse: "",
        plz: "",
        ort: "",
        email: "",
        telefon: "",
        datenschutz: false,
      });
      setTouched({});
    } catch {
      setStatus("error");
      setErrorMessage(t("errConnection", "Verbindungsfehler. Bitte später erneut versuchen."));
    }
  }, [formState, objectNumber, estateId, propertyTitle, locale, section, dict]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!runValidation()) return;
    doSubmit();
  };

  const inputBase =
    "mt-1 block w-full rounded-lg border px-4 py-2.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50";
  const inputError = "border-red-500 bg-red-50/50 focus:border-red-500";
  const inputNormal = "border-zinc-300 focus:border-teal-500";

  if (status === "success") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-green-50 p-6 text-center text-green-800">
        <p className="font-medium">{t("successTitle", "Vielen Dank für Ihre Nachricht.")}</p>
        <p
          className="mt-1 text-sm"
          dangerouslySetInnerHTML={{
            __html: t("successMessage", "Wir melden uns innerhalb der nächsten 24 Stunden bei Ihnen.<br>Ihr<br>Holger Eberhard"),
          }}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!hideIntro && (
        <p className="text-zinc-600 leading-relaxed">
          {(dict?.intro ?? "Für den Erhalt des Exposés zur Immobilie {{objectNumber}} bitten wir Sie, Ihr Interesse kurz zu bestätigen und Ihre Kontaktdaten einzutragen.").replace("{{objectNumber}}", objectNumber)}
        </p>
      )}

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="expose-req-vorname"
              className={`block text-sm font-medium ${lightLabels ? "text-white" : "text-zinc-700"}`}
            >
              {t("firstName", "Vorname *")}
            </label>
            <input
              type="text"
              id="expose-req-vorname"
              name="vorname"
              value={formState.vorname}
              onChange={handleChange}
              onBlur={() => handleBlur("vorname")}
              className={`${inputBase} ${errors.vorname ? inputError : inputNormal}`}
              aria-invalid={!!errors.vorname}
              aria-describedby={errors.vorname ? "err-vorname" : undefined}
            />
            {errors.vorname && (
              <p id="err-vorname" className="mt-1 text-sm text-red-600">
                {errors.vorname}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="expose-req-name"
              className={`block text-sm font-medium ${lightLabels ? "text-white" : "text-zinc-700"}`}
            >
              {t("lastName", "Name *")}
            </label>
            <input
              type="text"
              id="expose-req-name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="expose-req-strasse"
            className={`block text-sm font-medium ${lightLabels ? "text-white" : "text-zinc-700"}`}
          >
            {t("street", "Straße *")}
          </label>
          <input
            type="text"
            id="expose-req-strasse"
            name="strasse"
            value={formState.strasse}
            onChange={handleChange}
            onBlur={() => handleBlur("strasse")}
            className={`${inputBase} ${errors.strasse ? inputError : inputNormal}`}
            aria-invalid={!!errors.strasse}
          />
          {errors.strasse && (
            <p className="mt-1 text-sm text-red-600">{errors.strasse}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="expose-req-plz"
              className={`block text-sm font-medium ${lightLabels ? "text-white" : "text-zinc-700"}`}
            >
              {t("zip", "PLZ *")}
            </label>
            <input
              type="text"
              id="expose-req-plz"
              name="plz"
              value={formState.plz}
              onChange={handleChange}
              onBlur={() => handleBlur("plz")}
              className={`${inputBase} ${errors.plz ? inputError : inputNormal}`}
              aria-invalid={!!errors.plz}
            />
            {errors.plz && (
              <p className="mt-1 text-sm text-red-600">{errors.plz}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="expose-req-ort"
              className={`block text-sm font-medium ${lightLabels ? "text-white" : "text-zinc-700"}`}
            >
              {t("city", "Ort *")}
            </label>
            <input
              type="text"
              id="expose-req-ort"
              name="ort"
              value={formState.ort}
              onChange={handleChange}
              onBlur={() => handleBlur("ort")}
              className={`${inputBase} ${errors.ort ? inputError : inputNormal}`}
              aria-invalid={!!errors.ort}
            />
            {errors.ort && (
              <p className="mt-1 text-sm text-red-600">{errors.ort}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="expose-req-email"
            className={`block text-sm font-medium ${lightLabels ? "text-white" : "text-zinc-700"}`}
          >
            {t("email", "E-Mail-Adresse *")}
          </label>
          <input
            type="email"
            id="expose-req-email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="expose-req-telefon"
            className={`block text-sm font-medium ${lightLabels ? "text-white" : "text-zinc-700"}`}
          >
            {t("phone", "Telefonnummer *")}
          </label>
          <input
            type="tel"
            id="expose-req-telefon"
            name="telefon"
            value={formState.telefon}
            onChange={handleChange}
            onBlur={() => handleBlur("telefon")}
            className={`${inputBase} ${errors.telefon ? inputError : inputNormal}`}
            aria-invalid={!!errors.telefon}
          />
          {errors.telefon && (
            <p className="mt-1 text-sm text-red-600">{errors.telefon}</p>
          )}
        </div>
      </div>

      <div className={`border-t pt-6 ${lightLabels ? "border-white/30" : "border-zinc-200"}`}>
      <label
        className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
          errors.datenschutz
            ? "border-red-500 bg-red-50/50"
            : lightLabels
              ? "border-white/40 bg-[#F9423A]"
              : "border-zinc-200 bg-white"
        }`}
      >
        <input
          type="checkbox"
          name="datenschutz"
          checked={formState.datenschutz}
          onChange={handleChange}
          onBlur={() => handleBlur("datenschutz")}
          className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
          aria-invalid={!!errors.datenschutz}
        />
        <span className={`text-sm ${lightLabels ? "text-white" : "text-zinc-700"}`}>
          {t("privacyPrefix", "Mit diesem Haken bestätigen Sie, dass Sie die ")}
          <Link
            href={`/${locale}/datenschutz`}
            className="underline hover:opacity-80"
            style={{ color: "#F9423A" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("privacyLink", "Datenschutzerklärung")}
          </Link>
          {" "}{t("privacySuffix", "zur Kenntnis genommen haben.")}
        </span>
      </label>
      {errors.datenschutz && (
        <p className="mt-1 text-sm text-red-600">{errors.datenschutz}</p>
      )}
      </div>

      {status === "error" && errorMessage && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !isValid()}
        className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#F9423A] focus:ring-offset-2 disabled:cursor-not-allowed sm:w-auto hover:opacity-90 disabled:hover:opacity-100 disabled:opacity-70"
        style={{ backgroundColor: "#F9423A" }}
      >
        <FileText className="h-5 w-5" />
        {status === "sending"
          ? t("sending", "Wird gesendet…")
          : t("submitButton", "Exposé jetzt anfordern")}
      </button>
    </form>
  );
}
