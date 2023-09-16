import { useState, useEffect } from "react";
import Line from "../assets/Line.svg";
import { useMyContext } from "../context/UseMyContext";
import OptionLabel from "../components/OptionLabel";
import ReviewLabel from "../components/ReviewLabel";
import mariachi from "../assets/mariachi.wav";
import { CgMathPlus } from "react-icons/cg";
import tick from "../assets/tick.svg";

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
  handleMultiplier,
  setExtraCosts,
  extraCosts,
}) {
  const { currentDish } = useMyContext();

  const [selectedItems, setSelectedItems] = useState([]);
  const [hasChosen, setHasChosen] = useState(false);
  useEffect(() => {
    // Populate selectedItems with currentDish.stuffing when component mounts
    setSelectedItems(currentDish[phase] || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //vibration notification
  const VibrationActive = () => {
    if (!navigator.vibrate) return false;
    return true;
  };

  //play sound
  const play = () => {
    new Audio(mariachi).play();
  };

  const updateHasChosen = (isClicked) => {
    const temp = isClicked && hasChosen;
    setHasChosen(temp);
  };

  const handleClick = (isClicked, food) => {
    // updateHasChosen(isClicked);

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

  const renderedFoods = content
    ? content.map((food, index) => {
        const isClicked = selectedItems.includes(food.title);
        console.log(isClicked);

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
      })
    : null;

  if (finalSubmit) {
    content = [
      {
        title: currentDish.title,
        subtitle: [
          currentDish.stuffing && currentDish.stuffing.length > 0
            ? currentDish.stuffing.join(", ")
            : null,
          currentDish.ingredients && currentDish.ingredients.length > 0
            ? currentDish.ingredients.join(", ")
            : null,
          currentDish.salsa && currentDish.salsa.length > 0
            ? currentDish.salsa.join(", ")
            : null,
          currentDish.extra && currentDish.extra.length > 0
            ? currentDish.extra.join(", ")
            : null,
        ]
          .filter((item) => item !== null) // Remove null entries
          .join(", "),
      },
    ];
  }

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
        {finalSubmit ? (
          <ReviewLabel
            currentDish={currentDish}
            handleMultiplier={handleMultiplier}
          />
        ) : (
          <OptionLabel
            content={content}
            selectedItems={selectedItems}
            addExtraCost={addExtraCost}
            subExtraCost={subExtraCost}
            setSelectedItems={setSelectedItems}
            setExtraCosts={setExtraCosts}
            extraCosts={extraCosts}
            phase={phase}
            updateHasChosen={updateHasChosen}
            renderedFoods={renderedFoods} // Pass the rendered foods as a prop
            handleClick={handleClick} // Pass the handleClick function as a prop
          />
        )}
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

        {phase === "review" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={() => {
              finalSubmit();
              if (VibrationActive()) {
                navigator.vibrate([1000, 50, 1000]); // Trigger vibration if VibrationActive returns true
              }
              play();
            }}
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
