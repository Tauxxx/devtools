import { useState, useCallback } from "react";
import { FileJson } from "lucide-react";
import { formatJson } from "../utils/jsonFormatter";
import TwoPaneEditor from "../../../shared/components/TwoPaneEditor/TwoPaneEditor";

const DEMO_DATA = `{"name":"John Doe","age":30,"email":"john.doe@example.com","isDeveloper":true,"skills":["React","TypeScript","Node.js"],"address":{"street":"123 Main St","city":"Anytown","country":"USA"}}`;

export default function JsonBeautify() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);

  const { formatted, error } = formatJson(input, indent);

  const handleDemo = useCallback(() => {
    setInput(DEMO_DATA);
  }, []);

  const leftControls = (
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
        className="block w-24 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 border p-1"
      >
        <option value={2}>2 Spaces</option>
        <option value={4}>4 Spaces</option>
        <option value={8}>8 Spaces</option>
        <option value={0}>Tab</option>
      </select>
    </div>
  );

  return (
    <TwoPaneEditor
      input={input}
      onInputChange={setInput}
      output={formatted}
      outputError={error}
      onDemo={handleDemo}
      leftControls={leftControls}
      inputPlaceholder="Paste your JSON here..."
      outputHeader="Formatted Output"
      outputPlaceholder="Formatted JSON will appear here..."
      emptyStateIcon={FileJson}
      emptyStateTitle="Paste some JSON or click Demo to get started"
    />
  );
}
