import { redirect } from "next/navigation";
import { getLocaleFromHeaders } from "@/lib/i18n";

/**
 * Verkaufen-Seite liegt unter /[lang]/verkaufen.
 * Alte URL /anbieten leitet dorthin weiter.
 */
export default async function AnbietenPage() {
  const locale = await getLocaleFromHeaders();
  redirect(`/${locale}/verkaufen`);
}
