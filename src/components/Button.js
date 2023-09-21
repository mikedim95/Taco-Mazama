import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Lottie from "lottie-react";
import nicetick from "../assets/nicetick.json";

function Button({ content }) {
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();
  const [showText, setShowText] = useState(true);
  const [animationsComplete, setAnimationsComplete] = useState(false);

  const handleClick = async () => {
    setIsClicked(!isClicked);

    // Animation 1: Increase width to 240px and scale down
    await controls.start({
      width: 240,
      scale: 1.2,
      transition: { duration: 0.5 },
    });
    setShowText(false);
    await controls.start({
      backgroundColor: "#3fdd3e", // Change to your desired color
      width: 0,
      scale: 0,
      transition: { duration: 0.6 },
    });

    // Animation 3: Hide text

    setAnimationsComplete(true);

    // Set animationsComplete to true when all animations are finished
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <motion.button
          className={`w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-[#ABCF48] text-black font-pop text-[16px] font-normal text-center ${
            isClicked ? "scale-button" : ""
          }`}
          onClick={handleClick}
          animate={controls}
          aria-label={content}
        >
          {showText && content}
        </motion.button>
        {animationsComplete && (
          <Lottie
            animationData={nicetick} // Replace 'bell' with 'nicetick'
            speed={0.5}
            loop={false}
            className="w-[60px] h-[60px] ml-[-30px] absolute top-0 left-0"
          />
        )}
      </div>
    </div>
  );
}

export default Button;
