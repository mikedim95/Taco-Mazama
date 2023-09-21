import React, { createContext, useContext, useState } from "react";

// Create a context
const MyContext = createContext();

// Create a custom provider component
export const MyProvider = ({ children }) => {
  const [currentDish, setCurrentDish] = useState();
  const [currentSide, setCurrentSide] = useState();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [finalDishOrder, setFinalDishOrder] = useState([]);
  const [finalSidesOrder, setFinalSidesOrder] = useState([]);
  const [finalBeveragesOrder, setFinalBeveragesOrder] = useState([]);
  const [tableNo, setTableNo] = useState();

  console.log(tableNo);

  return (
    <MyContext.Provider
      value={{
        currentSide,
        setCurrentSide,
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
        cartItemCount,
        setCartItemCount,
        tableNo,
        setTableNo,
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
