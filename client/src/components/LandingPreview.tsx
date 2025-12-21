import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ChevronRight, Play, CheckCircle2, Clock, Fuel, Database } from "lucide-react";

export function LandingPreview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 text-left">
      {/* Left Sidebar Mock */}
      <div className="lg:col-span-3 hidden lg:block">
        <Card className="h-full border-white/10 bg-black/40 backdrop-blur-md">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Demo Contracts
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-2">
            <div className="space-y-2">
              <div className="p-2 rounded-lg border bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-primary text-primary-foreground">
                      <FileText className="w-3 h-3" />
                    </div>
                    <span className="font-heading font-medium text-xs text-primary">
                      MOVE Coin
                    </span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-primary" />
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-1 mb-1">
                  Native Movement blockchain token
                </p>
                <span className="text-[8px] font-mono bg-black/30 px-1 py-0.5 rounded text-white/50 border border-white/5">
                  transfer
                </span>
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="p-2 rounded-lg border bg-white/5 border-white/5 opacity-50">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-white/10 text-muted-foreground">
                        <FileText className="w-3 h-3" />
                      </div>
                      <span className="font-heading font-medium text-xs text-foreground">
                        Demo Contract {i}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-16 bg-white/10 rounded mt-1"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Form Mock */}
      <div className="lg:col-span-5 col-span-12">
        <Card className="border-white/10 bg-black/40 backdrop-blur-md h-full">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              Transaction Details
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Sender Address</Label>
              <div className="relative">
                <div className="h-8 w-full bg-white/5 border border-white/10 rounded flex items-center px-3 text-xs font-mono text-muted-foreground">
                  0x742d...f0bEb1
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-muted-foreground bg-white/5 px-1 py-0.5 rounded">
                  YOU
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Function</Label>
              <div className="h-8 w-full bg-white/5 border border-white/10 rounded flex items-center px-3 text-xs font-mono text-foreground">
                transfer
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/5 space-y-3">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground block">Parameters</Label>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-mono text-primary">to</span>
                  <span className="text-muted-foreground italic">address</span>
                </div>
                <div className="h-7 w-full bg-black/20 border border-white/5 rounded flex items-center px-2 text-xs font-mono text-muted-foreground">
                  0x8123...
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-mono text-primary">amount</span>
                  <span className="text-muted-foreground italic">u64</span>
                </div>
                <div className="h-7 w-full bg-black/20 border border-white/5 rounded flex items-center px-2 text-xs font-mono text-muted-foreground">
                  100000000
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground font-bold h-9 text-xs">
              <Play className="w-3 h-3 mr-2" />
              Simulate Transaction
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Results Mock */}
      <div className="lg:col-span-4 hidden lg:block">
        <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden h-full">
          <div className="p-4 border-b border-white/5 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-heading font-semibold text-primary">
                  Success
                </h2>
                <p className="text-[10px] text-muted-foreground">
                  Transfer would succeed!
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
             <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 rounded p-2 border border-white/5">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1 text-[8px] uppercase tracking-wider">
                    <Fuel className="w-2 h-2" /> Cost
                  </div>
                  <div className="text-xs font-mono">0.002 MOVE</div>
                </div>
                <div className="bg-white/5 rounded p-2 border border-white/5">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1 text-[8px] uppercase tracking-wider">
                    <Database className="w-2 h-2" /> Writes
                  </div>
                  <div className="text-xs font-mono">2</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">State Changes</h3>
                <div className="bg-white/5 rounded border border-white/5 overflow-hidden">
                    <div className="bg-black/20 p-2 border-b border-white/5 flex items-center justify-between">
                      <div className="font-mono text-[8px] text-muted-foreground">0x742d...</div>
                    </div>
                    <div className="p-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Balance</span>
                        <span className="font-mono text-destructive font-bold">-0.1 MOVE</span>
                    </div>
                </div>
                 <div className="bg-white/5 rounded border border-white/5 overflow-hidden">
                    <div className="bg-black/20 p-2 border-b border-white/5 flex items-center justify-between">
                      <div className="font-mono text-[8px] text-muted-foreground">0x8123...</div>
                    </div>
                    <div className="p-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Balance</span>
                        <span className="font-mono text-primary font-bold">+0.1 MOVE</span>
                    </div>
                </div>
              </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
