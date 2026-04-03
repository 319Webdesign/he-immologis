/**
 * Sendet alle URLs aus der App-Sitemap an die Google Indexing API.
 *
 * Voraussetzungen:
 * - Property in der Google Search Console verifiziert
 * - Service-Account-E-Mail dort als Nutzer mit Berechtigung hinzugefügt
 * - JSON-Key: service-account.json im Projektroot oder GOOGLE_APPLICATION_CREDENTIALS
 *
 * Optional: NEXT_PUBLIC_SITE_URL setzen (wie im Build), sonst Fallback wie in sitemap.ts.
 *
 * Aufruf: npm run index:google
 *         npx tsx scripts/google-indexing.ts --dry-run
 */

import { GoogleAuth } from "google-auth-library";
import { existsSync } from "fs";
import { join } from "path";

import sitemap from "../src/app/sitemap";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

const DELAY_MS = 200;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveKeyFile(): string {
  const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  const local = join(process.cwd(), "service-account.json");
  if (existsSync(local)) return local;
  throw new Error(
    "Keine Credentials: Lege service-account.json ins Projektroot oder setze GOOGLE_APPLICATION_CREDENTIALS.",
  );
}

async function getAccessToken(keyFile: string): Promise<string> {
  const auth = new GoogleAuth({
    keyFile,
    scopes: [INDEXING_SCOPE],
  });
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Kein Access Token (Indexing API aktiviert & Scope korrekt?)");
  return token;
}

async function publishUrl(
  accessToken: string,
  url: string,
  type: "URL_UPDATED" | "URL_DELETED",
): Promise<{ ok: true } | { ok: false; url: string; message: string }> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url, type }),
  });

  if (!res.ok) {
    const body = await res.text();
    return {
      ok: false,
      url,
      message: `${res.status} ${res.statusText}: ${body.slice(0, 500)}`,
    };
  }

  return { ok: true };
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  const keyFile = dryRun ? "" : resolveKeyFile();

  const entries = sitemap();
  const urls = [...new Set(entries.map((e) => e.url))].sort();

  console.log(`URLs aus Sitemap: ${urls.length}${dryRun ? " (Dry-Run, keine API-Calls)" : ""}`);

  if (dryRun) {
    for (const u of urls) console.log(`  ${u}`);
    return;
  }

  const accessToken = await getAccessToken(keyFile);
  const failures: { url: string; message: string }[] = [];
  let ok = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const result = await publishUrl(accessToken, url, "URL_UPDATED");
    if (result.ok) {
      ok++;
      process.stdout.write(`\r[${i + 1}/${urls.length}] OK: ${url.slice(0, 72)}…`);
    } else {
      failures.push({ url: result.url, message: result.message });
      console.error(`\nFehler: ${result.url}\n  ${result.message}`);
    }
    if (i < urls.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\n\nFertig: ${ok} erfolgreich, ${failures.length} fehlgeschlagen.`);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
