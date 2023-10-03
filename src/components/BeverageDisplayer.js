import { useState, useEffect } from "react";

import Line from "../assets/Line.svg";
import { useMyContext } from "../context/UseMyContext";
import BeverageOptionLabel from "../components/BeverageOptionLabel";

import mariachi from "../assets/mariachi.wav";
function IngredientDisplayer({
  phase,
  content,
  handleNextStep,
  handlePreviousStep,
  message,
  selectedItems,
  totalPrice,
  updateSelectedItems,
  firstButtonPosition,
}) {
  console.log(totalPrice);

  useEffect(() => {}, []);
  //vibration notification
  const VibrationActive = () => {
    if (!navigator.vibrate) return false;
    return true;
  };

  //play sound
  const play = () => {
    new Audio(mariachi).play();
  };

  const handleMultiplier = (beverage, phase, multiplier) => {
    if (multiplier === 0) {
      const temp = selectedItems.filter(
        (item) => item.title !== beverage.title
      );
      console.log(temp);
      updateSelectedItems(phase, temp);
      return;
    }

    const temp = selectedItems.map((item) =>
      item.title === beverage.title ? { ...item, multiplier } : item
    );

    const flag = temp.some((item) => item.title === beverage.title);

    if (!flag) {
      temp.push({ ...beverage, multiplier });
    }

    updateSelectedItems(phase, temp);
  };

  return (
    <>
      <div className="flex justify-start relative ">
        <h1
          className="absolute top-[5px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          {message} {totalPrice} €
          <div
            className="absolute top-[25px] mr-[-100px] left-[5px] font-pop text-[10px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            {/*    {messageSub} */}
          </div>
        </h1>
      </div>
      <div className="pt-[45px] pl-[30px] mr-[20px]">
        <img className="w-full" src={Line} alt="" />
      </div>
      <div className="columns-1 px-[20px] justify-center space-y-[10px] items-center">
        {content.map((beverage, index) => {
          let item;

          try {
            item = selectedItems.find((item) => item.title === beverage.title);
          } catch (warning) {
            console.warn("There are no preselected items");
            item = undefined; // or any other default value you want to assign
          }
          console.log(item);
          return (
            <BeverageOptionLabel
              key={index}
              phase={phase}
              beverage={beverage}
              index={index + beverage.title}
              selectedItem={item}
              handleMultiplier={handleMultiplier}
            />
          );
        })}
      </div>
      <div
        className={`pt-[15px] pb-[20px] ${
          firstButtonPosition
            ? "flex justify-end items-end pr-[20px]"
            : "px-[20px] flex justify-between space-x-[10px] items-end"
        } `}
      >
        {phase !== "softDrinks" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => handlePreviousStep(phase, selectedItems)}
          >
            Προηγούμενο
          </button>
        ) : null}

        {phase !== "drinks" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={() => handleNextStep(phase, selectedItems)}
            /*  onClick={() => {
              finalSubmit();
              if (VibrationActive()) {
                navigator.vibrate([1000, 50, 1000]); // Trigger vibration if VibrationActive returns true
              }
              play();
            }} */
          >
            Επόμενο
          </button>
        ) : null}
      </div>
    </>
  );
}

export default IngredientDisplayer;
