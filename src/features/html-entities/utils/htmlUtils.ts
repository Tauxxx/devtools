export function encodeHtmlEntities(text: string): string {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  const div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent || "";
}
