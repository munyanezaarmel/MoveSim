import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { ContractBrowser } from "@/components/ContractBrowser";
import { SimulatorForm } from "@/components/SimulatorForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import { Contract, SimulationResult } from "@/lib/types";
import { simulateTransaction } from "@/lib/simulator";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState(true);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const { toast } = useToast();

  const handleSimulate = async (data: any) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await simulateTransaction({ ...data, demoMode });
      setResult(res);
      
      if (res.success) {
        toast({
          title: "Simulation Complete",
          description: `Transaction would succeed using ${res.gasUsed} gas units.`,
          variant: "default",
          className: "bg-primary/10 border-primary/20 text-primary"
        });
      } else {
        toast({
          title: "Simulation Failed",
          description: res.message || "Transaction would revert.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to run simulation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-foreground font-sans selection:bg-primary/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-black font-heading text-lg">
                  M
                </div>
                <span className="font-heading font-bold text-xl tracking-tight">MoveSim</span>
              </div>
            </Link>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-muted-foreground ml-2">Beta</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/how-it-works">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-primary">
                <Info className="w-4 h-4 mr-2" />
                How It Works
              </Button>
            </Link>
            <ModeToggle demoMode={demoMode} setDemoMode={setDemoMode} />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-[1600px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-7rem)]">
          
          {/* Left Sidebar: Contract Browser */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 h-full"
          >
            <ContractBrowser 
              onSelect={(c) => {
                setSelectedContract(c);
                setResult(null);
              }}
              selectedId={selectedContract?.address}
            />
          </motion.div>

          {/* Middle: Simulator Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 h-full"
          >
            <SimulatorForm 
              onSimulate={handleSimulate} 
              loading={loading}
              selectedContract={selectedContract}
            />
          </motion.div>

          {/* Right: Results Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 h-full"
          >
            <ResultsPanel result={result} loading={loading} />
          </motion.div>

        </div>
      </main>
    </div>
  );
}
