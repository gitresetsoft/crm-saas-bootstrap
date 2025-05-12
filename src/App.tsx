import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import DashboardLayout from "@/layouts/dashboard-layout";
import LandingPage from "@/pages/landing-page";
import LoginPage from "@/pages/auth/login-page";
import SignupPage from "@/pages/auth/signup-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import AnalyticsPage from "@/pages/dashboard/analytics-page";
import SettingsPage from "@/pages/dashboard/settings-page";
import BillingPage from "@/pages/dashboard/billing-page";
import TeamPage from "@/pages/dashboard/team-page";
import RequireAuth from "@/components/auth/require-auth";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="saas-app-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="team" element={<TeamPage />} />
            </Route>
            
            {/* Redirect for any unmatched routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;