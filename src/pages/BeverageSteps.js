import Stepper from "../components/Stepper";
import { softDrinks, beers, drinks } from "../helpers/menu";
import { useMyContext } from "../context/UseMyContext";
import BeverageDisplayer from "../components/BeverageDisplayer";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom"; /* 
import postJsonData from "../helpers/functionalComponents/postRequestToBack"; */
import { useState, useEffect, useRef } from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import softDrinksImage from "../assets/softDrinks.jpg";
import beersImage from "../assets/beers.jpg";
import drinksImage from "../assets/drinks.jpg";
import { useLocation } from "react-router-dom";
/* debugger; */
function Steps() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const step = parseInt(params.get("index"));
  console.log(step);
  console.log(softDrinks, beers, drinks);
  const { finalBeveragesOrder, setFinalBeveragesOrder, setCartItemCount } =
    useMyContext();
  const navigate = useNavigate();
  console.log(finalBeveragesOrder);

  const [nextPosition, setNextPosition] = useState(step);
  console.log(nextPosition);
  const scrollToTopRef = useRef(null);
  //count clicks

  const updateSelectedItems = (key, newBeveragesArray, totalLocalPrice) => {
    console.log(newBeveragesArray);
    setFinalBeveragesOrder((prevState) => ({
      ...prevState,
      [key]: newBeveragesArray,
    }));
  };
  const calculateTotalPrice = (category) => {
    const beverages = finalBeveragesOrder[category];
    let totalPrice = 0;

    for (const beverage of beverages) {
      totalPrice += beverage.price * beverage.multiplier;
    }

    return totalPrice;
  };
  console.log(calculateTotalPrice("beers"));
  const order = () => {
    if (nextPosition === 0) {
      return (
        <BeverageDisplayer
          key="softDrinks"
          phase={"softDrinks"}
          content={softDrinks}
          selectedItems={finalBeveragesOrder.softDrinks}
          updateSelectedItems={updateSelectedItems}
          handleNextStep={handleNextStep}
          message={"Διάλεξετα αναψυκτικά σου"}
          totalPrice={calculateTotalPrice("softDrinks")}
        />
      );
    } else if (nextPosition === 1) {
      console.log("trying to render the beers");
      return (
        <BeverageDisplayer
          key="beers"
          phase={"beers"}
          content={beers}
          selectedItems={finalBeveragesOrder.beers}
          updateSelectedItems={updateSelectedItems}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε τις μπύρες σου"}
          totalPrice={calculateTotalPrice("beers")}
        />
      );
    } else if (nextPosition === 2) {
      return (
        <BeverageDisplayer
          key="drinks"
          phase={"drinks"}
          content={drinks}
          selectedItems={finalBeveragesOrder.drinks}
          updateSelectedItems={updateSelectedItems}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε το ποτό σου"}
          totalPrice={calculateTotalPrice("drinks")}
        />
      );
    }
  };

  const handleNextStep = () => {
    /*  setCurrentDish({ ...currentDish, [category]: selection }); */
    setNextPosition(nextPosition + 1);
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handlePreviousStep = (category, selection) => {
    setNextPosition(nextPosition - 1);
    /* setCurrentDish({ ...currentDish, [category]: selection }); */
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
          className="w-full h-full mb-[30px] z-0 aspect-[3/2] object-cover items-center rounded-b-[30px]"
          src={
            nextPosition === 0
              ? softDrinksImage
              : nextPosition === 1
              ? beersImage
              : nextPosition === 2
              ? drinksImage
              : ""
          }
          alt=""
        />
        <Link to={"/LandingPage"}>
          <HiArrowCircleLeft
            size="35px"
            className="z-10 absolute top-[10px] left-[20px] bg-primary-regular rounded-full"
          />
        </Link>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full flex flex-col "
      >
        <div className="flex justify-center pl-[5px]">
          <Stepper nextPosition={nextPosition} stepsNumber={3} />
        </div>
        <div className="flex justify-end relative">
          <h1
            className="absolute right-[30px] top-[-40px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή:
            {parseFloat(calculateTotalPrice("softDrinks")) +
              parseFloat(calculateTotalPrice("beers")) +
              parseFloat(calculateTotalPrice("drinks"))}
            €
          </h1>
        </div>
        {/*    {currentDish.largePrice !== undefined ? (
          <div className="flex justify-between mx-[20px] gap-[20px]">
            <button
              className={`w-[150px] h-[40px] top-[5px] ml-[10px] rounded-full ${
                size === "middle"
                  ? "bg-primary-regular outline outline-2 outline-gray-600"
                  : "bg-[#AEAEAE]"
              } font-pop text-[16px] font-semibold text-center`}
              onClick={() => handleSetSize("middle")}
            >
             Μεσαίο {currentDish.middlePrice} € 
            </button>
            <button
              className={`w-[150px] h-[40px] top-[5px]  rounded-full ${
                size === "big"
                  ? "bg-primary-regular outline outline-2 outline-gray-600"
                  : "bg-[#AEAEAE]"
              } font-pop text-[16px] font-semibold text-center`}
              onClick={() => handleSetSize("big")}
            >
              Μεγάλο {currentDish.largePrice} €
            </button>
          </div>
        ) : (
          <div className="flex justify-between mx-[20px] gap-[20px]">
            <button
              className={`w-[180px] h-[40px] top-[5px] ml-[0px] rounded-full ${
                size === "middle"
                  ? "bg-primary-regular outline outline-2 outline-gray-600"
                  : "bg-[#AEAEAE]"
              } font-pop text-[16px] font-semibold text-center`}
              onClick={() => handleSetSize("middle")}
              disabled={true}
            >
              Ένα μέγεθος {currentDish.middlePrice} €
            </button>
          </div>
        )} */}

        <div className="pt-[10px]">{order()}</div>
      </m.div>
    </div>
  );
}

export default Steps;
