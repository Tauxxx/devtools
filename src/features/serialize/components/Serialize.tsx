import { useState, useCallback } from "react";
import { FileCode } from "lucide-react";
import { phpSerialize, phpUnserialize } from "../utils/serializeUtils";
import TwoPaneEditor from "../../../shared/components/TwoPaneEditor/TwoPaneEditor";
import Button from "../../../shared/components/Button/Button";

const DEMO_DATA =
  'a:3:{s:4:"name";s:8:"John Doe";s:3:"age";i:30;s:7:"isAdmin";b:1;}';

export default function Serialize() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleUnserialize = useCallback(() => {
    setOutput(phpUnserialize(input));
  }, [input]);

  const handleSerialize = useCallback(() => {
    setOutput(phpSerialize(input));
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
        onClick={handleUnserialize}
        disabled={!input}
      >
        Unserialize (PHP to JSON)
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleSerialize}
        disabled={!input}
      >
        Serialize (JSON to PHP)
      </Button>
    </>
  );

  return (
    <TwoPaneEditor
      input={input}
      onInputChange={setInput}
      output={output}
      outputError={output.startsWith("Error:") ? output : undefined}
      onDemo={handleDemo}
      onSwap={handleSwap}
      actionButtons={actionButtons}
      inputPlaceholder="Paste PHP serialized data or JSON here..."
      inputHeight="h-64"
      emptyStateIcon={FileCode}
      emptyStateTitle="Paste PHP serialized data to convert to JSON, or JSON to serialize"
    />
  );
}
