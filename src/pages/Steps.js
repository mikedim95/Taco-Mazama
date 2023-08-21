import Stepper from "../components/Stepper";
import { useMyContext } from "../context/UseMyContext";
import InsideFood from "../components/InsideFood";
import IngredientsPick from "../components/IngredientsPick";
import { useState } from "react";
function Steps() {
  const [middleMeal, setMiddleMeal] = useState(true);
  const [bigMeal, setBigMeal] = useState(false);
  const [nextPosition, setNextPosition] = useState(0);
  const { currentDish } = useMyContext();
  const [size, setSize] = useState();
  const order = () => {
    if (nextPosition === 0) {
      return <InsideFood />;
    } else if (nextPosition === 1) {
      return <IngredientsPick />;
    }
    return null;
  };
console.log(size)
  const handleSetSize = (size) => {
    setSize(size)
  };

  

  const handleNextStep = () => {
    setNextPosition(nextPosition + 1);
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
        <div className="flex justify-between space-x-[10px] items-end pt-[15px]  px-[20px] pb-[20px]">
          <button className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center ">
            Προηγούμενο
          </button>
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={handleNextStep}
          >
            Επόμενο
          </button>
        </div>
      </div>
    </div>
  );
}

export default Steps;
