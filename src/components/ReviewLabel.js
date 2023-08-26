import React from "react";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";

function ReviewLabel({
  content,
  selectedItems,
  addExtraCost,
  subExtraCost,
  setSelectedItems,
}) {
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
            <div className="w-[150px] h-[40px] absolute bottom-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
              <div className="px-[20px] py-[10px] columns-3">
                <CgMathMinus size="20px" />
                <div className=" text-[18px] font-pop text-center font-bold text-black">
                  1
                </div>
                <CgMathPlus size="20px" />
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
