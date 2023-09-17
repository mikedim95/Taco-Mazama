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
    cartItemCount,
    setCartItemCount,
  } = useMyContext();

  const deleteOrder = (index, type) => {
    if (type === "dish") {
      const updatedFinalDishOrder = [...finalDishOrder];
      const deletedMultiplier = updatedFinalDishOrder[index].multiplier;
      updatedFinalDishOrder.splice(index, 1);
      setFinalDishOrder(updatedFinalDishOrder);
      setCartItemCount(cartItemCount - deletedMultiplier);
    } else if (type === "side") {
      const updatedFinalSideOrder = [...finalSidesOrder];
      const deletedMultiplier = updatedFinalSideOrder[index].multiplier;
      updatedFinalSideOrder.splice(index, 1);
      setFinalSidesOrder(updatedFinalSideOrder);
      setCartItemCount(cartItemCount - deletedMultiplier);
    } else if (type === "beverage") {
      const updatedFinalBeveragesOrder = [...finalBeveragesOrder];
      updatedFinalBeveragesOrder.splice(index, 1);
      setFinalBeveragesOrder(updatedFinalBeveragesOrder);
    }
  };

  const handleDishMultipliers = (index, value) => {
    if (value > 0) {
      const updatedFinalDishOrder = [...finalDishOrder];
      const oldMultiplier = updatedFinalDishOrder[index].multiplier;
      updatedFinalDishOrder[index].multiplier = value;
      setFinalDishOrder(updatedFinalDishOrder);
      setCartItemCount(cartItemCount - oldMultiplier + value);
    }
  };
  const handleSideMultipliers = (index, value) => {
    if (value > 0) {
      const updatedFinalSideOrder = [...finalSidesOrder];
      const oldMultiplier = updatedFinalSideOrder[index].multiplier;
      updatedFinalSideOrder[index].multiplier = value;
      setFinalSidesOrder(updatedFinalSideOrder);
      setCartItemCount(cartItemCount - oldMultiplier + value);
    }
  };
  const handleBeveragesMultipliers = (index, value) => {
    if (value > 0) {
      const updatedFinalBeveragesOrder = [...finalBeveragesOrder];
      updatedFinalBeveragesOrder[index].multiplier = value;
      setFinalBeveragesOrder(updatedFinalBeveragesOrder);
    }
  };

  const dishPrice = () => {
    let price = 0;
    if (Array.isArray(finalDishOrder)) {
      finalDishOrder.forEach((dish) => {
        price += (dish.basePrice + dish.extraCosts) * dish.multiplier;
      });
    }
    return price;
  };

  const sidePrice = () => {
    let price = 0;
    if (Array.isArray(finalSidesOrder)) {
      finalSidesOrder.forEach((side) => {
        price += side.price * side.multiplier;
      });
    }
    return price;
  };

  const beveragePrice = () => {
    let price = 0;
    if (Array.isArray(finalBeveragesOrder)) {
      finalBeveragesOrder.forEach((beverage) => {
        price +=
          (beverage.basePrice + beverage.extraCosts) * beverage.multiplier;
      });
    }
    return price;
  };

  const overalPrice = dishPrice() + sidePrice() + beveragePrice();

  const renderDishOrder = Array.isArray(finalDishOrder)
    ? finalDishOrder.map((foodOrder, index) => {
        return (
          <ReviewLabel
            key={index}
            currentDish={foodOrder}
            index={index}
            handleMultiplier={handleDishMultipliers}
            buttonDelete={true}
            dishPrice={
              (foodOrder.basePrice + foodOrder.extraCosts) *
              foodOrder.multiplier
            }
            sidePrice={0}
            beveragePrice={0}
            onDelete={() => deleteOrder(index, "dish")}
          />
        );
      })
    : [];

  const renderSideOrder = Array.isArray(finalSidesOrder)
    ? finalSidesOrder.map((sideOrder, index) => {
        return (
          <ReviewLabel
            key={index}
            currentSide={sideOrder}
            index={index}
            handleMultiplier={handleSideMultipliers}
            buttonDelete={true}
            dishPrice={0}
            sidePrice={sideOrder.price * sideOrder.multiplier}
            beveragePrice={0}
            onDelete={() => deleteOrder(index, "side")}
          />
        );
      })
    : [];

  const renderBeveragesOrder = Array.isArray(finalBeveragesOrder)
    ? finalBeveragesOrder.map((beverageOrder, index) => {
        return (
          <ReviewLabel
            key={index}
            currentBeverage={beverageOrder}
            index={index}
            handleMultiplier={handleBeveragesMultipliers}
            buttonDelete={true}
            dishPrice={0}
            sidePrice={0}
            beveragePrice={
              (beverageOrder.basePrice + beverageOrder.extraCosts) *
              beverageOrder.multiplier
            }
            onDelete={() => deleteOrder(index, "beverage")}
          />
        );
      })
    : [];

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
            className="z-0 absolute top-[10px] left-[20px] bg-primary-regular rounded-full"
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
          Συνολική Τιμή: {overalPrice} €
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
