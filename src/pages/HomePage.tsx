import { Link } from "react-router-dom";
import {
  FileJson,
  Hash,
  Lock,
  Globe,
  Code2,
  FileCode,
  ArrowRight,
  FileText,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";

const tools = [
  {
    name: "JSON Beautify",
    description: "Format and validate JSON to make it readable.",
    path: "/json-beautify",
    icon: FileJson,
    color: "bg-blue-500",
  },
  {
    name: "JSON Minify",
    description: "Compress JSON by removing whitespace.",
    path: "/json-minify",
    icon: FileJson,
    color: "bg-indigo-500",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes from text.",
    path: "/hash-generator",
    icon: Hash,
    color: "bg-emerald-500",
  },
  {
    name: "Password Generator",
    description: "Create secure, random passwords with custom settings.",
    path: "/password-generator",
    icon: Lock,
    color: "bg-amber-500",
  },
  {
    name: "UUID Generator",
    description: "Generate unique identifiers (UUID v4).",
    path: "/uuid-generator",
    icon: Fingerprint,
    color: "bg-fuchsia-500",
  },
  {
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens.",
    path: "/jwt-decoder",
    icon: ShieldCheck,
    color: "bg-pink-500",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode or decode URL components safely.",
    path: "/url-encoder",
    icon: Globe,
    color: "bg-cyan-500",
  },
  {
    name: "HTML Entities",
    description: "Encode or decode HTML entities.",
    path: "/html-entities",
    icon: Code2,
    color: "bg-orange-500",
  },
  {
    name: "Base64 Encoder",
    description: "Encode or decode text to Base64 format.",
    path: "/base64",
    icon: FileText,
    color: "bg-rose-500",
  },
  {
    name: "Serialize/Unserialize",
    description: "Convert PHP-like serialized data to readable format.",
    path: "/serialize",
    icon: FileCode,
    color: "bg-purple-500",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to DevTools
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          A collection of essential tools for developers. Everything runs in
          your browser, ensuring your data never leaves your computer. Fast,
          secure, and private.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.path}
              to={tool.path}
              className="group bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div
                className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4 text-white shadow-inner group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {tool.description}
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                Open Tool
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
