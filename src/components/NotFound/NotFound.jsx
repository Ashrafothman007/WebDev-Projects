import React, { useEffect, useState } from 'react';

export default function NotFound() {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      window.location.href = '/';
    }
  }, [counter]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-blue-600 dark:text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Redirecting to home in {counter} seconds...
      </p>
      <a
        href="/"
        className="bg-blue-600 dark:bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-gray-600 transition-all duration-300"
      >
        Go to Home
      </a>
    </div>
  );
}
