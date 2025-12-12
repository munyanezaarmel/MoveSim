import { DEMO_CONTRACTS } from "@/lib/mock-data";
import { Contract } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContractBrowserProps {
  onSelect: (contract: Contract) => void;
  selectedId: string | undefined;
}

export function ContractBrowser({ onSelect, selectedId }: ContractBrowserProps) {
  return (
    <Card className="h-full border-white/10 bg-black/40 backdrop-blur-md flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
          Demo Contracts
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[300px] lg:h-[calc(100vh-200px)]">
          <div className="px-4 pb-4 space-y-2">
            {DEMO_CONTRACTS.map((contract) => (
              <div
                key={contract.address}
                onClick={() => onSelect(contract)}
                className={`group p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedId === contract.address 
                    ? 'bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(var(--color-primary),0.2)]' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${selectedId === contract.address ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-muted-foreground group-hover:text-foreground'}`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className={`font-heading font-medium text-sm ${selectedId === contract.address ? 'text-primary' : 'text-foreground'}`}>
                      {contract.name}
                    </span>
                  </div>
                  {selectedId === contract.address && (
                    <ChevronRight className="w-4 h-4 text-primary animate-in slide-in-from-left-2" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {contract.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {contract.functions.map(f => (
                    <span key={f.name} className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded text-white/50 border border-white/5">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
