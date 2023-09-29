import { CgMathPlus, CgMathMinus } from "react-icons/cg";
// import tick from "../assets/tick.svg";
import tick from "../assets/tick.json";
import { useState, useEffect } from "react";
import { useMyContext } from "../context/UseMyContext";
import Lottie from "lottie-react";

function BeverageOptionLabel({
  beverage,
  selectedItem,
  index,
  handleClick,
  hasChosen,
  addExtraCost,
  subExtraCost,
  phase,
}) {
  console.log(selectedItem);
  // eslint-disable-next-line
  const [localMultiplier, setLocalMultiplier] = useState(
    selectedItem !== null ? selectedItem.multiplier : 0
  );
  /*  useEffect(( const [isClicked, setIsClicked] = useState(() =>
    selectedItems.some((item) => item === ingredient.title)
  );) => {}); */

  return (
    <div key={index} className="relative ">
      <div
        className="w-auto h-[120px] rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]"
        /* onClick={() => optionClicked()} */
      >
        <p
          className={` pt-[10px] pl-[5px] text-[18px] font-pop text-left font-bold text-textFont-dark`}
          style={{ whiteSpace: "pre-line" }}
        >
          {beverage.title}
        </p>
        <p
          className={` pl-[5px] pr-[100px] text-[14px] font-pop text-left font-normal text-textFont-dark`}
        >
          {beverage.subtitle}
        </p>
        <div className="flex row-span-3 ">
          <img
            src={beverage.img}
            alt=""
            className={` w-[90px] h-[120px] absolute top-0 right-0 aspect-[3/2] object-cover items-center rounded-tr-[20px] rounded-br-[20px]`}
          />
          <div
            className={` w-[80px] h-[40px] pl-[-10px] absolute bottom-0 left-0  rounded-tr-[20px] rounded-bl-[20px]`}
          ></div>
          <div className="w-[140px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
            <div className="columns-3">
              <div
                className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black"
                /*  onClick={() => handleMultiplier(index, content.multiplier - 1)} */
              >
                <CgMathMinus size="20px" />
              </div>
              <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                {localMultiplier}
              </div>
              <div
                className=" text-[18px] py-[10px] font-pop text-center font-bold text-black"
                /*  onClick={() => handleMultiplier(index, content.multiplier + 1)} */
              >
                <CgMathPlus size="20px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeverageOptionLabel;
