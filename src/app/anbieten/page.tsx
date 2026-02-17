import { redirect } from "next/navigation";

/**
 * Verkaufen-Seite liegt unter /verkaufen.
 * Alte URL /anbieten leitet dorthin weiter.
 */
export default function AnbietenPage() {
  redirect("/verkaufen");
}
