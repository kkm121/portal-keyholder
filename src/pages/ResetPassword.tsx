import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have an auth session from the reset link
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast({
          title: "Invalid reset link",
          description: "The password reset link is invalid or has expired.",
          variant: "destructive",
        });
        navigate("/");
      }
    });
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast({
        title: "Password updated successfully",
        description: "Your password has been changed. You can now sign in.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Password update failed",
        description: error?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            Reset Your Password
          </p>
        </div>
        
        <Card className="w-full bg-glass backdrop-blur-xl border-glass shadow-elegant">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
              Create New Password
            </CardTitle>
            <CardDescription className="text-accent-cyan">
              Enter your new password to secure your quantum portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-secondary/50 border-glass backdrop-blur-sm"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 bg-secondary/50 border-glass backdrop-blur-sm"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-quantum shadow-quantum hover:shadow-neon transition-all duration-300"
              >
                {loading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>

            <div className="text-center">
              <Link 
                to="/" 
                className="inline-flex items-center text-sm text-accent-cyan hover:text-accent-neon transition-smooth"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2024 QuantumCloud Technologies. All rights reserved.</p>
          <p className="mt-1 text-accent-cyan">Powered by Quantum Computing</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;