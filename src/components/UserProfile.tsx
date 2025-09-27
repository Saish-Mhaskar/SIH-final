import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  User as UserIcon, 
  Edit2, 
  Save, 
  X, 
  BookOpen, 
  Heart, 
  Award, 
  Calendar,
  LogOut,
  Settings
} from 'lucide-react';
import type { User } from '../App';

interface UserProfileProps {
  user: User | null;
  onLogout: () => void;
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) return null;

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    // Update localStorage
    localStorage.setItem('guidanceUser', JSON.stringify(editedUser));
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // Mock data for profile stats and activity
  const profileStats = {
    quizzesCompleted: 1,
    pathsExplored: 5,
    collegesBookmarked: 3,
    questionsAsked: 2
  };

  const recentActivity = [
    { action: 'Completed career assessment', date: '2 days ago', type: 'quiz' },
    { action: 'Explored Computer Science path', date: '3 days ago', type: 'career' },
    { action: 'Bookmarked IIT Jammu', date: '5 days ago', type: 'college' },
    { action: 'Asked question about JEE preparation', date: '1 week ago', type: 'forum' }
  ];

  const achievements = [
    { title: 'Assessment Complete', description: 'Completed your first career assessment', unlocked: true },
    { title: 'Explorer', description: 'Explored 5 different career paths', unlocked: true },
    { title: 'Researcher', description: 'Viewed 10 college profiles', unlocked: false },
    { title: 'Engaged Learner', description: 'Asked 5 questions in the forum', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={editedUser?.name || ''}
                            onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="class">Class/Year</Label>
                          <Input
                            id="class"
                            value={editedUser?.class || ''}
                            onChange={(e) => setEditedUser(prev => prev ? {...prev, class: e.target.value} : null)}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">{user.class}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">Member since Dec 2024</Badge>
                          {user.quizCompleted && (
                            <Badge className="bg-green-100 text-green-800">Assessment Complete</Badge>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{profileStats.quizzesCompleted}</p>
                    <p className="text-xs text-muted-foreground">Quizzes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{profileStats.pathsExplored}</p>
                    <p className="text-xs text-muted-foreground">Paths Explored</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{profileStats.collegesBookmarked}</p>
                    <p className="text-xs text-muted-foreground">Colleges Saved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{profileStats.questionsAsked}</p>
                    <p className="text-xs text-muted-foreground">Questions Asked</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Tabs */}
        <Tabs defaultValue="interests" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="interests" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Academic Interests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.academicInterests.map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  {user.academicInterests.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Complete your assessment to see your academic interests.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Hobbies & Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.extracurricularInterests.map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  {user.extracurricularInterests.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Complete your assessment to see your hobby interests.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Progress</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Basic Information</span>
                      </span>
                      <span className="text-green-600">Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Career Assessment</span>
                      </span>
                      <span className="text-green-600">Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span>Upload Profile Picture</span>
                      </span>
                      <span className="text-yellow-600">Pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === 'quiz' && <BookOpen className="h-4 w-4" />}
                        {activity.type === 'career' && <UserIcon className="h-4 w-4" />}
                        {activity.type === 'college' && <Award className="h-4 w-4" />}
                        {activity.type === 'forum' && <Calendar className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg ${achievement.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'}`}>
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${achievement.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Notifications</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Email notifications for deadlines</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">New career opportunities</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Marketing emails</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Privacy</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Make profile visible to experts</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Allow colleges to contact me</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button 
                    variant="destructive"
                    onClick={onLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}