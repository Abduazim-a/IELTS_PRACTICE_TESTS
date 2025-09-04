import React, { useState } from 'react';
import { useTest } from '../contexts/TestContext';

interface StudyTipsProps {
  section: string;
}

const StudyTips: React.FC<StudyTipsProps> = ({ section }) => {
  const { getStudyTips } = useTest();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const tips = getStudyTips(section);
  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);

  const sectionColors = {
    listening: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-300 dark:border-blue-600'
    },
    reading: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-300 dark:border-green-600'
    },
    writing: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-300 dark:border-purple-600'
    }
  };

  const colors = sectionColors[section as keyof typeof sectionColors] || sectionColors.listening;

  return (
    <div className={`rounded-lg border-2 ${colors.border} bg-white dark:bg-gray-800 shadow-sm`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}>
            <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {sectionTitle} Study Tips
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Click to view helpful strategies
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="pt-4 space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className={`text-xs font-semibold ${colors.text}`}>
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Pro Tip
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Practice regularly and time yourself to improve your performance under exam conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyTips;
