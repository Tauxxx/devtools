import { useState, useCallback } from "react";
import { Copy, Check, Trash2, Hash, Play } from "lucide-react";
import Textarea from "../../../shared/components/Textarea/Textarea";
import Button from "../../../shared/components/Button/Button";
import { generateHash } from "../utils/hashUtils";
import type { HashAlgorithm } from "../utils/hashUtils";
import { useCopyToClipboard } from "../../../shared/hooks/useCopyToClipboard";

const ALGORITHMS: HashAlgorithm[] = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-512",
  "SHA-3",
];
const DEMO_DATA = "The quick brown fox jumps over the lazy dog";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const { copiedText, copy } = useCopyToClipboard();

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  }, []);

  const handleDemo = useCallback(() => {
    setInput(DEMO_DATA);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDemo}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50"
          >
            <Play className="w-4 h-4 mr-2" />
            Demo
          </Button>
          <Button variant="secondary" size="sm" onClick={handlePaste}>
            Paste
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Input Text
        </h3>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="h-32"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ALGORITHMS.map((algo) => {
          const hash = generateHash(input, algo);
          const isCopied = copiedText === hash;

          return (
            <div
              key={algo}
              className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm space-y-3 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-700 dark:text-gray-200">
                  {algo}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copy(hash)}
                  disabled={!hash}
                  className={
                    isCopied ? "text-green-600 dark:text-green-400" : ""
                  }
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded border border-gray-200 dark:border-gray-700 break-all font-mono text-sm min-h-[2.5rem] flex items-center text-gray-900 dark:text-gray-100 transition-colors">
                {hash || (
                  <span className="text-gray-400 dark:text-gray-500 italic">
                    Enter text to see hash
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!input && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          <Hash className="w-12 h-12 mb-4 opacity-20" />
          <p>Enter text above or click Demo to generate hashes</p>
        </div>
      )}
    </div>
  );
}
