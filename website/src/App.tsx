import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { LandingPage } from './pages/public/LandingPage';
import { CaregiverLogin } from './pages/caregiver/CaregiverLogin';
import { CaregiverDashboard } from './pages/caregiver/CaregiverDashboard';
import { PatientDetailView } from './pages/caregiver/PatientDetailView';

// Helper component to handle section navigation for path aliases like /games, /adaptive-ai, /problem
const SectionRouteWrapper: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sectionId]);

  return <LandingPage />;
};

// Layout for public presentation pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <div className="flex-1 w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
            <Route path="/problem" element={<PublicLayout><SectionRouteWrapper sectionId="problem" /></PublicLayout>} />
            <Route path="/solution" element={<PublicLayout><SectionRouteWrapper sectionId="solution" /></PublicLayout>} />
            <Route path="/features" element={<PublicLayout><SectionRouteWrapper sectionId="features" /></PublicLayout>} />
            <Route path="/games" element={<PublicLayout><SectionRouteWrapper sectionId="games" /></PublicLayout>} />
            <Route path="/adaptive-ai" element={<PublicLayout><SectionRouteWrapper sectionId="adaptive-ai" /></PublicLayout>} />
            <Route path="/download" element={<PublicLayout><SectionRouteWrapper sectionId="download" /></PublicLayout>} />

            {/* Private Caregiver Portal Routes (Supabase Auth & Database) */}
            <Route path="/caregiver/login" element={<CaregiverLogin />} />
            <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
            <Route path="/caregiver/patient/:id" element={<PatientDetailView />} />

            {/* Fallback */}
            <Route path="*" element={<PublicLayout><LandingPage /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </AccessibilityProvider>
    </AuthProvider>
  );
};

export default App;
