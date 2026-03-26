import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FileJson,
  Hash,
  Lock,
  Globe,
  Code2,
  FileCode,
  LayoutGrid,
  ChevronRight,
  FileText,
  Fingerprint,
  ShieldCheck,
  Moon,
  Sun,
  Laptop,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../shared/utils/cn";
import { useTheme } from "../shared/contexts/ThemeContext";

const tools = [
  { name: "Home", path: "/", icon: LayoutGrid },
  { name: "JSON Beautify", path: "/json-beautify", icon: FileJson },
  { name: "JSON Minify", path: "/json-minify", icon: FileJson },
  { name: "Hash Generator", path: "/hash-generator", icon: Hash },
  { name: "Password Generator", path: "/password-generator", icon: Lock },
  { name: "UUID Generator", path: "/uuid-generator", icon: Fingerprint },
  { name: "JWT Decoder", path: "/jwt-decoder", icon: ShieldCheck },
  { name: "URL Encoder/Decoder", path: "/url-encoder", icon: Globe },
  { name: "HTML Entities", path: "/html-entities", icon: Code2 },
  { name: "Base64 Encoder", path: "/base64", icon: FileText },
  { name: "Serialize/Unserialize", path: "/serialize", icon: FileCode },
];

export default function MainLayout() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed inset-y-0 transition-transform duration-300 z-30",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code2 className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">DevTools</h1>
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {tools.map((tool) => {
            const isActive = location.pathname === tool.path;
            const Icon = tool.icon;

            return (
              <Link
                key={tool.path}
                to={tool.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500",
                  )}
                />
                {tool.name}
                {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-1">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "p-2 rounded-md transition-colors",
              theme === "light"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
            title="Light Theme"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "p-2 rounded-md transition-colors",
              theme === "dark"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
            title="Dark Theme"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "p-2 rounded-md transition-colors",
              theme === "system"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
            title="System Theme"
          >
            <Laptop className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 md:px-8 sticky top-0 z-10 transition-colors">
          <button
            className="md:hidden mr-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold">
            {tools.find((t) => t.path === location.pathname)?.name ||
              "DevTools"}
          </h2>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>

        <footer className="py-6 px-4 md:px-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 transition-colors">
          <p>© {new Date().getFullYear()} DevTools - Offline First & Private</p>
        </footer>
      </main>
    </div>
  );
}
