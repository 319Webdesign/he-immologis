/**
 * Formatiert einen Betrag als Euro-Währung (z. B. 20.000,00 €).
 * @param value - Betrag in Euro
 * @param decimals - Nachkommastellen (Standard: 2)
 */
export function formatCurrency(
  value: number,
  options?: { decimals?: number }
): string {
  const decimals = options?.decimals ?? 2;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
