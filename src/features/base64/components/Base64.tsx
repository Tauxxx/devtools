import { useState, useCallback } from "react";
import { FileText } from "lucide-react";
import { encodeBase64, decodeBase64 } from "../utils/base64Utils";
import TwoPaneEditor from "../../../shared/components/TwoPaneEditor/TwoPaneEditor";
import Button from "../../../shared/components/Button/Button";

const DEMO_DATA = "Hello, this is a secret message! 🤫";

export default function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = useCallback(() => {
    setOutput(encodeBase64(input));
  }, [input]);

  const handleDecode = useCallback(() => {
    setOutput(decodeBase64(input));
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
      inputPlaceholder="Paste text or Base64 here..."
      inputHeight="h-64"
      emptyStateIcon={FileText}
      emptyStateTitle="Enter text to encode or Base64 to decode"
    />
  );
}
