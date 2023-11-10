export function sanitizeText(text) {
  // Quitar tildes
  const cleanTextWithoutAccents = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Devolver el texto limpio
  return cleanTextWithoutAccents;
}
