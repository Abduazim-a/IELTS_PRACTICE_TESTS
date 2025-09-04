import React, { useState } from 'react';

interface VerificationPageProps {
  onVerification: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ onVerification }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hardcoded allowed phone numbers (without +998 prefix)
  const allowedNumbers = ['777771968', '910122461'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const fullNumber = `+998${phoneNumber}`;
      const isValid = allowedNumbers.includes(phoneNumber);

      if (isValid) {
        // Store verification in localStorage
        localStorage.setItem('ielts-verified', 'true');
        onVerification();
      } else {
        setError('You are not authorized to access this site.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 9) { // Max 9 digits (7 digits + 2 for area code)
      setPhoneNumber(value);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              IELTS Practice Tests
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your phone number to access the practice tests
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">+998</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter 7 digits"
                  className="block w-full pl-16 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                  maxLength={9}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter only the 7 digits after +998
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length !== 7}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Example: +998 777 77 19 68
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
