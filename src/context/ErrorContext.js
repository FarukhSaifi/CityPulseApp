import React, { createContext, useCallback, useContext, useState } from "react";

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [currentError, setCurrentError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const showError = useCallback((error) => {
    setCurrentError(error);
    setIsVisible(true);
  }, []);

  const hideError = useCallback(() => {
    setIsVisible(false);
    setCurrentError(null);
  }, []);

  const clearError = useCallback(() => {
    setCurrentError(null);
    setIsVisible(false);
  }, []);

  const value = {
    currentError,
    isVisible,
    showError,
    hideError,
    clearError,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
