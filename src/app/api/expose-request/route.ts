import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { doContactRequest } from "@/lib/onoffice";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@he-immologis.de";

function buildTransporter() {
  const user = process.env.SMTP_USER ?? CONTACT_EMAIL;
  const pass = process.env.SMTP_PASS;
  if (!pass) {
    throw new Error(
      "SMTP_PASS is not set. Bitte in .env.local setzen (Strato-E-Mail-Passwort)."
    );
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.strato.de",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: { user, pass },
  });
}

function buildWiderrufsverzichtText(data: {
  widerrufsbelehrung: boolean;
  ausfuehrungVorWiderrufsfrist: boolean;
  widerrufsrechtVerlust: boolean;
}): string {
  const lines: string[] = ["Widerrufsverzicht-Bestätigungen:"];
  if (data.widerrufsbelehrung)
    lines.push("• Widerrufsbelehrung gelesen und verstanden");
  if (data.ausfuehrungVorWiderrufsfrist)
    lines.push("• Ausdrücklicher Verlangen auf Ausführung vor Ende der Widerrufsfrist");
  if (data.widerrufsrechtVerlust)
    lines.push("• Kenntnis über Verlust des Widerrufsrechts bei vollständiger Vertragserfüllung");
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      vorname,
      name,
      strasse,
      plz,
      ort,
      email,
      telefon,
      widerrufsbelehrung,
      ausfuehrungVorWiderrufsfrist,
      widerrufsrechtVerlust,
      objectNumber,
      estateId,
      propertyTitle,
    } = body as {
      vorname?: string;
      name?: string;
      strasse?: string;
      plz?: string;
      ort?: string;
      email?: string;
      telefon?: string;
      widerrufsbelehrung?: boolean;
      ausfuehrungVorWiderrufsfrist?: boolean;
      widerrufsrechtVerlust?: boolean;
      objectNumber?: string;
      estateId?: string;
      propertyTitle?: string;
    };

    // Validierung
    if (
      !vorname?.trim() ||
      !name?.trim() ||
      !strasse?.trim() ||
      !plz?.trim() ||
      !ort?.trim() ||
      !email?.trim() ||
      !telefon?.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Alle Pflichtfelder müssen ausgefüllt sein." },
        { status: 400 }
      );
    }
    if (
      !widerrufsbelehrung ||
      !ausfuehrungVorWiderrufsfrist ||
      !widerrufsrechtVerlust
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Alle drei Widerrufsverzicht-Bestätigungen sind erforderlich.",
        },
        { status: 400 }
      );
    }

    const bemerkung = buildWiderrufsverzichtText({
      widerrufsbelehrung,
      ausfuehrungVorWiderrufsfrist,
      widerrufsrechtVerlust,
    });

    // onOffice doContactRequest (falls estateId vorhanden)
    const numEstateId = estateId ? parseInt(estateId, 10) : NaN;
    if (!Number.isNaN(numEstateId) && numEstateId > 0) {
      const onOfficeResult = await doContactRequest(numEstateId, {
        vorname: vorname.trim(),
        name: name.trim(),
        strasse: strasse.trim(),
        plz: plz.trim(),
        ort: ort.trim(),
        email: email.trim(),
        telefon: telefon.trim(),
        bemerkung,
      });
      if (!onOfficeResult.success) {
        console.warn("[expose-request] onOffice:", onOfficeResult.error);
        // Fortfahren mit E-Mail – onOffice-Fehler sind nicht blockierend
      }
    }

    // E-Mail versenden
    const transporter = buildTransporter();
    const subject = `[Exposé-Anfrage] ${propertyTitle ?? `Objekt ${objectNumber ?? ""}`} – ${vorname} ${name}`;
    const text = [
      "Exposé-Anforderung mit Widerrufsverzicht",
      "",
      "Kontaktdaten:",
      `Vorname: ${vorname}`,
      `Name: ${name}`,
      `Straße: ${strasse}`,
      `PLZ: ${plz}`,
      `Ort: ${ort}`,
      `E-Mail: ${email}`,
      `Telefon: ${telefon}`,
      "",
      "Objekt:",
      `Objekt-Nr: ${objectNumber ?? "–"}`,
      propertyTitle ? `Titel: ${propertyTitle}` : "",
      "",
      bemerkung,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: process.env.SMTP_USER ?? CONTACT_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Verarbeitung fehlgeschlagen";
    console.error("expose-request error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
