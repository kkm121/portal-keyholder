import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicBackground } from "@/components/DynamicBackground";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import QuantumComputing from "./pages/QuantumComputing";
import Research from "./pages/Research";
import Settings from "./pages/Settings";

const PaywallMessage = () => (
  <div className="min-h-screen bg-gradient-background">
    <DynamicBackground />
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <Card className="max-w-md bg-glass backdrop-blur-xl border-glass">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-accent-cyan" />
          </div>
          <CardTitle className="text-xl bg-gradient-quantum bg-clip-text text-transparent">
            Premium Feature
          </CardTitle>
          <CardDescription className="text-accent-cyan">
            You must pay to access this feature
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Upgrade to premium to unlock advanced quantum computing features and personalized dashboard.
          </p>
          <div className="space-y-2">
            <Button className="w-full bg-gradient-quantum shadow-quantum hover:shadow-neon">
              Upgrade to Premium
            </Button>
            <Link to="/">
              <Button variant="outline" className="w-full border-accent-cyan/20 hover:border-accent-cyan">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing quantum portal...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Index />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={user ? <Profile /> : <PaywallMessage />} />
            <Route path="/quantum-computing" element={user ? <QuantumComputing /> : <PaywallMessage />} />
            <Route path="/research" element={user ? <Research /> : <PaywallMessage />} />
            <Route path="/settings" element={user ? <Settings /> : <PaywallMessage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
