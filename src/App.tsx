import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { OnboardingQuiz } from './components/OnboardingQuiz';
import { Dashboard } from './components/Dashboard';
import { CareerPath } from './components/CareerPath';
import { CollegeDirectory } from './components/CollegeDirectory';
import { UserProfile } from './components/UserProfile';
import { Chatbot } from './components/Chatbot';
import { CounselorQA } from './components/CounselorQA';
import { ResourceHub } from './components/ResourceHub';
import { Navigation } from './components/Navigation';

export type Page = 'landing' | 'onboarding' | 'dashboard' | 'career-path' | 'college-directory' | 'user-profile' | 'expert-forum' | 'resource-hub';

export interface User {
  id: string;
  name: string;
  class: string;
  academicInterests: string[];
  extracurricularInterests: string[];
  quizCompleted: boolean;
}

export interface QuizAnswers {
  academicSubjects: string[];
  learningStyle: string;
  hobbies: string[];
  careerGoals: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    // Check if user is already logged in (simulate localStorage)
    const savedUser = localStorage.getItem('guidanceUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.quizCompleted) {
        setCurrentPage('dashboard');
      }
    }
  }, []);

  const handleUserRegistration = (userData: Omit<User, 'id' | 'quizCompleted'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      quizCompleted: false,
    };
    setUser(newUser);
    localStorage.setItem('guidanceUser', JSON.stringify(newUser));
  };

  const handleQuizCompletion = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    if (user) {
      const updatedUser: User = {
        ...user,
        quizCompleted: true,
        academicInterests: answers.academicSubjects,
        extracurricularInterests: answers.hobbies,
      };
      setUser(updatedUser);
      localStorage.setItem('guidanceUser', JSON.stringify(updatedUser));
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setQuizAnswers(null);
    localStorage.removeItem('guidanceUser');
    setCurrentPage('landing');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('onboarding')} />;
      case 'onboarding':
        return (
          <OnboardingQuiz
            onUserRegistration={handleUserRegistration}
            onQuizCompletion={handleQuizCompletion}
            user={user}
          />
        );
      case 'dashboard':
        return <Dashboard user={user} quizAnswers={quizAnswers} onNavigate={setCurrentPage} />;
      case 'career-path':
        return <CareerPath user={user} />;
      case 'college-directory':
        return <CollegeDirectory user={user} />;
      case 'user-profile':
        return <UserProfile user={user} onLogout={handleLogout} />;
      case 'expert-forum':
        return (
          <div className="space-y-8">
            <Chatbot user={user} />
            <div className="max-w-6xl mx-auto px-6">
              <CounselorQA />
            </div>
          </div>
        );
      case 'resource-hub':
        return <ResourceHub user={user} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('onboarding')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user && currentPage !== 'onboarding' && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          user={user}
        />
      )}
      {renderCurrentPage()}
    </div>
  );
}