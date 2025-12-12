import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Database, Shield, Activity } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-6">
          <Link href="/">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Simulator
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            How MoveSim Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Simulate transactions on the Movement blockchain without spending gas or managing private keys.
          </p>
        </div>

        {/* Core Concept */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <Zap className="w-6 h-6" />
              </div>
              Dual Mode Engine
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Demo Mode:</strong> Uses a sophisticated mock engine to return instant, pre-calculated responses for testing UI flows without network latency.
              <br/><br/>
              <strong>Live Mode:</strong> Connects directly to the Movement Testnet using the Aptos SDK to dry-run transactions against the actual blockchain state.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Database className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
              <div className="bg-accent/20 p-2 rounded-lg text-accent">
                <Database className="w-6 h-6" />
              </div>
              State Simulation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We simulate the transaction execution to predict exactly how the global state will change. 
              See balance updates, resource modifications, and event emissions before you ever sign a transaction.
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-8">
          <h2 className="text-2xl font-heading font-bold border-b border-white/10 pb-4">
            Advanced Capabilities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Activity className="w-8 h-8 text-primary" />
              <h4 className="text-lg font-bold">Gas Profiling</h4>
              <p className="text-sm text-muted-foreground">
                Break down transaction costs into computation, storage, and network fees to optimize your contracts.
              </p>
            </div>
            
            <div className="space-y-3">
              <Shield className="w-8 h-8 text-destructive" />
              <h4 className="text-lg font-bold">Security Scanning</h4>
              <p className="text-sm text-muted-foreground">
                Automatically detects common vulnerabilities and permission errors during simulation.
              </p>
            </div>

            <div className="space-y-3">
              <Zap className="w-8 h-8 text-accent" />
              <h4 className="text-lg font-bold">Instant Feedback</h4>
              <p className="text-sm text-muted-foreground">
                Get results in milliseconds. Iterate on your smart contracts faster than ever before.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
