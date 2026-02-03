import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { TeamProvider } from './context/TeamContext';
import Login from './pages/Login';
import DashboardLayout from './components/Layout/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CreateCompetition from './pages/CreateCompetition';
import TeamHub from './pages/TeamHub';
import SkillsPage from './pages/SkillsPage';
import SubmissionsPage from './pages/SubmissionsPage';
import AchievementsPage from './pages/AchievementsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CertificatePage from './pages/CertificatePage';
import RecommendationsPage from './pages/RecommendationsPage';
import StudentManagement from './pages/admin/StudentManagement';
import SubmissionsOverview from './pages/admin/SubmissionsOverview';
import CertificateManagement from './pages/admin/CertificateManagement';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="flex bg-slate-50 items-center justify-center h-screen">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
    ); 
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path="team" element={<TeamHub />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="certificate" element={<CertificatePage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
      </Route>

      <Route path="/register" element={
        <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
             <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="create-competition" element={<CreateCompetition />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="submissions" element={<SubmissionsOverview />} />
        <Route path="certificates" element={<CertificateManagement />} />
      </Route>
      
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <AppProvider>
            <TeamProvider>
                <AppRoutes />
            </TeamProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
