import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudyTips from './StudyTips';

const SectionPage: React.FC = () => {
  const { sectionType } = useParams<{ sectionType: string }>();
  const navigate = useNavigate();
  const [selectedTestType, setSelectedTestType] = useState<'part-by-part' | 'full-test' | null>(null);

  const sectionTitle = sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1) || 'Section';
  const sectionColor = {
    listening: 'blue',
    reading: 'green',
    writing: 'purple'
  }[sectionType || 'listening'] as 'blue' | 'green' | 'purple';

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-300 dark:border-blue-600',
      hover: 'hover:bg-blue-200 dark:hover:bg-blue-800'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-300 dark:border-green-600',
      hover: 'hover:bg-green-200 dark:hover:bg-green-800'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-300 dark:border-purple-600',
      hover: 'hover:bg-purple-200 dark:hover:bg-purple-800'
    }
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  const handleTestTypeSelect = (testType: 'part-by-part' | 'full-test') => {
    setSelectedTestType(testType);
  };

  const handleTestSelect = (testNumber: number) => {
    navigate(`/test/${sectionType}/${selectedTestType}/${testNumber}`);
  };

  const renderTestTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Test Format
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select how you want to practice {sectionTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => handleTestTypeSelect('part-by-part')}
          className={`p-6 rounded-xl border-2 ${colorClasses[sectionColor].border} bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-${sectionColor}-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
        >
          <div className={`w-12 h-12 mx-auto mb-4 ${colorClasses[sectionColor].bg} rounded-full flex items-center justify-center`}>
            <svg className={`w-6 h-6 ${colorClasses[sectionColor].text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Part by Part
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Practice individual parts separately for focused learning
          </p>
        </button>

        <button
          onClick={() => handleTestTypeSelect('full-test')}
          className={`p-6 rounded-xl border-2 ${colorClasses[sectionColor].border} bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-${sectionColor}-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
        >
          <div className={`w-12 h-12 mx-auto mb-4 ${colorClasses[sectionColor].bg} rounded-full flex items-center justify-center`}>
            <svg className={`w-6 h-6 ${colorClasses[sectionColor].text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Full Test
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Take complete practice tests under exam conditions
          </p>
        </button>
      </div>
    </div>
  );

  const renderTestList = () => (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={() => setSelectedTestType(null)}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 mb-4"
        >
          ← Back to test format selection
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Select a Test
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Choose from available {sectionTitle} tests
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((testNumber) => (
          <button
            key={testNumber}
            onClick={() => handleTestSelect(testNumber)}
            className={`p-4 rounded-lg border-2 ${colorClasses[sectionColor].border} bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-${sectionColor}-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
          >
            <div className={`w-8 h-8 mx-auto mb-2 ${colorClasses[sectionColor].bg} rounded-full flex items-center justify-center`}>
              <span className={`text-sm font-semibold ${colorClasses[sectionColor].text}`}>
                {testNumber}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Test {testNumber}
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={handleBackToMain}
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
            {sectionTitle} Practice
          </h1>
          <div className={`w-16 h-1 mx-auto ${colorClasses[sectionColor].bg} rounded-full`}></div>
        </div>

        {!selectedTestType ? renderTestTypeSelection() : renderTestList()}
        
        {/* Study Tips Section */}
        <div className="mt-12">
          <StudyTips section={sectionType || 'listening'} />
        </div>
      </main>
    </div>
  );
};

export default SectionPage;
