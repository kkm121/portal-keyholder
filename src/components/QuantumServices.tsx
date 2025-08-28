import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Shield, Clock } from "lucide-react";

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
  const handleSelectPlan = (serviceId: string) => {
    // This will be connected to Stripe payment processing
    console.log("Selected plan:", serviceId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
          Quantum Service Plans
        </h2>
        <p className="text-accent-cyan text-lg">
          Choose the perfect quantum computing plan for your needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.id}
              className={`relative bg-glass backdrop-blur-xl border-glass shadow-elegant hover:shadow-quantum transition-all duration-300 ${
                service.popular ? "border-accent-cyan shadow-quantum" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-neon text-primary-foreground font-medium px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full w-fit">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
                <div className="flex items-baseline justify-center mt-4">
                  <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {service.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {service.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-neon rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(service.id)}
                  className={`w-full mt-6 transition-all duration-300 ${
                    service.popular
                      ? "bg-gradient-quantum shadow-quantum hover:shadow-neon"
                      : "bg-gradient-primary hover:shadow-glow"
                  }`}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          All plans include quantum encryption and secure data processing
        </p>
        <p className="text-accent-cyan font-medium mt-2">
          Need a custom solution? Contact our quantum specialists
        </p>
      </div>
    </div>
  );
};