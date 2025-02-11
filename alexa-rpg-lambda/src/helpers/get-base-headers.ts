export function getBaseHeaders(idAmazon: string): Record<string, string> {
  return { 'x-id-amazon': idAmazon };
}
