import { describe, it, expect, beforeAll } from "vitest";
import { Buffer } from "buffer";
import { phpSerialize, phpUnserialize } from "../utils/serializeUtils";

describe("serializeUtils", () => {
  beforeAll(() => {
    // Polyfill Buffer for jsdom environment
    globalThis.Buffer = Buffer;
  });

  const sampleJson = '{"name":"John Doe","age":30,"isAdmin":true}';
  const samplePhp =
    'a:3:{s:4:"name";s:8:"John Doe";s:3:"age";i:30;s:7:"isAdmin";b:1;}';

  describe("phpSerialize", () => {
    it("should correctly serialize a JSON string", () => {
      const result = phpSerialize(sampleJson);
      expect(result).toBe(samplePhp);
    });

    it("should return error for invalid JSON", () => {
      const result = phpSerialize('{"name": "John"');
      expect(result).toContain("Error:");
    });
  });

  describe("phpUnserialize", () => {
    it("should correctly unserialize a PHP string", () => {
      const result = phpUnserialize(samplePhp);
      // The result of phpUnserialize is pretty-printed JSON (indent: 2)
      expect(JSON.parse(result)).toEqual(JSON.parse(sampleJson));
    });

    it("should return error for invalid PHP serialized string", () => {
      const result = phpUnserialize('a:3:{s:4:"name";s:8:"John Doe"');
      expect(result).toContain("Error:");
    });
  });
});
