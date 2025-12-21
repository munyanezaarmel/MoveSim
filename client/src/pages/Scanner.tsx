import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, CheckCircle2, AlertOctagon, Info, ArrowLeft, Bug } from "lucide-react";
import Editor from "@monaco-editor/react";
import { analyzeMoveCode, DEMO_VULNERABLE_CODE, Vulnerability } from "@/lib/security";
import { motion } from "framer-motion";

export default function Scanner() {
  const [code, setCode] = useState(DEMO_VULNERABLE_CODE);
  const [issues, setIssues] = useState<Vulnerability[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate processing time
    setTimeout(() => {
      const results = analyzeMoveCode(code);
      setIssues(results);
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-foreground font-sans">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                 <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                 <span className="font-heading font-bold text-lg">Back to Simulator</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Shield className="w-5 h-5" />
            <span className="font-bold tracking-wide">Security Scanner Plus</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-5rem)]">
        
        {/* Left: Editor */}
        <div className="flex flex-col gap-4 h-full">
          <Card className="border-white/10 bg-black/40 backdrop-blur-md flex-1 flex flex-col overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-white/5 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <CardTitle className="text-sm font-mono">Move Contract Editor</CardTitle>
              </div>
              <Button size="sm" onClick={() => setCode(DEMO_VULNERABLE_CODE)} variant="ghost" className="h-7 text-xs text-muted-foreground">
                Reset Demo Code
              </Button>
            </CardHeader>
            <div className="flex-1 bg-[#1e1e1e]">
              <Editor
                height="100%"
                defaultLanguage="rust" // Move syntax is similar to Rust
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'JetBrains Mono',
                  padding: { top: 16 }
                }}
              />
            </div>
            <div className="p-4 border-t border-white/5 bg-black/20">
              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="w-full bg-primary text-primary-foreground font-bold h-12 text-lg hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)] transition-all"
              >
                {isScanning ? "Scanning..." : "Scan Contract Code"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Results */}
        <div className="flex flex-col gap-4 h-full overflow-y-auto">
          {!issues && !isScanning && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-12 text-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
              <Bug className="w-16 h-16 mb-4 opacity-20" />
              <h3 className="text-xl font-heading font-medium mb-2">Ready to Scan</h3>
              <p className="max-w-md">
                Paste your Move smart contract code on the left and click "Scan" to detect vulnerabilities.
              </p>
            </div>
          )}

          {isScanning && (
            <div className="h-full flex flex-col items-center justify-center gap-4">
               <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
               </div>
               <p className="font-mono text-primary animate-pulse">Running Static Analysis...</p>
            </div>
          )}

          {issues && !isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">Total Issues</span>
                  <div className="text-2xl font-bold font-mono">{issues.length}</div>
                </div>
                <div className="bg-destructive/10 px-4 py-2 rounded-lg border border-destructive/20">
                  <span className="text-destructive text-xs uppercase tracking-wider">Critical</span>
                  <div className="text-2xl font-bold font-mono text-destructive">
                    {issues.filter(i => i.severity === "CRITICAL").length}
                  </div>
                </div>
              </div>

              {issues.length === 0 ? (
                 <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-500">No Issues Found</h3>
                    <p className="text-green-500/70">Your code passed all basic security checks.</p>
                 </div>
              ) : (
                issues.map((issue, idx) => (
                  <Card key={idx} className="border-white/10 bg-white/5 overflow-hidden">
                    <div className={`h-1 w-full ${
                      issue.severity === 'CRITICAL' ? 'bg-red-600' :
                      issue.severity === 'HIGH' ? 'bg-orange-500' :
                      issue.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {issue.severity === 'CRITICAL' ? <AlertOctagon className="w-5 h-5 text-red-600" /> :
                           issue.severity === 'HIGH' ? <AlertTriangle className="w-5 h-5 text-orange-500" /> :
                           <Info className="w-5 h-5 text-blue-500" />
                          }
                          <span className={`font-bold text-sm px-2 py-0.5 rounded ${
                            issue.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                            issue.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                            issue.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'
                          }`}>
                            {issue.severity}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground bg-black/50 px-2 py-0.5 rounded">
                            Line {issue.line}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-1">{issue.title}</h4>
                      <p className="text-muted-foreground text-sm mb-3">{issue.description}</p>
                      
                      <div className="bg-black/30 p-3 rounded border border-white/5">
                        <div className="flex items-center gap-2 mb-1 text-xs text-primary font-bold uppercase tracking-wider">
                          <Shield className="w-3 h-3" /> Suggestion
                        </div>
                        <p className="text-sm font-mono text-primary/80">
                          {issue.suggestion}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
