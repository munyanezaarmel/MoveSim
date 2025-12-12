import { AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SecurityScannerProps {
  warning?: string;
  safe: boolean;
}

export function SecurityScanner({ warning, safe }: SecurityScannerProps) {
  if (safe && !warning) {
    return (
      <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-green-500" />
        <div>
          <h4 className="text-sm font-semibold text-green-500 mb-0.5">Security Check Passed</h4>
          <p className="text-xs text-green-500/70">No common vulnerabilities detected in simulation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
      <ShieldAlert className="w-5 h-5 text-yellow-500 mt-0.5" />
      <div>
        <h4 className="text-sm font-semibold text-yellow-500 mb-1">Security Warning Detected</h4>
        <p className="text-sm text-yellow-500/80">{warning}</p>
        <div className="mt-2 text-xs bg-black/40 p-2 rounded text-yellow-500/60 border border-yellow-500/10">
          Recommendation: Review function access controls and input validation.
        </div>
      </div>
    </div>
  );
}
