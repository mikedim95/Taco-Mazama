import { useMyContext } from "../context/UseMyContext";
import { motion as m } from "framer-motion";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";

// import postJsonData from "../helpers/functionalComponents/postRequestToBack"; */
import Line from "../assets/Line.svg";
import { useNavigate } from "react-router-dom";
import useMultiplier from "../hooks/useMultiplier";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
// /* debugger; */

function SidesPage() {
  const { currentSide, setFinalSidesOrder, setCartItemCount, cartItemCount } =
    useMyContext();
  const { multiplier, updateMultiplier } = useMultiplier();

  const totalSidePrice = () => {
    if (multiplier > 1) {
      return currentSide.price * multiplier;
    } else if (multiplier < 1) {
      return currentSide.price;
    }
    return currentSide.price;
  };

  const navigate = useNavigate();

  const finalSideSubmit = () => {
    const addingLastValues = {
      ...currentSide,
      totalSidePrice,
    };
    delete addingLastValues.subtitle;
    delete addingLastValues.img;

    const temp = cartItemCount + multiplier;
    setCartItemCount(temp);

    // Use the callback form of setFinalDishOrder to access the most recent state
    setFinalSidesOrder((prevFinalSidesOrder) => {
      const updatedFinalDishOrder = [...prevFinalSidesOrder, addingLastValues];
      return updatedFinalDishOrder;
    });

    navigate("/LandingPage");
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
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full flex flex-col "
      >
        <div className="flex justify-end relative ">
          <h1
            className="absolute right-[30px] top-[-20px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή: {totalSidePrice()} €
          </h1>
          <h1
            className="absolute pt-[20px] top-[10px] left-[30px] font-pop text-[18px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνοδευτικό ...
          </h1>
          <div className="pt-[60px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div>
        </div>
        <div className=" columns-1 px-[20px] justify-center space-y-[10px] items-center relative">
          <div className="w-auto h-auto flex flex-col mt-[5px] rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
            <div className="pt-[10px] pl-[15px] text-[18px] font-pop text-left font-bold text-textFont-dark">
              {currentSide.title}
            </div>
            <div className="pl-[15px] pr-[10px] text-[14px] font-pop text-left font-normal text-textFont-dark">
              {currentSide.subtitle}
            </div>
            <div className="pt-[20px]">
              <div className="w-[140px] h-[40px] bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
                <div className="columns-3">
                  <div
                    className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black"
                    onClick={() => updateMultiplier("sub")}
                  >
                    <CgMathMinus size="20px" />
                  </div>
                  <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                    {multiplier}
                  </div>
                  <div
                    className=" text-[18px] py-[10px] font-pop text-center font-bold text-black"
                    onClick={() => updateMultiplier("add")}
                  >
                    <CgMathPlus size="20px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end mt-[20px] mr-[20px]">
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={() => finalSideSubmit()}
          >
            Υποβολή
          </button>
        </div>
      </m.div>
    </div>
  );
}

export default SidesPage;
