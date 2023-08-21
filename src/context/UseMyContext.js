import React, { createContext, useContext, useState } from 'react';

// Create a context
const MyContext = createContext();

// Create a custom provider component
export const MyProvider = ({ children }) => {
  const [currentDish, setCurrentDish] = useState("Hello from context!");

  const updateCurrentDish = newData => {
    setCurrentDish(newData);
  };

  return (
    <MyContext.Provider value={{ currentDish, updateCurrentDish }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
export const useMyContext = () => {
  return useContext(MyContext);
};