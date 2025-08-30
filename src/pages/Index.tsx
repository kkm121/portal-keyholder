import { useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { DynamicBackground } from "@/components/DynamicBackground";

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      // Preserve the hash so Supabase can use the token
      window.location.replace(`/reset-password${hash}`);
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <DynamicBackground />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-quantum bg-clip-text text-transparent">
            QuantumCloud
          </h1>
          <p className="text-accent-cyan font-medium text-lg">
            Next-Gen Quantum Computing Services
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Harness the power of quantum algorithms for your business
          </p>
        </div>
        
        <LoginForm />
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2024 QuantumCloud Technologies. All rights reserved.</p>
          <p className="mt-1 text-accent-cyan">Powered by Quantum Computing</p>
        </div>
      </div>
    </div>
  );
};

export default Index;