import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * This demonstrates:
 * - useState for managing debounced state
 * - useEffect for setting up timers
 * - Cleanup functions to prevent memory leaks
 * - Performance optimization technique
 * 
 * Use case: Prevent API calls on every keystroke in search inputs
 */
const useDebounce = (value, delay) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: cancel the timeout if value changes before delay
    // This is the key to debouncing - we cancel the previous timer
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
};

export default useDebounce; 