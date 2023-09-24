import clackets from "../assets/clackets.gif";
import mariachi from "../assets/mariachi.gif";
import cactus from "../assets/cactus.svg";
import Line from "../assets/Line.svg";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMyContext } from "../context/UseMyContext";
import ReviewLabel from "../components/ReviewLabel";
import postJsonData from "../helpers/functionalComponents/postRequestToBack";
import MandatoryModal from "../components/MandatoryModal";
import bell from "../assets/bell.json";
import Lottie from "lottie-react";
import { useHistory } from "react-router-dom";
function BucketPage() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [errorMesasge, setErrorMesage] = useState();
  const {
    finalDishOrder,
    setFinalDishOrder,
    finalSidesOrder,
    setFinalSidesOrder,
    finalBeveragesOrder,
    setFinalBeveragesOrder,
    cartItemCount,
    setCartItemCount,
    tableNo,
    setTotalPrice,
    totalPrice,
    publicIP,
  } = useMyContext();

  const handleModal = (errorMesasge) => {
    setShowModal(true);
    setErrorMesage(errorMesasge);
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
          Ουυπςς !!!
        </h1>
      </div>
      <p
        className="text-[14px] mt-[2px] mb-[10px] text-start font-pop text-background-dark font-normal"
        style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}
      >
        {errorMesasge}
      </p>
    </MandatoryModal>
  );
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
  const finalSubmit = async () => {
    const finalOrder = {
      tableNo: parseInt(tableNo),
      dish: finalDishOrder,
      sides: finalSidesOrder,
      beverages: finalBeveragesOrder,
      price: totalPrice,
      publicIP: publicIP,
    };

    try {
      const result = await postJsonData(finalOrder);
      console.log(result);
      history.push("/LandingPage");
    } catch (error) {
      handleModal(error.response.data);
      console.error("Error:", error.response.data);
    }
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
  setTotalPrice(overalPrice);
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
      <button
        className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
        onClick={() => {
          finalSubmit();
        }}
        // disabled={
        //   (phase === "stuffing" && !hasChosen) ||
        //   (phase === "ingredients" && !hasChosen) ||
        //   (phase === "salsa" && !hasChosen)
        // }
      >
        Υποβολή
      </button>
      <div>{showModal && modal}</div>
    </div>
  );
}

export default BucketPage;
