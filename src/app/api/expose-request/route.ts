import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildExposeInquiryXml } from "@/lib/exposeInquiryXml";
import { doContactRequest } from "@/lib/onoffice";

/**
 * Exposé-Anfrage:
 * 1. **Plain-Text-E-Mail** mit OpenImmo-XML an anfragen@… → Anfragenmanager (wie Immowelt/Immoscout).
 * 2. Optional onOffice-API: Adresse + Interessenten-Relation (ohne Maklerbuch-Aktivität).
 */

/** Postfach für OpenImmo / Anfragenmanager */
const EXPOSE_REQUEST_EMAIL = "anfragen@heimmologis.de";

/** onOffice-SMTP (anfragen@) */
function buildOnOfficeMailTransporter() {
  const user = process.env.SMTP_ANFRAGEN_USER ?? EXPOSE_REQUEST_EMAIL;
  const pass = process.env.SMTP_ANFRAGEN_PASS;
  if (!pass) {
    throw new Error("SMTP_ANFRAGEN_PASS ist nicht gesetzt. Bitte in .env.local setzen.");
  }
  return nodemailer.createTransport({
    host: "smtp.onoffice.de",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

/**
 * Nur Plain Text: lesbarer Block, danach OpenImmo-XML.
 * Absender: Postfach (SMTP) – Antwort geht an Interessent über Reply-To.
 */
async function sendOpenImmoRequestMail(params: {
  subject: string;
  textPlain: string;
  xmlPayload: string;
  replyTo: string;
  /** Anzeigename für From (E-Mail bleibt technisch das SMTP-Postfach) */
  interessentDisplayName: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { subject, textPlain, xmlPayload, replyTo, interessentDisplayName } =
    params;
  const mailbox = process.env.SMTP_ANFRAGEN_USER ?? EXPOSE_REQUEST_EMAIL;
  const textBody = `${textPlain}\n\n${xmlPayload}`;
  /** Technischer Absender (SPF/DKIM des SMTP-Postfachs); direkter Kontakt über Reply-To */
  const fromHeader = `${interessentDisplayName} (Webseite) <${mailbox}>`;

  try {
    const t = buildOnOfficeMailTransporter();
    const info = await t.sendMail({
      from: fromHeader,
      to: EXPOSE_REQUEST_EMAIL,
      replyTo: `${interessentDisplayName} <${replyTo}>`,
      subject,
      text: textBody,
    });
    console.info("[expose-request] OpenImmo-E-Mail an", EXPOSE_REQUEST_EMAIL, info.messageId ?? "");
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("[expose-request] OpenImmo-E-Mail fehlgeschlagen:", e);
    return { ok: false, error: msg || "E-Mail-Versand fehlgeschlagen." };
  }
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
      objectNumber,
      estateId,
      websiteLocale,
      locale: localeBody,
      vermarktungsart: vermarktungsartBody,
    } = body as {
      vorname?: string;
      name?: string;
      strasse?: string;
      plz?: string;
      ort?: string;
      email?: string;
      telefon?: string;
      objectNumber?: string;
      estateId?: string;
      websiteLocale?: string;
      locale?: string;
      vermarktungsart?: string;
    };

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
    const objectNumberVal = (objectNumber ?? "").toString().trim();
    if (!objectNumberVal) {
      return NextResponse.json(
        { success: false, error: "Objektnummer fehlt. Bitte Seite neu laden." },
        { status: 400 }
      );
    }
    const objektNr = objectNumberVal;
    const bemerkung = `Anfrage über die Webseite für Objekt ${objektNr}`;
    const numEstateId = estateId ? parseInt(estateId, 10) : NaN;
    const hasEstateId = !Number.isNaN(numEstateId) && numEstateId > 0;
    const websiteLocaleNorm =
      (websiteLocale ?? localeBody ?? "de").trim().toLowerCase().slice(0, 2) || "de";
    const vermarktungsart =
      vermarktungsartBody === "miete" ? "miete" : "kauf";

    const customerEmail = email.trim();
    const nachnameTrim = name?.trim() ?? "";
    const vornameTrim = vorname.trim();
    const interessentDisplayName = `${vornameTrim} ${nachnameTrim}`.trim();

    const subject = `Exposé-Anfrage: ${objektNr} - ${nachnameTrim}`;
    const textPlain = [
      "Exposé-Anfrage über die Webseite (OpenImmo / Anfragenmanager)",
      "",
      `Objektnummer: ${objektNr}`,
      `Vorname: ${vornameTrim}`,
      `Nachname: ${nachnameTrim}`,
      `E-Mail: ${customerEmail}`,
      `Telefon: ${telefon.trim()}`,
      `Straße: ${strasse.trim()}`,
      `PLZ: ${plz.trim()}`,
      `Ort: ${ort.trim()}`,
      hasEstateId ? `\nonOffice estateId: ${numEstateId}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const xmlPayload = buildExposeInquiryXml({
      objektnrExtern: objektNr,
      vorname: vornameTrim,
      nachname: nachnameTrim,
      email: customerEmail,
      telefon: telefon.trim(),
    });

    const mailResult = await sendOpenImmoRequestMail({
      subject,
      textPlain,
      xmlPayload,
      replyTo: customerEmail,
      interessentDisplayName,
    });
    if (!mailResult.ok) {
      return NextResponse.json(
        { success: false, error: mailResult.error ?? "E-Mail-Versand fehlgeschlagen." },
        { status: 500 }
      );
    }

    if (hasEstateId) {
      const onOfficeResult = await doContactRequest(numEstateId, {
        vorname: vornameTrim,
        name: nachnameTrim,
        strasse: strasse.trim(),
        plz: plz.trim(),
        ort: ort.trim(),
        email: customerEmail,
        telefon: telefon.trim(),
        bemerkung,
        websiteLocale: websiteLocaleNorm,
        vermarktungsart,
      });
      if (!onOfficeResult.success) {
        console.warn(
          "[expose-request] OpenImmo-Mail gesendet, onOffice API (Adresse/Relation) fehlgeschlagen:",
          onOfficeResult.error
        );
      }
    }

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
