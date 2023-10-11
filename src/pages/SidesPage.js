import { useMyContext } from "../context/UseMyContext";
import { motion as m } from "framer-motion";
import SidesDisplayer from "../components/SidesDisplayer";
import { useState, useRef, useEffect } from "react";
import { stuffing, ingredients, salsa, extra } from "../helpers/menu";
import Stepper from "../components/Stepper";

// import postJsonData from "../helpers/functionalComponents/postRequestToBack"; */
import Line from "../assets/Line.svg";
import { useNavigate } from "react-router-dom"; /* 
import useMultiplier from "../hooks/useMultiplier"; */
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
// import ReviewLabel from "../components/ReviewLabel";

function SidesPage() {
  const {
    currentSide,
    setCurrentSide,
    setFinalSidesOrder,
    finalSidesOrder,
    setCartItemCount,
    cartItemCount,
  } = useMyContext();

  const [nextPosition, setNextPosition] = useState(0);
  const scrollToTopRef = useRef(null);
  const [extraCosts, setExtraCosts] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const [extraNachos] = useState([
    ...ingredients.filter(
      (item) => item.title === "Jalapenos" || item.title === "Sour Cream"
    ),
    ...extra
      .filter((item) => item.title === "Guacamole" || item.title === "Chorizo")
      .map((item) =>
        item.title === "Guacamole" ? { ...item, extraPrice: 0 } : item
      ),
  ]);

  const [extraSalsa] = useState([
    ...salsa,
    ...ingredients.filter((item) => item.title === "Sour Cream"),
    ...extra.filter((item) => item.title === "Guacamole"),
  ]);

  const [extraDip] = useState([
    ...salsa.map((item) => ({
      ...item,
      extraPrice: 1.5,
    })),
    ...ingredients
      .filter((item) => item.title === "Sour Cream")
      .map((item) => ({
        ...item,
        extraPrice: 1.5,
      })),
    ...extra
      .filter((item) => item.title === "Guacamole")
      .map((item) => ({
        ...item,
        extraPrice: 1.5,
      })),
  ]);
  const order = () => {
    if (nextPosition === 0 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="stuffing"
          phase={"stuffing"}
          content={stuffing}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Διάλεξε γέμιση"}
          messageSub={"*Θα πρέπει να επιλέξτε 1 υλικό υποχρεωτικά"}
          firstButtonPosition
        />
      );
    } else if (nextPosition === 0 && currentSide.title === "Tortilla Chips") {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δεν περιέχουν γέμιση"}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
          firstButtonPosition
        />
      );
    } else if (
      nextPosition === 0 &&
      currentSide.title === "Tortilla Salsas & Guacamole"
    ) {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={extraSalsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          messageSub={"*Θα πρέπει να επιλέξτε 1 υλικό υποχρεωτικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
        />
      );
    } else if (nextPosition === 0 && currentSide.title === "Dips") {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={extraDip}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
        />
      );
    } else if (nextPosition === 0) {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
        />
      );
    } else if (nextPosition === 0 && currentSide.title === "Tortilla Salsas") {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          messageSub={"*Θα πρέπει να επιλέξτε 1 υλικό υποχρεωτικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
        />
      );
    } else if (nextPosition === 1 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
        />
      );
    } else if (nextPosition === 1 && currentSide.title === "Nachos") {
      return (
        <SidesDisplayer
          key="extra"
          phase={"extra"}
          content={extraNachos}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Extra Υλικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
        />
      );
    } else if (nextPosition === 1) {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
        />
      );
    } else if (nextPosition === 2 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="extra"
          phase={"extra"}
          content={extraNachos}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Extra Υλικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
        />
      );
    } else if (nextPosition === 2 && currentSide.title === "Nachos") {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
        />
      );
    } else if (nextPosition === 3 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
        />
      );
    } else if (
      nextPosition === 2 &&
      currentSide.title === "Tortilla Salsas & Guacamole"
    ) {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
        />
      );
    }
  };

  useEffect(() => {
    setCurrentSide({ ...currentSide, multiplier: multiplier });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextStep = (category, selection) => {
    setCurrentSide({ ...currentSide, [category]: selection });
    setNextPosition(nextPosition + 1);
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviousStep = (category, selection) => {
    setNextPosition(nextPosition - 1);
    setCurrentSide({ ...currentSide, [category]: selection });
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const addExtraCost = (value) => {
    setExtraCosts(extraCosts + value);
  };
  const subExtraCost = (value) => {
    setExtraCosts(extraCosts - value);
  };

  const handleMultiplier = (index, value) => {
    if (value > 0) {
      setMultiplier(value);
      setCurrentSide({ ...currentSide, multiplier: value });
    }
  };

  const navigate = useNavigate();

  const finalSubmit = () => {
    const addingLastValues = {
      ...currentSide,
      multiplier: multiplier,
      extraCosts: extraCosts,
    };
    delete addingLastValues.img;
    delete addingLastValues.subtitle;
    delete addingLastValues.extraPrice;

    setCartItemCount(cartItemCount + currentSide.multiplier);
    // Use the callback form of setFinalDishOrder to access the most recent state
    setFinalSidesOrder([...finalSidesOrder, currentSide]);
    navigate("/LandingPage");
  };
  console.log("ti fernei final", finalSidesOrder);
  const initialImage = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%" },
  };

  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-y-scroll">
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
          src={currentSide.img}
          alt=""
        />
        <Link to={"/LandingPage"}>
          <HiArrowCircleLeft
            size="35px"
            className="z-10 absolute top-[10px] left-[20px] bg-primary-regular rounded-full"
          />
        </Link>
        <div
          className="z-30 p-1 mx-[20px] my-[-10px] absolute top-[90px] left-[20px] right-[20px] rounded-[20px] font-pop italic text-[14px] font-normal backdrop-blur-xl text-center text-white outline-textFont-dark outline outline-[0.2px]"
          style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)" }}
        >
          {currentSide.subtitle}
        </div>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full flex flex-col "
      >
        <div className="flex justify-center pl-[5px]">
          <Stepper nextPosition={nextPosition} />
        </div>
        <div className="flex justify-end relative ">
          <h1
            className="absolute right-[30px] top-[-20px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή: {(currentSide.price + extraCosts) * multiplier} €
          </h1>
          {/* <h1
            className="absolute pt-[20px] top-[10px] left-[30px] font-pop text-[18px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνοδευτικό ...
          </h1>
          <div className="pt-[60px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div> */}
        </div>
        <div className="columns-1 justify-center space-y-[10px] items-center">
          {/* <ReviewLabel
            currentSide={currentSide}
            handleMultiplier={handleMultiplier}
          /> */}
          <div className="pt-[20px]">{order()}</div>
        </div>
        {/* <div
          ref={scope}
          className="flex justify-end items-end mt-[20px] mr-[20px]"
        >
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={async () => {
              await onButtonClick();
              setTimeout(() => {
                finalSubmit();
              }, 500);
            }}
          >
            <span className="sr-only">Motion</span>
            <span
              className="h-8 overflow-hidden flex items-center justify-center"
              aria-hidden
            >
              {["Υ", "π", "ο", "β", "ο", "λ", "ή"].map((letter, index) => (
                <span
                  data-letter={letter}
                  className="letter inline-block relative h-8 leading-8 after:h-8 after:absolute after:left-0 after:top-full after:content-[attr(data-letter)]"
                  key={`${letter}-${index}`}
                >
                  {letter}
                </span>
              ))}
            </span>
          </button>
        </div> */}
      </m.div>
    </div>
  );
}

export default SidesPage;
