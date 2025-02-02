export function normalizedText(text: string): string {
  return text
    .normalize("NFD") // Normaliza para decompor caracteres acentuados
    .replace(/\p{Diacritic}/gu, "") // Remove os acentos
    .toLowerCase(); // Converte para lowercase
}
