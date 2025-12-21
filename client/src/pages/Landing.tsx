import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Database, Terminal, Code2, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { LandingPreview } from "@/components/LandingPreview";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-black font-heading text-lg">
            M
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">MoveSim</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/how-it-works">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">How it Works</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="hidden sm:flex border-primary/20 hover:border-primary/50 text-primary hover:text-primary hover:bg-primary/5">
              Launch App
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-32">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Now supporting Movement Testnet
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6"
          >
            The <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Standard</span> for<br />
            Movement Blockchain
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Simulate transactions, debug smart contracts, and analyze gas usage instantly. 
            No wallet required. No real funds needed.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)] transition-all">
                Start Simulating <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-black/20 border-white/10 hover:bg-white/5 rounded-full backdrop-blur-sm">
                View Documentation
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto px-6 mt-32">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Instant Simulation</h3>
              <p className="text-muted-foreground">
                Run transactions against a forked state of the Movement testnet. See exactly what happens before you sign.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Gas Profiling</h3>
              <p className="text-muted-foreground">
                Detailed breakdown of gas consumption. Analyze computation vs storage costs to optimize your Move modules.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-destructive/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Security Checks</h3>
              <p className="text-muted-foreground">
                Automatically detect common vulnerabilities, permission issues, and potential reverts during simulation.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Demo Interface Preview */}
        <div className="max-w-6xl mx-auto px-6 mt-32">
          <div className="relative rounded-xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            
            <div className="pt-10">
              <LandingPreview />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
               <Link href="/dashboard">
                 <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transform hover:scale-105 transition-all">
                   Try Live Demo
                 </Button>
               </Link>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Interactive dashboard preview • No setup required
          </p>
        </div>

      </main>

      <footer className="border-t border-white/5 bg-black/20 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center font-bold text-black font-heading text-xs">
              M
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">MoveSim</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for the Movement Ecosystem.
          </p>
        </div>
      </footer>
    </div>
  );
}
