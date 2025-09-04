import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert to seconds

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    return ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  };

  const getTimerColor = (): string => {
    const percentage = getProgressPercentage();
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-500';
    return 'text-blue-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Time Remaining
        </h3>
        <span className={`text-lg font-mono font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            getProgressPercentage() >= 90 
              ? 'bg-red-500' 
              : getProgressPercentage() >= 75 
                ? 'bg-orange-500' 
                : 'bg-blue-500'
          }`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      
      {timeLeft <= 300 && timeLeft > 0 && (
        <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 text-center">
          ⏰ Less than 5 minutes remaining!
        </p>
      )}
    </div>
  );
};

export default Timer;
