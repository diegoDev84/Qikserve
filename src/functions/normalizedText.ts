/**
 * Normalizes the given text string.
 *
 * This function decomposes accented characters using Unicode normalization form NFD,
 * removes diacritical marks (accents), and converts the resulting text to lowercase.
 *
 * @param text - The input string to normalize.
 * @returns The normalized string without accents and in lowercase.
 */

export function normalizedText(text: string): string {
  return text
    .normalize("NFD") // Normaliza para decompor caracteres acentuados
    .replace(/\p{Diacritic}/gu, "") // Remove os acentos
    .toLowerCase(); // Converte para lowercase
}
