import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Trophy, Clock, CheckCircle, Calendar, User, MessageSquare, School, Mail, BookOpen, Bell } from 'lucide-react';
import { cn } from '../utils/cn';
import DeadlineTimer from '../components/ui/DeadlineTimer';

const StudentDashboard = () => {
    const { students, notifications } = useApp();

    // Mock Logged-in User - Dynamic Fetch
    const mockName = "Alice Johnson";
    const profile = students.find(s => s.name === mockName) || {
        name: mockName,
        grade: "10",
        clazz: "A",
        school: "Lincoln High",
        email: "alice.johnson@lincoln.edu"
    };

    // Filter registrations for this specific student
    const myRegistrations = students.filter(s => s.name === mockName);

    // Get current student ID
    const studentId = myRegistrations[0]?.id;

    // Filter notifications for this student or global ones
    const myNotifications = notifications.filter(n => n.studentId === studentId || !n.studentId);

    const stats = [
        { 
            label: 'My Applications', 
            value: myRegistrations.length, 
            icon: Trophy, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50' 
        },
        { 
            label: 'Pending', 
            value: myRegistrations.filter(s => s.status === 'Pending').length, 
            icon: Clock, 
            color: 'text-amber-600', 
            bg: 'bg-amber-50' 
        },
        { 
            label: 'Approved', 
            value: myRegistrations.filter(s => s.status === 'Approved').length, 
            icon: CheckCircle, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50' 
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header / Welcome Profile */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center md:text-left">
                <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <User className="h-10 w-10" />
                </div>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900">Welcome back, {profile.name}!</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 dark:text-slate-300">
                        <span className="flex items-center gap-1.5"><School className="h-4 w-4" /> {profile.school}</span>
                        <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {profile.email}</span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">Class {profile.clazz} • Grade {profile.grade}</span>
                    </div>
                </div>
            </div>

            {/* Deadline Timer - Prominent Position */}
            <DeadlineTimer title="Science Fair Submission Deadline" />

            {/* Personal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-slate-200">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={cn("p-3 rounded-full", stat.bg, stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Notifications Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary-600" />
                    Recent Notifications
                </h2>
                
                {myNotifications.length === 0 ? (
                    <Card className="bg-slate-50 border-dashed">
                        <CardContent className="py-8 text-center text-slate-400 text-sm">
                            No notifications to show.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {myNotifications.slice(0, 3).map((n) => (
                            <div key={n.id} className={cn(
                                "flex items-start gap-3 p-4 rounded-xl border transition-all",
                                n.type === 'success' ? 'bg-emerald-50 border-emerald-100' :
                                n.type === 'warning' ? 'bg-amber-50 border-amber-100' :
                                'bg-white border-slate-200'
                            )}>
                                <div className={cn(
                                    "p-2 rounded-lg shrink-0",
                                    n.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                    n.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                    'bg-primary-100 text-primary-600'
                                )}>
                                    {n.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                                </div>
                                <div className="flex-1">
                                    <p className={cn(
                                        "text-sm font-medium",
                                        n.type === 'success' ? 'text-emerald-900' :
                                        n.type === 'warning' ? 'text-amber-900' :
                                        'text-slate-900'
                                    )}>{n.text}</p>
                                    <p className="text-xs text-slate-500 mt-1">{n.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* My Competitions List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">My Competitions</h2>
                
                {myRegistrations.length === 0 ? (
                    <Card className="bg-slate-50 border-dashed">
                        <CardContent className="py-12 text-center text-slate-500">
                            <Trophy className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                            <p>You haven't registered for any competitions yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {myRegistrations.map((reg) => (
                            <Card key={reg.id} className="hover:border-primary-200 transition-all shadow-sm hover:shadow-md group overflow-hidden">
                                <CardContent className="p-0">
                                    {/* Project Header */}
                                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
                                                    {reg.competition}
                                                </h3>
                                                <Badge variant="outline" className="text-xs">
                                                    {reg.type}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    Current Stage: <span className="font-semibold text-slate-700 ml-1">{reg.stage}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-right mr-2">
                                                <div className="text-xs text-slate-500">Result</div>
                                                 <span className={cn(
                                                    "font-bold",
                                                    reg.result === 'Passed' ? 'text-emerald-600' :
                                                    reg.result === 'Failed' ? 'text-red-600' : 'text-slate-400'
                                                )}>
                                                    {reg.result}
                                                </span>
                                            </div>
                                            <Badge className="h-8 px-3 text-sm" variant={
                                                reg.status === 'Approved' ? 'success' :
                                                reg.status === 'Rejected' ? 'destructive' : 'warning'
                                            }>
                                                {reg.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    <div className="p-6 bg-slate-50/50 space-y-4">
                                        {/* Project Info */}
                                        {reg.projectTitle && (
                                            <div className="flex gap-4">
                                                <div className="mt-1"><BookOpen className="h-5 w-5 text-primary-500" /></div>
                                                <div className="space-y-1">
                                                    <h4 className="font-semibold text-slate-900 text-sm">Project: {reg.projectTitle}</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed">{reg.abstract}</p>
                                                    {reg.mentor && <p className="text-xs text-slate-400 mt-2">Mentor: {reg.mentor}</p>}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Feedback Info */}
                                        {reg.feedback && (
                                            <div className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                                                <div className="mt-1"><MessageSquare className="h-5 w-5 text-amber-500" /></div>
                                                <div className="space-y-1">
                                                    <h4 className="font-semibold text-amber-900 text-sm">Judge Feedback</h4>
                                                    <p className="text-sm text-amber-800 italic">"{reg.feedback}"</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {!reg.projectTitle && !reg.feedback && (
                                            <div className="text-sm text-slate-400 italic pl-9">No additional details available for this entry.</div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
