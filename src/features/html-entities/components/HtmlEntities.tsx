import { useState, useCallback } from "react";
import { Code2 } from "lucide-react";
import { encodeHtmlEntities, decodeHtmlEntities } from "../utils/htmlUtils";
import TwoPaneEditor from "../../../shared/components/TwoPaneEditor/TwoPaneEditor";
import Button from "../../../shared/components/Button/Button";

const DEMO_DATA =
  '<div>\n  <p>Hello & welcome to "DevTools" © 2026!</p>\n  <span>It\'s < 100% finished, but > 90% done.</span>\n</div>';

export default function HtmlEntities() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = useCallback(() => {
    setOutput(encodeHtmlEntities(input));
  }, [input]);

  const handleDecode = useCallback(() => {
    setOutput(decodeHtmlEntities(input));
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
      actionButtons={actionButtons}
      inputPlaceholder="Paste text or HTML here..."
      inputHeight="h-64"
      emptyStateIcon={Code2}
      emptyStateTitle="Enter text to encode or HTML entities to decode"
    />
  );
}
