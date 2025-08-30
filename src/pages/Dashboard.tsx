import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuantumServices } from "@/components/QuantumServices";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cleanupAuthState } from "@/utils/auth";
import { DynamicBackground } from "@/components/DynamicBackground";
import { ProfileMenu } from "@/components/ProfileMenu";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        window.location.reload();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      cleanupAuthState();
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out error",
        description: "There was an error signing out",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <DynamicBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quantum portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <DynamicBackground />

      {/* Header */}
      <div className="relative z-10 border-b border-glass">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
              QuantumCloud
            </h1>
            <span className="text-accent-cyan text-sm">
              Next-Gen Quantum Computing Services
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ProfileMenu user={user} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
            Welcome to the Quantum Portal
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access cutting-edge quantum computing services tailored for your business needs. 
            Choose from our comprehensive service plans below.
          </p>
        </div>
        
        {/* Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quantum-computing">
              <Button variant="outline" className="bg-secondary/50 border-glass backdrop-blur-sm hover:bg-secondary/70">
                Learn About Quantum Computing
              </Button>
            </Link>
            <Link to="/research">
              <Button variant="outline" className="bg-secondary/50 border-glass backdrop-blur-sm hover:bg-secondary/70">
                Research & Innovation
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="bg-secondary/50 border-glass backdrop-blur-sm hover:bg-secondary/70">
                Profile Settings
              </Button>
            </Link>
          </div>
        </div>

        <QuantumServices />
        
        {/* Footer */}
        <div className="mt-16 text-center text-xs text-muted-foreground border-t border-glass pt-8">
          <p>© 2024 QuantumCloud Technologies. All rights reserved.</p>
          <p className="mt-1 text-accent-cyan">Powered by Quantum Computing</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;