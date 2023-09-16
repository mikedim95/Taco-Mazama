import { CgMathPlus } from "react-icons/cg";
import tick from "../assets/tick.svg";
import { useState } from "react";
function OptionLabel({
  content,
  selectedItems,
  addExtraCost,
  subExtraCost,
  setSelectedItems,
  plusCost,
  setPlusCost,
  setExtraCosts,
  extraCosts,
  phase,
}) {
  // const handleClick = (food) => {
  const [hasChosen, setHasChosen] = useState(false);
  // };
  console.log(hasChosen);
  const updateHasChosen = (isClicked) => {
    const temp = isClicked && hasChosen;
    setHasChosen(temp);
  };
  const handleClick = (isClicked, food) => {
    updateHasChosen(isClicked);
    // if (phase === "stuffing") {
    //   let updatedSelectedItems = [...selectedItems];
    //   let updatedExtraPrices = { ...previousExtraPrices };
    //   let updatedExtraCosts = 0;
    //   let updatedPlusCost = 0;

    //   if (selectedItems.includes(food.title)) {
    //     const itemIndex = updatedSelectedItems.indexOf(food.title);
    //     if (itemIndex !== -1) {
    //       updatedSelectedItems.splice(itemIndex, 1);
    //     }

    //     if (food.extraPrice) {
    //       updatedExtraPrices[food.title] -= food.extraPrice;
    //     }
    //   } else {
    //     updatedSelectedItems.push(food.title);

    //     if (food.extraPrice) {
    //       updatedExtraPrices[food.title] =
    //         (updatedExtraPrices[food.title] || 0) + food.extraPrice;
    //     }
    //   }
    //   if (updatedSelectedItems.length >= 2) {
    //     updatedPlusCost = (updatedSelectedItems.length - 1) * 1.5;
    //   }

    //   updatedExtraCosts = Object.values(updatedExtraPrices).reduce(
    //     (total, price) => total + price,
    //     0
    //   );

    //   setSelectedItems(updatedSelectedItems);
    //   setPreviousExtraPrices(updatedExtraPrices);
    //   setPlusCost(updatedPlusCost);
    //   setExtraCosts(updatedExtraCosts + updatedPlusCost);
    // } else {

    if (selectedItems.includes(food.title)) {
      const updatedSelectedItems = selectedItems.filter(
        (item) => item !== food.title
      );
      setSelectedItems(updatedSelectedItems);
      if (food.extraPrice) {
        subExtraCost(food.extraPrice);
      }
    } else {
      setSelectedItems([...selectedItems, food.title]);

      if (food.extraPrice) {
        addExtraCost(food.extraPrice);
      }
    }
  };

  const renderedFoods = content.map((food, index) => {
    const isClicked = selectedItems.includes(food.title);
    console.log(isClicked);
    updateHasChosen();
    /*    setHasChosen(hasChosen && isClicked); */

    // const previousExtraPrice =
    //   previousExtraPrices[food.title] || food.extraPrice;
    // const updatedExtraPrice = isClicked
    //   ? food.extraPrice + plusCost
    //   : previousExtraPrice;

    const extraPriceElement =
      food.extraPrice == null ? (
        <div className="absolute bottom-[10px] left-[90px] text-[14px] font-pop text-left font-black">
          {/*  +{hasChosen ? 1.5 : 0}€ */}
        </div>
      ) : (
        <div className="absolute bottom-[10px] left-[90px] text-[14px] font-pop text-left font-black">
          {/* +{hasChosen ? food.extraPrice + 1.5 : food.extraPrice}€ */}
        </div>
      );
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
          onClick={() => handleClick(isClicked, food)}
        >
          <p
            className="pt-[10px] pl-[5px] text-[18px] font-pop text-left font-bold text-textFont-dark"
            style={{ whiteSpace: "pre-line" }}
          >
            {food.title}
          </p>
          <p className="pl-[5px] pr-[100px] text-[14px] font-pop text-left font-normal text-textFont-dark">
            {food.subtitle}
          </p>
          <div className="flex row-span-3 ">
            <img
              src={food.img}
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
              {food.spicy}
            </div>
          </div>
        </div>
      </div>
    );
  });
  return renderedFoods;
}

export default OptionLabel;
