import { stepnum } from "../helpers/stepnum";
import img from "../assets/ht.svg";
import { motion as m } from "framer-motion";

function Steps({ nextPosition }) {
  const renderedSteps = stepnum.map((stp, index) => {
    const clickNext = index === nextPosition;

    const hat = clickNext ? (
      <m.img
        animate={{
          y: [0, 0, -60, -60, 0],
          x: [0, 40, 60, 60, 30],
          rotate: [0, 100, 320, 390, 420],
        }}
        transition={{ ease: "easeOut", duration: 1 }}
        src={img}
        alt=""
        className="w-full h-full"
      />
    ) : null;
    const isCircleActive = clickNext || index <= nextPosition - 1;
    const circle = isCircleActive
      ? "outline-black bg-primary-regular "
      : "outline-textFont-dark bg-textFont-light ";

    const num = isCircleActive ? "text-black" : "text-textFont-dark";

    return (
      <div
        key={index}
        className={`relative  w-[40px] h-[40px] top-[-52px] rounded-full outline outline-1 ${circle}`}
      >
        <div className="absolute top-[-32px] left-[-45px]">{hat}</div>

        <h1
          className={`pt-[10px] text-[14px] font-extrabold font-pop ${num}  text-center`}
        >
          {stp.title}
        </h1>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-center px-[5px] space-x-[25px] items-center ">
        {renderedSteps}
      </div>
    </div>
  );
}

export default Steps;
