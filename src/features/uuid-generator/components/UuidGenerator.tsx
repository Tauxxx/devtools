import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Fingerprint } from "lucide-react";
import Button from "../../../shared/components/Button/Button";
import { generateBulk } from "../utils/uuidUtils";
import { useCopyToClipboard } from "../../../shared/hooks/useCopyToClipboard";

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>(() => generateBulk(1));
  const { copiedText, copy } = useCopyToClipboard();

  const handleGenerate = useCallback(() => {
    setUuids(generateBulk(count));
  }, [count]);

  const allUuidsText = uuids.join("\n");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="uuid-count"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Quantity:
              </label>
              <select
                id="uuid-count"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="block w-20 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 border p-1"
              >
                {[1, 5, 10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleGenerate}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copy(allUuidsText)}
              disabled={!allUuidsText}
              className={
                copiedText === allUuidsText
                  ? "text-green-600 dark:text-green-400"
                  : ""
              }
            >
              {copiedText === allUuidsText ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copy All
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {uuids.map((uuid, idx) => {
            const isCopied = copiedText === uuid;
            return (
              <div
                key={`${uuid}-${idx}`}
                className="group flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <code className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                  {uuid}
                </code>
                <button
                  onClick={() => copy(uuid)}
                  className={`p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors flex-shrink-0 ${isCopied ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100"}`}
                  title="Copy UUID"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50 flex gap-4 transition-colors">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center flex-shrink-0">
          <Fingerprint className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm uppercase tracking-wider">
            About UUID v4
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
            UUID version 4 is a universally unique identifier that is generated
            using random numbers. The probability of a duplicate is extremely
            low, making it ideal for unique keys in distributed systems.
          </p>
        </div>
      </div>
    </div>
  );
}
