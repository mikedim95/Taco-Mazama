import clackets from "../assets/clackets.gif";
import mariachi from "../assets/mariachi.gif";
import cactus from "../assets/cactus.svg";
import Line from "../assets/Line.svg";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMyContext } from "../context/UseMyContext";
import ReviewLabel from "../components/ReviewLabel";
import postJsonData from "../helpers/functionalComponents/postRequestToBack";
import MandatoryModal from "../components/MandatoryModal";
import bell from "../assets/bell.json";
import Lottie from "lottie-react";
function BucketPage() {
  const [showModal, setShowModal] = useState(false);
  const [errorMesasge, setErrorMesage] = useState();
  const [overalPrice, setOveralPrice] = useState(0);
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
  useEffect(() => {
    const temp = dishPrice() + sidePrice() + beveragePrice();
    setOveralPrice(temp);
    setTotalPrice(temp);
  }, [finalDishOrder, finalSidesOrder, finalBeveragesOrder]);
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
      localStorage.setItem(
        "finalDishOrder",
        JSON.stringify(updatedFinalDishOrder)
      );
      setFinalDishOrder(updatedFinalDishOrder);
      setCartItemCount(cartItemCount - deletedMultiplier);
    } else if (type === "side") {
      const updatedFinalSideOrder = [...finalSidesOrder];
      const deletedMultiplier = updatedFinalSideOrder[index].multiplier;
      updatedFinalSideOrder.splice(index, 1);
      localStorage.setItem(
        "finalSidesOrder",
        JSON.stringify(updatedFinalSideOrder)
      );
      setFinalSidesOrder(updatedFinalSideOrder);
      setCartItemCount(cartItemCount - deletedMultiplier);
    } else {
      const updatedFinalBeveragesOrder = { ...finalBeveragesOrder };
      updatedFinalBeveragesOrder[type].splice(index, 1);
      localStorage.setItem(
        "finalBeveragesOrder",
        JSON.stringify(updatedFinalBeveragesOrder)
      );
      setFinalBeveragesOrder(updatedFinalBeveragesOrder);
    }
  };

  const handleMultiplier = (index, value, type) => {
    if (type === "dish") {
      if (value > 0) {
        const updatedFinalDishOrder = [...finalDishOrder];
        const oldMultiplier = updatedFinalDishOrder[index].multiplier;
        updatedFinalDishOrder[index].multiplier = value;
        localStorage.setItem(
          "finalDishOrder",
          JSON.stringify(updatedFinalDishOrder)
        );
        setFinalDishOrder(updatedFinalDishOrder);
        setCartItemCount(cartItemCount - oldMultiplier + value);
      }
    } else if (type === "side") {
      if (value > 0) {
        const updatedFinalSideOrder = [...finalSidesOrder];
        const oldMultiplier = updatedFinalSideOrder[index].multiplier;
        updatedFinalSideOrder[index].multiplier = value;
        setFinalSidesOrder(updatedFinalSideOrder);
        setCartItemCount(cartItemCount - oldMultiplier + value);
      }
    } else {
      if (value > 0) {
        const updatedFinalBeveragesOrder = { ...finalBeveragesOrder };

        updatedFinalBeveragesOrder[type][index].multiplier = value;

        setFinalBeveragesOrder(updatedFinalBeveragesOrder);
      }
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
      localStorage.removeItem("finalDishOrder");
      localStorage.removeItem("finalSidesOrder");
      localStorage.removeItem("finalBeveragesOrder");
    } catch (error) {
      handleModal(error.response.data);
    }
  };
  const beveragePrice = () => {
    let price = 0;
    if (Array.isArray(finalBeveragesOrder.beers)) {
      finalBeveragesOrder.beers.forEach((beverage) => {
        price += beverage.price * beverage.multiplier;
      });
    }
    if (Array.isArray(finalBeveragesOrder.drinks)) {
      finalBeveragesOrder.drinks.forEach((beverage) => {
        price += beverage.price * beverage.multiplier;
      });
    }
    if (Array.isArray(finalBeveragesOrder.softDrinks)) {
      finalBeveragesOrder.softDrinks.forEach((beverage) => {
        price += beverage.price * beverage.multiplier;
      });
    }
    return price;
  };

  const renderOrder = (order, type) =>
    Array.isArray(order)
      ? order.map((selection, index) => {
          return (
            <ReviewLabel
              key={index}
              selection={selection}
              index={index}
              handleMultiplier={handleMultiplier}
              buttonDelete={true}
              type={type}
              selectionPrice={
                selection.basePrice
                  ? (selection.basePrice + selection.extraCosts) *
                    selection.multiplier
                  : selection.price * selection.multiplier
              }
              sidePrice={0}
              beveragePrice={0}
              onDelete={() => deleteOrder(index, type)}
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
      {finalDishOrder.length > 0 ? (
        <div>
          <div className="flex justify-start relative ">
            <h1
              className="absolute top-[30px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
              style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
            >
              Για πρώτο πιάτο ...
            </h1>
          </div>
          <div className="pt-[65px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div>
          <div className="columns-1 px-[20px] mb-[5px] justify-center space-y-[10px] items-center">
            {renderOrder(finalDishOrder, "dish")}
          </div>
        </div>
      ) : null}
      {finalSidesOrder.length > 0 ? (
        <div>
          <div className="flex justify-start relative ">
            <h1
              className="absolute top-[30px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
              style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
            >
              Για συνοδευτικό ...
            </h1>
          </div>
          <div className="pt-[65px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div>
          <div className="columns-1 px-[20px] mb-[5px] justify-center space-y-[10px] items-center">
            {renderOrder(finalSidesOrder, "side")}
          </div>
        </div>
      ) : null}{" "}
      {finalBeveragesOrder.beers.length > 0 ? (
        <div>
          <div className="flex justify-start relative ">
            <h1
              className="absolute top-[30px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
              style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
            >
              Για μπύρες ...
            </h1>
          </div>
          <div className="pt-[65px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div>
          <div className="columns-1 px-[20px] mb-[5px] justify-center space-y-[10px] items-center">
            {renderOrder(finalBeveragesOrder.beers, "beers")}
          </div>
        </div>
      ) : null}{" "}
      {finalBeveragesOrder.softDrinks.length > 0 ? (
        <div>
          <div className="flex justify-start relative ">
            <h1
              className="absolute top-[30px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
              style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
            >
              Για αναψυκτικά ...
            </h1>
          </div>
          <div className="pt-[65px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div>
          <div className="columns-1 px-[20px] mb-[5px] justify-center space-y-[10px] items-center">
            {renderOrder(finalBeveragesOrder.softDrinks, "softDrinks")}
          </div>
        </div>
      ) : null}{" "}
      {finalBeveragesOrder.drinks.length > 0 ? (
        <div>
          <div className="flex justify-start relative ">
            <h1
              className="absolute top-[30px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
              style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
            >
              Για ποτά ...
            </h1>
          </div>
          <div className="pt-[65px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div>
          <div className="columns-1 px-[20px] mb-[5px] justify-center space-y-[10px] items-center">
            {renderOrder(finalBeveragesOrder.drinks, "drinks")}
          </div>
        </div>
      ) : null}
      {finalBeveragesOrder.beers.length !== 0 ||
      finalBeveragesOrder.drinks.length !== 0 ||
      finalBeveragesOrder.softDrinks.length !== 0 ||
      finalDishOrder.length !== 0 ||
      finalSidesOrder.length !== 0 ? (
        <button
          className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
          onClick={() => {
            finalSubmit();
          }}
        >
          Υποβολή
        </button>
      ) : null}
      <div>{showModal && modal}</div>
    </div>
  );
}
export default BucketPage;
