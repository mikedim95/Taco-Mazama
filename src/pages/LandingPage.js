import taco from "../assets/logo.jpg";
import basket from "../assets/basket.svg";
import hat from "../assets/ht.svg";
import Line from "../assets/Line.svg";
import Carousel from "../components/Carousel";
import cactus from "../assets/cactus.svg";
import Desserts from "../components/Desserts";
import Drinks from "../components/Drinks";
import fb from "../assets/fb.svg";
import insta from "../assets/insta.svg";
import Search from "../components/Search";
import { useState } from "react";
import { images } from "../helpers/images";
import { motion as m } from "framer-motion";

function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState(1);

  const handleSearch = (term) => {
    const lowercaseTerm = term.toLowerCase();
    setSearchTerm(lowercaseTerm);
    const foundIndex = images.findIndex((image) =>
      image.title.toLowerCase().includes(lowercaseTerm)
    );
    if (foundIndex !== -1) {
      setPosition(foundIndex);
    } else {
      setPosition(1);
    }
  };

  const handleCarouselSwipe = (newPosition, eventData) => {
    setPosition(newPosition);
  };

  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-scroll">
      <div className="flex justify-between relative">
        <m.img
          initial={{ x: -150, rotate: -360 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ delay: 0.3, ease: "easeOut", duration: 1 }}
          className="max-w-[60px] max-h-[60px] absolute top-[43px] left-[71px] rounded-full"
          src={taco}
          alt=""
        />
        <div>
          <m.img
            initial={{ x: -150, y: -150, rotate: -180 }}
            animate={{ x: 0, y: 0, rotate: 0 }}
            transition={{ delay: 1, ease: "easeOut", duration: 1 }}
            className="w-[140px] h-[95px] absolute top-[0px] left-[10px]"
            src={hat}
            alt=""
          />
        </div>
        <img
          className="w-[30px] h-[30px] absolute top-[60px] right-[30px]"
          src={basket}
          alt=""
        />
      </div>
      <div className="w-full h-full flex flex-col ">
        <div className="pt-[110px] pl-[30px]">
          <p className="text-[16px] font-pop font-normal text-textFont-dark">
            Food
          </p>
          <p className="mt-[-10px] text-[32px] font-pop font-bold text-textFont-dark">
            Delivery
          </p>
          <Search onChange={handleSearch} />
          <div className="flex space-x-[-60px]">
            <img className="pl-[34px] pr-[30px] mt-[-10px]" src={Line} alt="" />
            <m.img
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 8,
                delay: 1,
                duration: 3,
              }}
              className="w-[43px] h-[65px] mt-[-50px] opacity-30"
              src={cactus}
              alt=""
            />
          </div>
          <p className="mt-[20px] text-[16px] font-pop font-semibold text-textFont-dark">
            Επέλεξε Γεύμα
          </p>
          <div className="mt-[-210px] ml-[-30px]">
            <Carousel
              images={images}
              position={position}
              searchTerm={searchTerm}
              onSwipe={handleCarouselSwipe}
            />
          </div>
          <p className="mt-[-7px] text-[16px] font-pop font-semibold text-textFont-dark">
            Επέλεξε Συνοδευτικό
          </p>
          <div className="mt-[10px] ml-[-25px]">
            <Desserts />
          </div>
          <p className="mt-[7px] text-[16px] font-pop font-semibold text-textFont-dark">
            Επέλεξε Ποτό/Αναψυκτικό
          </p>
          <div className="mt-[10px] ml-[5px]">
            <Drinks />
          </div>
          <div className="mt-[30px] ml-[-30px] bg-black h-max">
            <div className="flex flex-col justify-center items-center">
              <p className="text-white font-pop font-normal">Follow us in</p>
              <div className="flex flex-col-2">
                <img className="w-[20px] h-[20px]" src={fb} alt="" />
                <a
                  href="https://www.facebook.com/people/Taco-Mazama-SKG/100075547643013/"
                  className="text-white  font-pop font-normal text-[12px]"
                >
                  Taco Mazama SKG
                </a>
              </div>
              <div className="flex flex-col-2">
                <img className="w-[20px] h-[20px]" src={insta} alt="" />
                <a
                  href="https://www.instagram.com/taco.mazama.skg/"
                  className="text-white  font-pop font-normal text-[12px]"
                >
                  @taco.mazama.skg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
