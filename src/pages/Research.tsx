import { DynamicBackground } from "@/components/DynamicBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Users, Award, ExternalLink, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Research = () => {
  const publications = [
    {
      title: "Quantum Error Correction in Noisy Intermediate-Scale Quantum Devices",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Amit Patel"],
      journal: "Nature Quantum Information",
      year: 2024,
      citation_count: 127,
      abstract: "We demonstrate a novel approach to quantum error correction that significantly reduces noise in current quantum hardware..."
    },
    {
      title: "Optimizing Quantum Circuit Depth for Near-term Applications",
      authors: ["Prof. Elena Kowalski", "Dr. James Thompson", "Dr. Li Wei"],
      journal: "Physical Review A",
      year: 2024,
      citation_count: 89,
      abstract: "This paper presents optimization techniques that reduce quantum circuit depth by up to 40% while maintaining fidelity..."
    },
    {
      title: "Quantum Machine Learning for Financial Portfolio Optimization",
      authors: ["Dr. Robert Johnson", "Dr. Maria Garcia", "Prof. David Kim"],
      journal: "Quantum Science and Technology",
      year: 2023,
      citation_count: 156,
      abstract: "We explore the application of quantum algorithms to solve complex portfolio optimization problems in finance..."
    }
  ];

  const research_areas = [
    {
      title: "Quantum Error Correction",
      description: "Developing robust error correction codes for fault-tolerant quantum computation",
      projects: 8,
      researchers: 15,
      funding: "$2.3M"
    },
    {
      title: "Quantum Algorithms",
      description: "Creating new algorithms that leverage quantum advantages for practical problems",
      projects: 12,
      researchers: 22,
      funding: "$3.1M"
    },
    {
      title: "Quantum Hardware",
      description: "Advancing quantum device fabrication and control systems",
      projects: 6,
      researchers: 18,
      funding: "$4.2M"
    },
    {
      title: "Quantum Networking",
      description: "Building secure quantum communication networks and protocols",
      projects: 4,
      researchers: 10,
      funding: "$1.8M"
    }
  ];

  const team_members = [
    {
      name: "Dr. Sarah Chen",
      title: "Director of Quantum Research",
      specialization: "Quantum Error Correction",
      publications: 45,
      h_index: 28
    },
    {
      name: "Prof. Michael Rodriguez",
      title: "Principal Research Scientist",
      specialization: "Quantum Algorithms",
      publications: 67,
      h_index: 34
    },
    {
      name: "Dr. Elena Kowalski",
      title: "Senior Research Engineer",
      specialization: "Quantum Hardware",
      publications: 32,
      h_index: 22
    },
    {
      name: "Prof. David Kim",
      title: "Research Lead - Applications",
      specialization: "Quantum Machine Learning",
      publications: 78,
      h_index: 41
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
            Research & Innovation
          </h1>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-quantum bg-clip-text text-transparent">
            Advancing Quantum Science
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our research division pushes the boundaries of quantum computing through groundbreaking 
            research, innovative algorithms, and collaborative partnerships with leading academic institutions.
          </p>
        </div>

        {/* Research Areas */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-quantum bg-clip-text text-transparent">
            Research Focus Areas
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {research_areas.map((area, index) => (
              <Card key={index} className="bg-glass backdrop-blur-xl border-glass shadow-elegant hover:shadow-neon transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-accent-cyan">{area.title}</CardTitle>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{area.projects}</div>
                      <div className="text-xs text-muted-foreground">Active Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent-neon">{area.researchers}</div>
                      <div className="text-xs text-muted-foreground">Researchers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent-cyan">{area.funding}</div>
                      <div className="text-xs text-muted-foreground">Funding</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Publications */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-quantum bg-clip-text text-transparent">
            Recent Publications
          </h3>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <Card key={index} className="bg-glass backdrop-blur-xl border-glass shadow-elegant">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{pub.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pub.authors.map((author, idx) => (
                          <Badge key={idx} variant="secondary">{author}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {pub.journal}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {pub.year}
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          {pub.citation_count} citations
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{pub.abstract}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Team */}
        <div>
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-quantum bg-clip-text text-transparent">
            Research Team
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team_members.map((member, index) => (
              <Card key={index} className="bg-glass backdrop-blur-xl border-glass shadow-elegant text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full">
                      {member.specialization}
                    </Badge>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="font-semibold text-accent-neon">{member.publications}</div>
                        <div className="text-xs text-muted-foreground">Publications</div>
                      </div>
                      <div>
                        <div className="font-semibold text-accent-cyan">{member.h_index}</div>
                        <div className="text-xs text-muted-foreground">h-index</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;