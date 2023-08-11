import cactus from "../assets/cactus.svg";
import mexican from "../assets/mexican.svg";
import circle from "../assets/circle.svg";
import taco from "../assets/taco_logo.jpg";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-dark overflow-scroll ">
      <div className="flex justify-center items-center relative">
        <div>
          <m.img
            initial={{ y: -450 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeIn", duration: 1 }}
            className="w-full h-full"
            src={mexican}
            alt=""
          />
        </div>
        <m.div
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, ease: "easeIn", duration: 0.7 }}
          className="absolute top-0 left-0"
        >
          <img className="w-full h-full" src={circle} alt="" />
        </m.div>
        <div className="absolute bottom-[-40px]">
          <m.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.7, ease: "easeOut", duration: 0.5 }}
            className="w-[90px] h-[90px] rounded-full"
            src={taco}
            alt=""
          />
        </div>
      </div>

      {/* Above Section*/}

      <div className="w-full h-full flex flex-col ">
        <div className="pt-[30px] pl-[30px]">
          <m.p
            initial={{ x: -150 }}
            animate={{ x: 0 }}
            transition={{ delay: 1.7 }}
            className="text-[26px] font-pop text-textFont-dark "
          >
            Let's Eat...
          </m.p>
        </div>
        {/* Text Let's Eat */}

        <div className="flex items-center mt-[10px] px-[30px]">
          <m.div
            initial={{ x: -450 }}
            animate={{ x: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className=" flex justify-center items-center w-full h-[60px] bg-primary-regular rounded-full"
          >
            <Link to="/LandingPage">
              <button className=" text-[24px] font-pop text-background-dark font-bold">
                Login as Guest
              </button>
            </Link>
          </m.div>
        </div>
        <div className="flex items-center mt-[20px] px-[30px]">
          <m.button
            initial={{ x: 450 }}
            animate={{ x: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="w-full h-[60px] text-[24px] font-pop text-background-dark font-bold bg-primary-regular rounded-full"
          >
            Login
          </m.button>
        </div>
        {/* 2 Login Buttons */}

        <div className="flex pt-[20px] pl-[30px]">
          <m.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="text-[16px] font-pop text-textFont-light "
          >
            Don't you have account?
          </m.p>
          <m.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 2.4,
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
            className="text-[16px] font-pop text-primary-dark ml-[5px] "
          >
            Sign Up!
          </m.p>
        </div>
        {/* Bottom Sign Up */}
        <div className="flex justify-end items-end -mt-9">
          <m.img
            initial={{ x: 100, opacity: 0, scale: 0 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotateY: [0, 360, 360, 0] }}
            transition={{ delay: 3.3, duration: 2 }}
            className="w-[85px] h-[170px]"
            src={cactus}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
