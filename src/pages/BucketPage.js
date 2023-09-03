import clackets from "../assets/clackets.gif";
import mariachi from "../assets/mariachi.gif";
import cactus from "../assets/cactus.svg";
import Line from "../assets/Line.svg";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMyContext } from "../context/UseMyContext";
import useMultiplier from "../hooks/useMultiplier";

function BucketPage() {
  const { finalDishOrder, finalSidesOrder } = useMyContext();
  const { multiplier, updateMultiplier } = useMultiplier();
  console.log(finalDishOrder);
  console.log(finalSidesOrder);

  const renderDishOrder = finalDishOrder.map((foodOrder, index) => {
    return (
      <div
        key={index}
        className="columns-1 px-[20px] justify-center space-y-[10px] items-center"
      >
        <div className=" relative">
          <div className="w-auto h-auto flex flex-col rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
            <div className="pt-[20px] pl-[10px] text-[18px] font-pop text-left font-bold text-textFont-dark">
              {foodOrder.title}
            </div>
            <div className="pl-[10px] pr-[5px] text-[14px] font-pop text-left font-normal text-textFont-dark">
              {[
                foodOrder.stuffing && foodOrder.stuffing.length > 0
                  ? foodOrder.stuffing.join(", ")
                  : null,
                foodOrder.ingredients && foodOrder.ingredients.length > 0
                  ? foodOrder.ingredients.join(", ")
                  : null,
                foodOrder.salsa && foodOrder.salsa.length > 0
                  ? foodOrder.salsa.join(", ")
                  : null,
                foodOrder.extra && foodOrder.extra.length > 0
                  ? foodOrder.extra.join(", ")
                  : null,
              ]
                .filter((item) => item !== null)
                .join(", ")}
            </div>
            <div className="pt-[50px]">
              <div className="w-[140px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
                <div className="columns-3">
                  <div
                    className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black"
                    onClick={() => updateMultiplier("sub")}
                  >
                    <CgMathMinus size="20px" />
                  </div>
                  <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                    {multiplier}
                  </div>
                  <div
                    className=" text-[18px] py-[10px] font-pop text-center font-bold text-black"
                    onClick={() => updateMultiplier("add")}
                  >
                    <CgMathPlus size="20px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const renderSideOrder = finalSidesOrder.map((sideOrder, index) => {
    return (
      <div
        key={index}
        className="columns-1 px-[20px] justify-center space-y-[10px] items-center"
      >
        <div className=" relative">
          <div className="w-auto h-auto flex flex-col rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
            <div className="pt-[20px] pl-[10px] text-[18px] font-pop text-left font-bold text-textFont-dark">
              {sideOrder.title}
            </div>
            <div className="pl-[10px] pr-[5px] text-[14px] font-pop text-left font-normal text-textFont-dark">
              {/* {[
                sideOrder.stuffing && sideOrder.stuffing.length > 0
                  ? sideOrder.stuffing.join(", ")
                  : null,
                sideOrder.ingredients && sideOrder.ingredients.length > 0
                  ? sideOrder.ingredients.join(", ")
                  : null,
                sideOrder.salsa && sideOrder.salsa.length > 0
                  ? sideOrder.salsa.join(", ")
                  : null,
                sideOrder.extra && sideOrder.extra.length > 0
                  ? sideOrder.extra.join(", ")
                  : null,
              ]
                .filter((item) => item !== null)
                .join(", ")} */}
            </div>
            <div className="pt-[50px]">
              <div className="w-[140px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
                <div className="columns-3">
                  <div
                    className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black"
                    onClick={() => updateMultiplier("sub")}
                  >
                    <CgMathMinus size="20px" />
                  </div>
                  <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                    {multiplier}
                  </div>
                  <div
                    className=" text-[18px] py-[10px] font-pop text-center font-bold text-black"
                    onClick={() => updateMultiplier("add")}
                  >
                    <CgMathPlus size="20px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-y-scroll">
      <div className="justify-center items-center relative">
        <img
          src={mariachi}
          alt=""
          className="mix-blend-darken w-full h-full mb-[30px] z-0 aspect-[3/2] object-cover shadow-[1px_4px_6px_rgba(0,0,0,0.4)] items-center rounded-b-[30px]"
        />
        <Link to={"/LandingPage"}>
          <HiArrowCircleLeft
            size="35px"
            className="z-10 absolute top-[10px] left-[20px] bg-primary-regular rounded-full"
          />
        </Link>
        <img
          src={clackets}
          alt=""
          className="mix-blend-darken w-[100px] h-[100px] -rotate-[40deg] absolute top-[135px]"
        />
        <img
          src={cactus}
          alt=""
          className="mix-blend-multiply w-[70px] h-[70px] absolute top-[30px] right-[30px]"
        />
        <img
          src={cactus}
          alt=""
          className="mix-blend-multiply w-[100px] h-[100px] absolute top-[90px] right-[-10px]"
        />
        <img
          src={cactus}
          alt=""
          className="mix-blend-multiply w-[40px] h-[40px] absolute top-[10px] right-[4px]"
        />
      </div>
      <div className="flex justify-end relative">
        <h1
          className="absolute right-[30px] top-[-20px] font-pop text-[20px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          Συνολική Τιμή: {finalSidesOrder.totalSidePrice}€
        </h1>
      </div>
      <div className="flex justify-start relative ">
        <h1
          className="absolute top-[30px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          Η Παραγγελία σου ...
        </h1>
      </div>
      <div className="pt-[65px] pl-[30px] mr-[20px]">
        <img className="w-full" src={Line} alt="" />
      </div>
      {renderDishOrder}
      {renderSideOrder}
    </div>
  );
}

export default BucketPage;
