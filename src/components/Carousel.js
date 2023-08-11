import { motion } from "framer-motion";
import "./Carousel.css";
import { useSwipeable } from "react-swipeable";

function Carousel({ images, position, searchTerm, onSwipe }) {
  const handleSwipe = (eventData) => {
    if (eventData.dir === "Right" && position > 0) {
      onSwipe(position - 1, eventData);
    } else if (eventData.dir === "Left" && position < images.length - 1) {
      onSwipe(position + 1, eventData);
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
                stiffness: 400,
                damping: 18,
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
