import { serialize, unserialize } from "php-serialize";

export function phpUnserialize(text: string): string {
  if (!text) return "";
  try {
    const data = unserialize(text);
    return JSON.stringify(data, null, 2);
  } catch (err) {
    return `Error: ${err instanceof Error ? err.message : "Invalid PHP serialized data"}`;
  }
}

export function phpSerialize(text: string): string {
  if (!text) return "";
  try {
    const data = JSON.parse(text);
    return serialize(data);
  } catch (err) {
    return `Error: ${err instanceof Error ? err.message : "Invalid JSON input for serialization"}`;
  }
}
