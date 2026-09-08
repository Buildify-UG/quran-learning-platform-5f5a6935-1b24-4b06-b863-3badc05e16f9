import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, DollarSign, Globe, Users, Search, Menu, LogOut } from 'lucide-react';

const translations = {
  en: {
    appName: 'Maktiya',
    tagline: 'Learn Quran from Verified Teachers',
    selectLanguage: 'Select Language',
    selectRole: 'Select Your Role',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Admin',
    searchTeachers: 'Search Teachers',
    book: 'Book Now',
    myLessons: 'My Lessons',
    upcomingLessons: 'Upcoming Lessons',
    completedLessons: 'Completed',
    teacherDashboard: 'Teacher Dashboard',
    todaysLessons: "Today's Lessons",
    studentList: 'Student List',
    earnings: 'Total Earnings',
    pendingBalance: 'Pending',
    availableBalance: 'Available',
    adminDashboard: 'Admin Dashboard',
    totalStudents: 'Total Students',
    totalTeachers: 'Total Teachers',
    totalLessons: 'Total Lessons',
    totalRevenue: 'Total Revenue',
    newUsers: 'New Users',
    lessonsCompleted: 'Lessons Completed',
    logout: 'Logout',
  },
  so: {
    appName: 'Maktiya',
    tagline: 'Barista Quraanka laga Aruuraa',
    selectLanguage: 'Dooro Luqadda',
    selectRole: 'Dooro Doorka',
    student: 'Ardayga',
    teacher: 'Macallimka',
    admin: 'Maamuuska',
    searchTeachers: 'Raadi Macallimka',
    book: 'Booki Hadda',
    myLessons: 'Darsigayga',
    upcomingLessons: 'Darsiga Soo Socda',
    completedLessons: 'Dhamaystira',
    teacherDashboard: 'Macallimka Guriga',
    todaysLessons: 'Darsiga Maanta',
    studentList: 'Liiska Ardayga',
    earnings: 'Wax Qabashada Dhamaystira',
    pendingBalance: 'Sugaya',
    availableBalance: 'Joog',
    adminDashboard: 'Maamuuska Guriga',
    totalStudents: 'Ardayga Dhamaystira',
    totalTeachers: 'Macallimka Dhamaystira',
    totalLessons: 'Darsiga Dhamaystira',
    totalRevenue: 'Wax Qabashada Dhamaystira',
    newUsers: 'Ardayga Cusub',
    lessonsCompleted: 'Darsiga Dhamaystira',
    logout: 'Ka Bax',
  },
  ar: {
    appName: 'مكتيا',
    tagline: 'تعلم القرآن من معلمين معتمدين',
    selectLanguage: 'اختر اللغة',
    selectRole: 'اختر دورك',
    student: 'طالب',
    teacher: 'معلم',
    admin: 'مسؤول',
    searchTeachers: 'ابحث عن المعلمين',
    book: 'احجز الآن',
    myLessons: 'دروسي',
    upcomingLessons: 'الدروس القادمة',
    completedLessons: 'المكتملة',
    teacherDashboard: 'لوحة المعلم',
    todaysLessons: 'دروس اليوم',
    studentList: 'قائمة الطلاب',
    earnings: 'إجمالي الأرباح',
    pendingBalance: 'قيد الانتظار',
    availableBalance: 'متاح',
    adminDashboard: 'لوحة المسؤول',
    totalStudents: 'إجمالي الطلاب',
    totalTeachers: 'إجمالي المعلمين',
    totalLessons: 'إجمالي الدروس',
    totalRevenue: 'إجمالي الإيرادات',
    newUsers: 'مستخدمون جدد',
    lessonsCompleted: 'الدروس المكتملة',
    logout: 'تسجيل الخروج',
  },
};

const sampleTeachers = [
  {
    id: 1,
    name: 'Dr. Ahmed Hassan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 127,
    price: 25,
    languages: ['Arabic', 'English', 'Somali'],
    bio: 'Expert in Quranic studies with 15 years experience',
    experience: '15 years',
  },
  {
    id: 2,
    name: 'Fatima Abdi',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 98,
    price: 20,
    languages: ['English', 'Somali', 'Arabic'],
    bio: 'Specialized in teaching children Quran memorization',
    experience: '10 years',
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 156,
    price: 30,
    languages: ['Arabic', 'English'],
    bio: 'Advanced Tajweed and Quranic interpretation',
    experience: '20 years',
  },
];

const sampleLessons = [
  { id: 1, teacherName: 'Dr. Ahmed Hassan', date: '2024-01-15', time: '10:00 AM', status: 'upcoming' },
  { id: 2, teacherName: 'Fatima Abdi', date: '2024-01-10', time: '3:00 PM', status: 'completed' },
];

