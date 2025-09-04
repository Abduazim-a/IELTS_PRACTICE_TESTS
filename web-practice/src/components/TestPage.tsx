import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTest } from '../contexts/TestContext';
import Timer from './Timer';

const TestPage: React.FC = () => {
  const { sectionType, testType, testNumber } = useParams<{
    sectionType: string;
    testType: string;
    testNumber: string;
  }>();
  const navigate = useNavigate();
  const { startTest, completeTest, currentTest } = useTest();
  const [isTestActive, setIsTestActive] = useState(false);
  const [testScore, setTestScore] = useState(0);

  const sectionTitle = sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1) || 'Section';
  const testTypeTitle = testType === 'part-by-part' ? 'Part by Part' : 'Full Test';

  const handleBackToSection = () => {
    navigate(`/section/${sectionType}`);
  };

  const handleStartTest = () => {
    if (sectionType && testType && testNumber) {
      startTest(sectionType, testType, parseInt(testNumber));
      setIsTestActive(true);
    }
  };

  const handleTimeUp = () => {
    setIsTestActive(false);
    // Auto-submit with current score
    completeTest(testScore, 30 * 60); // 30 minutes default
    alert('Time is up! Your test has been automatically submitted.');
  };

  const handleSubmitTest = () => {
    if (sectionType && testType && testNumber) {
      const timeSpent = currentTest?.startTime ? 
        Math.floor((new Date().getTime() - currentTest.startTime.getTime()) / 1000) : 0;
      completeTest(testScore, timeSpent);
      setIsTestActive(false);
      alert(`Test submitted! Your score: ${testScore}/40`);
    }
  };

  const getTestDuration = (): number => {
    // Different durations for different test types
    if (testType === 'full-test') {
      return sectionType === 'listening' ? 40 : sectionType === 'reading' ? 60 : 60;
    } else {
      return sectionType === 'listening' ? 20 : sectionType === 'reading' ? 30 : 30;
    }
  };

  const sectionColor = {
    listening: 'blue',
    reading: 'green',
    writing: 'purple'
  }[sectionType || 'listening'] as 'blue' | 'green' | 'purple';

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-300 dark:border-blue-600'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-300 dark:border-green-600'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-300 dark:border-purple-600'
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={handleBackToSection}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg p-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {sectionTitle}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 mx-auto mb-6 ${colorClasses[sectionColor].bg} rounded-full flex items-center justify-center`}>
            <svg className={`w-10 h-10 ${colorClasses[sectionColor].text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sectionType === 'listening' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              )}
              {sectionType === 'reading' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              )}
              {sectionType === 'writing' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              )}
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionTitle} Test {testNumber}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            {testTypeTitle}
          </p>
          <div className={`w-16 h-1 mx-auto ${colorClasses[sectionColor].bg} rounded-full`}></div>
        </div>

        {/* Timer */}
        {isTestActive && (
          <div className="mb-6">
            <Timer 
              duration={getTestDuration()} 
              onTimeUp={handleTimeUp}
              isActive={isTestActive}
            />
          </div>
        )}

        {/* Test Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          {!isTestActive ? (
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 ${colorClasses[sectionColor].bg} rounded-full flex items-center justify-center`}>
                <svg className={`w-8 h-8 ${colorClasses[sectionColor].text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Ready to Start?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                You selected <span className="font-semibold text-gray-900 dark:text-white">{sectionTitle} Test {testNumber}</span> ({testTypeTitle})
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Test Information:</h3>
                <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Duration: {getTestDuration()} minutes</li>
                  <li>• Format: {testTypeTitle}</li>
                  <li>• Questions: 40 (placeholder)</li>
                  <li>• Auto-submit when time expires</li>
                </ul>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleBackToSection}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Back to Tests
                </button>
                <button
                  onClick={handleStartTest}
                  className={`px-6 py-3 ${colorClasses[sectionColor].bg} hover:opacity-80 ${colorClasses[sectionColor].text} font-medium rounded-lg transition-opacity duration-200 focus:ring-2 focus:ring-${sectionColor}-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                >
                  Start Test
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {sectionTitle} Test {testNumber} - {testTypeTitle}
              </h2>
              
              {/* Mock Test Content */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Question 1</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This is a sample question for the {sectionTitle} test. In a real application, this would contain actual test content.
                  </p>
                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="q1" value={option} className="text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">Option {option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Question 2</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Another sample question to demonstrate the test interface.
                  </p>
                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="q2" value={option} className="text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">Option {option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Score Input */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mock Score (for demonstration):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={testScore}
                    onChange={(e) => setTestScore(parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">/ 40</span>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  <button
                    onClick={() => setIsTestActive(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Cancel Test
                  </button>
                  <button
                    onClick={handleSubmitTest}
                    className={`px-6 py-3 ${colorClasses[sectionColor].bg} hover:opacity-80 ${colorClasses[sectionColor].text} font-medium rounded-lg transition-opacity duration-200 focus:ring-2 focus:ring-${sectionColor}-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                  >
                    Submit Test
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TestPage;
