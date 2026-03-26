export function encodeBase64(text: string): string {
  if (!text) return "";
  try {
    // btoa only supports Latin1, so we need to handle UTF-8
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return "";
  }
}

export function decodeBase64(text: string): string {
  if (!text) return "";
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch {
    return "Error: Invalid Base64 string";
  }
}
