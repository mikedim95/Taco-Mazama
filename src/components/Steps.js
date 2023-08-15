import { stepnum } from "../helpers/stepnum";

// import { useState } from "react";

function Steps() {
  // const [hatPossition, setHatPossition] = useState(0);

  // const handleHat () => {
  //   if (index === hatPossition)
  // }

  return (
    <div>
      <div className="flex flex-row justify-center px-[20px] space-x-[30px] items-center ">
        {stepnum.map((stp, index) => {
          return (
            <div
              key={index}
              className="relative w-[50px] h-[50px] top-[-58px] rounded-full bg-textFont-light outline outline-1 outline-textFont-dark"
            >
              <h1 className="pt-[15px] text-[16px] font-extrabold font-pop text-textFont-dark text-center">
                {stp.title}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Steps;
