import { stepnum } from "../helpers/stepnum";
import img from "../assets/ht.svg";
import { useState } from "react";

function Steps() {
  const [hatPosition, setHatPosition] = useState(0);

  const renderedSteps = stepnum.map((stp, index) => {
    const clickNext = index === hatPosition;

    const hat = clickNext ? (
      <img src={img} alt="" className="w-full h-full" />
    ) : null;

    const circle = clickNext
      ? "outline-black bg-primary-regular "
      : "outline-textFont-dark bg-textFont-light ";

    const num = clickNext ? "text-black" : "text-textFont-dark";

    return (
      <div
        key={index}
        className={`relative  w-[50px] h-[50px] top-[-58px] rounded-full outline outline-1 ${circle}`}
      >
        <div className="absolute top-[-30px] left-[-35px]">{hat}</div>

        <h1
          className={`pt-[15px] text-[16px] font-extrabold font-pop ${num}  text-center`}
        >
          {stp.title}
        </h1>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-center px-[20px] space-x-[30px] items-center ">
        {renderedSteps}
      </div>
    </div>
  );
}

export default Steps;
