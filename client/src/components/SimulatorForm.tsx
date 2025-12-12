import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Loader2, Code2 } from "lucide-react";
import { Contract } from "@/lib/types";
import { useState } from "react";

interface SimulatorFormProps {
  onSimulate: (data: any) => void;
  loading: boolean;
  selectedContract: Contract | null;
}

export function SimulatorForm({ onSimulate, loading, selectedContract }: SimulatorFormProps) {
  const [sender, setSender] = useState("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1");
  const [selectedFunc, setSelectedFunc] = useState<string>("");
  const [args, setArgs] = useState<Record<string, string>>({});

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const func = selectedContract?.functions.find(f => f.name === selectedFunc);
    
    // Convert args to array based on function params order
    const argsArray = func ? func.params.map(p => args[p.name] || "") : [];

    onSimulate({
      sender,
      contractAddress: selectedContract?.address || "",
      moduleName: func?.module || "",
      functionName: func?.name || "",
      args: argsArray
    });
  };

  const handleFuncChange = (value: string) => {
    setSelectedFunc(value);
    setArgs({}); // Reset args
  };

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-md h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Transaction Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSimulate} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sender">Sender Address</Label>
            <div className="relative">
              <Input 
                id="sender" 
                value={sender} 
                onChange={(e) => setSender(e.target.value)}
                className="font-mono text-xs bg-white/5 border-white/10 pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
                YOU
              </div>
            </div>
          </div>

          {!selectedContract ? (
            <div className="p-8 border-2 border-dashed border-white/10 rounded-lg text-center text-muted-foreground">
              Select a contract from the browser on the left to begin
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Function</Label>
                <Select value={selectedFunc} onValueChange={handleFuncChange}>
                  <SelectTrigger className="bg-white/5 border-white/10 font-mono text-sm">
                    <SelectValue placeholder="Select function" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedContract.functions.map((f) => (
                      <SelectItem key={f.name} value={f.name} className="font-mono text-xs">
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedFunc && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedContract.functions.find(f => f.name === selectedFunc)?.description}
                  </p>
                )}
              </div>

              {selectedFunc && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="border-t border-white/10 pt-4">
                    <Label className="mb-3 block text-xs uppercase tracking-wider text-muted-foreground">Parameters</Label>
                    <div className="space-y-4">
                      {selectedContract.functions.find(f => f.name === selectedFunc)?.params.map((param) => (
                        <div key={param.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <Label htmlFor={param.name} className="font-mono text-primary">{param.name}</Label>
                            <span className="text-muted-foreground italic">{param.type}</span>
                          </div>
                          <Input 
                            id={param.name}
                            placeholder={`e.g. ${param.example}`}
                            value={args[param.name] || ""}
                            onChange={(e) => setArgs({...args, [param.name]: e.target.value})}
                            className="bg-white/5 border-white/10 font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 mt-6"
                disabled={loading || !selectedFunc}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Simulate Transaction
                  </>
                )}
              </Button>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
