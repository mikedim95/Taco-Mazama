import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import Lottie from "lottie-react";
import bin from "../assets/bin.json";
import pen from "../assets/pen.json";
import Modal from "../components/Modal";
import warning from "../assets/warning.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/UseMyContext";
function ReviewLabel({
  handleMultiplier,
  selection,
  selectionPrice,
  index,
  buttonDelete,
  onDelete,
  type,
}) {
  console.log(selection);
  console.log(selectionPrice);
  const { setCurrentDishToEdit } = useMyContext();
  var content = {};
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  console.log(type);
  if (type === "dish") {
    content = {
      title: selection.title,
      subtitle: [
        selection.stuffing && selection.stuffing.length > 0
          ? selection.stuffing.join(", ")
          : null,
        selection.ingredients && selection.ingredients.length > 0
          ? selection.ingredients.join(", ")
          : null,
        selection.salsa && selection.salsa.length > 0
          ? selection.salsa.join(", ")
          : null,
        selection.extra && selection.extra.length > 0
          ? selection.extra.join(", ")
          : null,
      ]
        .filter((item) => item !== null) // Remove null entries
        .join(", "),
      multiplier: selection.multiplier,
    };
    console.log(content);
  } else if (type === "side") {
    /* content = {
      title: selection.title,
      subtitle: selection.subtitle,
      multiplier: selection.multiplier,
    }; */
  } else {
    // Θα είναι είτε μπύρα είτε ποτό είτε αναψυκτικό
    content = {
      title: selection.title,
      subtitle: selection.subtitle,
      multiplier: selection.multiplier,
    };
    console.log(content);
  }

  const handleModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    await onDelete("dish" || "side" || "beverage");
    // Show completion animation
    setTimeout(() => {
      handleCloseModal();
    }, 400);
  };

  const actionBar = (
    <div className="mb-[20px] ">
      <button
        onClick={() => {
          setTimeout(() => {
            handleCloseModal();
          }, 100);
        }}
        className="w-[80px] h-[40px] text-[14px] mr-[5px] font-pop text-[#535353] font-semibold bg-[#dadada] rounded-[40px]"
      >
        Όχι
      </button>
      <button
        onClick={handleDelete}
        className="w-[80px] h-[40px] text-[14px] font-pop text-[#f1d9f6] font-bold bg-[#e2473d] rounded-[20px]"
      >
        Ναι
      </button>
    </div>
  );

  const modal = (
    <Modal onClick={handleCloseModal} actionBar={actionBar}>
      <div className="flex flex-col justify-start items-start gap-1">
        <Lottie
          animationData={warning}
          speed={0.5}
          loop={false}
          className="w-[60px] h-[60px] mt-[-77px]"
        />
        <h1
          className="text-start font-pop font-bold text-gray-600"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.5)" }}
        >
          ΠΡΟΣΟΧΗ !!!
        </h1>
      </div>
      <p
        className="text-[16px] mt-[2px] mb-[10px] text-start font-pop text-background-dark font-normal"
        style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}
      >
        Είστε σίγουροι ότι θέλετε να το διαγράψετε από το καλάθι
      </p>
    </Modal>
  );

  return (
    <div className=" relative">
      <div className="w-auto h-auto flex flex-col rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
        <div
          className="absolute right-[10px] top-[10px] font-pop text-[13px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          <span>
            {selectionPrice !== undefined ? selectionPrice + "€" : ""}{" "}
          </span>
        </div>
        <div className="pt-[20px] pl-[10px] text-[18px] font-pop text-left font-bold text-textFont-dark">
          {content.title}
        </div>
        <div className="pl-[10px] pr-[5px] text-[14px] font-pop text-left font-normal text-textFont-dark">
          {content.subtitle}
        </div>
        <div className="pt-[50px]">
          <div className="w-[140px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
            <div className="columns-3">
              <div
                className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black"
                onClick={() =>
                  handleMultiplier(index, content.multiplier - 1, type)
                }
              >
                <CgMathMinus size="20px" />
              </div>
              <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                {content.multiplier}
              </div>
              <div
                className=" text-[18px] py-[10px] font-pop text-center font-bold text-black"
                onClick={() =>
                  handleMultiplier(index, content.multiplier + 1, type)
                }
              >
                <CgMathPlus size="20px" />
              </div>
            </div>
          </div>
          {buttonDelete && (
            <div>
              <div
                className="w-[40px] h-[40px] flex justify-center items-center  absolute bottom-0 right-0 bg-[#cc6655] rounded-tl-[20px] rounded-br-[20px]"
                onClick={handleModal}
              >
                <div className="relative">{showModal && modal}</div>
                <Lottie
                  animationData={bin}
                  speed={1}
                  loop={false}
                  className="mb-[10px]"
                />
              </div>
              {type === "dish" || type === "side" ? (
                <div className="flex justify-start align-bottom">
                  <Lottie
                    animationData={pen}
                    speed={0.2}
                    loop={false}
                    className="w-[60px] h-[60px] ml-[130px] absolute bottom-0"
                    onClick={() => {
                      if (type === "dish") {
                        setCurrentDishToEdit(index);
                        navigate(`/Steps`);
                      } else if (type === "sides") {
                        /*   navigate(`/Steps`); */
                      } else if (type === "drinks") {
                        navigate(`/BeveragesPage?index=2`);
                      } else if (type === "beers") {
                        navigate(`/BeveragesPage?index=1`);
                      } else if (type === "softDrinks") {
                        navigate(`/BeveragesPage?index=0`);
                      }
                    }}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewLabel;
