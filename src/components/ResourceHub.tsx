import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Download, 
  ExternalLink,
  Star,
  Calendar,
  Users,
  Award,
  Globe,
  FileText,
  GraduationCap,
  DollarSign,
  Clock,
  Eye
} from 'lucide-react';
import { cn } from './ui/utils';
import type { User } from '../App';

interface ResourceHubProps {
  user: User | null;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'skill-material' | 'scholarship';
  category: string;
  subject: string;
  author?: string;
  publisher?: string;
  format: string;
  size?: string;
  pages?: number;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  rating: number;
  downloads: number;
  publishedDate: string;
  lastUpdated: string;
  tags: string[];
  isFree: boolean;
  price?: string;
  url: string;
  thumbnail?: string;
  eligibility?: string;
  deadline?: string;
  amount?: string;
}

export function ResourceHub({ user }: ResourceHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showJKFocused, setShowJKFocused] = useState(false);

  // Mock resource data
  const resources: Resource[] = [
    // E-books
    {
      id: '1',
      title: 'Complete Guide to JEE Main & Advanced Preparation',
      description: 'Comprehensive study material covering all topics for JEE Main and Advanced examinations with practice questions and solved examples.',
      type: 'ebook',
      category: 'Engineering',
      subject: 'Mathematics',
      author: 'Dr. Rajesh Kumar',
      publisher: 'Career Publications',
      format: 'PDF',
      size: '15.2 MB',
      pages: 450,
      language: 'English',
      level: 'intermediate',
      rating: 4.7,
      downloads: 12500,
      publishedDate: '2024-01-15',
      lastUpdated: '2024-03-10',
      tags: ['JEE', 'Engineering', 'Mathematics', 'Physics', 'Chemistry'],
      isFree: true,
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Horticulture and Agriculture in Kashmir Valley',
      description: 'In-depth guide covering traditional and modern agricultural practices, fruit cultivation, and sustainable farming methods in Kashmir.',
      type: 'ebook',
      category: 'Agriculture',
      subject: 'Horticulture',
      author: 'Prof. Mohd. Iqbal',
      publisher: 'Kashmir Agricultural Institute',
      format: 'PDF',
      size: '22.8 MB',
      pages: 320,
      language: 'English/Hindi',
      level: 'beginner',
      rating: 4.5,
      downloads: 8900,
      publishedDate: '2023-11-20',
      lastUpdated: '2024-02-15',
      tags: ['Agriculture', 'Kashmir', 'Horticulture', 'Sustainable Farming'],
      isFree: true,
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Digital Skills for Remote Learning',
      description: 'Essential digital literacy skills for students in remote areas, covering online learning platforms, digital tools, and internet safety.',
      type: 'ebook',
      category: 'Technology',
      subject: 'Digital Literacy',
      author: 'TechEd Foundation',
      publisher: 'Digital India Initiative',
      format: 'PDF',
      size: '18.5 MB',
      pages: 280,
      language: 'English/Hindi',
      level: 'beginner',
      rating: 4.6,
      downloads: 15600,
      publishedDate: '2024-02-01',
      lastUpdated: '2024-04-05',
      tags: ['Digital Skills', 'Online Learning', 'Technology', 'Remote Education'],
      isFree: true,
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },
    
    // Skill Materials
    {
      id: '4',
      title: 'Python Programming for Beginners - Interactive Course',
      description: 'Step-by-step Python programming course with hands-on exercises, coding challenges, and real-world projects.',
      type: 'skill-material',
      category: 'Programming',
      subject: 'Computer Science',
      author: 'CodeAcademy',
      publisher: 'Programming Hub',
      format: 'Interactive',
      language: 'English',
      level: 'beginner',
      rating: 4.8,
      downloads: 25000,
      publishedDate: '2024-01-10',
      lastUpdated: '2024-03-20',
      tags: ['Python', 'Programming', 'Coding', 'Computer Science'],
      isFree: true,
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '5',
      title: 'Spoken English and Communication Skills',
      description: 'Comprehensive course to improve English speaking, listening, and communication skills with audio lessons and practice exercises.',
      type: 'skill-material',
      category: 'Language',
      subject: 'English',
      author: 'Language Institute of India',
      publisher: 'Communication Hub',
      format: 'Audio + PDF',
      language: 'English/Hindi',
      level: 'beginner',
      rating: 4.4,
      downloads: 18700,
      publishedDate: '2023-12-05',
      lastUpdated: '2024-02-28',
      tags: ['English', 'Communication', 'Speaking', 'Language Learning'],
      isFree: true,
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '6',
      title: 'Financial Literacy and Investment Basics',
      description: 'Learn about personal finance, budgeting, saving, and basic investment strategies for students and young professionals.',
      type: 'skill-material',
      category: 'Finance',
      subject: 'Economics',
      author: 'Finance Education Trust',
      publisher: 'Money Matters',
      format: 'Video + PDF',
      language: 'English/Hindi',
      level: 'beginner',
      rating: 4.3,
      downloads: 12300,
      publishedDate: '2024-02-15',
      lastUpdated: '2024-04-01',
      tags: ['Finance', 'Investment', 'Budgeting', 'Personal Finance'],
      isFree: true,
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },

    // Scholarships
    {
      id: '7',
      title: 'Prime Minister\'s Special Scholarship Scheme (PMSSS)',
      description: 'Government scholarship for students from Jammu & Kashmir to pursue higher education in reputed institutions across India.',
      type: 'scholarship',
      category: 'Government',
      subject: 'All Subjects',
      author: 'Government of India',
      publisher: 'Ministry of Education',
      format: 'Application Form',
      language: 'English/Hindi',
      level: 'all',
      rating: 4.9,
      downloads: 45000,
      publishedDate: '2024-01-01',
      lastUpdated: '2024-03-15',
      tags: ['PMSSS', 'J&K Students', 'Higher Education', 'Government Scholarship'],
      isFree: true,
      eligibility: 'Students from J&K with 60%+ in Class 12',
      deadline: '2024-06-30',
      amount: '₹1,00,000 - ₹2,00,000 per year',
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '8',
      title: 'J&K Merit Scholarship for Engineering Students',
      description: 'State government scholarship for meritorious students pursuing engineering courses in J&K or outside.',
      type: 'scholarship',
      category: 'State Government',
      subject: 'Engineering',
      author: 'J&K Government',
      publisher: 'Higher Education Department',
      format: 'Application Form',
      language: 'English/Hindi',
      level: 'all',
      rating: 4.6,
      downloads: 18000,
      publishedDate: '2024-02-01',
      lastUpdated: '2024-04-10',
      tags: ['J&K', 'Engineering', 'Merit Scholarship', 'State Government'],
      isFree: true,
      eligibility: 'J&K domicile with 75%+ in Class 12',
      deadline: '2024-07-15',
      amount: '₹50,000 per year',
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '9',
      title: 'Apple Growers Association Scholarship',
      description: 'Scholarship for students pursuing agriculture and horticulture studies, with special focus on apple cultivation.',
      type: 'scholarship',
      category: 'Private',
      subject: 'Agriculture',
      author: 'Kashmir Apple Growers Association',
      publisher: 'Agricultural Trust',
      format: 'Application Form',
      language: 'English/Hindi',
      level: 'all',
      rating: 4.2,
      downloads: 5600,
      publishedDate: '2023-11-10',
      lastUpdated: '2024-03-05',
      tags: ['Agriculture', 'Apple Cultivation', 'Kashmir', 'Private Scholarship'],
      isFree: true,
      eligibility: 'Students from apple-growing regions',
      deadline: '2024-05-31',
      amount: '₹25,000 per year',
      url: '#',
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const types = ['all', 'ebook', 'skill-material', 'scholarship'];
  const subjects = ['all', ...Array.from(new Set(resources.map(r => r.subject)))];
  const levels = ['all', 'beginner', 'intermediate', 'advanced', 'all'];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
      const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel || resource.level === 'all';
      const matchesFree = !showFreeOnly || resource.isFree;
      const matchesJK = !showJKFocused || resource.tags.some(tag => 
        tag.toLowerCase().includes('j&k') || 
        tag.toLowerCase().includes('kashmir') || 
        tag.toLowerCase().includes('jammu')
      );

      return matchesSearch && matchesType && matchesSubject && matchesLevel && matchesFree && matchesJK;
    });
  }, [searchTerm, selectedType, selectedSubject, selectedLevel, showFreeOnly, showJKFocused]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ebook': return 'bg-blue-100 text-blue-800';
      case 'skill-material': return 'bg-green-100 text-green-800';
      case 'scholarship': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook': return <BookOpen className="h-4 w-4" />;
      case 'skill-material': return <GraduationCap className="h-4 w-4" />;
      case 'scholarship': return <Award className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatTypeName = (type: string) => {
    switch (type) {
      case 'skill-material': return 'Skill Material';
      case 'ebook': return 'E-book';
      case 'scholarship': return 'Scholarship';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expand Your Horizons
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover open-source e-books, skill development materials, and scholarship opportunities 
            to accelerate your learning journey and unlock new possibilities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">3 E-books</span>
            </div>
            <p className="text-sm text-blue-600">Free learning materials</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <GraduationCap className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">3 Skill Materials</span>
            </div>
            <p className="text-sm text-green-600">Interactive courses</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-800">3 Scholarships</span>
            </div>
            <p className="text-sm text-purple-600">Financial opportunities</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Download className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-800">142K+ Downloads</span>
            </div>
            <p className="text-sm text-orange-600">Community impact</p>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, description, or tags..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Resource Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : formatTypeName(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="free-only"
                    checked={showFreeOnly}
                    onCheckedChange={setShowFreeOnly}
                  />
                  <label htmlFor="free-only" className="text-sm font-medium cursor-pointer">
                    Free Only
                  </label>
                </div>
              </div>

              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="jk-focused"
                    checked={showJKFocused}
                    onCheckedChange={setShowJKFocused}
                  />
                  <label htmlFor="jk-focused" className="text-sm font-medium cursor-pointer">
                    J&K Focused
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredResources.length} Resource{filteredResources.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Showing relevant resources</span>
          </div>
        </div>

        {/* Resource Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(resource.type)}
                      <Badge className={getTypeColor(resource.type)}>
                        {formatTypeName(resource.type)}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </CardTitle>
                    {resource.author && (
                      <p className="text-sm text-muted-foreground">
                        by {resource.author}
                      </p>
                    )}
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Download className="h-3 w-3" />
                      <span>{resource.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>

                {/* Resource-specific details */}
                {resource.type === 'scholarship' && (
                  <div className="bg-purple-50 p-3 rounded-lg space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {resource.amount && (
                        <div>
                          <span className="text-muted-foreground">Amount: </span>
                          <span className="font-medium text-purple-800">{resource.amount}</span>
                        </div>
                      )}
                      {resource.deadline && (
                        <div>
                          <span className="text-muted-foreground">Deadline: </span>
                          <span className="font-medium">{resource.deadline}</span>
                        </div>
                      )}
                    </div>
                    {resource.eligibility && (
                      <div className="text-xs">
                        <span className="text-muted-foreground">Eligibility: </span>
                        <span>{resource.eligibility}</span>
                      </div>
                    )}
                  </div>
                )}

                {resource.type === 'ebook' && (
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    {resource.pages && (
                      <div>
                        <span>Pages: </span>
                        <span className="font-medium">{resource.pages}</span>
                      </div>
                    )}
                    {resource.size && (
                      <div>
                        <span>Size: </span>
                        <span className="font-medium">{resource.size}</span>
                      </div>
                    )}
                    <div>
                      <span>Format: </span>
                      <span className="font-medium">{resource.format}</span>
                    </div>
                  </div>
                )}

                {resource.type === 'skill-material' && (
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span>Format: </span>
                      <span className="font-medium">{resource.format}</span>
                    </div>
                    <div>
                      <span>Level: </span>
                      <span className="font-medium capitalize">{resource.level}</span>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 4).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{resource.tags.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" className="text-xs">
                    {resource.type === 'scholarship' ? (
                      <>
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Apply Now
                      </>
                    ) : resource.type === 'ebook' ? (
                      <>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Start Course
                      </>
                    )}
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">No resources found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters to find more resources.
                  </p>
                </div>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedSubject('all');
                  setSelectedLevel('all');
                  setShowFreeOnly(false);
                  setShowJKFocused(false);
                }}>
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
