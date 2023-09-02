import { useState } from "react";

function useMultiplier() {
  const [multiplier, setMultiplier] = useState(1);

  const updateMultiplier = (operation) => {
    switch (operation) {
      case "add":
        setMultiplier((prevMultiplier) => prevMultiplier + 1);
        break;
      case "sub":
        if (multiplier > 1) {
          setMultiplier((prevMultiplier) => prevMultiplier - 1);
        }
        break;
      default:
        break;
    }
  };

  return {
    multiplier,
    updateMultiplier,
  };
}

export default useMultiplier;
