import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Lock } from "lucide-react";
import Button from "../../../shared/components/Button/Button";
import { generatePassword } from "../utils/passwordUtils";
import type { PasswordOptions } from "../utils/passwordUtils";
import { useCopyToClipboard } from "../../../shared/hooks/useCopyToClipboard";

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  const [password, setPassword] = useState(() =>
    generatePassword({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    }),
  );
  const { copiedText, copy } = useCopyToClipboard();

  const handleGenerate = useCallback(() => {
    setPassword(generatePassword(options));
  }, [options]);

  const toggleOption = (key: keyof Omit<PasswordOptions, "length">) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Ensure at least one option is selected
      if (
        !next.includeUppercase &&
        !next.includeLowercase &&
        !next.includeNumbers &&
        !next.includeSymbols
      ) {
        return prev;
      }
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-xl break-all text-center min-h-[4rem] flex items-center justify-center text-gray-900 dark:text-gray-100 transition-colors">
            {password}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={handleGenerate}
              title="Generate New"
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => copy(password)}
              className={
                copiedText
                  ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  : ""
              }
            >
              {copiedText ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password Length: {options.length}
              </label>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={options.length}
              onChange={(e) =>
                setOptions({ ...options, length: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={() => toggleOption("includeUppercase")}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Uppercase (A-Z)
              </span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={() => toggleOption("includeLowercase")}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Lowercase (a-z)
              </span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={() => toggleOption("includeNumbers")}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Numbers (0-9)
              </span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={() => toggleOption("includeSymbols")}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Symbols (!@#$...)
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50 flex gap-4 transition-colors">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center flex-shrink-0">
          <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm uppercase tracking-wider">
            Security Tip
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
            Generate long, complex passwords for better security. We recommend
            at least 16 characters with a mix of letters, numbers, and symbols.
          </p>
        </div>
      </div>
    </div>
  );
}
