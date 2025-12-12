import { SimulationResult } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Clock, Fuel, Database, ArrowRight, FileJson } from "lucide-react";
import { GasProfiler } from "./GasProfiler";
import { SecurityScanner } from "./SecurityScanner";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";

interface ResultsPanelProps {
  result: SimulationResult | null;
  loading: boolean;
}

export function ResultsPanel({ result, loading }: ResultsPanelProps) {
  if (loading) {
    return (
      <Card className="h-full border-white/10 bg-black/40 backdrop-blur-md">
        <CardContent className="flex flex-col items-center justify-center h-[400px] gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-muted-foreground animate-pulse">Simulating transaction...</p>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="h-full border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-center items-center text-center p-8">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <ZapIcon className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-heading font-medium text-foreground mb-2">Ready to Simulate</h3>
        <p className="text-muted-foreground max-w-xs">
          Enter transaction details or select a demo contract to see what happens before you sign.
        </p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
        {/* Header Status */}
        <div className={`p-6 border-b border-white/5 ${result.success ? 'bg-primary/5' : 'bg-destructive/5'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {result.success ? (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center text-destructive">
                  <XCircle className="w-6 h-6" />
                </div>
              )}
              <div>
                <h2 className={`text-xl font-heading font-semibold ${result.success ? 'text-primary' : 'text-destructive'}`}>
                  {result.success ? 'Simulation Successful' : 'Transaction Failed'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {result.message || (result.error?.message)}
                </p>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex flex-col items-end">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Gas Used</span>
                <span className="font-mono font-medium">{result.gasUsed.toLocaleString()} units</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Cost</span>
                <span className="font-mono font-medium text-primary">{result.gasCostMOVE} MOVE</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <div className="px-6 pt-4 border-b border-white/5">
            <TabsList className="bg-transparent h-auto p-0 gap-6">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground pb-3 px-0"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="state" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground pb-3 px-0"
              >
                State Changes
                <span className="ml-2 bg-white/10 text-xs px-1.5 py-0.5 rounded-full">{result.stateChanges.length}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="gas" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground pb-3 px-0"
              >
                Gas Profile
              </TabsTrigger>
              <TabsTrigger 
                value="raw" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground pb-3 px-0"
              >
                Raw JSON
              </TabsTrigger>
              {result.error && (
                <TabsTrigger 
                  value="debug" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-destructive data-[state=active]:bg-transparent data-[state=active]:text-destructive pb-3 px-0"
                >
                  Debugger
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="overview" className="mt-0 space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 text-xs uppercase tracking-wider">
                    <Clock className="w-3 h-3" /> Execution Time
                  </div>
                  <div className="text-2xl font-mono">{result.executionTime}ms</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 text-xs uppercase tracking-wider">
                    <Fuel className="w-3 h-3" /> USD Cost
                  </div>
                  <div className="text-2xl font-mono">{result.gasCostUSD}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 text-xs uppercase tracking-wider">
                    <Database className="w-3 h-3" /> State Writes
                  </div>
                  <div className="text-2xl font-mono">{result.stateChanges.length}</div>
                </div>
              </div>

              {/* Security Warning */}
              {result.securityWarning && (
                <SecurityScanner warning={result.securityWarning} safe={false} />
              )}
              {!result.securityWarning && result.success && (
                <SecurityScanner safe={true} />
              )}

              {/* Events Preview */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Emitted Events</h3>
                {result.events.length > 0 ? (
                  <div className="space-y-2">
                    {result.events.map((event, i) => (
                      <div key={i} className="font-mono text-xs bg-black/50 p-3 rounded border border-white/10 flex gap-4">
                        <span className="text-primary shrink-0">{event.type.split('::').pop()}</span>
                        <span className="text-muted-foreground truncate">{JSON.stringify(event.data)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground italic">No events emitted</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="state" className="mt-0">
              <div className="space-y-4">
                {result.stateChanges.map((change, i) => (
                  <div key={i} className="bg-white/5 rounded-lg border border-white/5 overflow-hidden">
                    <div className="bg-black/20 p-3 border-b border-white/5 flex items-center justify-between">
                      <div className="font-mono text-xs text-muted-foreground">{change.address}</div>
                      <div className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/80">{change.resource.split('<')[0].split('::').pop()}</div>
                    </div>
                    <div className="p-4 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Before</div>
                        <div className="font-mono text-sm">{change.before}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <ArrowRight className="w-4 h-4 text-muted-foreground mb-1" />
                        <span className={`text-xs font-bold ${change.change.startsWith('-') ? 'text-destructive' : 'text-primary'}`}>
                          {change.changeFormatted || change.change}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">After</div>
                        <div className="font-mono text-sm">{change.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {result.stateChanges.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No state changes recorded.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="gas" className="mt-0">
               {result.gasBreakdown && (
                 <GasProfiler breakdown={result.gasBreakdown} total={result.gasUsed} />
               )}
            </TabsContent>

            <TabsContent value="raw" className="mt-0 h-[400px]">
              <Editor
                height="100%"
                defaultLanguage="json"
                theme="vs-dark"
                value={JSON.stringify(result, null, 2)}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 12,
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: { top: 16, bottom: 16 }
                }}
              />
            </TabsContent>

            <TabsContent value="debug" className="mt-0">
              {result.error && (
                <div className="space-y-4">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <h3 className="text-destructive font-mono font-bold mb-2">{result.error.type} (Code: {result.error.code})</h3>
                    <p className="text-destructive/80 mb-4">{result.error.message}</p>
                    <div className="bg-black/50 p-3 rounded font-mono text-xs text-destructive/70 mb-2">
                      at {result.error.location}:{result.error.line}
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h4 className="text-primary font-medium mb-2 flex items-center gap-2">
                      <ZapIcon className="w-4 h-4" /> AI Suggestion
                    </h4>
                    <p className="text-sm text-primary/80">{result.error.suggestion}</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </motion.div>
  );
}

function ZapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
