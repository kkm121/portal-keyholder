import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface VerifyEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const VerifyEmailDialog = ({ isOpen, onClose, email }: VerifyEmailDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendEmail = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/`;
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: redirectTo
        }
      });
      
      if (error) throw error;
      
      setEmailSent(true);
      toast({
        title: "Verification email sent",
        description: "Check your inbox and click the verification link.",
      });
    } catch (err: any) {
      toast({
        title: "Failed to send email",
        description: err?.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-glass backdrop-blur-xl border-glass shadow-elegant max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
            {emailSent ? (
              <CheckCircle className="h-8 w-8 text-accent-cyan" />
            ) : (
              <Mail className="h-8 w-8 text-accent-cyan" />
            )}
          </div>
          <DialogTitle className="text-xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            {emailSent ? "Email Sent!" : "Email Verification Required"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {emailSent ? (
              "We've sent a verification link to your email. Click the link to activate your account."
            ) : (
              "Your account exists but your email hasn't been verified yet. Please check your inbox or resend the verification email."
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="p-3 rounded-lg bg-secondary/30 border border-glass">
            <p className="text-sm text-muted-foreground">Email:</p>
            <p className="font-medium text-accent-cyan">{email}</p>
          </div>
          
          {!emailSent && (
            <Button
              onClick={handleResendEmail}
              disabled={loading}
              className="w-full bg-gradient-quantum shadow-quantum hover:shadow-neon transition-all duration-300"
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full"
          >
            {emailSent ? "Got It" : "I'll Check My Email"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};