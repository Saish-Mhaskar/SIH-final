import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Map, School, Users, Star, TrendingUp, Target, ArrowRight, CheckCircle, Award } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: TrendingUp,
      title: "Skills Assessment",
      description: "Discover your unique strengths and interests through comprehensive, research-based assessments designed to reveal your true potential."
    },
    {
      icon: Map,
      title: "Personalized Roadmap",
      description: "Receive a step-by-step career development plan tailored to your goals, with clear milestones and actionable next steps."
    },
    {
      icon: School,
      title: "College Directory",
      description: "Explore curated opportunities at top institutions across India, with detailed insights and application guidance."
    },
    {
      icon: BookOpen,
      title: "Resource Hub",
      description: "Access free e-books, skill development courses, and scholarship opportunities to accelerate your learning journey."
    }
  ];

  const benefits = [
    "Comprehensive career assessments",
    "Personalized guidance for your unique path",
    "Access to top colleges and opportunities",
    "Free educational resources and scholarships"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="relative py-24 px-4 lg:py-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-[#0891b2] text-white px-4 py-2 rounded-full">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-medium">The Growth Canvas</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-[#1a202c] leading-tight">
                  Build Your Future with
                  <span className="text-[#0891b2] block">Confidence & Purpose</span>
                </h1>
                <p className="text-xl text-[#718096] max-w-lg leading-relaxed">
                  A trusted platform for students across India to discover their strengths, explore career paths,
                  and create a roadmap to professional success.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onGetStarted}
                  className="bg-[#0891b2] hover:bg-[#0e7490] text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg px-8 py-4 rounded-lg"
                >
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-white text-lg px-8 py-4 rounded-lg transition-all duration-200"
                >
                  Explore Features
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0891b2] text-white p-2 rounded-full">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1a202c]">15,000+</div>
                    <div className="text-sm text-[#718096]">Students Guided</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0891b2] text-white p-2 rounded-full">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1a202c]">4.9/5</div>
                    <div className="text-sm text-[#718096]">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10"> 
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1579546950130-9b6e82a628be?q=80&w=2670&auto=format&fit=crop"
                  alt="Diverse students collaborating on a project in a modern setting"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Subtle accent elements */}
              <div className="absolute -top-4 -right-4 bg-[#0891b2] text-white p-3 rounded-lg shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-[#e2e8f0] p-3 rounded-lg shadow-lg">
                <Target className="h-6 w-6 text-[#0891b2]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-gray-100 text-[#1a202c] px-6 py-3 rounded-full">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Comprehensive Platform</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a202c]">
              Everything You Need to
              <span className="text-[#0891b2] block">Shape Your Future</span>
            </h2>
            <p className="text-xl text-[#718096] max-w-3xl mx-auto leading-relaxed">
              Our integrated platform provides you with professional-grade tools and insights
              to make informed decisions about your career and education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-[#0891b2] rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#1a202c]">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#718096] leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#1a202c]">
              Why Choose CareerGuide?
            </h2>
            <p className="text-xl text-[#718096] leading-relaxed">
              Join thousands of students who have successfully built their career foundation with our trusted platform.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-sm">
                  <CheckCircle className="h-6 w-6 text-[#0891b2] flex-shrink-0" />
                  <span className="text-[#1a202c] font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0891b2]">
        <div className="max-w-4xl mx-auto text-center space-y-8 text-white">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Build Your Future?
            </h2>
            <p className="text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards a successful career. Join our community of ambitious students
              and start creating your growth canvas today.
            </p>
          </div>
          <Button
            onClick={onGetStarted}
            className="bg-white text-[#0891b2] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-200 text-xl px-10 py-6 rounded-lg font-bold"
          >
            Start Your Journey
            <ArrowRight className="h-6 w-6 ml-3" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#0891b2] rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-[#1a202c]">CareerGuide</h3>
              </div>
              <p className="text-[#718096] leading-relaxed">
                Empowering students across India with professional career guidance
                and comprehensive educational support.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#1a202c]">Platform</h4>
              <ul className="space-y-3 text-[#718096]">
                <li className="hover:text-[#0891b2] cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-[#0891b2] cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-[#0891b2] cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-[#0891b2] cursor-pointer transition-colors">Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#1a202c]">Connect</h4>
              <p className="text-[#718096] mb-6 leading-relaxed">
                Stay updated with career insights and opportunities.
              </p>
              <div className="flex space-x-4">
                {['LinkedIn', 'Twitter', 'Facebook'].map((social) => (
                  <div key={social} className="bg-gray-100 hover:bg-[#0891b2] hover:text-white text-[#1a202c] px-4 py-2 rounded-lg cursor-pointer transition-all duration-200">
                    <span className="text-sm font-medium">{social}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-[#718096]">
              © 2024 CareerGuide. Trusted by students across India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
