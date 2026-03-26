export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export function generatePassword(options: PasswordOptions): string {
  let charset = "";
  if (options.includeUppercase) charset += CHARSETS.uppercase;
  if (options.includeLowercase) charset += CHARSETS.lowercase;
  if (options.includeNumbers) charset += CHARSETS.numbers;
  if (options.includeSymbols) charset += CHARSETS.symbols;

  if (charset === "") return "";

  const array = new Uint32Array(options.length);
  window.crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
}
