import { useState, useCallback } from "react";
import { FileJson } from "lucide-react";
import { minifyJson } from "../utils/jsonFormatter";
import TwoPaneEditor from "../../../shared/components/TwoPaneEditor/TwoPaneEditor";

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

  const { formatted, error } = minifyJson(input);

  const handleDemo = useCallback(() => {
    setInput(DEMO_DATA);
  }, []);

  return (
    <TwoPaneEditor
      input={input}
      onInputChange={setInput}
      output={formatted}
      outputError={error}
      onDemo={handleDemo}
      inputPlaceholder="Paste your JSON here..."
      outputHeader="Minified Output"
      outputPlaceholder="Minified JSON will appear here..."
      emptyStateIcon={FileJson}
      emptyStateTitle="Paste some JSON or click Demo to minify"
    />
  );
}
