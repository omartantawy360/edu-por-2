import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, FileText, Settings, Award, Users, Target, Upload, Trophy, Medal, Lightbulb, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { useApp } from '../../context/AppContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();
  const [isDarkSidebar, setIsDarkSidebar] = useState(false);

  useEffect(() => {
    setIsDarkSidebar(theme === 'dark');
  }, [theme]);

  const links = user?.role === 'admin'
    ? [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Students', path: '/admin/students', icon: Users },
        { name: 'Submissions', path: '/admin/submissions', icon: Upload },
        { name: 'Certificates', path: '/admin/certificates', icon: Award },
        { name: 'Add Competition', path: '/admin/create-competition', icon: Settings },
      ]
    : [
        { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
        { name: 'Team Hub', path: '/student/team', icon: Users },
        { name: 'Competition Skills', path: '/student/skills', icon: Target },
        { name: 'Submissions', path: '/student/submissions', icon: Upload },
        { name: 'Achievements', path: '/student/achievements', icon: Medal },
        { name: 'Leaderboard', path: '/student/leaderboard', icon: Trophy },
        { name: 'Certificate', path: '/student/certificate', icon: Award },
        { name: 'Find Competitions', path: '/student/recommendations', icon: Lightbulb },
        { name: 'Register', path: '/register', icon: FileText },
      ];

  if (!user) return null;

  return (
    <>
        {/* Mobile Overlay */}
        {isOpen && (
            <div 
                className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
                onClick={onClose}
            />
        )}

        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0",
            isDarkSidebar
              ? "bg-slate-900 border-r border-slate-800 text-slate-100"
              : "bg-white border-r border-slate-200 text-slate-900",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className={cn(
            "flex h-16 items-center justify-between px-6 border-b",
            isDarkSidebar ? "border-slate-800" : "border-slate-200"
          )}>
            <span className="text-xl font-bold text-primary-500">EduComp</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-300" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
                  <LogOut className="h-5 w-5 rotate-180" />
              </Button>
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto py-4">
            <nav className="flex-1 space-y-1 px-3">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={onClose} // Close on link click (mobile)
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isDarkSidebar
                              ? "text-slate-200 hover:bg-slate-800 hover:text-slate-50"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                            isActive &&
                              (isDarkSidebar
                                ? "bg-slate-800 text-primary-300"
                                : "bg-primary-50 text-primary-700 hover:bg-primary-50 hover:text-primary-700")
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.name}
                    </NavLink>
                ))}
            </nav>
            <div className={cn(
              "border-t p-4",
              isDarkSidebar ? "border-slate-800" : "border-slate-200"
            )}>
                <button
                    type="button"
                    onClick={() => {
                        const accountPath = user.role === 'admin' ? '/admin/account' : '/student/account';
                        navigate(accountPath);
                        if (onClose) onClose();
                    }}
                    className={cn(
                      "mb-4 flex w-full items-center gap-3 rounded-md px-2 py-1 transition-colors",
                      isDarkSidebar ? "hover:bg-slate-800" : "hover:bg-slate-100"
                    )}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <p className={cn(
                          "text-sm font-medium truncate w-32",
                          isDarkSidebar ? "text-slate-100" : "text-slate-700"
                        )}>{user.name}</p>
                        <p className={cn(
                          "text-xs capitalize",
                          isDarkSidebar ? "text-slate-400" : "text-slate-500"
                        )}>{user.role}</p>
                    </div>
                </button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
          </div>
        </aside>
    </>
  );
};

export default Sidebar;
