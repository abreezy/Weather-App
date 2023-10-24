import React, { useEffect } from 'react';

const Button = ({ isDarkMode, toggleMode }) => {
  useEffect(() => {
    // You can apply transition-related logic here if needed
  }, [isDarkMode]);

  return (
    <button
      type="button"
      className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
      onClick={toggleMode}
    >
    </button>
  );
};

export default Button;