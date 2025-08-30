import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff, Mail, Lock, User, UserPlus, Building, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cleanupAuthState } from "@/utils/auth";

interface SignUpDialogProps {
  children: React.ReactNode;
}

export const SignUpDialog = ({ children }: SignUpDialogProps) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    role: "",
    dateOfBirth: undefined as Date | undefined,
  });

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.dateOfBirth) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create your account.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      cleanupAuthState();
      
      // Sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (_) {
        // ignore
      }

      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.name,
            company: formData.company,
            role: formData.role,
            date_of_birth: formData.dateOfBirth.toISOString(),
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created successfully!",
        description: "Please check your email to confirm your account.",
      });
      
      setOpen(false);
      setFormData({ name: "", email: "", password: "", company: "", role: "", dateOfBirth: undefined });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-glass backdrop-blur-xl border-glass">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-quantum bg-clip-text text-transparent flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            Join QuantumCloud
          </DialogTitle>
          <DialogDescription className="text-accent-cyan">
            Create your account to access quantum computing services
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-10 bg-secondary/50 border-glass backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-secondary/50 border-glass backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 bg-secondary/50 border-glass backdrop-blur-sm"
                required
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
            <Label htmlFor="company" className="text-sm font-medium">
              Company <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                type="text"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="pl-10 bg-secondary/50 border-glass backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Job Title/Role <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="role"
                type="text"
                placeholder="e.g., Data Scientist, CTO, Researcher"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="pl-10 bg-secondary/50 border-glass backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-secondary/50 border-glass backdrop-blur-sm",
                    !formData.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select your date of birth"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-glass backdrop-blur-xl border-glass">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={(date) => handleInputChange("dateOfBirth", date!)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-quantum shadow-quantum hover:shadow-neon transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Create Quantum Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};