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
  MapPin, 
  GraduationCap, 
  Users, 
  Star,
  ExternalLink,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import type { User } from '../App';

interface CollegeDirectoryProps {
  user: User | null;
}

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: 'government' | 'private' | 'deemed';
  courses: string[];
  fees: {
    government: string;
    general: string;
  };
  rating: number;
  established: number;
  facilities: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  specialties: string[];
  placements?: {
    average: string;
    highest: string;
    companies: string[];
  };
}

export function CollegeDirectory({ user }: CollegeDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [showJKOnly, setShowJKOnly] = useState(false);

  // Mock college data with emphasis on J&K institutions
  const colleges: College[] = [
    {
      id: '1',
      name: 'University of Kashmir',
      location: 'Srinagar',
      state: 'Jammu & Kashmir',
      type: 'government',
      courses: ['Computer Science', 'Horticulture', 'Environmental Science', 'Business Administration', 'Psychology'],
      fees: { government: '₹15,000-25,000', general: '₹25,000-45,000' },
      rating: 4.2,
      established: 1948,
      facilities: ['Central Library', 'Hostels', 'Sports Complex', 'Research Labs', 'WiFi Campus'],
      contact: {
        phone: '+91-194-2427002',
        email: 'info@kashmiruniversity.net',
        website: 'www.kashmiruniversity.net'
      },
      specialties: ['Kashmir Studies', 'Horticulture Research', 'Environmental Studies'],
      placements: {
        average: '₹4.5 LPA',
        highest: '₹18 LPA',
        companies: ['Infosys', 'TCS', 'J&K Bank', 'HCL', 'State Government']
      }
    },
    {
      id: '2',
      name: 'SKUAST-Kashmir',
      location: 'Shalimar',
      state: 'Jammu & Kashmir',
      type: 'government',
      courses: ['Agriculture', 'Horticulture', 'Veterinary Science', 'Forestry', 'Agricultural Engineering'],
      fees: { government: '₹12,000-20,000', general: '₹20,000-35,000' },
      rating: 4.5,
      established: 1982,
      facilities: ['Research Farms', 'Modern Labs', 'Library', 'Hostels', 'Equipment Training Center'],
      contact: {
        phone: '+91-194-2262081',
        email: 'info@skuastkashmir.ac.in',
        website: 'www.skuastkashmir.ac.in'
      },
      specialties: ['Apple Research', 'Saffron Cultivation', 'Cold Climate Agriculture'],
      placements: {
        average: '₹3.8 LPA',
        highest: '₹12 LPA',
        companies: ['Agricultural Dept', 'Research Institutes', 'Private Farms', 'NGOs']
      }
    },
    {
      id: '3',
      name: 'Central University of Kashmir',
      location: 'Ganderbal',
      state: 'Jammu & Kashmir',
      type: 'government',
      courses: ['Computer Science', 'Management', 'Law', 'Education', 'Social Sciences'],
      fees: { government: '₹18,000-28,000', general: '₹28,000-48,000' },
      rating: 4.0,
      established: 2009,
      facilities: ['Modern Campus', 'Digital Library', 'Sports Facilities', 'Hostels', 'Research Centers'],
      contact: {
        phone: '+91-194-2424026',
        email: 'info@cukashmir.ac.in',
        website: 'www.cukashmir.ac.in'
      },
      specialties: ['Digital Technology', 'Management Studies', 'Legal Studies']
    },
    {
      id: '4',
      name: 'IIT Jammu',
      location: 'Jammu',
      state: 'Jammu & Kashmir',
      type: 'government',
      courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Mathematics'],
      fees: { government: '₹1,00,000-1,50,000', general: '₹2,00,000-3,00,000' },
      rating: 4.8,
      established: 2016,
      facilities: ['State-of-art Labs', 'Research Centers', 'Hostels', 'Sports Complex', 'Innovation Hub'],
      contact: {
        phone: '+91-191-2576111',
        email: 'office@iitjammu.ac.in',
        website: 'www.iitjammu.ac.in'
      },
      specialties: ['AI & ML', 'Robotics', 'Renewable Energy'],
      placements: {
        average: '₹16 LPA',
        highest: '₹55 LPA',
        companies: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Goldman Sachs']
      }
    },
    {
      id: '5',
      name: 'Delhi University',
      location: 'Delhi',
      state: 'Delhi',
      type: 'government',
      courses: ['Computer Science', 'Economics', 'Political Science', 'English', 'Commerce'],
      fees: { government: '₹10,000-30,000', general: '₹50,000-1,00,000' },
      rating: 4.3,
      established: 1922,
      facilities: ['Multiple Colleges', 'Libraries', 'Sports Facilities', 'Cultural Centers'],
      contact: {
        website: 'www.du.ac.in'
      },
      specialties: ['Liberal Arts', 'Research', 'Diverse Programs']
    },
    {
      id: '6',
      name: 'Jamia Millia Islamia',
      location: 'Delhi',
      state: 'Delhi',
      type: 'government',
      courses: ['Computer Science', 'Engineering', 'Architecture', 'Mass Communication', 'Education'],
      fees: { government: '₹15,000-40,000', general: '₹40,000-80,000' },
      rating: 4.1,
      established: 1920,
      facilities: ['Modern Campus', 'Research Centers', 'Hostels', 'Sports Complex'],
      contact: {
        website: 'www.jmi.ac.in'
      },
      specialties: ['Engineering', 'Architecture', 'Mass Communication']
    }
  ];

  const states = ['all', ...Array.from(new Set(colleges.map(c => c.state)))];
  const types = ['all', 'government', 'private', 'deemed'];
  const allCourses = ['all', ...Array.from(new Set(colleges.flatMap(c => c.courses)))];

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesState = selectedState === 'all' || college.state === selectedState;
      const matchesType = selectedType === 'all' || college.type === selectedType;
      const matchesCourse = selectedCourse === 'all' || college.courses.includes(selectedCourse);
      const matchesJK = !showJKOnly || college.state === 'Jammu & Kashmir';

      return matchesSearch && matchesState && matchesType && matchesCourse && matchesJK;
    });
  }, [searchTerm, selectedState, selectedType, selectedCourse, showJKOnly]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'government': return 'bg-green-100 text-green-800';
      case 'private': return 'bg-blue-100 text-blue-800';
      case 'deemed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">College Directory</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore comprehensive information about colleges across India, with special focus on 
            institutions in Jammu & Kashmir that offer excellent opportunities.
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by college name, location, or course..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state === 'all' ? 'All States' : state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Course</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCourses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course === 'all' ? 'All Courses' : course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="jk-only"
                    checked={showJKOnly}
                    onCheckedChange={setShowJKOnly}
                  />
                  <label htmlFor="jk-only" className="text-sm font-medium cursor-pointer">
                    J&K Colleges Only
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredColleges.length} College{filteredColleges.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Showing relevant institutions</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{college.name}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{college.location}, {college.state}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getTypeColor(college.type)}>
                      {college.type.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{college.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Courses Offered</span>
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 4).map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                    {college.courses.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{college.courses.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Established</span>
                    <p className="text-sm">{college.established}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Annual Fees</span>
                    <p className="text-sm">{college.fees.government}</p>
                  </div>
                </div>

                {college.specialties.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Specialties</span>
                    <p className="text-sm">{college.specialties.join(', ')}</p>
                  </div>
                )}

                {college.placements && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Placement Highlights</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Average: </span>
                        <span className="font-medium">{college.placements.average}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Highest: </span>
                        <span className="font-medium">{college.placements.highest}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {college.contact.website && (
                    <Button size="sm" variant="outline" className="text-xs">
                      <Globe className="h-3 w-3 mr-1" />
                      Website
                    </Button>
                  )}
                  {college.contact.phone && (
                    <Button size="sm" variant="outline" className="text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  )}
                  <Button size="sm" className="text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">No colleges found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters to find more colleges.
                  </p>
                </div>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedState('all');
                  setSelectedType('all');
                  setSelectedCourse('all');
                  setShowJKOnly(false);
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