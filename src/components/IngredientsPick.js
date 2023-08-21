import { insideFood } from "../helpers/insidefood";
import { CgMathPlus } from "react-icons/cg";
import { useState } from "react";
import tick from "../assets/tick.svg";
import Line from "../assets/Line.svg";

function IngredientsPick() {
  const [buttonOk, setButtonOk] = useState(null);

  const renderedFoods = insideFood.map((food, index) => {
    const isClicked = index === buttonOk;

    const icons = isClicked ? (
      <img src={tick} alt="" sizes="10px" />
    ) : (
      <CgMathPlus size="20px" />
    );

    const color = isClicked ? "bg-primary-dark" : "bg-[#E6C013]";

    const handleClick = () => {
      if (isClicked) {
        setButtonOk(null);
      } else {
        setButtonOk(index);
      }
    };

    return (
      <div key={index} className=" relative ">
        <div
          className="w-auto h-[120px] rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]"
          onClick={handleClick}
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
            <div className="pl-[100px] pt-[15px] text-[14px] font-pop text-left font-bold font-black">
              {food.extraPrice}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex justify-start relative">
        <h1
          className="absolute top-[10px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          Διάλεξε τα υλικά σου...
        </h1>
      </div>
      <div className="pt-[45px] pl-[30px] mr-[20px]">
        <img className="w-full" src={Line} alt="" />
      </div>
      <div className="columns-1 px-[20px] justify-center space-y-[10px] items-center">
        {renderedFoods}
      </div>
    </>
  );
}

export default IngredientsPick;
