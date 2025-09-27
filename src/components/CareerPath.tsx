import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowRight, 
  GraduationCap, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import type { User } from '../App';

interface CareerPathProps {
  user: User | null;
}

interface CareerNode {
  id: string;
  title: string;
  type: 'education' | 'career' | 'skill' | 'certification';
  duration: string;
  description: string;
  requirements?: string[];
  outcomes?: string[];
  salary?: string;
  growth?: string;
  locations?: string[];
  x: number;
  y: number;
  connections: string[];
}

export function CareerPath({ user }: CareerPathProps) {
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>('tech');

  const careerPaths = {
    tech: {
      name: "Technology & Computer Science",
      nodes: [
        {
          id: 'class12',
          title: 'Class 12 (PCM)',
          type: 'education' as const,
          duration: '2 years',
          description: 'Complete 12th grade with Physics, Chemistry, and Mathematics',
          requirements: ['Strong math skills', 'Problem-solving aptitude'],
          x: 50,
          y: 100,
          connections: ['jee', 'btech-direct']
        },
        {
          id: 'jee',
          title: 'JEE Preparation',
          type: 'certification' as const,
          duration: '1-2 years',
          description: 'Joint Entrance Examination for engineering colleges',
          requirements: ['Class 12 completion', 'Dedicated study'],
          x: 200,
          y: 50,
          connections: ['iit-btech']
        },
        {
          id: 'btech-direct',
          title: 'B.Tech (Direct)',
          type: 'education' as const,
          duration: '4 years',
          description: 'Bachelor of Technology in Computer Science',
          requirements: ['Class 12 (60%+)', 'Entrance exam'],
          x: 200,
          y: 150,
          connections: ['software-dev', 'mtech']
        },
        {
          id: 'iit-btech',
          title: 'IIT B.Tech',
          type: 'education' as const,
          duration: '4 years',
          description: 'Bachelor of Technology from Indian Institute of Technology',
          requirements: ['JEE Advanced qualification'],
          outcomes: ['Higher placement rates', 'Better starting salaries'],
          x: 350,
          y: 50,
          connections: ['software-dev', 'research']
        },
        {
          id: 'software-dev',
          title: 'Software Developer',
          type: 'career' as const,
          duration: 'Career',
          description: 'Design and develop software applications',
          salary: '₹6-25 LPA',
          growth: 'Excellent',
          locations: ['Bangalore', 'Hyderabad', 'Delhi', 'Srinagar'],
          x: 500,
          y: 100,
          connections: ['senior-dev', 'tech-lead']
        },
        {
          id: 'mtech',
          title: 'M.Tech',
          type: 'education' as const,
          duration: '2 years',
          description: 'Master of Technology for specialization',
          requirements: ['B.Tech degree', 'GATE qualification'],
          x: 350,
          y: 200,
          connections: ['research', 'senior-dev']
        },
        {
          id: 'senior-dev',
          title: 'Senior Developer',
          type: 'career' as const,
          duration: 'Career',
          description: 'Lead development teams and architecture decisions',
          salary: '₹15-50 LPA',
          growth: 'High',
          x: 650,
          y: 100,
          connections: ['tech-lead', 'startup']
        },
        {
          id: 'tech-lead',
          title: 'Tech Lead/CTO',
          type: 'career' as const,
          duration: 'Career',
          description: 'Technical leadership and strategic planning',
          salary: '₹25-100+ LPA',
          growth: 'Very High',
          x: 800,
          y: 50,
          connections: []
        },
        {
          id: 'startup',
          title: 'Tech Entrepreneur',
          type: 'career' as const,
          duration: 'Career',
          description: 'Start your own technology company',
          salary: 'Variable',
          growth: 'Unlimited',
          x: 800,
          y: 150,
          connections: []
        },
        {
          id: 'research',
          title: 'Research Scientist',
          type: 'career' as const,
          duration: 'Career',
          description: 'Research in AI, ML, or other tech domains',
          salary: '₹8-30 LPA',
          growth: 'Steady',
          locations: ['IITs', 'IISc', 'Research Labs'],
          x: 500,
          y: 250,
          connections: []
        }
      ]
    },
    agriculture: {
      name: "Agriculture & Horticulture",
      nodes: [
        {
          id: 'class12-ag',
          title: 'Class 12 (PCB/Agriculture)',
          type: 'education' as const,
          duration: '2 years',
          description: 'Complete 12th grade with Biology/Agriculture',
          x: 50,
          y: 100,
          connections: ['bsc-hort', 'bsc-ag']
        },
        {
          id: 'bsc-hort',
          title: 'B.Sc. Horticulture',
          type: 'education' as const,
          duration: '4 years',
          description: 'Bachelor of Science in Horticulture',
          requirements: ['Class 12 with Biology'],
          x: 200,
          y: 50,
          connections: ['hort-officer', 'msc-hort']
        },
        {
          id: 'bsc-ag',
          title: 'B.Sc. Agriculture',
          type: 'education' as const,
          duration: '4 years',
          description: 'Bachelor of Science in Agriculture',
          x: 200,
          y: 150,
          connections: ['agri-officer', 'entrepreneur-ag']
        },
        {
          id: 'hort-officer',
          title: 'Horticulture Officer',
          type: 'career' as const,
          duration: 'Career',
          description: 'Government position managing horticultural programs',
          salary: '₹4-12 LPA',
          growth: 'Stable',
          locations: ['J&K (High demand)', 'Himachal Pradesh', 'Uttarakhand'],
          x: 400,
          y: 50,
          connections: ['senior-officer']
        },
        {
          id: 'agri-officer',
          title: 'Agriculture Officer',
          type: 'career' as const,
          duration: 'Career',
          description: 'Support farmers with modern agricultural techniques',
          salary: '₹3-10 LPA',
          growth: 'Good',
          x: 400,
          y: 150,
          connections: ['senior-officer']
        },
        {
          id: 'entrepreneur-ag',
          title: 'Agri Entrepreneur',
          type: 'career' as const,
          duration: 'Career',
          description: 'Start agricultural business or farm',
          salary: 'Variable',
          growth: 'High potential',
          locations: ['Kashmir Valley', 'Jammu region'],
          x: 400,
          y: 250,
          connections: []
        }
      ]
    }
  };

  const currentPathData = careerPaths[selectedPath as keyof typeof careerPaths];

  const handleNodeClick = (node: CareerNode) => {
    setSelectedNode(node);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'career': return 'bg-green-100 border-green-300 text-green-800';
      case 'skill': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'certification': return 'bg-orange-100 border-orange-300 text-orange-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'education': return <GraduationCap className="h-4 w-4" />;
      case 'career': return <Briefcase className="h-4 w-4" />;
      case 'skill': return <TrendingUp className="h-4 w-4" />;
      case 'certification': return <Users className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Interactive Career Path Mapping</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore different career paths step by step. Click on any node to learn more about 
            requirements, outcomes, and next steps.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant={selectedPath === 'tech' ? 'default' : 'outline'}
            onClick={() => setSelectedPath('tech')}
          >
            Technology Path
          </Button>
          <Button
            variant={selectedPath === 'agriculture' ? 'default' : 'outline'}
            onClick={() => setSelectedPath('agriculture')}
          >
            Agriculture Path
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{currentPathData.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <div 
                className="relative min-w-[900px] h-[400px]"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)', backgroundSize: '20px 20px' }}
              >
                {/* Render connections */}
                {currentPathData.nodes.map((node) =>
                  node.connections.map((connectionId) => {
                    const targetNode = currentPathData.nodes.find(n => n.id === connectionId);
                    if (!targetNode) return null;
                    
                    return (
                      <svg
                        key={`${node.id}-${connectionId}`}
                        className="absolute top-0 left-0 pointer-events-none"
                        style={{ width: '100%', height: '100%' }}
                      >
                        <line
                          x1={node.x + 60}
                          y1={node.y + 20}
                          x2={targetNode.x}
                          y2={targetNode.y + 20}
                          stroke="#e2e8f0"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="#e2e8f0"
                            />
                          </marker>
                        </defs>
                      </svg>
                    );
                  })
                )}

                {/* Render nodes */}
                {currentPathData.nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getNodeColor(node.type)} border-2 rounded-lg p-3 min-w-[120px] text-center hover:shadow-lg transition-all`}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    onClick={() => handleNodeClick(node)}
                  >
                    <div className="flex items-center justify-center mb-1">
                      {getNodeIcon(node.type)}
                    </div>
                    <h4 className="font-medium text-xs">{node.title}</h4>
                    <p className="text-xs opacity-75">{node.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span className="text-sm">Education</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-sm">Career</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                <span className="text-sm">Certification</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Pathway</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Node Details Modal */}
        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {selectedNode && getNodeIcon(selectedNode.type)}
                <span>{selectedNode?.title}</span>
                <Badge variant="secondary">{selectedNode?.type}</Badge>
              </DialogTitle>
              <DialogDescription>
                Learn more about this step in your career journey, including requirements, outcomes, and next steps.
              </DialogDescription>
            </DialogHeader>
            
            {selectedNode && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedNode.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Duration</span>
                      </h4>
                      <p className="text-muted-foreground">{selectedNode.duration}</p>
                    </div>
                    
                    {selectedNode.salary && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>Salary Range</span>
                        </h4>
                        <p className="text-muted-foreground">{selectedNode.salary}</p>
                      </div>
                    )}
                  </div>

                  {selectedNode.locations && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Key Locations</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.locations.map((location, index) => (
                          <Badge key={index} variant="outline">{location}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-4">
                  {selectedNode.requirements ? (
                    <div>
                      <h4 className="font-semibold mb-3">Requirements & Prerequisites</h4>
                      <ul className="space-y-2">
                        {selectedNode.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specific requirements listed.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="outcomes" className="space-y-4">
                  {selectedNode.outcomes || selectedNode.growth ? (
                    <div className="space-y-4">
                      {selectedNode.outcomes && (
                        <div>
                          <h4 className="font-semibold mb-3">Expected Outcomes</h4>
                          <ul className="space-y-2">
                            {selectedNode.outcomes.map((outcome, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-muted-foreground">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {selectedNode.growth && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span>Growth Potential</span>
                          </h4>
                          <p className="text-muted-foreground">{selectedNode.growth}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Growth and outcome information will be available soon.</p>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}