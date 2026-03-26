import CryptoJS from "crypto-js";

export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512" | "SHA-3";

export function generateHash(text: string, algorithm: HashAlgorithm): string {
  if (!text) return "";

  switch (algorithm) {
    case "MD5":
      return CryptoJS.MD5(text).toString();
    case "SHA-1":
      return CryptoJS.SHA1(text).toString();
    case "SHA-256":
      return CryptoJS.SHA256(text).toString();
    case "SHA-512":
      return CryptoJS.SHA512(text).toString();
    case "SHA-3":
      return CryptoJS.SHA3(text).toString();
    default:
      return "";
  }
}
