import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Atom, Cpu, Database } from 'lucide-react';

const quantumStats = [
  { label: 'Qubits Available', value: '1024', icon: Atom, color: 'text-accent-cyan' },
  { label: 'Coherence Time', value: '100μs', icon: Zap, color: 'text-accent-purple' },
  { label: 'Gate Fidelity', value: '99.8%', icon: Cpu, color: 'text-accent-green' },
  { label: 'Error Rate', value: '0.02%', icon: Database, color: 'text-yellow-400' }
];

export const QuantumVisualizer: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Card className="p-6 bg-glass backdrop-blur-xl border-glass">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-accent-cyan mb-2">
            Quantum System Status
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time quantum processor metrics
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {quantumStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isActive = index === activeIndex;
            
            return (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto p-3 flex flex-col items-center space-y-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent-cyan/10 border border-accent-cyan/30' 
                    : 'hover:bg-secondary/50'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
                <div className="text-center">
                  <div className={`font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="text-center">
          <div className="text-xs text-muted-foreground">
            Status: <span className="text-accent-green">Operational</span>
          </div>
        </div>
      </div>
    </Card>
  );
};