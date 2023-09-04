import { useState, useEffect } from "react";
import Line from "../assets/Line.svg";
import { useMyContext } from "../context/UseMyContext";
import OptionLabel from "../components/OptionLabel";
import ReviewLabel from "../components/ReviewLabel";
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
}) {
  const { currentDish } = useMyContext();

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Populate selectedItems with currentDish.stuffing when component mounts
    // eslint-disable-next-line
    setSelectedItems(currentDish[phase] || []);
  }, []);

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
  //vibration notification
  const VibrationActive = () => {
    if (!navigator.vibrate) return false;
    return true;
  };

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
            content={content}
            selectedItems={selectedItems}
            addExtraCost={addExtraCost}
            subExtraCost={subExtraCost}
            setSelectedItems={setSelectedItems}
            finalSubmit={finalSubmit}
            handleMultiplier={handleMultiplier}
          />
        ) : (
          <OptionLabel
            content={content}
            selectedItems={selectedItems}
            addExtraCost={addExtraCost}
            subExtraCost={subExtraCost}
            setSelectedItems={setSelectedItems}
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
