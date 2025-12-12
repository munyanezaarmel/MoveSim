import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap, Radio } from "lucide-react";
import { motion } from "framer-motion";

interface ModeToggleProps {
  demoMode: boolean;
  setDemoMode: (value: boolean) => void;
}

export function ModeToggle({ demoMode, setDemoMode }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-4 bg-secondary/30 p-2 rounded-lg border border-white/5 backdrop-blur-sm">
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${demoMode ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => setDemoMode(true)}
      >
        <Zap className="h-4 w-4" />
        <span className="text-sm font-medium">Demo Mode</span>
      </div>
      
      <Switch 
        checked={!demoMode}
        onCheckedChange={(checked) => setDemoMode(!checked)}
        className="data-[state=checked]:bg-blue-500"
      />
      
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${!demoMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => setDemoMode(false)}
      >
        <Radio className="h-4 w-4" />
        <span className="text-sm font-medium">Live Mode</span>
      </div>

      {demoMode && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-muted-foreground ml-2 hidden sm:block"
        >
          (Mock Data • Instant)
        </motion.div>
      )}
      {!demoMode && (
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-muted-foreground ml-2 hidden sm:block"
        >
          (Testnet • ~2s)
        </motion.div>
      )}
    </div>
  );
}
