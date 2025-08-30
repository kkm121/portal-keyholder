import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cleanupAuthState, recordSuccessfulSignIn, SignInProvider } from "@/utils/auth";
import { SignUpDialog } from "@/components/SignUpDialog";
import { VerifyEmailDialog } from "@/components/VerifyEmailDialog";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);

  const safeGlobalSignOut = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (_) {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    cleanupAuthState();
    await safeGlobalSignOut();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error || !data.user) {
      // Check if it's an email verification error
      if (error?.message?.includes('email_not_confirmed') || error?.message?.includes('Email not confirmed')) {
        setShowVerifyDialog(true);
        return;
      }
      toast({
        title: "Login failed",
        description: error?.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      return;
    }
    recordSuccessfulSignIn({
      userId: data.user.id,
      email: data.user.email,
      sessionId: data.session?.access_token ?? null,
      provider: 'password',
      at: Date.now(),
    });
    toast({ title: "Welcome back", description: "You are now signed in." });
    window.location.href = "/";
  };


  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      setLoading(true);
      cleanupAuthState();
      await safeGlobalSignOut();
      const redirectTo = `${window.location.origin}/`;
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
      if (error) throw error;
      toast({ title: "Redirecting...", description: `Continue with ${provider}.` });
      // Redirect happens automatically by Supabase
    } catch (err: any) {
      toast({ title: "OAuth failed", description: err?.message || "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!email) {
        toast({ title: "Enter your email", description: "Provide your email above to reset password." });
        return;
      }
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      toast({ title: "Email sent", description: "Check your inbox to reset password." });
    } catch (err: any) {
      toast({ title: "Reset failed", description: err?.message || "Please try again.", variant: "destructive" });
    }
  };

  useEffect(() => {
    // If we already have a session (e.g., after OAuth redirect), record it once
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      const recordedId = localStorage.getItem('qc.lastRecordedSession');
      if (recordedId === session.access_token) return;
      const providerRaw = (session.user?.app_metadata as any)?.provider as string | undefined;
      const provider: SignInProvider = providerRaw === 'github' ? 'github' : providerRaw === 'google' ? 'google' : 'password';
      recordSuccessfulSignIn({
        userId: session.user.id,
        email: session.user.email,
        sessionId: session.access_token,
        provider,
        at: Date.now(),
      });
      localStorage.setItem('qc.lastRecordedSession', session.access_token);
    });
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto bg-glass backdrop-blur-xl border-glass shadow-elegant">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
          Access Quantum Portal
        </CardTitle>
        <CardDescription className="text-accent-cyan">
          Enter your credentials to access quantum services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-secondary/50 border-glass backdrop-blur-sm transition-smooth focus:shadow-quantum"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-secondary/50 border-glass backdrop-blur-sm transition-smooth focus:shadow-quantum"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-glass bg-secondary/50 accent-primary"
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-primary hover:text-primary-glow transition-smooth"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full bg-gradient-quantum shadow-quantum hover:shadow-neon transition-all duration-300"
          >
            {loading ? 'Please wait…' : 'Access Quantum Portal'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-glass" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button disabled={loading} onClick={() => handleOAuth('google')} variant="outline" className="bg-secondary/50 border-glass backdrop-blur-sm hover:bg-secondary/70">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? 'Redirecting…' : 'Google'}
          </Button>
          <Button disabled={loading} onClick={() => handleOAuth('github')} variant="outline" className="bg-secondary/50 border-glass backdrop-blur-sm hover:bg-secondary/70">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            {loading ? 'Redirecting…' : 'GitHub'}
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <SignUpDialog>
              <button className="text-accent-cyan hover:text-accent-neon transition-smooth font-medium">
                Sign up for Quantum Services
              </button>
            </SignUpDialog>
          </p>
          
          <div className="text-center">
            <button className="text-accent-neon hover:text-primary transition-smooth font-medium text-sm">
              View Service Plans →
            </button>
          </div>
        </div>
      </CardContent>
      
      <VerifyEmailDialog
        isOpen={showVerifyDialog}
        onClose={() => setShowVerifyDialog(false)}
        email={email}
      />
    </Card>
  );
};