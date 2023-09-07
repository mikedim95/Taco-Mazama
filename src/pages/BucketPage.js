import clackets from "../assets/clackets.gif";
import mariachi from "../assets/mariachi.gif";
import cactus from "../assets/cactus.svg";
import Line from "../assets/Line.svg";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMyContext } from "../context/UseMyContext";
import ReviewLabel from "../components/ReviewLabel";
function BucketPage() {
  const {
    finalDishOrder,
    setFinalDishOrder,
    finalSidesOrder,
    setFinalSidesOrder,
    finalBeveragesOrder,
    setFinalBeveragesOrder,
  } = useMyContext();

  const handleDishMultipliers = (index, value) => {
    if (value > 0) {
      const updatedFinalDishOrder = [...finalDishOrder];
      updatedFinalDishOrder[index].multiplier = value;
      setFinalDishOrder(updatedFinalDishOrder);
    }
  };
  const handleSideMultipliers = (index, value) => {
    if (value > 0) {
      const updatedFinalSideOrder = [...finalSidesOrder];
      updatedFinalSideOrder[index].multiplier = value;
      setFinalSidesOrder(updatedFinalSideOrder);
    }
  };
  const handleBeveragesMultipliers = (index, value) => {
    if (value > 0) {
      const updatedFinalBeveragesOrder = [...finalBeveragesOrder];
      updatedFinalBeveragesOrder[index].multiplier = value;
      setFinalBeveragesOrder(updatedFinalBeveragesOrder);
    }
  };

  const renderDishOrder = finalDishOrder.map((foodOrder, index) => {
    return (
      <ReviewLabel
        key={index}
        currentDish={foodOrder}
        index={index}
        handleMultiplier={handleDishMultipliers}
        buttonDelete={true}
      />
    );
  });

  const renderSideOrder = finalSidesOrder.map((sideOrder, index) => {
    return (
      <ReviewLabel
        key={index}
        currentSide={sideOrder}
        index={index}
        handleMultiplier={handleSideMultipliers}
        buttonDelete={true}
      />
    );
  });
  const renderBeveragesOrder = finalBeveragesOrder.map(
    (beverageOrder, index) => {
      return (
        <ReviewLabel
          key={index}
          currentBeverage={beverageOrder}
          index={index}
          handleMultiplier={handleBeveragesMultipliers}
          buttonDelete={true}
        />
      );
    }
  );
  const overalPrice = () => {
    let dishPrice = 0;
    let sidePrice = 0;
    let beveragePrice = 0;

    // Check if all three arrays are defined and are arrays
    if (Array.isArray(finalDishOrder)) {
      finalDishOrder.forEach((dish) => {
        dishPrice += (dish.basePrice + dish.extraCosts) * dish.multiplier;
      });
    }

    if (Array.isArray(finalSidesOrder)) {
      finalSidesOrder.forEach((side) => {
        sidePrice += side.price * side.multiplier;
      });
    }

    if (Array.isArray(finalBeveragesOrder)) {
      finalBeveragesOrder.forEach((beverage) => {
        beveragePrice +=
          (beverage.basePrice + beverage.extraCosts) * beverage.multiplier;
      });
    }

    return dishPrice + sidePrice + beveragePrice;
  };

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
          Συνολική Τιμή: {overalPrice()} €
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
      <div className="columns-1 px-[20px] mb-[5px] justify-center space-y-[10px] items-center">
        {renderDishOrder}
        {renderSideOrder}
        {renderBeveragesOrder}
      </div>
    </div>
  );
}

export default BucketPage;
