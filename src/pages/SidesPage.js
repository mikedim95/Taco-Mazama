import { useMyContext } from "../context/UseMyContext";
import { motion as m, useAnimate, stagger } from "framer-motion";

// import postJsonData from "../helpers/functionalComponents/postRequestToBack"; */
import Line from "../assets/Line.svg";
import { useNavigate } from "react-router-dom"; /* 
import useMultiplier from "../hooks/useMultiplier"; */
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
// /* debugger; */
import ReviewLabel from "../components/ReviewLabel";
function SidesPage() {
  const {
    currentSide,
    setCurrentSide,
    setFinalSidesOrder,
    finalSidesOrder,
    setCartItemCount,
    cartItemCount,
  } = useMyContext();
  const [scope, animate] = useAnimate();

  const handleMultiplier = (index, value) => {
    if (value > 0) {
      setCurrentSide({ ...currentSide, multiplier: value });
    }
  };

  const onButtonClick = () => {
    animate([
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      [".letter", { y: 0 }, { duration: 0.000001, at: 0.5 }],
    ]);
  };

  const navigate = useNavigate();

  const finalSideSubmit = () => {
    setCartItemCount(cartItemCount + currentSide.multiplier);
    // Use the callback form of setFinalDishOrder to access the most recent state
    setFinalSidesOrder([...finalSidesOrder, currentSide]);
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
            Συνολική Τιμή: {currentSide.price * currentSide.multiplier} €
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
        <div className="columns-1 px-[20px] justify-center space-y-[10px] items-center">
          <ReviewLabel
            currentSide={currentSide}
            handleMultiplier={handleMultiplier}
          />
        </div>
        <div
          ref={scope}
          className="flex justify-end items-end mt-[20px] mr-[20px]"
        >
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={async () => {
              await onButtonClick();
              setTimeout(() => {
                finalSideSubmit();
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
        </div>
      </m.div>
    </div>
  );
}

export default SidesPage;
