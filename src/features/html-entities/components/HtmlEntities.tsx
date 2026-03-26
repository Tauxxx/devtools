import { useState, useCallback } from "react";
import { Copy, Check, Trash2, Code2, ArrowDownUp, Play } from "lucide-react";
import Textarea from "../../../shared/components/Textarea/Textarea";
import Button from "../../../shared/components/Button/Button";
import { encodeHtmlEntities, decodeHtmlEntities } from "../utils/htmlUtils";
import { useCopyToClipboard } from "../../../shared/hooks/useCopyToClipboard";

const DEMO_DATA =
  '<div>\n  <p>Hello & welcome to "DevTools" © 2026!</p>\n  <span>It\'s < 100% finished, but > 90% done.</span>\n</div>';

export default function HtmlEntities() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { copiedText, copy } = useCopyToClipboard();

  const handleEncode = useCallback(() => {
    setOutput(encodeHtmlEntities(input));
  }, [input]);

  const handleDecode = useCallback(() => {
    setOutput(decodeHtmlEntities(input));
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  const handleSwap = useCallback(() => {
    setInput(output);
    setOutput(input);
  }, [input, output]);

  const handleDemo = useCallback(() => {
    setInput(DEMO_DATA);
    setOutput("");
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
          <Button
            variant="primary"
            size="sm"
            onClick={handleEncode}
            disabled={!input}
          >
            Encode
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDecode}
            disabled={!input}
          >
            Decode
          </Button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSwap}
            disabled={!output}
          >
            <ArrowDownUp className="w-4 h-4 mr-2" />
            Swap
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
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Input
          </h3>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text or HTML here..."
            className="font-mono h-64"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Output
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(output)}
              disabled={!output}
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
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="font-mono h-64 bg-gray-50 dark:bg-gray-800/50"
          />
        </div>
      </div>

      {!input && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          <Code2 className="w-12 h-12 mb-4 opacity-20" />
          <p>Enter text to encode or HTML entities to decode</p>
        </div>
      )}
    </div>
  );
}
