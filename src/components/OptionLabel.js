import React from "react";
import { CgMathPlus } from "react-icons/cg";
import tick from "../assets/tick.svg";
function OptionLabel({
  content,
  selectedItems,
  addExtraCost,
  subExtraCost,
  setSelectedItems,
}) {
  console.log(content);
  const renderedFoods = content.map((food, index) => {
    const isClicked = selectedItems.includes(food.title);
    console.log(selectedItems);
    const extraPriceElement =
      food.extraPrice !== null ? (
        <div className="pl-[100px] pt-[15px] text-[14px] font-pop text-left font-bold font-black">
          +{food.extraPrice} €
        </div>
      ) : null;
    const icons = isClicked ? (
      <img src={tick} alt="" size="20px" />
    ) : (
      <CgMathPlus size="20px" />
    );

    const color = isClicked ? "bg-primary-dark" : "bg-[#E6C013]";
    const handleClick = (ingredient) => {
      if (selectedItems.includes(ingredient.title)) {
        // Item is already selected, remove it from the array
        if (ingredient.extraPrice) {
          subExtraCost(ingredient.extraPrice);
        }

        setSelectedItems(
          selectedItems.filter((item) => item !== ingredient.title)
        );
      } else {
        // Item is not selected, add it to the array

        setSelectedItems([...selectedItems, ingredient.title]);
        if (ingredient.extraPrice) {
          addExtraCost(ingredient.extraPrice);
        }
      }
    };

    return (
      <div key={index} className=" relative ">
        <div
          className="w-auto h-[120px] rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]"
          onClick={() => handleClick(food)}
        >
          <div className="pt-[10px] pl-[5px] text-[18px] font-pop text-left font-bold text-textFont-dark">
            {food.title}
          </div>
          <div className="pl-[5px] pr-[100px] text-[14px] font-pop text-left font-normal text-textFont-dark">
            {food.subtitle}
          </div>
          <div className="col-span-2">
            <div
              className={`w-[80px] h-[40px] absolute bottom-0 ${color} rounded-tr-[20px] rounded-bl-[20px]`}
            >
              <div className="px-[30px] py-[10px]">{icons}</div>
            </div>
            {extraPriceElement}
          </div>
        </div>
      </div>
    );
  });
  return renderedFoods;
}

export default OptionLabel;