export default function Index() {
  const [language, setLanguage] = useState<'en' | 'so' | 'ar'>('en');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [showLanguageSelect, setShowLanguageSelect] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState<typeof sampleTeachers[0] | null>(null);
  const t = translations[language];
  const isRTL = language === 'ar';

  const handleRoleSelect = (selectedRole: 'student' | 'teacher' | 'admin') => {
    setRole(selectedRole);
    setShowLanguageSelect(false);
  };

  const handleBack = () => {
    setRole(null);
    setSelectedTeacher(null);
    setShowLanguageSelect(true);
  };

  if (showLanguageSelect) {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
              <span className="text-4xl">📖</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{t.appName}</h1>
            <p className="text-white/90 text-lg">{t.tagline}</p>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-white/90 font-semibold text-center">{t.selectLanguage}</p>
            <div className="grid grid-cols-3 gap-3">
              {(['en', 'so', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    language === lang ? 'bg-white text-primary shadow-lg scale-105' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'so' ? 'Somali' : 'العربية'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white/90 font-semibold text-center">{t.selectRole}</p>
            <div className="grid grid-cols-3 gap-3">
              {(['student', 'teacher', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSelect(r)}
                  className="py-4 px-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all font-semibold text-sm"
                >
                  {r === 'student' ? '👨‍🎓' : r === 'teacher' ? '👨‍🏫' : '⚙️'}
                  <div className="mt-1 text-xs">{t[r]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'student') {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-background">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t.appName}</h1>
            <p className="text-sm text-white/80">Welcome back!</p>
          </div>
          <button onClick={handleBack} className="hover:bg-primary/80 p-2 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder={t.searchTeachers} className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Arabic', 'English', 'Somali'].map((lang) => (
                <Badge key={lang} variant={lang === 'All' ? 'default' : 'outline'} className="whitespace-nowrap">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-lg">{t.searchTeachers}</h2>
            {sampleTeachers.map((teacher) => (
              <Card key={teacher.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedTeacher(teacher)}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold">{teacher.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span>{teacher.rating}</span>
                        <span>({teacher.reviews})</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span>${teacher.price}/hr</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>{teacher.languages.length} langs</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="self-end">
                      {t.book}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-lg">{t.myLessons}</h2>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">{t.upcomingLessons}</TabsTrigger>
                <TabsTrigger value="completed">{t.completedLessons}</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-2 mt-4">
                {sampleLessons
                  .filter((l) => l.status === 'upcoming')
                  .map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{lesson.teacherName}</p>
                            <p className="text-sm text-muted-foreground">
                              {lesson.date} at {lesson.time}
                            </p>
                          </div>
                          <Badge className="bg-success">Available</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="completed" className="space-y-2 mt-4">
                {sampleLessons
                  .filter((l) => l.status === 'completed')
                  .map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{lesson.teacherName}</p>
                            <p className="text-sm text-muted-foreground">{lesson.date}</p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 flex items-end z-50">
            <div className="w-full bg-background rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedTeacher(null)} className="mb-4 text-muted-foreground hover:text-foreground">
                ✕
              </button>
              <img src={selectedTeacher.image} alt={selectedTeacher.name} className="w-full h-48 rounded-lg object-cover mb-4" />
              <h2 className="text-2xl font-bold mb-2">{selectedTeacher.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 fill-warning text-warning" />
                <span className="font-semibold">{selectedTeacher.rating}</span>
                <span className="text-muted-foreground">({selectedTeacher.reviews} reviews)</span>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">About</p>
                  <p className="text-foreground">{selectedTeacher.bio}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Price/Hour</p>
                    <p className="text-2xl font-bold text-primary">${selectedTeacher.price}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Experience</p>
                    <p className="text-lg font-bold">{selectedTeacher.experience}</p>
                  </div>
                </div>
              </div>
              <Button className="w-full py-6 text-lg">{t.book}</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (role === 'teacher') {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-background">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t.teacherDashboard}</h1>
            <p className="text-sm text-white/80">Welcome, Teacher!</p>
          </div>
          <button onClick={handleBack} className="hover:bg-primary/80 p-2 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.todaysLessons}</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.studentList}</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-white/80 text-sm">{t.earnings}</p>
                  <p className="text-3xl font-bold">$1,250</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-white/80 text-xs">{t.pendingBalance}</p>
                    <p className="text-xl font-bold">$450</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">{t.availableBalance}</p>
                    <p className="text-xl font-bold">$800</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h2 className="font-bold text-lg">{t.todaysLessons}</h2>
            {[
              { id: 1, student: 'Ahmed Ali', time: '10:00 AM', duration: '1 hour' },
              { id: 2, student: 'Layla Hassan', time: '2:00 PM', duration: '1.5 hours' },
              { id: 3, student: 'Zainab Omar', time: '4:00 PM', duration: '1 hour' },
            ].map((lesson) => (
              <Card key={lesson.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{lesson.student}</p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.time} • {lesson.duration}
                      </p>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full py-6 text-lg">Request Withdrawal</Button>
        </div>
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-background">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t.adminDashboard}</h1>
            <p className="text-sm text-white/80">Platform Statistics</p>
          </div>
          <button onClick={handleBack} className="hover:bg-primary/80 p-2 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t.totalStudents, value: '2,450', icon: '👨‍🎓' },
              { label: t.totalTeachers, value: '186', icon: '👨‍🏫' },
              { label: t.totalLessons, value: '12,890', icon: '📚' },
              { label: t.totalRevenue, value: '$45,230', icon: '💰' },
            ].map((metric, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    </div>
                    <span className="text-3xl">{metric.icon}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold">{t.newUsers}</span>
                  <span className="text-sm text-primary">+245</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold">{t.lessonsCompleted}</span>
                  <span className="text-sm text-primary">+1,234</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="teachers" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            <TabsContent value="teachers" className="space-y-3 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pending Approvals</CardTitle>
                  <CardDescription>3 teachers awaiting review</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold">Teacher #{i}</p>
                        <p className="text-sm text-muted-foreground">Pending review</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bookings" className="space-y-3 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Bookings</CardTitle>
                  <CardDescription>All platform bookings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">1,234 bookings this month</p>
                  <p className="text-sm text-muted-foreground">98% completion rate</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments" className="space-y-3 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Management</CardTitle>
                  <CardDescription>Withdrawal requests and transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">5 pending withdrawals</p>
                  <p className="text-sm text-muted-foreground">Total: $2,450</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
}
