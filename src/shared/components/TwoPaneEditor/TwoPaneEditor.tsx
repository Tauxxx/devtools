import { useCallback } from "react";
import type { ReactNode } from "react";
import { Copy, Check, Trash2, Play, ArrowDownUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

interface TwoPaneEditorProps {
  input: string;
  onInputChange: (value: string) => void;
  output: string;
  outputError?: string;
  onClear?: () => void;
  onDemo?: () => void;
  onSwap?: () => void;
  leftControls?: ReactNode;
  actionButtons?: ReactNode;
  inputHeader?: string;
  outputHeader?: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  inputHeight?: string;
  emptyStateIcon: LucideIcon;
  emptyStateTitle: string;
}

export default function TwoPaneEditor({
  input,
  onInputChange,
  output,
  outputError,
  onClear,
  onDemo,
  onSwap,
  leftControls,
  actionButtons,
  inputHeader = "Input",
  outputHeader = "Output",
  inputPlaceholder = "Paste your data here...",
  outputPlaceholder = "Result will appear here...",
  inputHeight = "h-[500px]",
  emptyStateIcon: EmptyIcon,
  emptyStateTitle,
}: TwoPaneEditorProps) {
  const { copiedText, copy } = useCopyToClipboard();

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      onInputChange(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  }, [onInputChange]);

  const defaultClear = useCallback(() => {
    onInputChange("");
  }, [onInputChange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex items-center gap-4">{leftControls}</div>

        <div className="flex items-center gap-2">
          {onDemo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDemo}
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50"
            >
              <Play className="w-4 h-4 mr-2" />
              Demo
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={handlePaste}>
            Paste
          </Button>

          {actionButtons}

          {onSwap && (
            <>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onSwap}
                disabled={!output}
              >
                <ArrowDownUp className="w-4 h-4 mr-2" />
                Swap
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onClear || defaultClear}
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
              {inputHeader}
            </h3>
          </div>
          <Textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={inputPlaceholder}
            className={`font-mono ${inputHeight}`}
            error={outputError}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between min-h-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {outputHeader}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(output)}
              disabled={!output || (outputError !== undefined && !!outputError)}
              className={
                copiedText === output
                  ? "text-green-600 dark:text-green-400 m-0 p-0"
                  : "h-6 py-0"
              }
            >
              {copiedText === output ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copiedText === output ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={outputPlaceholder}
            className={`font-mono ${inputHeight} bg-gray-50 dark:bg-gray-800/50`}
          />
        </div>
      </div>

      {!input && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          <EmptyIcon className="w-12 h-12 mb-4 opacity-20" />
          <p>{emptyStateTitle}</p>
        </div>
      )}
    </div>
  );
}
