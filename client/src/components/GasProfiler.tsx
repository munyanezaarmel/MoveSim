import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from "@/components/ui/card";

interface GasProfilerProps {
  breakdown: {
    computation: number;
    storage: number;
    network: number;
  };
  total: number;
}

export function GasProfiler({ breakdown, total }: GasProfilerProps) {
  const data = [
    { name: 'Computation', value: breakdown.computation, color: 'hsl(var(--color-primary))' }, // Neon Green
    { name: 'Storage', value: breakdown.storage, color: 'hsl(var(--color-accent))' }, // Electric Blue
    { name: 'Network', value: breakdown.network, color: 'hsl(var(--color-chart-3))' }, // Purple
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-heading font-medium mb-1">Gas Breakdown</h4>
          <p className="text-sm text-muted-foreground">Detailed analysis of transaction costs</p>
        </div>

        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="bg-white/5 rounded p-3 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-sm font-mono">
                {item.value} <span className="text-muted-foreground text-xs">units</span>
              </div>
            </div>
          ))}
          <div className="border-t border-white/10 pt-3 flex items-center justify-between px-3">
            <span className="font-medium text-sm">Total</span>
            <span className="font-mono font-bold text-primary">{total} units</span>
          </div>
        </div>
      </div>
    </div>
  );
}
