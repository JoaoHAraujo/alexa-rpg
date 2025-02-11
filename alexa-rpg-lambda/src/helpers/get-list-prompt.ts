export function getListPrompt(items: string[]): string {
  return items.length > 1 ? `${items.slice(0, -1).join(', ')} ou ${items[items.length - 1]}.` : items[0] || '';
}
