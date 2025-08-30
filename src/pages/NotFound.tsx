import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DynamicBackground } from "@/components/DynamicBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <DynamicBackground />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Signal Lost in the Quantum Field
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! The quantum entanglement seems to have gone awry. This portal doesn't exist in our dimension... yet.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild
            className="bg-gradient-quantum shadow-quantum hover:shadow-neon transition-all duration-300"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="bg-secondary/50 border-glass backdrop-blur-sm hover:bg-secondary/70"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>© 2024 QuantumCloud Technologies. All rights reserved.</p>
          <p className="mt-1 text-accent-cyan">Powered by Quantum Computing</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
