import { DynamicBackground } from "@/components/DynamicBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Atom, Zap, Shield, Cpu, Layers, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const QuantumComputing = () => {
  const features = [
    {
      icon: Atom,
      title: "Quantum Supremacy",
      description: "Experience computational power that surpasses classical computers for specific problems",
      benefits: ["Exponential speedup", "Parallel processing", "Advanced optimization"]
    },
    {
      icon: Zap,
      title: "Ultra-Fast Processing", 
      description: "Solve complex problems in seconds that would take classical computers years",
      benefits: ["Real-time analytics", "Instant results", "Reduced computation time"]
    },
    {
      icon: Shield,
      title: "Quantum Cryptography",
      description: "Unbreakable security through quantum key distribution and encryption",
      benefits: ["Perfect security", "Future-proof encryption", "Unhackable communications"]
    },
    {
      icon: Layers,
      title: "Quantum Algorithms",
      description: "Advanced algorithms designed specifically for quantum hardware",
      benefits: ["Shor's algorithm", "Grover's search", "Quantum machine learning"]
    },
    {
      icon: Cpu,
      title: "Hybrid Computing",
      description: "Seamlessly integrate quantum and classical computing resources",
      benefits: ["Best of both worlds", "Optimized workflows", "Scalable solutions"]
    },
    {
      icon: Gauge,
      title: "Performance Metrics",
      description: "Real-time monitoring and optimization of quantum operations",
      benefits: ["Quantum fidelity", "Error correction", "Performance analytics"]
    }
  ];

  const applications = [
    {
      category: "Financial Services",
      use_cases: ["Portfolio optimization", "Risk analysis", "Fraud detection", "High-frequency trading"]
    },
    {
      category: "Healthcare & Pharma", 
      use_cases: ["Drug discovery", "Molecular simulation", "Genetic analysis", "Medical imaging"]
    },
    {
      category: "Logistics & Supply Chain",
      use_cases: ["Route optimization", "Inventory management", "Demand forecasting", "Network analysis"]
    },
    {
      category: "Artificial Intelligence",
      use_cases: ["Machine learning acceleration", "Neural network training", "Pattern recognition", "Data analysis"]
    },
    {
      category: "Cybersecurity",
      use_cases: ["Quantum encryption", "Secure communications", "Key distribution", "Threat detection"]
    },
    {
      category: "Scientific Research",
      use_cases: ["Climate modeling", "Materials science", "Physics simulation", "Optimization problems"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <DynamicBackground />
      
      {/* Header */}
      <div className="relative z-10 border-b border-glass">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Quantum Computing Technology
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-quantum bg-clip-text text-transparent">
            The Future of Computing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Harness the power of quantum mechanics to solve complex problems that are impossible 
            for classical computers. Experience unprecedented computational capabilities with our 
            cutting-edge quantum cloud platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-glass backdrop-blur-xl border-glass shadow-elegant hover:shadow-neon transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-accent-cyan">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-accent-neon rounded-full mr-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications Section */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-quantum bg-clip-text text-transparent">
            Industry Applications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <Card key={index} className="bg-glass backdrop-blur-xl border-glass shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-lg text-accent-cyan">{app.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {app.use_cases.map((useCase, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/20 text-primary-foreground">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <Card className="bg-glass backdrop-blur-xl border-glass shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-gradient-quantum bg-clip-text text-transparent">
              Technical Specifications
            </CardTitle>
            <CardDescription className="text-accent-cyan text-lg">
              State-of-the-art quantum hardware and software stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-accent-neon">Hardware Capabilities</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Quantum Volume:</span>
                    <Badge variant="outline">1,024+</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Qubit Count:</span>
                    <Badge variant="outline">127 Qubits</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Gate Fidelity:</span>
                    <Badge variant="outline">99.9%</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Coherence Time:</span>
                    <Badge variant="outline">200μs</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Connectivity:</span>
                    <Badge variant="outline">All-to-All</Badge>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 text-accent-neon">Software Features</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Programming Languages:</span>
                    <Badge variant="outline">Qiskit, Cirq, Q#</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Error Correction:</span>
                    <Badge variant="outline">Active</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Optimization:</span>
                    <Badge variant="outline">Auto-tuning</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Simulation:</span>
                    <Badge variant="outline">Classical Hybrid</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>API Access:</span>
                    <Badge variant="outline">REST & GraphQL</Badge>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuantumComputing;