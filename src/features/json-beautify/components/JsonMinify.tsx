import { useState, useCallback } from "react";
import { Copy, Check, Trash2, FileJson, Play } from "lucide-react";
import Textarea from "../../../shared/components/Textarea/Textarea";
import Button from "../../../shared/components/Button/Button";
import { minifyJson } from "../utils/jsonFormatter";
import { useCopyToClipboard } from "../../../shared/hooks/useCopyToClipboard";

const DEMO_DATA = `{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "isDeveloper": true,
  "skills": [
    "React",
    "TypeScript",
    "Node.js"
  ],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
}`;

export default function JsonMinify() {
  const [input, setInput] = useState("");
  const { copiedText, copy } = useCopyToClipboard();

  const { formatted, error } = minifyJson(input);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between min-h-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Input
            </h3>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="font-mono h-[500px]"
            error={error}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between min-h-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Minified Output
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(formatted)}
              disabled={!formatted || !!error}
              className={
                copiedText
                  ? "h-6 py-0 text-green-600 dark:text-green-400"
                  : "h-6 py-0 "
              }
            >
              {copiedText ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copiedText ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            value={formatted}
            readOnly
            placeholder="Minified JSON will appear here..."
            className="font-mono h-[500px] bg-gray-50 dark:bg-gray-800/50"
          />
        </div>
      </div>

      {!input && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          <FileJson className="w-12 h-12 mb-4 opacity-20" />
          <p>Paste some JSON or click Demo to minify</p>
        </div>
      )}
    </div>
  );
}
