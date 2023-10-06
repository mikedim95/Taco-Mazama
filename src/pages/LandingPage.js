import taco from "../assets/logo.jpg";
import basket from "../assets/basket.svg";
import hat from "../assets/ht.svg";
import Line from "../assets/Line.svg";
import Carousel from "../components/Carousel";
import cactus from "../assets/cactus.svg";
import Sides from "../components/Sides";
import Drinks from "../components/Drinks";
import fb from "../assets/fb.svg";
import insta from "../assets/insta.svg";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import { images } from "../helpers/images";
import { motion as m } from "framer-motion";
import { useMyContext } from "../context/UseMyContext";
import { Link } from "react-router-dom";
import { sides } from "../helpers/menu";
import Fab from "@mui/material/Fab";
import Error from "@mui/icons-material/Error";
import MandatoryModal from "../components/MandatoryModal";
import bell from "../assets/bell.json";
import Lottie from "lottie-react";
import "./Cart.css";
/* import OneSignal from "react-onesignal"; */
/* import firebase from "../firebase"; */
function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const {
    cartItemCount,
    setCartItemCount,
    finalDishOrder,
    finalSidesOrder,
    finalBeveragesOrder,
  } = useMyContext();
  function triggerDelayedNotification(message, delay) {
    console.log("i got : " + message + " delay: ");
    // Send a message to the service worker to show a delayed alert notification
    navigator.serviceWorker.controller.postMessage({
      type: "SHOW_DELAYED_NOTIFICATION",
      message,
      delay,
    });
  }
  /* const [isTokenFound, setTokenFound] = useState(false);
  requestForToken(); */
  /* console.log(isTokenFound); */
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState(1);
  let totalCount = 0;
  useEffect(() => {
    /*  OneSignal.init({
      appId: "830364d1-0c13-4480-be61-fffd8ce43083",
    }); */
    const timeoutId = setTimeout(() => {
      console.log("This will be executed after 3 seconds.");
      // Your code here
    }, 3000);

    // Clean up the timeout if the component unmounts

    if (Array.isArray(finalDishOrder)) {
      finalDishOrder.forEach((item) => {
        // Assuming 'key' is the specific key you want to accumulate
        totalCount += item.multiplier;
      });
    }
    if (Array.isArray(finalSidesOrder)) {
      finalSidesOrder.forEach((item) => {
        // Assuming 'key' is the specific key you want to accumulate
        totalCount += item.multiplier;
      });
    }
    for (const category in finalBeveragesOrder) {
      if (finalBeveragesOrder.hasOwnProperty(category)) {
        // Iterate over each item in the category and add up the multipliers
        finalBeveragesOrder[category].forEach((beverage) => {
          totalCount += beverage.multiplier;
        });
      }
    }
    setCartItemCount(totalCount);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { legitIP } = useMyContext();
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
  const handleModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const actionBar = (
    <div className="mb-[20px]">
      <button
        onClick={() => {
          setTimeout(() => {
            handleCloseModal();
          }, 100);
        }}
        className="w-[80px] h-[40px] text-[14px] font-pop text-background-dark font-bold bg-[#b3b878] rounded-[40px]"
      >
        ΟΚ
      </button>
    </div>
  );

  const modal = (
    <MandatoryModal onClick={handleCloseModal} actionBar={actionBar}>
      <div className="flex flex-col justify-start items-start gap-1">
        <Lottie
          animationData={bell}
          speed={0.5}
          loop={false}
          className="w-[60px] h-[60px] mt-[-77px]"
        />
        <h1
          className="text-start font-pop font-bold text-gray-600"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.5)" }}
        >
          Προστασία IP
        </h1>
      </div>
      <p
        className="text-[14px] mt-[2px] mb-[10px] text-start font-pop text-background-dark font-normal"
        style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}
      >
        Για λόγους ασφαλείας η εφαρμογή είναι διαθέσιμη μόνο μέσω του WiFi του
        μαγαζιού.
      </p>
    </MandatoryModal>
  );
  const handleCarouselSwipe = (newPosition, eventData) => {
    setPosition(newPosition);
  };
  const onHandleTag = async () => {
    console.log("pressed");
    triggerDelayedNotification("This is a delayed notification!", 5000);
    /* setTimeout(() => {
      serviceWorkerRegistration.postMessage({ task: "Your task data here" });
    }, delayInMilliseconds); */
    /*  OneSignal.login("thatParticularUser"); */
    /* OneSignal.Slidedown.promptPush(); */
    /* OneSignal.Notifications.requestPermission(); */
  };
  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light scroll-smooth overflow-y-scroll">
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
        <Link to="/BucketPage">
          <img
            className="w-[30px] h-[30px] absolute top-[40px] right-[30px]"
            src={basket}
            alt=""
          />
        </Link>
        {cartItemCount > 0 && (
          <div className="cart-indicator  top-[30px] right-[20px]">
            {cartItemCount}
          </div>
        )}
      </div>
      <div className="w-full h-full flex flex-col ">
        <div className="pt-[130px] pl-[30px]">
          <Search onChange={handleSearch} />
          <div className="flex space-x-[-60px]">
            <img className="pl-[34px] pr-[30px] mt-[-10px]" src={Line} alt="" />
            <m.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 8,
                delay: 2,
                duration: 1,
              }}
              className="w-[43px] h-[65px] mt-[-50px] z-50 opacity-30 overflow-hidden"
              src={cactus}
              alt=""
            />
          </div>
          <p className="mt-[-2px] text-[20px] font-pop font-bold text-textFont-dark">
            Επέλεξε Γεύμα
          </p>
          <div className="mt-[-215px] ml-[-30px]">
            <Carousel
              images={images}
              position={position}
              searchTerm={searchTerm}
              onSwipe={handleCarouselSwipe}
            />
          </div>
          <p className="mt-[-10px] text-[20px] font-pop font-bold text-textFont-dark">
            Επέλεξε Συνοδευτικό
          </p>
          <div className="mt-[2px] ml-[-25px]">
            <Sides sides={sides} />
          </div>
          <p className="mt-[5px] text-[20px] font-pop font-bold text-textFont-dark">
            Επέλεξε Ποτό/Αναψυκτικό
          </p>
          <div className="mt-[5px] ml-[5px]">
            <Drinks />
          </div>
          <div className="my-[40px]">
            <img
              className="w-full flex justify-stretch ml-[-15px]"
              src={Line}
              alt=""
            />
          </div>
          {!legitIP ? (
            <Fab
              color="error"
              aria-label="add"
              /* onClick={() => handleModal()} */
              onClick={() => onHandleTag()}
              style={{ position: "fixed", bottom: "16px", right: "16px" }}
            >
              <Error />
            </Fab>
          ) : null}
          <div className="mt-[-35px] ml-[-30px]">
            <div className="flex flex-col items-center">
              <p className="text-black font-pop font-bold">Follow us in</p>
              <div className="flex flex-col-2 gap-2">
                <img
                  className="w-[20px] h-[20px] bg-black rounded-full"
                  src={fb}
                  alt=""
                />
                <a
                  href="https://www.facebook.com/people/Taco-Mazama-SKG/100075547643013/"
                  className="text-black  font-pop font-semibold text-[12px]"
                >
                  Taco Mazama SKG
                </a>
              </div>
              <div className="flex flex-col-2 gap-2">
                <img
                  className="w-[20px] h-[20px] bg-black rounded-full"
                  src={insta}
                  alt=""
                />
                <a
                  href="https://www.instagram.com/taco.mazama.skg/"
                  className="text-black  font-pop font-semibold text-[12px]"
                >
                  @taco.mazama.skg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{showModal && modal}</div>
    </div>
  );
}
export default LandingPage;
