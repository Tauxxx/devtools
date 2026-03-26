export function urlEncode(text: string, all: boolean = false): string {
  if (!text) return "";
  return all ? encodeURIComponent(text) : encodeURI(text);
}

export function urlDecode(text: string): string {
  if (!text) return "";
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}
