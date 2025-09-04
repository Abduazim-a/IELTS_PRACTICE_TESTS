import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TestProvider } from './contexts/TestContext';
import VerificationPage from './components/VerificationPage';
import MainPage from './components/MainPage';
import SectionPage from './components/SectionPage';
import TestPage from './components/TestPage';
import TestHistory from './components/TestHistory';

function App() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already verified
    const verificationStatus = localStorage.getItem('ielts-verified');
    if (verificationStatus === 'true') {
      setIsVerified(true);
    }
    setIsLoading(false);
  }, []);

  const handleVerification = () => {
    setIsVerified(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <TestProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route 
                path="/" 
                element={
                  isVerified ? 
                    <MainPage /> : 
                    <VerificationPage onVerification={handleVerification} />
                } 
              />
              <Route 
                path="/section/:sectionType" 
                element={
                  isVerified ? 
                    <SectionPage /> : 
                    <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/test/:sectionType/:testType/:testNumber" 
                element={
                  isVerified ? 
                    <TestPage /> : 
                    <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/history" 
                element={
                  isVerified ? 
                    <TestHistory /> : 
                    <Navigate to="/" replace />
                } 
              />
            </Routes>
          </div>
        </Router>
      </TestProvider>
    </ThemeProvider>
  );
}

export default App;
