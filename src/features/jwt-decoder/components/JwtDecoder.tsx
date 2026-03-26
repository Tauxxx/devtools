import { useState, useMemo, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { ShieldCheck, AlertCircle, Copy, Check, Play } from "lucide-react";
import Textarea from "../../../shared/components/Textarea/Textarea";
import Button from "../../../shared/components/Button/Button";
import { useCopyToClipboard } from "../../../shared/hooks/useCopyToClipboard";

const DEMO_DATA =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const { copiedText, copy } = useCopyToClipboard();

  const decoded = useMemo(() => {
    if (!token) return null;
    try {
      const header = jwtDecode(token, { header: true });
      const payload = jwtDecode(token);
      return {
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        isValid: true,
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Invalid JWT",
        isValid: false,
      };
    }
  }, [token]);

  const handleDemo = useCallback(() => {
    setToken(DEMO_DATA);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            JWT Token
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDemo}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50"
          >
            <Play className="w-4 h-4 mr-2" />
            Demo
          </Button>
        </div>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value.trim())}
          placeholder="Paste your JWT token here..."
          className="font-mono h-32 break-all"
          error={decoded?.isValid === false ? decoded.error : undefined}
        />
      </div>

      {decoded?.isValid && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Header
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copy(decoded.header!)}
                className={
                  copiedText === decoded.header
                    ? "text-green-600 dark:text-green-400"
                    : ""
                }
              >
                {copiedText === decoded.header ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy
              </Button>
            </div>
            <pre className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100 rounded-lg border border-amber-100 dark:border-amber-800/50 font-mono text-sm overflow-auto max-h-[400px]">
              {decoded.header}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Payload
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copy(decoded.payload!)}
                className={
                  copiedText === decoded.payload
                    ? "text-green-600 dark:text-green-400"
                    : ""
                }
              >
                {copiedText === decoded.payload ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy
              </Button>
            </div>
            <pre className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 rounded-lg border border-blue-100 dark:border-blue-800/50 font-mono text-sm overflow-auto max-h-[400px]">
              {decoded.payload}
            </pre>
          </div>
        </div>
      )}

      {!token && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
          <p>Paste a JWT token to decode its contents</p>
        </div>
      )}

      {decoded?.isValid === false && token && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50 flex gap-3 text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-bold">Invalid Token</p>
            <p className="opacity-80">
              This string does not appear to be a valid JWT.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
