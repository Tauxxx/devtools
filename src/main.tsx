import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Buffer } from "buffer";
import "./app/index.css";
import App from "./app/App.tsx";
import { ThemeProvider } from "./shared/contexts/ThemeContext.tsx";

// Polyfill Buffer for php-serialize
window.Buffer = window.Buffer || Buffer;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="devtools-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
