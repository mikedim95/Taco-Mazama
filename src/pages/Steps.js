import Stepper from "../components/Stepper";
import { stuffing,ingredients,salsa } from "../helpers/menu";
import { useMyContext } from "../context/UseMyContext";
import IngredientDisplayer from "../components/IngredientDisplayer";

import { useState } from "react";
function Steps() {
  const [nextPosition, setNextPosition] = useState(0);
  const { currentDish,setCurrentDish } = useMyContext();
  const [size, setSize] = useState();
  const order = () => {
    if (nextPosition === 0) {
      return <IngredientDisplayer content={stuffing} handleNextStep={handleNextStep}/>;
    } else if (nextPosition === 1) {
      return <IngredientDisplayer content={ingredients} handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep}/>;
    } else if (nextPosition === 2) {
    return <IngredientDisplayer content={salsa} handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep}/>;
  }
    
  };
console.log(size)
  const handleSetSize = (size) => {
    setSize(size)
  };

  

  const handleNextStep = (category,selection) => {
    setCurrentDish({...currentDish,[category]:selection})
  
    setNextPosition(nextPosition + 1);
    
  };
  const handlePreviousStep = () => {
    setNextPosition(nextPosition - 1);
    console.log(nextPosition)
  };

  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-scroll">
      <div className="justify-center items-center relative">
        <img className="w-full h-full ml-[-2px]" src={currentDish.img} alt="" />
      </div>
      <div className="w-full h-full flex flex-col ">
        <Stepper nextPosition={nextPosition} />
        <div className="flex justify-end relative">
          <h1
            className="absolute right-[30px] top-[-40px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            {`Συνολική Τιμή: 15 €`}
          </h1>
        </div>
        <div className="flex justify-between mx-[20px] gap-[20px]">
          <button
            className={`w-[150px] h-[40px] top-[5px] ml-[10px] rounded-full ${
              size==='middle'
                ? "bg-primary-regular outline outline-2 outline-gray-600"
                : "bg-[#AEAEAE]"
            } font-pop text-[16px] font-semibold text-center`}
            onClick={() => handleSetSize('middle')}
          >
            Μεσαίο 7 €
          </button>
          <button
           onClick={() => handleSetSize('big')}
            className={`w-[150px] h-[40px] top-[5px]  rounded-full ${
              size==='big'
                ? "bg-primary-regular outline outline-2 outline-gray-600"
                : "bg-[#AEAEAE]"
            } font-pop text-[16px] font-semibold text-center`}
          >
            Μεγάλο 12 €
          </button>
        </div>

        <div className="pt-[10px]">{order()}</div>
        
      </div>
    </div>
  );
}

export default Steps;
