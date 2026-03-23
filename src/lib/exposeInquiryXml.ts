/**
 * OpenImmo-Feedback (openimmo_feedback 1.2.7) für den onOffice-Anfragenmanager.
 * Wird ans Ende der Plain-Text-Mail an anfragen@… angehängt (wie Portal-Eingang).
 */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export type ExposeInquiryXmlInput = {
  /** → portal_obj_id */
  objektnrExtern: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
};

const BEMERKUNG = "Direktanfrage Webseite";

/**
 * OpenImmo 1.2.7 – openimmo_feedback (vorgegebenes Schema für Postfach-Import).
 */
export function buildExposeInquiryXml(data: ExposeInquiryXmlInput): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<openimmo_feedback>`,
    `  <version>1.2.7</version>`,
    `  <sender>`,
    `    <name>eigene Webseite</name>`,
    `    <openimmo_anid>webseite_system</openimmo_anid>`,
    `  </sender>`,
    `  <objekt>`,
    `    <portal_obj_id>${escapeXml(data.objektnrExtern)}</portal_obj_id>`,
    `  </objekt>`,
    `  <interessent>`,
    `    <vorname>${escapeXml(data.vorname)}</vorname>`,
    `    <nachname>${escapeXml(data.nachname)}</nachname>`,
    `    <email>${escapeXml(data.email)}</email>`,
    `    <tel>${escapeXml(data.telefon)}</tel>`,
    `    <bemerkung>${escapeXml(BEMERKUNG)}</bemerkung>`,
    `  </interessent>`,
    `</openimmo_feedback>`,
  ].join("\n");
}
