import React, { useContext, useEffect } from "react";
import { AppContext } from "../App.js";

const ThePointer = () => {
  const { landingValue, handleSpin, isSpinning } = useContext(AppContext);

  // Sync the number display with landingValue changes (optional, for static display only)
  useEffect(() => {
    const spinBtn = document.querySelector(".the-pointer");
    if (spinBtn) {
      if (!isSpinning && landingValue) {
        spinBtn.setAttribute("data-landed-value", landingValue);
      } else {
        spinBtn.setAttribute("data-landed-value", ""); 
      }
    }
  }, [landingValue, isSpinning]);

  return <div className="the-pointer" onClick={handleSpin}></div>;
};

export default ThePointer;
