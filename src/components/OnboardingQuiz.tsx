import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { CheckCircle, BookOpen, ArrowRight, ArrowLeft, User, Target, Brain, Activity } from 'lucide-react';
import type { User, QuizAnswers } from '../App';

interface OnboardingQuizProps {
  onUserRegistration: (userData: Omit<User, 'id' | 'quizCompleted'>) => void;
  onQuizCompletion: (answers: QuizAnswers) => void;
  user: User | null;
}

export function OnboardingQuiz({ onUserRegistration, onQuizCompletion, user }: OnboardingQuizProps) {
  const [currentStep, setCurrentStep] = useState(user ? 1 : 0);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
  });
  const [quizAnswers, setQuizAnswers] = useState<Partial<QuizAnswers>>({
    academicSubjects: [],
    hobbies: [],
  });

  const academicSubjects = [
    { name: 'Mathematics', icon: '📊', description: 'Numbers, logic, and problem-solving' },
    { name: 'Physics', icon: '⚡', description: 'Understanding how the world works' },
    { name: 'Chemistry', icon: '🧪', description: 'Molecular science and reactions' },
    { name: 'Biology', icon: '🧬', description: 'Life sciences and organisms' },
    { name: 'Computer Science', icon: '💻', description: 'Technology and programming' },
    { name: 'Economics', icon: '📈', description: 'Markets and financial systems' },
    { name: 'History', icon: '📚', description: 'Past events and civilizations' },
    { name: 'Geography', icon: '🌍', description: 'Earth sciences and environments' },
    { name: 'Literature', icon: '✍️', description: 'Language arts and writing' },
    { name: 'Psychology', icon: '🧠', description: 'Human behavior and mind' },
    { name: 'Environmental Science', icon: '🌱', description: 'Sustainability and ecology' },
    { name: 'Engineering', icon: '⚙️', description: 'Building and design solutions' }
  ];

  const learningStyles = [
    { 
      value: 'visual', 
      label: 'Visual Learner', 
      description: 'Learn best through diagrams, charts, and visual presentations',
      icon: '👁️'
    },
    { 
      value: 'auditory', 
      label: 'Auditory Learner', 
      description: 'Prefer listening to explanations and discussions',
      icon: '👂'
    },
    { 
      value: 'kinesthetic', 
      label: 'Hands-On Learner', 
      description: 'Learn by doing, experimenting, and practical application',
      icon: '✋'
    },
    { 
      value: 'reading', 
      label: 'Reading/Writing Learner', 
      description: 'Excel with written information and note-taking',
      icon: '📖'
    }
  ];

  const hobbies = [
    { name: 'Sports & Fitness', icon: '🏃', description: 'Physical activities and wellness' },
    { name: 'Music & Arts', icon: '🎵', description: 'Creative expression and performance' },
    { name: 'Technology', icon: '💻', description: 'Coding, gadgets, and innovation' },
    { name: 'Reading & Writing', icon: '📖', description: 'Literature and communication' },
    { name: 'Science & Research', icon: '🔬', description: 'Discovery and experimentation' },
    { name: 'Social Service', icon: '❤️', description: 'Community involvement and helping others' },
    { name: 'Entrepreneurship', icon: '💡', description: 'Business ideas and innovation' },
    { name: 'Nature & Environment', icon: '🌲', description: 'Outdoor activities and conservation' },
    { name: 'Photography', icon: '📸', description: 'Visual storytelling and creativity' },
    { name: 'Debate & Public Speaking', icon: '🎤', description: 'Communication and leadership' }
  ];

  const careerGoals = [
    { 
      value: 'entrepreneurship', 
      label: 'Entrepreneur', 
      description: 'Build innovative businesses and create value',
      icon: '🚀'
    },
    { 
      value: 'corporate', 
      label: 'Corporate Professional', 
      description: 'Work in established organizations and teams',
      icon: '🏢'
    },
    { 
      value: 'government', 
      label: 'Public Service', 
      description: 'Serve the nation and contribute to policy',
      icon: '🏛️'
    },
    { 
      value: 'research', 
      label: 'Research & Academia', 
      description: 'Advance knowledge and scientific understanding',
      icon: '🔬'
    },
    { 
      value: 'creative', 
      label: 'Creative Professional', 
      description: 'Work in arts, media, and creative industries',
      icon: '🎭'
    },
    { 
      value: 'social', 
      label: 'Social Impact', 
      description: 'Address societal challenges and create change',
      icon: '🌍'
    }
  ];

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.class) {
      onUserRegistration({
        name: formData.name,
        class: formData.class,
        academicInterests: [],
        extracurricularInterests: [],
      });
      setCurrentStep(1);
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      academicSubjects: prev.academicSubjects?.includes(subject)
        ? prev.academicSubjects.filter(s => s !== subject)
        : [...(prev.academicSubjects || []), subject]
    }));
  };

  const handleHobbyToggle = (hobby: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      hobbies: prev.hobbies?.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...(prev.hobbies || []), hobby]
    }));
  };

  const handleQuizSubmit = () => {
    if (quizAnswers.academicSubjects && quizAnswers.learningStyle && 
        quizAnswers.hobbies && quizAnswers.careerGoals) {
      onQuizCompletion(quizAnswers as QuizAnswers);
    }
  };

  const getProgress = () => {
    switch (currentStep) {
      case 0: return 0;
      case 1: return 25;
      case 2: return 50;
      case 3: return 75;
      case 4: return 100;
      default: return 0;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return (quizAnswers.academicSubjects?.length || 0) >= 3;
      case 2: return !!quizAnswers.learningStyle;
      case 3: return (quizAnswers.hobbies?.length || 0) >= 2;
      case 4: return !!quizAnswers.careerGoals;
      default: return false;
    }
  };

  const stepTitles = [
    'Welcome',
    'Academic Interests',
    'Learning Style',
    'Activities & Hobbies',
    'Career Goals'
  ];

  const ProgressTracker = () => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1a202c]">Assessment Progress</h2>
        <span className="text-sm text-[#718096]">Step {currentStep} of 4</span>
      </div>
      
      <div className="relative">
        <Progress value={getProgress()} className="h-2 bg-gray-200" />
        <div className="flex justify-between mt-4">
          {stepTitles.slice(1).map((title, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep > index + 1 
                  ? 'bg-[#0891b2] text-white' 
                  : currentStep === index + 1
                  ? 'bg-[#0891b2] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              <span className="text-xs mt-2 text-center text-[#718096]">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {currentStep > 0 && <ProgressTracker />}

        {/* Step 0: Registration */}
        {currentStep === 0 && (
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-[#0891b2] rounded-lg flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-[#1a202c]">
                Welcome to CareerGuide
              </CardTitle>
              <p className="text-[#718096] text-lg mt-4 max-w-md mx-auto">
                Let's start by learning a bit about you and your academic journey.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegistration} className="space-y-8 max-w-md mx-auto">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-[#1a202c] font-medium">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="border border-gray-300 focus:border-[#0891b2] rounded-lg py-3 text-base"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="class" className="text-[#1a202c] font-medium">Current Class/Year</Label>
                  <Input
                    id="class"
                    type="text"
                    placeholder="e.g., Class 12, 1st Year College"
                    value={formData.class}
                    onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
                    className="border border-gray-300 focus:border-[#0891b2] rounded-lg py-3 text-base"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#0891b2] hover:bg-[#0e7490] text-white py-4 text-lg rounded-lg"
                >
                  Begin Assessment
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Academic Interests */}
        {currentStep === 1 && (
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-[#0891b2] rounded-lg flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#1a202c]">Academic Interests</CardTitle>
              <p className="text-[#718096] text-lg mt-4">
                Select at least 3 subjects that genuinely interest you
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {academicSubjects.map((subject) => (
                  <div 
                    key={subject.name} 
                    className={`cursor-pointer transition-all duration-200 ${
                      quizAnswers.academicSubjects?.includes(subject.name) 
                        ? 'transform scale-105' 
                        : 'hover:transform hover:scale-102'
                    }`}
                    onClick={() => handleSubjectToggle(subject.name)}
                  >
                    <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      quizAnswers.academicSubjects?.includes(subject.name)
                        ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-lg'
                        : 'bg-white border-gray-200 hover:border-[#0891b2] hover:shadow-md'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            quizAnswers.academicSubjects?.includes(subject.name) ? 'text-white' : 'text-[#1a202c]'
                          }`}>
                            {subject.name}
                          </div>
                          <div className={`text-sm mt-1 ${
                            quizAnswers.academicSubjects?.includes(subject.name) ? 'text-white/80' : 'text-[#718096]'
                          }`}>
                            {subject.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(0)} className="px-6 py-3 rounded-lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceed()}
                  className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Learning Style */}
        {currentStep === 2 && (
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-[#0891b2] rounded-lg flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#1a202c]">Learning Style</CardTitle>
              <p className="text-[#718096] text-lg mt-4">
                How do you learn and process information most effectively?
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                {learningStyles.map((style) => (
                  <div 
                    key={style.value}
                    className={`cursor-pointer transition-all duration-200 ${
                      quizAnswers.learningStyle === style.value ? 'transform scale-102' : 'hover:transform hover:scale-101'
                    }`}
                    onClick={() => setQuizAnswers(prev => ({ ...prev, learningStyle: style.value }))}
                  >
                    <div className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                      quizAnswers.learningStyle === style.value
                        ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-lg'
                        : 'bg-white border-gray-200 hover:border-[#0891b2] hover:shadow-md'
                    }`}>
                      <div className="flex items-start space-x-4">
                        <span className="text-3xl">{style.icon}</span>
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg mb-2 ${
                            quizAnswers.learningStyle === style.value ? 'text-white' : 'text-[#1a202c]'
                          }`}>
                            {style.label}
                          </h4>
                          <p className={`${
                            quizAnswers.learningStyle === style.value ? 'text-white/90' : 'text-[#718096]'
                          }`}>
                            {style.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="px-6 py-3 rounded-lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceed()}
                  className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Hobbies & Extracurriculars */}
        {currentStep === 3 && (
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-[#0891b2] rounded-lg flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#1a202c]">Activities & Interests</CardTitle>
              <p className="text-[#718096] text-lg mt-4">
                Select at least 2 activities or areas that you're passionate about
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {hobbies.map((hobby) => (
                  <div 
                    key={hobby.name} 
                    className={`cursor-pointer transition-all duration-200 ${
                      quizAnswers.hobbies?.includes(hobby.name) 
                        ? 'transform scale-105' 
                        : 'hover:transform hover:scale-102'
                    }`}
                    onClick={() => handleHobbyToggle(hobby.name)}
                  >
                    <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      quizAnswers.hobbies?.includes(hobby.name)
                        ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-lg'
                        : 'bg-white border-gray-200 hover:border-[#0891b2] hover:shadow-md'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{hobby.icon}</span>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            quizAnswers.hobbies?.includes(hobby.name) ? 'text-white' : 'text-[#1a202c]'
                          }`}>
                            {hobby.name}
                          </div>
                          <div className={`text-sm mt-1 ${
                            quizAnswers.hobbies?.includes(hobby.name) ? 'text-white/80' : 'text-[#718096]'
                          }`}>
                            {hobby.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="px-6 py-3 rounded-lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(4)}
                  disabled={!canProceed()}
                  className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Career Goals */}
        {currentStep === 4 && (
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-[#0891b2] rounded-lg flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#1a202c]">Career Aspirations</CardTitle>
              <p className="text-[#718096] text-lg mt-4">
                What type of career path aligns with your goals and values?
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                {careerGoals.map((goal) => (
                  <div 
                    key={goal.value}
                    className={`cursor-pointer transition-all duration-200 ${
                      quizAnswers.careerGoals === goal.value ? 'transform scale-102' : 'hover:transform hover:scale-101'
                    }`}
                    onClick={() => setQuizAnswers(prev => ({ ...prev, careerGoals: goal.value }))}
                  >
                    <div className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                      quizAnswers.careerGoals === goal.value
                        ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-lg'
                        : 'bg-white border-gray-200 hover:border-[#0891b2] hover:shadow-md'
                    }`}>
                      <div className="flex items-start space-x-4">
                        <span className="text-3xl">{goal.icon}</span>
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg mb-2 ${
                            quizAnswers.careerGoals === goal.value ? 'text-white' : 'text-[#1a202c]'
                          }`}>
                            {goal.label}
                          </h4>
                          <p className={`${
                            quizAnswers.careerGoals === goal.value ? 'text-white/90' : 'text-[#718096]'
                          }`}>
                            {goal.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)} className="px-6 py-3 rounded-lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleQuizSubmit}
                  disabled={!canProceed()}
                  className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-8 py-4 rounded-lg disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Complete Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}