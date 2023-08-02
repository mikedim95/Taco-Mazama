import { motion } from "framer-motion";
import { useState } from "react";
import "./Carousel.css";
import { images } from "../helpers/images";
import { useSwipeable } from "react-swipeable";

function Carousel() {
  const [position, setPosition] = useState(1);

  const handleSwipe = (eventData) => {
    if (eventData.dir === "Right") {
      if (position > 0) {
        setPosition(position - 1);
      }
    } else if (eventData.dir === "Left") {
      if (position < images.length - 1) {
        setPosition(position + 1);
      }
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers} className="App">
      <div className="row">
        {images.map((url, index) => {
          return (
            <motion.div
              className="container"
              key={index}
              initial={{ scale: 0, rotation: -180 }}
              animate={{
                rotate: 0,
                left: `${(index - position) * 180 - 90}px`,
                scale: index === position ? 1.05 : 0.88,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div
                className="text-[16px] font-semibold font-pop text-white"
                style={{ textShadow: "0 0 3px rgba(0, 0, 0, 1)" }}
              >
                <h1 className="price">
                  {index === position && images[position].price}
                </h1>
              </div>
              <div
                className="text-[20px] font-semibold font-pop text-white"
                style={{ textShadow: "0 0 3px rgba(0, 0, 0, 1)" }}
              >
                <h1 className="title">
                  {index === position && images[position].title}
                </h1>
              </div>
              <div
                className="text-[16px] font-medium font-pop text-white"
                style={{ textShadow: "0 0 3px rgba(0, 0, 0, 1)" }}
              >
                <p className="subtitle">
                  {index === position && images[position].subtitle}
                </p>
              </div>
              <img src={url.img} alt=""></img>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
