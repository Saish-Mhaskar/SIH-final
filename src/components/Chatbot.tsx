import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle,
  BookOpen,
  GraduationCap,
  DollarSign,
  Heart
} from 'lucide-react';
import type { User as UserType } from '../App';

interface ChatbotProps {
  user: UserType | null;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface PreSetQuestion {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export function Chatbot({ user }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm CARYON, your AI career guidance assistant. I'm here to help you with questions about scholarships, career prospects, education opportunities, and more. Feel free to ask me anything or try one of the suggested questions below!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const preSetQuestions: PreSetQuestion[] = [
    {
      id: '1',
      question: "What is the PMSSS scholarship?",
      answer: "The Prime Minister's Special Scholarship Scheme (PMSSS) is a government initiative that provides financial assistance to students from Jammu & Kashmir to pursue higher education in reputed institutions across India. The scheme covers tuition fees, hostel charges, and provides a monthly allowance of ₹1,000. Students can apply for undergraduate and postgraduate courses in engineering, medicine, management, and other professional courses. The selection is based on merit and the student's academic performance.",
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      id: '2',
      question: "What are the job prospects for a B.Sc. in Horticulture?",
      answer: "A B.Sc. in Horticulture offers excellent career opportunities, especially in Jammu & Kashmir where agriculture and horticulture are major industries. Graduates can work as Horticulture Officers, Agricultural Scientists, Farm Managers, or start their own fruit orchards. The Kashmir Valley's apple industry provides numerous opportunities in fruit production, processing, and export. You can also pursue higher education like M.Sc. or Ph.D. to become a researcher or professor. Government jobs are available in agriculture departments, research institutes, and extension services.",
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      id: '3',
      question: "How do I apply for a student loan?",
      answer: "To apply for a student loan in India, you can approach nationalized banks, private banks, or NBFCs. Key documents required include admission letter, fee structure, academic records, and income proof of parents/guardians. For students from J&K, special schemes like the J&K Bank's Student Loan Scheme offer competitive interest rates. The loan typically covers tuition fees, hostel charges, and other educational expenses. Repayment usually starts 6 months after course completion. Make sure to compare interest rates and terms from different banks before applying.",
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      id: '4',
      question: "What career options are available after Class 12 in J&K?",
      answer: "After Class 12 in Jammu & Kashmir, you have numerous career options including engineering (IIT Jammu, NIT Srinagar), medicine (GMC Jammu/Srinagar), agriculture (SKUAST), commerce, arts, and vocational courses. The state also offers opportunities in tourism, handicrafts, and government services. You can pursue higher education within J&K or migrate to other states for better opportunities. Consider your interests, academic performance, and career goals while choosing your path. The J&K government also provides various scholarship schemes to support higher education.",
      icon: <Heart className="h-4 w-4" />
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePreSetQuestion = (question: PreSetQuestion) => {
    // Add user question
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay and add bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: question.answer,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Generic response for any other text
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I can only help with specific questions right now. Please select one of the options above, or try asking about scholarships, career guidance, or educational opportunities in Jammu & Kashmir.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">CARYON AI Assistant</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant answers to your career and education questions with our intelligent AI assistant
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>Chat with CARYON</span>
                </CardTitle>
              </CardHeader>
              
              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className={message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}>
                          {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gray-600 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your question here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Questions Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span>Quick Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {preSetQuestions.map((question) => (
                  <Button
                    key={question.id}
                    onClick={() => handlePreSetQuestion(question)}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 text-left hover:bg-blue-50 hover:border-blue-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-600 mt-0.5">
                        {question.icon}
                      </div>
                      <span className="text-sm">{question.question}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-100">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800 mb-2">Need More Help?</h3>
                <p className="text-sm text-green-700 mb-3">
                  CARYON can help you with questions about:
                </p>
                <div className="space-y-1">
                  {['Scholarships & Financial Aid', 'Career Guidance', 'College Admissions', 'J&K Specific Opportunities', 'Educational Loans'].map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-green-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{topic}</span>
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
