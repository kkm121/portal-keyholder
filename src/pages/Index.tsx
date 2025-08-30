import { useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";

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
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-glow/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
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