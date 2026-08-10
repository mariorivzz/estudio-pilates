// ─── Utilidades generales ────────────────────────────────────

/**
 * Formatea un número de teléfono para display.
 * Ej: "+34923123456" → "923 12 34 56"
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('34') && digits.length === 11) {
    const num = digits.slice(2);
    return `${num.slice(0, 3)} ${num.slice(3, 5)} ${num.slice(5, 7)} ${num.slice(7)}`;
  }
  return phone;
}

/**
 * Devuelve la fecha mínima aceptable (mañana) en formato YYYY-MM-DD.
 */
export function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

/**
 * Formatea una fecha ISO a formato legible en español.
 * Ej: "2026-04-15" → "15 de abril de 2026"
 */
export function formatDateES(isoDate: string): string {
  if (!isoDate) return '';
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
