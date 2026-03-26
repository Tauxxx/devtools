import { describe, it, expect } from "vitest";
import { formatJson, minifyJson } from "../utils/jsonFormatter";

describe("jsonFormatter", () => {
  describe("formatJson", () => {
    it("should format valid JSON with default indentation", () => {
      const input = '{"a":1,"b":[2,3]}';
      const result = formatJson(input);
      expect(result.formatted).toBe(
        '{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}',
      );
      expect(result.error).toBeUndefined();
    });

    it("should format valid JSON with custom indentation", () => {
      const input = '{"a":1}';
      const result = formatJson(input, 4);
      expect(result.formatted).toBe('{\n    "a": 1\n}');
    });

    it("should return error for invalid JSON", () => {
      const input = '{"a":1';
      const result = formatJson(input);
      expect(result.error).toBeDefined();
    });

    it("should handle empty input", () => {
      expect(formatJson("").formatted).toBe("");
    });
  });

  describe("minifyJson", () => {
    it("should minify valid JSON", () => {
      const input = '{\n  "a": 1\n}';
      const result = minifyJson(input);
      expect(result.formatted).toBe('{"a":1}');
    });
  });
});
