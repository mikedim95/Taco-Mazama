import { sides } from "../helpers/menu";
import { useMyContext } from "../context/UseMyContext";
// import IngredientDisplayer from "../components/IngredientDisplayer";
import { motion as m } from "framer-motion";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
// import { useNavigate } from "react-router-dom"; /*
// import postJsonData from "../helpers/functionalComponents/postRequestToBack"; */
import { useState } from "react";
import Line from "../assets/Line.svg";
// /* debugger; */

function SidesPage() {
  const { currentSide, setFinalSidesOrder } = useMyContext();

  //   const navigate = useNavigate();
  const [multiplier, setMultiplier] = useState(1);
  const handleMultiplier = multiplier;
  // const updateMultiplier = (operation) => {
  //   switch (operation) {
  //     case "add":
  //       handleMultiplier(multiplier + 1);
  //       setMultiplier(multiplier + 1);
  //       break;
  //     case "sub":
  //       if (multiplier > 1) {
  //         handleMultiplier(multiplier - 1);
  //         setMultiplier(multiplier - 1);
  //       }
  //       break;
  //   }
  // };

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
        className="justify-center items-center relative"
      >
        <img
          className="w-full h-full mb-[30px] aspect-[3/2] object-cover items-center rounded-b-[30px]"
          src={currentSide.img}
          alt=""
        />
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full flex flex-col "
      >
        <div className="flex justify-end relative">
          <h1
            className="absolute right-[30px] top-[-20px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή: {currentSide.price} €
          </h1>
          <div className="pt-[45px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div>
        </div>
        <div className=" relative">
          <div className="w-auto h-auto flex flex-col mt-[20px] rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
            <div className="pt-[10px] pl-[15px] text-[18px] font-pop text-left font-bold text-textFont-dark">
              {currentSide.title}
            </div>
            <div className="pl-[15px] pr-[10px] text-[14px] font-pop text-left font-normal text-textFont-dark">
              {currentSide.subtitle}
            </div>
            <div className="pt-[50px]">
              <div
                className="w-[140px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]"
                // onClick={() => updateMultiplier("sub")}
              >
                <div className="columns-3">
                  <div className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black">
                    <CgMathMinus size="20px" />
                  </div>
                  <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                    {multiplier}
                  </div>
                  <div className=" text-[18px] py-[10px] font-pop text-center font-bold text-black">
                    <CgMathPlus size="20px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
}

export default SidesPage;
