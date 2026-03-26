import { useState, useCallback } from "react";
import { Copy, Check, Trash2, FileJson, Play } from "lucide-react";
import Textarea from "../../../shared/components/Textarea/Textarea";
import Button from "../../../shared/components/Button/Button";
import { formatJson } from "../utils/jsonFormatter";
import { useCopyToClipboard } from "../../../shared/hooks/useCopyToClipboard";

const DEMO_DATA = `{"name":"John Doe","age":30,"email":"john.doe@example.com","isDeveloper":true,"skills":["React","TypeScript","Node.js"],"address":{"street":"123 Main St","city":"Anytown","country":"USA"}}`;

export default function JsonBeautify() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const { copiedText, copy } = useCopyToClipboard();

  const { formatted, error } = formatJson(input, indent);

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
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="indent"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Indentation:
            </label>
            <select
              id="indent"
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="block w-20 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 border p-1"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value={8}>8 Spaces</option>
              <option value={0}>Tab</option>
            </select>
          </div>
        </div>

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
          <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Formatted Output
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(formatted)}
              disabled={!formatted || !!error}
              className={copiedText ? "text-green-600 dark:text-green-400" : ""}
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
            placeholder="Formatted JSON will appear here..."
            className="font-mono h-[500px] bg-gray-50 dark:bg-gray-800/50"
          />
        </div>
      </div>

      {!input && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          <FileJson className="w-12 h-12 mb-4 opacity-20" />
          <p>Paste some JSON or click Demo to get started</p>
        </div>
      )}
    </div>
  );
}
