import { LoginForm } from "@/components/LoginForm";

const Index = () => {
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
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            SecureAuth
          </h1>
          <p className="text-muted-foreground">
            Your secure gateway to digital excellence
          </p>
        </div>
        
        <LoginForm />
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2024 SecureAuth. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;