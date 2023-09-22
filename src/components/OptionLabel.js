import { CgMathPlus } from "react-icons/cg";
// import tick from "../assets/tick.svg";
import tick from "../assets/tick.json";
import { useState, useEffect } from "react";
import { useMyContext } from "../context/UseMyContext";
import Lottie from "lottie-react";

function OptionLabel({
  ingredient,
  sidesIngredient,
  selectedItems,
  selectedSides,
  index,
  handleClick,
  hasChosen,
  addExtraCost,
  subExtraCost,
  phase,
}) {
  const { currentDish, currentSide } = useMyContext();
  const [isClicked, setIsClicked] = useState(
    () =>
      (selectedItems &&
        selectedItems.some((item) => item === ingredient.title)) ||
      (selectedSides &&
        selectedSides.some((piece) => piece === sidesIngredient.title))
  );
  const normalPrice =
    ingredient.extraPrice > 0
      ? currentDish.title === "Taco" ||
        currentDish.title === "Mulita" ||
        currentDish.title === "Enchilada"
        ? ingredient.title === "Fajita Mix"
          ? ingredient.extraPrice - 0.25
          : ingredient.title === "Καλαμπόκι"
          ? ingredient.extraPrice
          : ingredient.extraPrice - 0.5
        : ingredient.extraPrice
      : ingredient.extraPrice;

  const addedPrice =
    normalPrice +
    (phase === "stuffing" &&
    currentDish.title !== "Taco" &&
    currentDish.title !== "Mulita" &&
    currentDish.title !== "Enchilada"
      ? 1.5
      : (currentDish.title === "Taco" ||
          currentDish.title === "Mulita" ||
          currentDish.title === "Enchilada") &&
        phase === "stuffing"
      ? 0.5
      : 0);

  const [extraPrice, setExtraPrice] = useState(normalPrice || 0); //The local extra price for this particular option

  console.log("erxetai", extraPrice);
  // eslint-disable-next-line
  useEffect(() => {
    setIsClicked(
      (selectedItems &&
        selectedItems.some((item) => item === ingredient.title)) ||
        (selectedSides &&
          selectedSides.some((piece) => piece === sidesIngredient.title))
    );
  });
  const optionClicked = () => {
    setIsClicked(!isClicked);
    if (
      selectedItems.includes(ingredient.title) ||
      selectedSides.includes(sidesIngredient.title)
    ) {
      if (selectedItems.length === 1 || selectedSides.length === 1) {
        setExtraPrice(normalPrice);
        subExtraCost(normalPrice);
      } else {
        setExtraPrice(
          normalPrice +
            (phase === "stuffing" &&
            currentDish.title !== "Taco" &&
            currentDish.title !== "Mulita" &&
            currentDish.title !== "Enchilada"
              ? 1.5
              : (currentDish.title === "Taco" ||
                  currentDish.title === "Mulita" ||
                  currentDish.title === "Enchilada") &&
                phase === "stuffing"
              ? 0.5
              : 0)
        );
        subExtraCost(
          normalPrice +
            (phase === "stuffing" &&
            currentDish.title !== "Taco" &&
            currentDish.title !== "Mulita" &&
            currentDish.title !== "Enchilada"
              ? 1.5
              : (currentDish.title === "Taco" ||
                  currentDish.title === "Mulita" ||
                  currentDish.title === "Enchilada") &&
                phase === "stuffing"
              ? 0.5
              : 0)
        );
      }
    } else {
      if (selectedItems.length === 0 || selectedSides.length === 0) {
        setExtraPrice(normalPrice);
        addExtraCost(normalPrice);
      } else {
        setExtraPrice(
          normalPrice +
            (phase === "stuffing" &&
            currentDish.title !== "Taco" &&
            currentDish.title !== "Mulita" &&
            currentDish.title !== "Enchilada"
              ? 1.5
              : (currentDish.title === "Taco" ||
                  currentDish.title === "Mulita" ||
                  currentDish.title === "Enchilada") &&
                phase === "stuffing"
              ? 0.5
              : 0)
        );
        addExtraCost(
          normalPrice +
            (phase === "stuffing" &&
            currentDish.title !== "Taco" &&
            currentDish.title !== "Mulita" &&
            currentDish.title !== "Enchilada"
              ? 1.5
              : (currentDish.title === "Taco" ||
                  currentDish.title === "Mulita" ||
                  currentDish.title === "Enchilada") &&
                phase === "stuffing"
              ? 0.5
              : 0)
        );
      }
    }

    handleClick(ingredient);
    handleClick(sidesIngredient);
  };
  const extraPriceElement = hasChosen ? (
    <div className="absolute bottom-[10px] left-[90px] text-[14px] font-pop text-left font-black">
      {isClicked ? null : addedPrice !== 0 ? `+${addedPrice} €` : null}
    </div>
  ) : (
    <div className="absolute bottom-[10px] left-[90px] text-[14px] font-pop text-left font-black">
      {normalPrice !== 0 ? `+${normalPrice} €` : null}
    </div>
  );

  const icons = isClicked ? (
    <Lottie
      animationData={tick}
      speed={100}
      loop={false}
      className="w-[50px] h-[50px] mt-[-15px] ml-[-15px]"
    />
  ) : (
    <CgMathPlus size="20px" />
  );

  const color = isClicked ? "bg-primary-dark" : "bg-[#E6C013]";
  const bgGray = isClicked ? "opacity-60" : "";

  return (
    <div key={index} className="relative ">
      <div
        className="w-auto h-[120px] rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]"
        onClick={() => optionClicked()}
      >
        <p
          className={`${bgGray} pt-[10px] pl-[5px] text-[18px] font-pop text-left font-bold text-textFont-dark`}
          style={{ whiteSpace: "pre-line" }}
        >
          {ingredient.title}
          {sidesIngredient.title}
        </p>
        <p
          className={`${bgGray} pl-[5px] pr-[100px] text-[14px] font-pop text-left font-normal text-textFont-dark`}
        >
          {ingredient.subtitle}
          {sidesIngredient.subtitle}
        </p>
        <div className="flex row-span-3 ">
          <img
            src={ingredient.img || sidesIngredient.img}
            alt=""
            className={`${bgGray} w-[90px] h-[120px] absolute top-0 right-0 aspect-[3/2] object-cover items-center rounded-tr-[20px] rounded-br-[20px]`}
          />
          <div
            className={` w-[80px] h-[40px] pl-[-10px] absolute bottom-0 left-0 ${color} rounded-tr-[20px] rounded-bl-[20px]`}
          >
            <div className="px-[30px] py-[10px]">{icons}</div>
          </div>
          {extraPriceElement}
          <div className={`${bgGray} absolute bottom-[10px] left-[130px]`}>
            {ingredient.spicy}
            {sidesIngredient.spicy}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionLabel;
