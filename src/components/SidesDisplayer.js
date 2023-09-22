import { useState, useEffect } from "react";
import MandatoryModal from "./MandatoryModal";
import Line from "../assets/Line.svg";
import { useMyContext } from "../context/UseMyContext";
import OptionLabel from "../components/OptionLabel";
import ReviewLabel from "../components/ReviewLabel";
import mariachi from "../assets/mariachi.wav";
import bell from "../assets/bell.json";
import Lottie from "lottie-react";
import { motion as m } from "framer-motion";

function SidesDisplayer({
  phase,
  content,
  handleNextStep,
  handlePreviousStep,
  message,
  messageSub,
  finalSubmit,
  firstButtonPosition,
  handleMultiplier,
  addExtraCost,
  subExtraCost,
}) {
  const { currentSide } = useMyContext();

  const [selectedSides, setSelectedSides] = useState([]);
  const [hasChosen, setHasChosen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Populate selectedItems with currentDish.stuffing when component mounts
    setSelectedSides(currentSide[phase] || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selectedSides.length === 0) {
      setHasChosen(false);
    } else {
      setHasChosen(true);
    }
  }, [selectedSides]);

  console.log("selectedSides:", selectedSides);
  //vibration notification
  const VibrationActive = () => {
    if (!navigator.vibrate) return false;
    return true;
  };

  //play sound
  const play = () => {
    new Audio(mariachi).play();
  };

  const handleClick = (sidesIngredient) => {
    if (selectedSides.includes(sidesIngredient.title)) {
      const updatedSelectedSides = selectedSides.filter(
        (piece) => piece !== sidesIngredient.title
      );
      setSelectedSides(updatedSelectedSides);
    } else {
      setSelectedSides([...selectedSides, sidesIngredient.title]);
    }
  };

  if (finalSubmit) {
    content = [
      {
        title: currentSide.title,
        subtitle: [
          currentSide.stuffing && currentSide.stuffing.length > 0
            ? currentSide.stuffing.join(", ")
            : null,
          currentSide.ingredient && currentSide.ingredient.length > 0
            ? currentSide.ingredient.join(", ")
            : null,
          currentSide.salsa && currentSide.salsa.length > 0
            ? currentSide.salsa.join(", ")
            : null,
          currentSide.extra && currentSide.extra.length > 0
            ? currentSide.extra.join(", ")
            : null,
        ]
          .filter((piece) => piece !== null) // Remove null entries
          .join(", "),
      },
    ];
  }

  const handleModal = () => {
    setShowModal(true);
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
        Συγνώμη αλλα θα πρέπει να κάνετε τουλάχιστον μία επιλογή για να
        συνεχίσεται στο επόμενο βήμα.
      </p>
    </MandatoryModal>
  );

  return (
    <>
      <div className="flex justify-start relative ">
        <h1
          className="absolute top-[5px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          {message}
          <div
            className="absolute top-[25px] mr-[-100px] left-[5px] font-pop text-[10px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            {messageSub}
          </div>
        </h1>
      </div>
      <div className="pt-[45px] pl-[30px] mr-[20px]">
        <img className="w-full" src={Line} alt="" />
      </div>
      <div className="columns-1 px-[20px] justify-center space-y-[10px] items-center">
        {finalSubmit ? (
          <div>
            <ReviewLabel
              currentSide={currentSide}
              handleMultiplier={handleMultiplier}
            />
          </div>
        ) : (
          content
            .filter((sidesIngredient) => {
              if (sidesIngredient.extraPrice) {
                return false;
              }
              if (
                sidesIngredient.title === "Guacamole" ||
                sidesIngredient.title === "Chorizo" ||
                sidesIngredient.title === "Jalapenos" ||
                phase === "stuffing" ||
                phase === "salsa"
              ) {
                return true;
              }
              return false;
            })
            .map((sidesIngredient, index) => {
              console.log("sidesIngredient", sidesIngredient);

              return (
                <OptionLabel
                  key={index}
                  phase={phase}
                  sidesIngredient={sidesIngredient}
                  index={index + sidesIngredient.title}
                  selectedSides={selectedSides}
                  handleClick={handleClick}
                  hasChosen={hasChosen}
                  addExtraCost={addExtraCost}
                  subExtraCost={subExtraCost} // Pass the handleClick function as a prop
                />
              );
            })
        )}
      </div>
      <div
        className={`pt-[15px] pb-[20px] ${
          firstButtonPosition
            ? "flex justify-end items-end pr-[20px]"
            : "px-[20px] flex justify-between space-x-[10px] items-end"
        } `}
      >
        {phase !== "salsa" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => handlePreviousStep(phase, selectedSides)}
          >
            Προηγούμενο
          </button>
        ) : null}

        {phase === "review" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={() => {
              finalSubmit();
              if (VibrationActive()) {
                navigator.vibrate([1000, 50, 1000]); // Trigger vibration if VibrationActive returns true
              }
              play();
            }}
          >
            Υποβολή
          </button>
        ) : (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => {
              if (
                (phase === "stuffing" && !hasChosen) ||
                (phase === "ingredients" && !hasChosen) ||
                (phase === "salsa" && !hasChosen)
              ) {
                handleModal();
              } else handleNextStep(phase, selectedSides);
            }}
            // disabled={
            //   (phase === "stuffing" && !hasChosen) ||
            //   (phase === "ingredients" && !hasChosen) ||
            //   (phase === "salsa" && !hasChosen)
            // }
          >
            <div>{showModal && modal}</div>
            Επόμενο
          </button>
        )}
      </div>
    </>
  );
}

export default SidesDisplayer;