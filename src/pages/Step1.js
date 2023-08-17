import image1 from "../assets/taco_step.svg";
import Steps from "../components/Steps";
import Line from "../assets/Line.svg";
import InsideFood from "../components/InsideFood";
import { useState } from "react";

function Step1() {
  const [middleMeal, setMiddleMeal] = useState(true);
  const [bigMeal, setBigMeal] = useState(false);

  const handleBigMeal = () => {
    setBigMeal(true);
    setMiddleMeal(false);
  };

  const handleMiddleMeal = () => {
    setBigMeal(false);
    setMiddleMeal(true);
  };

  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-scroll">
      <div className="justify-center items-center relative">
        <img className="w-full h-full ml-[-2px]" src={image1} alt="" />
      </div>
      <div className="w-full h-full flex flex-col ">
        <Steps />
        <div className="flex justify-end relative">
          <h1
            className="absolute right-[30px] top-[-40px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή: 15 €
          </h1>
        </div>
        <div className="flex justify-between mx-[20px] gap-[20px]">
          <button
            className={`w-[150px] h-[40px] top-[5px] ml-[10px] rounded-full ${
              middleMeal
                ? "bg-primary-regular outline outline-2 outline-gray-600"
                : "bg-[#AEAEAE]"
            } font-pop text-[16px] font-semibold text-center`}
            onClick={handleMiddleMeal}
          >
            Μεσαίο 7 €
          </button>
          <button
            onClick={handleBigMeal}
            className={`w-[150px] h-[40px] top-[5px]  rounded-full ${
              bigMeal
                ? "bg-primary-regular outline outline-2 outline-gray-600"
                : "bg-[#AEAEAE]"
            } font-pop text-[16px] font-semibold text-center`}
          >
            Μεγάλο 12 €
          </button>
        </div>
        <div className="flex justify-start relative">
          <h1
            className="absolute top-[10px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Διάλεξε τη γέμισή σου...
          </h1>
        </div>
        <div className="pt-[45px] pl-[30px] mr-[20px]">
          <img className="w-full" src={Line} alt="" />
        </div>
        <div className="pt-[10px]">
          <InsideFood />
        </div>
        <div className="flex justify-end items-end pt-[15px]  pr-[20px] pb-[20px]">
          <button className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-[#AEAEAE] font-pop text-[16px] font-normal text-center ">
            Επόμενο Βήμα
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step1;
