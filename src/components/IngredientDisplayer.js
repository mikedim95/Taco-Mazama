import { CgMathPlus } from "react-icons/cg";
import { useState, useEffect } from "react";
import tick from "../assets/tick.svg";
import Line from "../assets/Line.svg";
import { useMyContext } from "../context/UseMyContext";

function IngredientDisplayer({
  phase,
  content,
  handleNextStep,
  handlePreviousStep,
  message,
  addExtraCost,
  subExtraCost,
  finalSubmit,
  firstButtonPosition,
}) {
  const { currentDish } = useMyContext();

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Populate selectedItems with currentDish.stuffing when component mounts
    // eslint-disable-next-line
    setSelectedItems(currentDish[phase] || []);
  }, []);

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

  return (
    <>
      <div className="flex justify-start relative ">
        <h1
          className="absolute top-[10px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          {message}
        </h1>
      </div>
      <div className="pt-[45px] pl-[30px] mr-[20px]">
        <img className="w-full" src={Line} alt="" />
      </div>
      <div className="columns-1 px-[20px] justify-center space-y-[10px] items-center">
        {renderedFoods}
      </div>
      <div
        className={`pt-[15px] pb-[20px] ${
          firstButtonPosition
            ? "flex justify-end items-end pr-[20px]"
            : "px-[20px] flex justify-between space-x-[10px] items-end"
        } `}
      >
        {phase !== "stuffing" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => handlePreviousStep(phase, selectedItems)}
          >
            Προηγούμενο
          </button>
        ) : null}

        {phase === "extra" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={() => finalSubmit(phase, selectedItems)}
          >
            Υποβολή
          </button>
        ) : (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => handleNextStep(phase, selectedItems)}
          >
            Επόμενο
          </button>
        )}
      </div>
    </>
  );
}

export default IngredientDisplayer;
