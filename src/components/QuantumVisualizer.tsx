import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface QuantumState {
  amplitude: number;
  phase: number;
  x: number;
  y: number;
}

export const QuantumVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [quantumStates, setQuantumStates] = useState<QuantumState[]>([]);

  useEffect(() => {
    initializeQuantumStates();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const initializeQuantumStates = () => {
    const states: QuantumState[] = [];
    const numStates = 8;
    
    for (let i = 0; i < numStates; i++) {
      states.push({
        amplitude: Math.random() * 0.8 + 0.2,
        phase: (i / numStates) * Math.PI * 2,
        x: Math.cos((i / numStates) * Math.PI * 2) * 80,
        y: Math.sin((i / numStates) * Math.PI * 2) * 80
      });
    }
    
    setQuantumStates(states);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    // Draw quantum states
    quantumStates.forEach((state, index) => {
      const x = centerX + state.x * Math.cos(time + state.phase);
      const y = centerY + state.y * Math.sin(time + state.phase);
      
      // Draw quantum particle
      ctx.beginPath();
      ctx.arc(x, y, state.amplitude * 10, 0, Math.PI * 2);
      
      // Create gradient for quantum effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, state.amplitude * 20);
      gradient.addColorStop(0, `hsla(${(index * 45 + time * 50) % 360}, 70%, 60%, 0.8)`);
      gradient.addColorStop(1, `hsla(${(index * 45 + time * 50) % 360}, 70%, 60%, 0.1)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw connection lines
      if (index > 0) {
        const prevState = quantumStates[index - 1];
        const prevX = centerX + prevState.x * Math.cos(time + prevState.phase);
        const prevY = centerY + prevState.y * Math.sin(time + prevState.phase);
        
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `hsla(180, 50%, 50%, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw central quantum core
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
    coreGradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
    coreGradient.addColorStop(1, 'rgba(0, 255, 255, 0.1)');
    ctx.fillStyle = coreGradient;
    ctx.fill();

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      animate();
    }
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    initializeQuantumStates();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <Card className="p-6 bg-glass backdrop-blur-xl border-glass">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-accent-cyan">
            Quantum State Visualizer
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAnimation}
              className="border-accent-cyan/20 hover:border-accent-cyan"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetAnimation}
              className="border-accent-cyan/20 hover:border-accent-cyan"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            className="w-full h-48 bg-gradient-to-br from-background/5 to-background/20 rounded-lg border border-glass"
          />
          
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                onClick={toggleAnimation}
                className="text-accent-cyan hover:bg-accent-cyan/10"
              >
                <Play className="w-8 h-8" />
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Interactive quantum state superposition visualization showing entangled particles
        </p>
      </div>
    </Card>
  );
};