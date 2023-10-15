import { useState, useEffect } from "react";
import MandatoryModal from "./MandatoryModal";
import Line from "../assets/Line.svg";
import { useMyContext } from "../context/UseMyContext";
import OptionLabelSide from "../components/OptionLabelSide";
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

  //vibration notification
  const VibrationActive = () => {
    if (!navigator.vibrate) return false;
    return true;
  };

  //play sound
  const play = () => {
    new Audio(mariachi).play();
  };

  const handleClick = (ingredient) => {
    if (selectedSides.includes(ingredient.title)) {
      const updatedSelectedSides = selectedSides.filter(
        (piece) => piece !== ingredient.title
      );
      setSelectedSides(updatedSelectedSides);
    } else {
      setSelectedSides([...selectedSides, ingredient.title]);
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
          currentSide.ingredients && currentSide.ingredients.length > 0
            ? currentSide.ingredients.join(", ")
            : null,
          currentSide.salsa && currentSide.salsa.length > 0
            ? currentSide.salsa.join(", ")
            : null,
          currentSide.extra && currentSide.extra.length > 0
            ? currentSide.extra.join(", ")
            : null,
        ]
          .filter((item) => item !== null) // Remove null entries
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
          {selectedSides.length > 0 ? "Ωχ!!!!" : "Ουπς !!!"}
        </h1>
      </div>
      <p
        className="text-[14px] mt-[2px] mb-[10px] text-start font-pop text-background-dark font-normal"
        style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}
      >
        {selectedSides.length > 0
          ? "Συγνώμη αλλά μπορείται να επιλέξετε μόνο ένα υλικό"
          : "Συγνώμη αλλά θα πρέπει να κάνετε τουλάχιστον μία επιλογή για να συνεχίσετε στο επόμενο βήμα."}
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
              selection={currentSide}
              handleMultiplier={handleMultiplier}
              type={"side"}
            />
          </div>
        ) : (
          content
            .filter((ingredient) => {
              if (
                currentSide.title === "Tortilla Salsas & Guacamole" &&
                ingredient.title === "Guacamole"
              ) {
                return false;
              } else {
                return true;
              }
            })
            .map((ingredient, index) => {
              return (
                <OptionLabelSide
                  key={index}
                  phase={phase}
                  ingredient={ingredient}
                  index={index + ingredient.title}
                  selectedItems={selectedSides}
                  handleClick={handleClick}
                  hasChosen={hasChosen}
                  addExtraCost={addExtraCost}
                  subExtraCost={subExtraCost}
                  handleModal={handleModal}
                  VibrationActive={VibrationActive}
                  // Pass the handleClick function as a prop
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
        {phase !== "salsa" ||
        (phase === "salsa" && currentSide.title === "Loaded Nachos") ? (
          phase !== "stuffing" ? (
            currentSide.title !== "Tortilla Chips" ? (
              <button
                className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
                onClick={() => handlePreviousStep(phase, selectedSides)}
              >
                Προηγούμενο
              </button>
            ) : null
          ) : null
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
            {currentSide.index ? "Ολοκλήρωση Επεξεργασίας" : "ΥποΒολή"}
          </button>
        ) : (
          <button
            className="w-[150px] h-[40px]  rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => {
              if (
                ((phase === "stuffing" &&
                  currentSide.title === "Loaded Nachos") ||
                  (phase === "salsa" &&
                    (currentSide.title === "Tortilla Salsas" ||
                      currentSide.title === "Tortilla Salsas & Guacamole"))) &&
                !hasChosen
              ) {
                handleModal();
                if (VibrationActive()) {
                  navigator.vibrate([80]); // Trigger vibration if VibrationActive returns true
                }
              } else {
                if (!showModal) {
                  handleNextStep(phase, selectedSides);
                }
              }
            }}
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
