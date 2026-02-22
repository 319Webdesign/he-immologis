"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const STEELBLUE = "#4682B4";

export type ContactFormDict = {
  address: string;
  phone: string;
  email: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
};

interface ContactProps {
  variant?: "default" | "compact" | "dark" | "white";
  title?: string;
  subtitle?: string;
  accentColor?: "amber" | "steelblue";
  formLabels?: ContactFormDict;
}

const DEFAULT_FORM_LABELS: ContactFormDict = {
  address: "Adresse",
  phone: "Telefon",
  email: "E-Mail",
  nameLabel: "Name *",
  emailLabel: "E-Mail *",
  phoneLabel: "Telefon",
  messageLabel: "Nachricht *",
  namePlaceholder: "Ihr Name",
  emailPlaceholder: "ihre@email.de",
  phonePlaceholder: "+49 123 456789",
  messagePlaceholder: "Ihre Nachricht...",
  submitButton: "Nachricht senden",
};

export default function Contact({
  variant = "default",
  title = "Kontaktieren Sie uns",
  subtitle = "Wir freuen uns auf Ihre Nachricht und stehen Ihnen gerne jederzeit zur Verfügung.",
  accentColor = "amber",
  formLabels,
}: ContactProps) {
  const labels = formLabels ?? DEFAULT_FORM_LABELS;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde die Formularverarbeitung erfolgen
    console.log("Form submitted:", formState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isDark = variant === "dark";
  const isWhite = variant === "white";
  const isCompact = variant === "compact";
  const useSteelblue = accentColor === "steelblue";

  const iconWrapperStyle = useSteelblue
    ? { backgroundColor: `${STEELBLUE}20`, color: STEELBLUE }
    : undefined;
  const iconWrapperClass = !useSteelblue
    ? isDark
      ? "bg-amber-600/20"
      : "bg-amber-100"
    : "";
  const iconClass = !useSteelblue
    ? isDark
      ? "text-amber-400"
      : "text-amber-700"
    : "";

  const btnStyle = useSteelblue
    ? { backgroundColor: STEELBLUE }
    : undefined;
  const btnClass = !useSteelblue
    ? isDark
      ? "bg-amber-600 hover:bg-amber-500 focus:ring-offset-zinc-800"
      : "bg-zinc-900 hover:bg-zinc-800 focus:ring-offset-2"
    : "hover:opacity-90 focus:ring-[#4682B4] focus:ring-offset-2";

  const focusClass = useSteelblue
    ? "focus:border-[#4682B4] focus:ring-[#4682B4]"
    : "focus:border-amber-500 focus:ring-amber-500";

  return (
    <section
      id="kontakt"
      className={`py-16 sm:py-24 ${
        isWhite ? "bg-white" : isDark ? "bg-zinc-900 text-white" : "bg-zinc-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Kontaktinformationen */}
          <div>
            <h2 className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p
              className={`mt-4 text-lg ${
                isDark ? "text-zinc-300" : "text-zinc-600"
              }`}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconWrapperClass}`}
                  style={iconWrapperStyle}
                >
                  <MapPin
                    className={`h-6 w-6 ${iconClass}`}
                    style={useSteelblue ? { color: STEELBLUE } : undefined}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{labels.address}</h3>
                  <p className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                    HE immologis UG
                    <br />
                    (haftungsbeschränkt) i.Gr.
                    <br />
                    Ahornstr. 59
                    <br />
                    69469 Weinheim
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconWrapperClass}`}
                  style={iconWrapperStyle}
                >
                  <Phone
                    className={`h-6 w-6 ${iconClass}`}
                    style={useSteelblue ? { color: STEELBLUE } : undefined}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{labels.phone}</h3>
                  <a
                    href="tel:+4917632198462"
                    className={`hover:underline ${isDark ? "text-zinc-300" : "text-zinc-600"}`}
                  >
                    0176 321 98 462
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconWrapperClass}`}
                  style={iconWrapperStyle}
                >
                  <Mail
                    className={`h-6 w-6 ${iconClass}`}
                    style={useSteelblue ? { color: STEELBLUE } : undefined}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{labels.email}</h3>
                  <a
                    href="mailto:info@he-immologis.de"
                    className={`hover:underline ${isDark ? "text-zinc-300" : "text-zinc-600"}`}
                  >
                    info@he-immologis.de
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kontaktformular - nur bei default und dark */}
          {!isCompact && (
            <div
              className={`rounded-2xl p-8 ${
                isDark ? "bg-zinc-800" : "bg-white shadow-md"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    {labels.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 ${focusClass} ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder={labels.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    {labels.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 ${focusClass} ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder={labels.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    {labels.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 ${focusClass} ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder={labels.phonePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    {labels.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 ${focusClass} ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder={labels.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${useSteelblue ? "focus:ring-[#4682B4]" : "focus:ring-amber-500"} ${btnClass}`}
                  style={btnStyle}
                >
                  <Send className="h-5 w-5" />
                  {labels.submitButton}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
