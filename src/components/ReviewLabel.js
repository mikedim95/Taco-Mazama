import React from "react";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { useState } from "react";
import { useMyContext } from "../context/UseMyContext";
function ReviewLabel({
  content,
  selectedItems,
  addExtraCost,
  subExtraCost,
  setSelectedItems,
  handleMultiplier,
  finalSubmit,
}) {
  const { currentDish, setCurrentDish, finalDishOrder, setFinalDishOrder } =
    useMyContext();
  const [multiplier, setMultiplier] = useState(1);
  handleMultiplier(multiplier);
  const updateMultiplier = (operation) => {
    switch (operation) {
      case "add":
        handleMultiplier(multiplier + 1);
        setMultiplier(multiplier + 1);
        break;
      case "sub":
        if (multiplier > 1) {
          handleMultiplier(multiplier - 1);
          setMultiplier(multiplier - 1);
        }
        break;
    }
  };
  const renderedFoods = content.map((food, index) => {
    const isClicked = selectedItems.includes(food.title);

    return (
      <div key={index} className=" relative ">
        <div className="w-auto h-auto flex flex-col rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
          <div className="pt-[20px] pl-[10px] text-[18px] font-pop text-left font-bold text-textFont-dark">
            {food.title}
          </div>
          <div className="pl-[10px] pr-[5px] text-[14px] font-pop text-left font-normal text-textFont-dark">
            {food.subtitle}
          </div>
          <div className="pt-[50px]">
            <div
              className="w-[80px] h-[40px] absolute bottom-0 right-0 bg-[#E6C013] rounded-tl-[20px] rounded-br-[20px]"
              onClick={() => updateMultiplier("add")}
            >
              <div className="px-[30px] py-[10px] columns-3">
                <div className=" text-[18px] font-pop text-center font-bold text-black">
                  <CgMathPlus size="20px" />
                </div>
              </div>
            </div>
            <div
              className="w-[80px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]"
              onClick={() => updateMultiplier("sub")}
            >
              <div className="px-[30px] py-[10px] columns-3">
                <div className=" text-[18px] font-pop text-center font-bold text-black">
                  <CgMathMinus size="20px" />
                </div>
              </div>
            </div>
            <div className="w-[150px] h-[40px] absolute top-0 right-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
              <div className="px-[30px] py-[10px] columns-3">
                <div className=" text-[18px] font-pop text-center font-bold text-black">
                  ποσότητα:{multiplier}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return renderedFoods;
}

export default ReviewLabel;
