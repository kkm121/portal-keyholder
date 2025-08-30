import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Shield, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const services = [
  {
    id: "quantum-basic",
    name: "Quantum Basic",
    description: "Entry-level quantum computing access",
    price: "$99",
    period: "/month",
    features: ["100 Quantum Operations", "Basic Algorithm Library", "Email Support", "Community Access"],
    icon: Cpu,
    popular: false
  },
  {
    id: "quantum-pro",
    name: "Quantum Pro",
    description: "Advanced quantum computing for businesses",
    price: "$299",
    period: "/month",
    features: ["10,000 Quantum Operations", "Advanced Algorithm Library", "Priority Support", "Custom Algorithms", "API Access"],
    icon: Zap,
    popular: true
  },
  {
    id: "quantum-enterprise",
    name: "Quantum Enterprise",
    description: "Enterprise-grade quantum solutions",
    price: "$999",
    period: "/month",
    features: ["Unlimited Operations", "Full Algorithm Suite", "24/7 Dedicated Support", "Custom Integration", "SLA Guarantee", "Quantum Consulting"],
    icon: Shield,
    popular: false
  }
];

export const QuantumServices = () => {
  const { toast } = useToast();

  const handleSelectPlan = async (serviceId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: serviceId },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      console.error("Checkout error", err);
      toast({
        title: "Checkout failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center justify-center p-2 bg-glass-light border border-glass-light rounded-full mb-6">
          <span className="text-accent-cyan text-sm font-medium px-4 py-1">
            Quantum Computing Plans
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-quantum bg-clip-text text-transparent leading-tight">
          Choose Your<br />Quantum Journey
        </h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Unlock the power of quantum computing with our cutting-edge service plans designed for every scale of innovation
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isPopular = service.popular;
          const isFirst = index === 0;
          const isLast = index === services.length - 1;
          
          return (
            <div
              key={service.id}
              className={`relative group ${isPopular ? 'lg:scale-105 lg:-mt-4' : ''}`}
            >
              <Card
                className={`relative h-full bg-glass backdrop-blur-2xl border-glass shadow-card hover:shadow-hover transition-all duration-500 overflow-hidden ${
                  isPopular 
                    ? "border-accent-cyan shadow-quantum bg-gradient-mesh" 
                    : "hover:border-glass-light"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-quantum px-6 py-2 rounded-full shadow-neon">
                      <span className="text-background text-sm font-bold">Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10 text-center pt-8 pb-6">
                  {/* Icon */}
                  <div className="mx-auto mb-6 relative">
                    <div className={`p-4 rounded-2xl ${
                      isPopular 
                        ? "bg-gradient-quantum shadow-neon" 
                        : "bg-gradient-primary"
                    } w-fit mx-auto`}>
                      <Icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <CardTitle className="text-2xl font-bold text-foreground mb-3">
                    {service.name}
                  </CardTitle>
                  
                  {/* Description */}
                  <CardDescription className="text-muted-foreground text-base mb-6 min-h-[48px] flex items-center justify-center">
                    {service.description}
                  </CardDescription>

                  {/* Pricing */}
                  <div className="flex items-baseline justify-center">
                    <span className={`text-5xl font-bold ${
                      isPopular 
                        ? "bg-gradient-quantum bg-clip-text text-transparent" 
                        : "bg-gradient-primary bg-clip-text text-transparent"
                    }`}>
                      {service.price}
                    </span>
                    <span className="text-muted-foreground ml-2 text-lg">
                      {service.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 px-8 pb-8">
                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          isPopular 
                            ? "bg-gradient-quantum shadow-neon" 
                            : "bg-gradient-neon"
                        }`} />
                        <span className="text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(service.id)}
                    className={`w-full h-14 text-base font-semibold transition-all duration-300 group-hover:scale-105 ${
                      isPopular
                        ? "bg-gradient-quantum shadow-quantum hover:shadow-neon text-background"
                        : "bg-gradient-primary hover:shadow-glow text-background"
                    }`}
                  >
                    <Clock className="mr-3 h-5 w-5" />
                    Get Started Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Footer Section */}
      <div className="mt-20 text-center space-y-4">
        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-accent-cyan" />
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-accent-neon" />
            <span>99.9% uptime guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-accent-cyan" />
            <span>24/7 quantum support</span>
          </div>
        </div>
        <p className="text-accent-cyan font-medium text-lg">
          Need a custom enterprise solution? Contact our quantum specialists
        </p>
      </div>
    </div>
  );
};