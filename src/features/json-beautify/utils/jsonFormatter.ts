export interface JsonFormatterResult {
  formatted: string;
  error?: string;
}

export function formatJson(
  json: string,
  space: number = 2,
): JsonFormatterResult {
  if (!json.trim()) {
    return { formatted: "" };
  }

  try {
    const parsed = JSON.parse(json);
    return {
      formatted: JSON.stringify(parsed, null, space),
    };
  } catch (err) {
    return {
      formatted: json,
      error: err instanceof Error ? err.message : "Invalid JSON",
    };
  }
}

export function minifyJson(json: string): JsonFormatterResult {
  if (!json.trim()) {
    return { formatted: "" };
  }

  try {
    const parsed = JSON.parse(json);
    return {
      formatted: JSON.stringify(parsed),
    };
  } catch (err) {
    return {
      formatted: json,
      error: err instanceof Error ? err.message : "Invalid JSON",
    };
  }
}
