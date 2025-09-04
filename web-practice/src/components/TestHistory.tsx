import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../contexts/TestContext';

const TestHistory: React.FC = () => {
  const navigate = useNavigate();
  const { testHistory, getBandScore } = useTest();

  const getBandColor = (bandScore: number): string => {
    if (bandScore >= 8.0) return 'text-green-600 bg-green-100 dark:bg-green-900';
    if (bandScore >= 7.0) return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
    if (bandScore >= 6.0) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
    return 'text-red-600 bg-red-100 dark:bg-red-900';
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatTimeSpent = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg p-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Main Page
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Test History
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your progress and see your improvement over time
          </p>
        </div>

        {testHistory.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Tests Completed Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start taking practice tests to see your progress here!
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Start Practicing
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Test Results
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {testHistory.length} test{testHistory.length !== 1 ? 's' : ''} completed
              </span>
            </div>

            <div className="space-y-3">
              {testHistory.map((test) => (
                <div
                  key={test.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {test.section.charAt(0).toUpperCase() + test.section.slice(1)} Test {test.testNumber}
                        </h3>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                          {test.testType === 'part-by-part' ? 'Part by Part' : 'Full Test'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <span>Score: {test.score}/40</span>
                        <span>Time: {formatTimeSpent(test.timeSpent)}</span>
                        <span>{formatDate(test.completedAt)}</span>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getBandColor(test.bandScore)}`}>
                      Band {test.bandScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {testHistory.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Tests Taken</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {(testHistory.reduce((sum, test) => sum + test.bandScore, 0) / testHistory.length).toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Average Band</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.max(...testHistory.map(t => t.bandScore))}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Best Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.round(testHistory.reduce((sum, test) => sum + test.timeSpent, 0) / testHistory.length / 60)}m
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Avg Time</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestHistory;