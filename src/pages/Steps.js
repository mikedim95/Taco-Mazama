import Stepper from "../components/Stepper";
import { stuffing, ingredients, salsa, extra } from "../helpers/menu";
import { useMyContext } from "../context/UseMyContext";
import IngredientDisplayer from "../components/IngredientDisplayer";
import { motion as m } from "framer-motion";

import { useState, useEffect, useRef } from "react";
/* debugger */
function Steps() {
  const [basePrice, setBasePrice] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [extraCosts, setExtraCosts] = useState(0);
  const [nextPosition, setNextPosition] = useState(0);
  const { currentDish, setCurrentDish } = useMyContext();
  const [size, setSize] = useState("middle");
  const scrollToTopRef = useRef(null);

  const order = () => {
    if (nextPosition === 0) {
      return (
        <IngredientDisplayer
          key="stuffing"
          phase={"stuffing"}
          content={stuffing}
          handleNextStep={handleNextStep}
          message={"Διάλεξε τη Γέμισή σου"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleMultiplier={handleMultiplier}
          firstButtonPosition
        />
      );
    } else if (nextPosition === 1) {
      return (
        <IngredientDisplayer
          key="ingredients"
          phase={"ingredients"}
          content={ingredients}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε τα υλικά σου"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleMultiplier={handleMultiplier}
        />
      );
    } else if (nextPosition === 2) {
      return (
        <IngredientDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε τη Σάλτσα σου"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleMultiplier={handleMultiplier}
        />
      );
    } else if (nextPosition === 3) {
      return (
        <IngredientDisplayer
          key="extra"
          phase={"extra"}
          content={extra}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε τα Έξτρα σου"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleMultiplier={handleMultiplier}
        />
      );
    } else if (nextPosition === 4) {
      return (
        <IngredientDisplayer
          key="review"
          phase={"review"}
          currentDish={currentDish}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε τα Έξτρα σου"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleMultiplier={handleMultiplier}
        />
      );
    }
  };

  useEffect(() => {
    // Populate selectedItems with currentDish.stuffing when component mounts
    switch (size) {
      case "middle":
        setBasePrice(7);
        break;
      case "big":
        setBasePrice(12);
        break;
      default:
        setBasePrice(0);
    }

    /*   setFinalPrice(basePrice*multiplier+extraCosts) */
  }, [size, extraCosts, multiplier]);

  const handleSetSize = (size) => {
    setSize(size);
  };

  const handleNextStep = (category, selection) => {
    setCurrentDish({ ...currentDish, [category]: selection });
    setNextPosition(nextPosition + 1);
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handlePreviousStep = (category, selection) => {
    setNextPosition(nextPosition - 1);
    setCurrentDish({ ...currentDish, [category]: selection });
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const addExtraCost = (value) => {
    setExtraCosts(extraCosts + value);
  };
  const subExtraCost = (value) => {
    setExtraCosts(extraCosts - value);
  };
  const handleMultiplier = (value) => {
    setMultiplier(value);
  };
  const finalSubmit = (category, selection) => {
    setCurrentDish({ ...currentDish, [category]: selection });
  };

  const initialImage = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%" },
  };

  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-scroll">
      <m.div
        initial="hidden"
        animate="visible"
        variants={initialImage}
        transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
        ref={scrollToTopRef}
        className="justify-center items-center relative"
      >
        <img
          className="w-full h-full mb-[30px] aspect-[3/2] object-cover items-center rounded-b-[30px]"
          src={currentDish.img}
          alt=""
        />
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full flex flex-col "
      >
        <Stepper nextPosition={nextPosition} />
        <div className="flex justify-end relative">
          <h1
            className="absolute right-[30px] top-[-40px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή: {basePrice * multiplier + extraCosts} €
          </h1>
        </div>
        <div className="flex justify-between mx-[20px] gap-[20px]">
          <button
            className={`w-[150px] h-[40px] top-[5px] ml-[10px] rounded-full ${
              size === "middle"
                ? "bg-primary-regular outline outline-2 outline-gray-600"
                : "bg-[#AEAEAE]"
            } font-pop text-[16px] font-semibold text-center`}
            onClick={() => handleSetSize("middle")}
          >
            Μεσαίο 7 €
          </button>
          <button
            className={`w-[150px] h-[40px] top-[5px]  rounded-full ${
              size === "big"
                ? "bg-primary-regular outline outline-2 outline-gray-600"
                : "bg-[#AEAEAE]"
            } font-pop text-[16px] font-semibold text-center`}
            onClick={() => handleSetSize("big")}
          >
            Μεγάλο 12 €
          </button>
        </div>

        <div className="pt-[10px]">{order()}</div>
      </m.div>
    </div>
  );
}

export default Steps;
