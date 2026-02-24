import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@he-immologis.de";

function buildTransporter() {
  const user = process.env.SMTP_USER ?? CONTACT_EMAIL;
  const pass = process.env.SMTP_PASS;
  if (!pass) {
    throw new Error("SMTP_PASS is not set. Bitte in .env.local setzen (Strato-E-Mail-Passwort).");
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.strato.de",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: { user, pass },
  });
}

function formatBody(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body as { type: string; [key: string]: unknown };

    const transporter = buildTransporter();
    const replyTo = (body.email as string)?.trim() || undefined;

    let subject: string;
    let text: string;

    switch (type) {
      case "contact": {
        subject = `[Kontaktformular] Nachricht von ${body.name ?? "Unbekannt"}`;
        text = formatBody({
          Name: body.name,
          "E-Mail": body.email,
          Telefon: body.phone,
          Nachricht: body.message,
        });
        break;
      }
      case "search": {
        subject = `[Suchauftrag] ${body.vorname ?? ""} ${body.nachname ?? ""}`.trim() || "Neuer Suchauftrag";
        text = formatBody({
          Objekttyp: body.objekttyp,
          Lagepräferenz: Array.isArray(body.lagePraef) ? body.lagePraef.join(", ") : body.lagePraef,
          "Wohnfläche (m²)": body.wohnflaeche,
          Zimmeranzahl: body.zimmeranzahl,
          "Lage/Region": body.lageRegion,
          "Weitere Wünsche": body.weitereWuensche,
          Anrede: body.anrede,
          Vorname: body.vorname,
          Nachname: body.nachname,
          Straße: body.strasse,
          PLZ: body.plz,
          Ort: body.ort,
          Telefon: body.telefon,
          "E-Mail": body.email,
        });
        break;
      }
      case "expose": {
        subject = `[Exposé-Anfrage] ${body.propertyTitle ?? "Objekt"} – ${body.name ?? body.email}`;
        text = formatBody({
          Objekt: body.propertyTitle,
          Name: body.name,
          "E-Mail": body.email,
          Telefon: body.phone,
          Nachricht: body.nachricht,
        });
        break;
      }
      case "tippgeber": {
        subject = `[Tippgeber] ${body.nameTippgeber ?? body.email}`;
        text = formatBody({
          "Name Tippgeber": body.nameTippgeber,
          "E-Mail": body.email,
          Telefon: body.phone,
          "Name empfohlene Person": body.nameEmpfohlen,
          "Art Immobilie": body.immobilienArt,
          "Lage/Ort": body.lage,
          "Weitere Infos": body.sonstiges,
        });
        break;
      }
      case "sell": {
        subject = `[Verkaufsanfrage] ${body.name ?? body.email}`;
        const { type: _t, ...rest } = body;
        text = formatBody(rest as Record<string, unknown>);
        break;
      }
      default:
        return NextResponse.json(
          { success: false, error: "Unbekannter Formulartyp" },
          { status: 400 }
        );
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER ?? CONTACT_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: replyTo || undefined,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "E-Mail-Versand fehlgeschlagen";
    console.error("send-contact error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
