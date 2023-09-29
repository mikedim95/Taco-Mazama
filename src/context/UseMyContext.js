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
  const [finalBeveragesOrderContext, setFinalBeveragesOrderContext] =
    useState();
  const [tableNo, setTableNo] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [publicIP, setPublicIP] = useState();
  const [legitIP, setLegitIP] = useState(false);
  const setCurrentDishToEdit = (key) => {
    console.log("accepted key: " + key);
    setCurrentDish({ ...finalDishOrder[key], index: key });
    console.log("current dish should be: ");
    console.log(finalDishOrder[key]);
  };
  function setCurrentSideToEdit(key) {
    setCurrentSide(finalSidesOrder[key]);
  }
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
        finalBeveragesOrderContext,
        setFinalBeveragesOrderContext,
        currentDishIndex,
        setCurrentDishIndex,
        cartItemCount,
        setCartItemCount,
        tableNo,
        setTableNo,
        setTotalPrice,
        totalPrice,
        publicIP,
        setPublicIP,
        legitIP,
        setLegitIP,
        setCurrentDishToEdit,
        setCurrentSideToEdit,
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
