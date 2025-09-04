import React, { createContext, useContext, useState, useEffect } from 'react';

interface TestResult {
  id: string;
  section: string;
  testType: string;
  testNumber: number;
  score: number;
  bandScore: number;
  completedAt: Date;
  timeSpent: number;
}

interface TestContextType {
  testHistory: TestResult[];
  currentTest: {
    section: string;
    testType: string;
    testNumber: number;
    startTime: Date | null;
  } | null;
  startTest: (section: string, testType: string, testNumber: number) => void;
  completeTest: (score: number, timeSpent: number) => void;
  getBandScore: (score: number, section: string) => number;
  getStudyTips: (section: string) => string[];
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};

interface TestProviderProps {
  children: React.ReactNode;
}

export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<{
    section: string;
    testType: string;
    testNumber: number;
    startTime: Date | null;
  } | null>(null);

  useEffect(() => {
    // Load test history from localStorage
    const savedHistory = localStorage.getItem('ielts-test-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setTestHistory(parsed.map((item: any) => ({
          ...item,
          completedAt: new Date(item.completedAt)
        })));
      } catch (error) {
        console.error('Error loading test history:', error);
      }
    }
  }, []);

  const startTest = (section: string, testType: string, testNumber: number) => {
    setCurrentTest({
      section,
      testType,
      testNumber,
      startTime: new Date()
    });
  };

  const completeTest = (score: number, timeSpent: number) => {
    if (!currentTest) return;

    const bandScore = getBandScore(score, currentTest.section);
    const newResult: TestResult = {
      id: `${currentTest.section}-${currentTest.testType}-${currentTest.testNumber}-${Date.now()}`,
      section: currentTest.section,
      testType: currentTest.testType,
      testNumber: currentTest.testNumber,
      score,
      bandScore,
      completedAt: new Date(),
      timeSpent
    };

    const updatedHistory = [newResult, ...testHistory];
    setTestHistory(updatedHistory);
    localStorage.setItem('ielts-test-history', JSON.stringify(updatedHistory));
    setCurrentTest(null);
  };

  const getBandScore = (score: number, section: string): number => {
    // Simplified IELTS band score calculation
    const percentage = (score / 40) * 100; // Assuming 40 questions max
    
    if (percentage >= 90) return 9.0;
    if (percentage >= 85) return 8.5;
    if (percentage >= 80) return 8.0;
    if (percentage >= 75) return 7.5;
    if (percentage >= 70) return 7.0;
    if (percentage >= 65) return 6.5;
    if (percentage >= 60) return 6.0;
    if (percentage >= 55) return 5.5;
    if (percentage >= 50) return 5.0;
    if (percentage >= 45) return 4.5;
    if (percentage >= 40) return 4.0;
    return 3.5;
  };

  const getStudyTips = (section: string): string[] => {
    const tips = {
      listening: [
        "Read questions before listening to predict answers",
        "Listen for keywords and synonyms",
        "Pay attention to spelling and grammar",
        "Use the 10-minute transfer time wisely",
        "Practice with different accents"
      ],
      reading: [
        "Skim the passage first to understand the main idea",
        "Look for keywords in questions and passage",
        "Don't spend too much time on difficult questions",
        "Check your answers for spelling and grammar",
        "Practice with different text types"
      ],
      writing: [
        "Plan your essay before writing",
        "Use a variety of sentence structures",
        "Include relevant examples and explanations",
        "Check word count and time management",
        "Review for grammar and vocabulary errors"
      ]
    };
    return tips[section as keyof typeof tips] || [];
  };

  return (
    <TestContext.Provider value={{
      testHistory,
      currentTest,
      startTest,
      completeTest,
      getBandScore,
      getStudyTips
    }}>
      {children}
    </TestContext.Provider>
  );
};
