"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

interface ContactProps {
  variant?: "default" | "compact" | "dark";
  title?: string;
  subtitle?: string;
}

export default function Contact({
  variant = "default",
  title = "Kontaktieren Sie uns",
  subtitle = "Wir freuen uns auf Ihre Nachricht und stehen Ihnen gerne jederzeit zur Verfügung.",
}: ContactProps) {
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
  const isCompact = variant === "compact";

  return (
    <section
      className={`py-16 sm:py-24 ${
        isDark ? "bg-zinc-900 text-white" : "bg-zinc-50"
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
            >
              {subtitle}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    isDark ? "bg-amber-600/20" : "bg-amber-100"
                  }`}
                >
                  <MapPin
                    className={`h-6 w-6 ${isDark ? "text-amber-400" : "text-amber-700"}`}
                  />
                </div>
                <div>
                  <h3 className="font-medium">Adresse</h3>
                  <p className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                    HE immologis UG
                    <br />
                    Weinheim, Bergstraße
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    isDark ? "bg-amber-600/20" : "bg-amber-100"
                  }`}
                >
                  <Phone
                    className={`h-6 w-6 ${isDark ? "text-amber-400" : "text-amber-700"}`}
                  />
                </div>
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <a
                    href="tel:+496201123456"
                    className={`hover:underline ${isDark ? "text-zinc-300" : "text-zinc-600"}`}
                  >
                    +49 6201 123 456
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    isDark ? "bg-amber-600/20" : "bg-amber-100"
                  }`}
                >
                  <Mail
                    className={`h-6 w-6 ${isDark ? "text-amber-400" : "text-amber-700"}`}
                  />
                </div>
                <div>
                  <h3 className="font-medium">E-Mail</h3>
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
                isDark ? "bg-zinc-800" : "bg-white shadow-lg"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:ring-amber-500 ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:ring-amber-500 ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:ring-amber-500 ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:ring-amber-500 ${
                      isDark
                        ? "border-zinc-600 bg-zinc-700 text-white placeholder-zinc-400"
                        : "border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    placeholder="Ihre Nachricht..."
                  />
                </div>

                <button
                  type="submit"
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                    isDark
                      ? "bg-amber-600 hover:bg-amber-500 focus:ring-offset-zinc-800"
                      : "bg-zinc-900 hover:bg-zinc-800 focus:ring-offset-2"
                  }`}
                >
                  <Send className="h-5 w-5" />
                  Nachricht senden
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
