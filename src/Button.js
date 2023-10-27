import React, { useEffect } from 'react';

const Button = ({ isDarkMode, toggleMode }) => {
  useEffect(() => {
    // Store the dark mode preference in local storage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      type="button"
      onClick={toggleMode}
    >
    </button>
  );
};

export default Button;
