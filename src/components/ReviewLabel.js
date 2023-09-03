import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import useMultiplier from "../hooks/useMultiplier";
import { useEffect } from "react";

function ReviewLabel({ content, handleMultiplier }) {
  const { multiplier, updateMultiplier } = useMultiplier();
  // handleMultiplier(multiplier);
  useEffect(() => {
    handleMultiplier(multiplier);
  }, [multiplier, handleMultiplier]);

  const renderedFoods = content.map((food, index) => {
    return (
      <div key={index} className=" relative">
        <div className="w-auto h-auto flex flex-col rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
          <div className="pt-[20px] pl-[10px] text-[18px] font-pop text-left font-bold text-textFont-dark">
            {food.title}
          </div>
          <div className="pl-[10px] pr-[5px] text-[14px] font-pop text-left font-normal text-textFont-dark">
            {food.subtitle}
          </div>
          <div className="pt-[50px]">
            <div className="w-[140px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
              <div className="columns-3">
                <div
                  className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black"
                  onClick={() => updateMultiplier("sub")}
                >
                  <CgMathMinus size="20px" />
                </div>
                <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                  {multiplier}
                </div>
                <div
                  className=" text-[18px] py-[10px] font-pop text-center font-bold text-black"
                  onClick={() => updateMultiplier("add")}
                >
                  <CgMathPlus size="20px" />
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
