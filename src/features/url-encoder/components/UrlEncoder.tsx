import { useState, useCallback } from "react";
import { Globe } from "lucide-react";
import { urlEncode, urlDecode } from "../utils/urlUtils";
import TwoPaneEditor from "../../../shared/components/TwoPaneEditor/TwoPaneEditor";
import Button from "../../../shared/components/Button/Button";

const DEMO_DATA = "https://example.com/search?q=hello world & special symbols!";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [encodeAll, setEncodeAll] = useState(true);

  const handleEncode = useCallback(() => {
    setOutput(urlEncode(input, encodeAll));
  }, [input, encodeAll]);

  const handleDecode = useCallback(() => {
    setOutput(urlDecode(input));
  }, [input]);

  const handleSwap = useCallback(() => {
    const oldInput = input;
    setInput(output);
    setOutput(oldInput);
  }, [input, output]);

  const handleDemo = useCallback(() => {
    setInput(DEMO_DATA);
    setOutput("");
  }, []);

  const leftControls = (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={encodeAll}
        onChange={(e) => setEncodeAll(e.target.checked)}
        className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-700 focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Encode all characters
      </span>
    </label>
  );

  const actionButtons = (
    <>
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
    </>
  );

  return (
    <TwoPaneEditor
      input={input}
      onInputChange={setInput}
      output={output}
      onDemo={handleDemo}
      onSwap={handleSwap}
      leftControls={leftControls}
      actionButtons={actionButtons}
      inputPlaceholder="Paste URL or text here..."
      inputHeight="h-64"
      emptyStateIcon={Globe}
      emptyStateTitle="Enter a URL/text or click Demo to encode/decode"
    />
  );
}
