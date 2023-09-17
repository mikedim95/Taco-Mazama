import { CgMathPlus } from "react-icons/cg";
import tick from "../assets/tick.svg";
import { useState, useEffect } from "react";

function OptionLabel({
  ingredient,
  selectedItems,
  index,
  handleClick,
  hasChosen,
}) {
  console.log("i am child No: " + index);
  console.log("ingredient.title: " + ingredient.title);
  console.log("selectedItems: " + selectedItems);
  console.log(
    "selectedItems.some((item) => item === ingredient.title: " +
      selectedItems.some((item) => item === ingredient.title)
  );
  const [isClicked, setIsClicked] = useState(() =>
    selectedItems.some((item) => item === ingredient.title)
  );

  const [extraPrice, setExtraPrice] = useState(ingredient.extraPrice || 0);
  console.log(extraPrice);
  /* const isClicked = selectedItems.includes(ingredient.title); */
  // eslint-disable-next-line
  useEffect(() => {
    setIsClicked(selectedItems.some((item) => item === ingredient.title));
  });
  const optionClicked = () => {
    const updatedExtraPrice = ingredient.extraPrice + (hasChosen ? 1.5 : 0);
    setExtraPrice(updatedExtraPrice);
    setIsClicked(!isClicked);
    handleClick(ingredient, updatedExtraPrice);
  };
  const extraPriceElement = hasChosen ? (
    <div className="absolute bottom-[10px] left-[90px] text-[14px] font-pop text-left font-black">
      +{isClicked ? ingredient.extraPrice : ingredient.extraPrice + 1.5}€
    </div>
  ) : (
    <div className="absolute bottom-[10px] left-[90px] text-[14px] font-pop text-left font-black">
      +{ingredient.extraPrice}€
    </div>
  );
  console.log("ligo prin to krisimo kommati:" + isClicked);
  const icons = isClicked ? (
    <img src={tick} alt="" size="20px" />
  ) : (
    <CgMathPlus size="20px" />
  );

  const color = isClicked ? "bg-primary-dark" : "bg-[#E6C013]";

  return (
    <div key={index} className="relative ">
      <div
        className="w-auto h-[120px] rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]"
        onClick={() => optionClicked()}
      >
        <p
          className="pt-[10px] pl-[5px] text-[18px] font-pop text-left font-bold text-textFont-dark"
          style={{ whiteSpace: "pre-line" }}
        >
          {ingredient.title}
        </p>
        <p className="pl-[5px] pr-[100px] text-[14px] font-pop text-left font-normal text-textFont-dark">
          {ingredient.subtitle}
        </p>
        <div className="flex row-span-3 ">
          <img
            src={ingredient.img}
            alt=""
            className="w-[90px] h-[120px] absolute top-0 right-0 aspect-[3/2] object-cover items-center rounded-tr-[20px] rounded-br-[20px]"
          />
          <div
            className={`w-[80px] h-[40px] pl-[-10px] absolute bottom-0 left-0 ${color} rounded-tr-[20px] rounded-bl-[20px]`}
          >
            <div className="px-[30px] py-[10px]">{icons}</div>
          </div>
          {extraPriceElement}
          <div className="absolute bottom-[10px] left-[130px]">
            {ingredient.spicy}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionLabel;
