import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Calendar, Clock, TrendingUp, BookOpen, Briefcase, Award, Bell, Target, ArrowRight, User, CheckCircle, Star } from 'lucide-react';
import type { User, QuizAnswers } from '../App';

interface DashboardProps {
  user: User | null;
  quizAnswers: QuizAnswers | null;
  onNavigate?: (page: string) => void;
}

export function Dashboard({ user, quizAnswers, onNavigate }: DashboardProps) {
  if (!user) return null;

  // Mock data for timeline and recommendations
  const upcomingDeadlines = [
    { 
      title: "JEE Main Registration", 
      date: "Dec 15, 2024", 
      status: "urgent", 
      daysLeft: 12,
      icon: "🎯",
      category: "Engineering"
    },
    { 
      title: "NEET Application", 
      date: "Jan 20, 2025", 
      status: "upcoming", 
      daysLeft: 48,
      icon: "🏥",
      category: "Medical"
    },
    { 
      title: "Kashmir University Admission", 
      date: "Feb 10, 2025", 
      status: "upcoming", 
      daysLeft: 69,
      icon: "🏛️",
      category: "University"
    },
    { 
      title: "CBSE Board Exams", 
      date: "Mar 1, 2025", 
      status: "important", 
      daysLeft: 88,
      icon: "📚",
      category: "Board Exam"
    }
  ];

  const careerPaths = [
    {
      title: "Computer Science & Engineering",
      match: "95%",
      description: "Based on your interest in Mathematics, Physics, and Technology",
      requirements: ["JEE Main", "Strong Math Foundation", "Programming Skills"],
      colleges: ["IIT Delhi", "NIT Srinagar", "IIIT Hyderabad"],
      salaryRange: "₹8-25 LPA",
      icon: "💻"
    },
    {
      title: "Data Science & Analytics",
      match: "89%",
      description: "Perfect blend of Mathematics, Statistics, and Technology",
      requirements: ["Statistics Knowledge", "Programming", "Analytical Skills"],
      colleges: ["ISI Kolkata", "IIM Bangalore", "BITS Pilani"],
      salaryRange: "₹6-20 LPA",
      icon: "📊"
    },
    {
      title: "Biomedical Engineering",
      match: "82%",
      description: "Combines your Biology and Technology interests",
      requirements: ["NEET/JEE", "Biology + Math", "Innovation Mindset"],
      colleges: ["AIIMS Delhi", "Manipal University", "VIT Vellore"],
      salaryRange: "₹5-15 LPA",
      icon: "🔬"
    }
  ];

  const achievements = [
    { 
      title: "Assessment Completed", 
      description: "Successfully completed comprehensive career assessment",
      date: "Today",
      icon: CheckCircle
    },
    { 
      title: "Profile Created", 
      description: "Set up your personalized career guidance profile",
      date: "Today",
      icon: User
    }
  ];

  const getProgressValue = () => {
    let progress = 0;
    if (user?.quizCompleted) progress += 40;
    if (quizAnswers?.academicSubjects?.length) progress += 20;
    if (quizAnswers?.learningStyle) progress += 20;
    if (quizAnswers?.hobbies?.length) progress += 20;
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1a202c] mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-[#718096] text-lg">
                Continue building your personalized career roadmap
              </p>
            </div>
            <div className="bg-[#0891b2] text-white p-4 rounded-lg">
              <Target className="h-8 w-8" />
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-[#1a202c]">Profile Completion</span>
              <span className="text-sm text-[#718096]">{getProgressValue()}%</span>
            </div>
            <Progress value={getProgressValue()} className="h-2 bg-gray-200" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Path Recommendations */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-[#0891b2]" />
                  <span className="text-[#1a202c]">Recommended Career Paths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {careerPaths.map((path, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{path.icon}</div>
                          <div>
                            <h3 className="font-bold text-lg text-[#1a202c]">{path.title}</h3>
                            <Badge className="bg-[#0891b2] text-white">{path.match} Match</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-white">
                          Explore
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      
                      <p className="text-[#718096] mb-4">{path.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-[#1a202c] mb-2">Key Requirements:</h4>
                          <ul className="space-y-1 text-[#718096]">
                            {path.requirements.map((req, i) => (
                              <li key={i} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-[#0891b2]" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-[#1a202c] mb-2">Top Colleges:</h4>
                          <ul className="space-y-1 text-[#718096]">
                            {path.colleges.slice(0, 3).map((college, i) => (
                              <li key={i}>{college}</li>
                            ))}
                          </ul>
                          <div className="mt-2">
                            <span className="font-medium text-[#1a202c]">Salary Range: </span>
                            <span className="text-[#0891b2] font-medium">{path.salaryRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Hub Promotion */}
            <Card className="border border-[#0891b2] shadow-sm bg-gradient-to-r from-[#0891b2]/5 to-[#06b6d4]/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#0891b2] text-white p-3 rounded-lg">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a202c] mb-2">Discover New Resources</h3>
                      <p className="text-[#718096] mb-4">Access free e-books, skill courses, and scholarship opportunities</p>
                      <div className="flex items-center space-x-6 text-sm text-[#718096]">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4" />
                          <span>50+ E-books</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>25+ Scholarships</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>Free Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => onNavigate && onNavigate('resource-hub')}
                    className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-6 py-3"
                  >
                    Explore Resources
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-[#0891b2]" />
                  <span className="text-[#1a202c]">Recent Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-[#0891b2] text-white p-2 rounded-full">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#1a202c]">{achievement.title}</h4>
                          <p className="text-[#718096] text-sm">{achievement.description}</p>
                          <span className="text-xs text-[#718096]">{achievement.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Important Deadlines */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-[#0891b2]" />
                  <span className="text-[#1a202c]">Important Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="border-l-4 border-[#0891b2] pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl">{deadline.icon}</span>
                        <Badge variant={deadline.status === 'urgent' ? 'destructive' : 'secondary'}>
                          {deadline.daysLeft} days
                        </Badge>
                      </div>
                      <h4 className="font-medium text-[#1a202c] text-sm">{deadline.title}</h4>
                      <p className="text-xs text-[#718096]">{deadline.date}</p>
                      <p className="text-xs text-[#0891b2]">{deadline.category}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-[#0891b2] hover:bg-[#0e7490] text-white">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1a202c]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-white border border-gray-200 text-[#1a202c] hover:bg-gray-50">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explore Colleges
                  </Button>
                  <Button className="w-full justify-start bg-white border border-gray-200 text-[#1a202c] hover:bg-gray-50">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Career Paths
                  </Button>
                  <Button className="w-full justify-start bg-white border border-gray-200 text-[#1a202c] hover:bg-gray-50">
                    <Star className="h-4 w-4 mr-2" />
                    Expert Guidance
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Study Progress */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1a202c]">Study Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizAnswers?.academicSubjects?.slice(0, 3).map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-[#1a202c]">{subject}</span>
                        <span className="text-sm text-[#718096]">{85 - index * 10}%</span>
                      </div>
                      <Progress value={85 - index * 10} className="h-2 bg-gray-200" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}