import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Users, 
  Award, 
  CheckCircle,
  Star,
  BookOpen,
  GraduationCap,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface QAItem {
  id: string;
  question: string;
  answer: string;
  counselor: {
    name: string;
    title: string;
    experience: string;
    specializations: string[];
    avatar?: string;
  };
  category: string;
  upvotes: number;
  isVerified: boolean;
}

interface CounselorQAProps {
  className?: string;
}

export function CounselorQA({ className = '' }: CounselorQAProps) {
  const qaData: QAItem[] = [
    {
      id: '1',
      question: 'What are the best engineering colleges in Jammu & Kashmir for Computer Science?',
      answer: 'For Computer Science in J&K, IIT Jammu is the top choice with excellent placements and cutting-edge curriculum. NIT Srinagar is also highly recommended with strong industry connections. University of Kashmir offers a good CS program with affordable fees, while SKUAST-Kashmir has recently introduced tech programs. Consider your JEE rank, financial situation, and career goals when choosing. All these institutions provide quality education and good placement opportunities.',
      counselor: {
        name: 'Ms. Ananya Sharma',
        title: 'Senior Career Counselor',
        experience: '12+ years',
        specializations: ['Engineering Admissions', 'Career Guidance', 'J&K Education'],
        avatar: 'AS'
      },
      category: 'college',
      upvotes: 45,
      isVerified: true
    },
    {
      id: '2',
      question: 'How can students from rural J&K access quality education and career guidance?',
      answer: 'Students from rural areas can access quality education through online platforms, government schemes like PMSSS, and mobile career guidance centers. The J&K government has set up digital libraries and online learning platforms. Many NGOs provide free career counseling sessions. Students can also participate in online workshops and webinars. Local community centers often have computer labs with internet access. I recommend starting with basic digital literacy and gradually exploring online educational resources.',
      counselor: {
        name: 'Dr. Mohd. Iqbal',
        title: 'Education Specialist',
        experience: '15+ years',
        specializations: ['Rural Education', 'Digital Literacy', 'Government Schemes'],
        avatar: 'MI'
      },
      category: 'guidance',
      upvotes: 38,
      isVerified: true
    },
    {
      id: '3',
      question: 'What scholarship opportunities are available for J&K students pursuing higher education?',
      answer: 'J&K students have access to multiple scholarship schemes including PMSSS (Prime Minister\'s Special Scholarship Scheme), J&K Merit Scholarship, and various state government schemes. Central schemes like Merit-cum-Means Scholarship and Post Matric Scholarship are also available. Private organizations like Tata Trusts and Reliance Foundation offer scholarships. Students should apply early and maintain good academic records. The J&K Scholarship Portal is the central platform for most applications.',
      counselor: {
        name: 'Ms. Priya Gupta',
        title: 'Scholarship Coordinator',
        experience: '8+ years',
        specializations: ['Scholarships', 'Financial Aid', 'Government Schemes'],
        avatar: 'PG'
      },
      category: 'scholarship',
      upvotes: 52,
      isVerified: true
    },
    {
      id: '4',
      question: 'What career opportunities exist in agriculture and horticulture for J&K students?',
      answer: 'J&K offers excellent opportunities in agriculture and horticulture, especially in fruit production, floriculture, and organic farming. Graduates can work as Horticulture Officers, Agricultural Scientists, or Farm Managers. The apple industry in Kashmir provides numerous opportunities in production, processing, and export. Students can also pursue entrepreneurship in organic farming or start agri-tech ventures. SKUAST-Kashmir and SKUAST-Jammu are premier institutions for agricultural education. Government jobs are available in agriculture departments and research institutes.',
      counselor: {
        name: 'Prof. Rajesh Kumar',
        title: 'Agricultural Expert',
        experience: '20+ years',
        specializations: ['Agriculture', 'Horticulture', 'Rural Development'],
        avatar: 'RK'
      },
      category: 'career',
      upvotes: 41,
      isVerified: true
    },
    {
      id: '5',
      question: 'How should students prepare for competitive exams like JEE and NEET while studying in J&K?',
      answer: 'For competitive exam preparation in J&K, students should focus on strong fundamentals and consistent practice. Join local coaching centers or online platforms for structured learning. Form study groups with peers for motivation and doubt clearing. Utilize free online resources like NPTEL lectures and YouTube channels. Practice previous year papers and take regular mock tests. Maintain a healthy study schedule and don\'t neglect physical and mental health. Consider joining online communities of J&K students for peer support and guidance.',
      counselor: {
        name: 'Dr. Sunita Verma',
        title: 'Exam Preparation Expert',
        experience: '10+ years',
        specializations: ['Competitive Exams', 'Study Strategies', 'Student Counseling'],
        avatar: 'SV'
      },
      category: 'exam',
      upvotes: 47,
      isVerified: true
    },
    {
      id: '6',
      question: 'What are the job prospects for students after completing education from J&K institutions?',
      answer: 'Students from J&K institutions have good job prospects both within the state and nationally. Local opportunities exist in tourism, handicrafts, agriculture, and government services. Many students migrate to other states for better opportunities in IT, banking, and corporate sectors. The J&K government provides employment schemes and skill development programs. Students should focus on developing marketable skills and building professional networks. Consider internships and part-time work during studies to gain experience.',
      counselor: {
        name: 'Mr. Amit Singh',
        title: 'Placement Coordinator',
        experience: '9+ years',
        specializations: ['Placements', 'Career Development', 'Industry Relations'],
        avatar: 'AS'
      },
      category: 'career',
      upvotes: 39,
      isVerified: true
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'college':
        return <GraduationCap className="h-4 w-4" />;
      case 'scholarship':
        return <DollarSign className="h-4 w-4" />;
      case 'career':
        return <Briefcase className="h-4 w-4" />;
      case 'exam':
        return <BookOpen className="h-4 w-4" />;
      case 'guidance':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'college':
        return 'bg-blue-100 text-blue-800';
      case 'scholarship':
        return 'bg-green-100 text-green-800';
      case 'career':
        return 'bg-purple-100 text-purple-800';
      case 'exam':
        return 'bg-orange-100 text-orange-800';
      case 'guidance':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-indigo-600 p-3 rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Expert Counselor Q&A</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get insights from experienced career counselors and education experts on the most common questions from students
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800">6 Expert Counselors</span>
          </div>
          <p className="text-sm text-blue-600">Verified professionals</p>
        </Card>
        <Card className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">262 Total Answers</span>
          </div>
          <p className="text-sm text-green-600">Community helped</p>
        </Card>
        <Card className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-800">4.8/5 Rating</span>
          </div>
          <p className="text-sm text-purple-600">Expert quality</p>
        </Card>
      </div>

      {/* Q&A Cards */}
      <div className="grid gap-6">
        {qaData.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Question */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <Badge className={`${getCategoryColor(item.category)} flex items-center space-x-1`}>
                      {getCategoryIcon(item.category)}
                      <span className="capitalize">{item.category}</span>
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>{item.upvotes}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
                    {item.question}
                  </h3>
                </div>

                {/* Answer */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>

                {/* Counselor Info */}
                <div className="flex items-center space-x-4 pt-2 border-t">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-indigo-600 text-white font-semibold">
                      {item.counselor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-800">{item.counselor.name}</h4>
                      {item.isVerified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.counselor.title}</p>
                    <p className="text-xs text-gray-500">{item.counselor.experience} experience</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.counselor.specializations.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {item.counselor.specializations.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.counselor.specializations.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Need More Personalized Help?</h3>
          <p className="mb-4 opacity-90">
            Our expert counselors are available for one-on-one sessions to provide personalized career guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Badge className="bg-white/20 text-white border-white/30">
              <Users className="h-4 w-4 mr-2" />
              Book Counseling Session
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask Follow-up Questions
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
