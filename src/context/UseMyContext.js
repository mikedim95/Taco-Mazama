import React, { createContext, useContext, useState } from "react";

// Create a context
const MyContext = createContext();

// Create a custom provider component
export const MyProvider = ({ children }) => {
  const [currentDish, setCurrentDish] = useState();
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [finalDishOrder, setFinalDishOrder] = useState([]);
  const [finalSidesOrder, setFinalSidesOrder] = useState([]);
  const [finalBeveragesOrder, setFinalBeveragesOrder] = useState([]);
  return (
    <MyContext.Provider
      value={{
        currentDish,
        setCurrentDish,
        finalDishOrder,
        setFinalDishOrder,
        finalSidesOrder,
        setFinalSidesOrder,
        finalBeveragesOrder,
        setFinalBeveragesOrder,
        currentDishIndex,
        setCurrentDishIndex,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
export const useMyContext = () => {
  return useContext(MyContext);
};
