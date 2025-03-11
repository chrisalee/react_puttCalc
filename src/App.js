import { createContext, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "react-modal";
import UserOptions from "./components/UserOptions";
import Wheel from "./components/Wheel";
import data from "./data";
import Settings from "./components/Settings";

export const AppContext = createContext();

function App() {
  const [handicap, setHandicap] = useState("pro");
  const [distance, setDistance] = useState(8);
  const [dataDistance, setDataDistance] = useState([]);
  const [landingValue, setLandingValue] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const distanceRef = useRef(distance);
  const handicapRef = useRef(handicap);
  const dataDistanceRef = useRef(dataDistance);

  const [colorPutt1, setColorPutt1] = useState("#0e9ef1");
  const [colorPutt2, setColorPutt2] = useState("#0ba245");
  const [colorPutt3, setColorPutt3] = useState("#e42121");

  Modal.setAppElement("#root");
  // let subtitle;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const afterModalOpen = () => {
    console.log("adjust settings");
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSpin = () => {
    if (isSpinning) return; // Prevent multiple spins while spinning
    setIsSpinning(true);
    setLandingValue(null); // Reset landing value before spinning

    const wheel = document.querySelector(".wheel");
    if (!wheel) return;

    const randomSpins = Math.floor(Math.random() * 3600) + 3600;
    wheel.style.transform = `rotate(${randomSpins}deg)`;
    wheel.style.transition = "transform 5s ease-in-out";

    const handleTransitionEnd = () => {
      // Get the final computed transform to account for any applied rotations
      const computedStyle = window.getComputedStyle(wheel);
      const transformValue =
        computedStyle.transform || computedStyle.webkitTransform;
      let finalRotation = 0;

      if (transformValue && transformValue !== "none") {
        const match = transformValue.match(/rotate\(([\d.-]+)deg\)/);
        if (match) {
          finalRotation = parseFloat(match[1]);
          finalRotation = ((finalRotation % 360) + 360) % 360;
        }
      }

      const totalSegments = dataDistance.length;
      const degreesPerSegment = 360 / totalSegments;

      const offset = 0;
      const adjustedRotation = (360 - finalRotation + offset) % 360;
      const landingSegment =
        Math.floor(adjustedRotation / degreesPerSegment) % totalSegments;

      // Additional debugging logs to track potential issues
      // console.log("Raw Final Rotation (before normalization):", parseFloat(match[1]));
      console.log("Normalized Final Rotation:", finalRotation);
      console.log("Adjusted Rotation:", adjustedRotation);
      console.log("Degrees Per Segment:", degreesPerSegment);
      console.log("Landing Segment Index:", landingSegment);
      console.log("Landing Value:", dataDistance[landingSegment]);
      console.log(
        "Pointer Points To (Visually):",
        dataDistance[landingSegment]
      ); // Compare with visual inspection

      setLandingValue(dataDistance[landingSegment]);
      setIsSpinning(false);

      wheel.removeEventListener("transitionend", handleTransitionEnd);
    };

    wheel.addEventListener("transitionend", handleTransitionEnd);
  };

  const handleShuffle = useCallback(() => {
    const wheelArr = [];
    for (let i = 0; i < data[handicap][distance].onePutt; i++) {
      wheelArr.push(1);
    }
    for (let i = 0; i < data[handicap][distance].twoPutt; i++) {
      wheelArr.push(2);
    }
    for (let i = 0; i < data[handicap][distance].threePutt; i++) {
      wheelArr.push(3);
    }

    for (let i = wheelArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wheelArr[i], wheelArr[j]] = [wheelArr[j], wheelArr[i]];
    }

    setDataDistance(wheelArr);
    setLandingValue(null);
  }, [handicap, distance]);

  useEffect(() => {
    handicapRef.current = handicap;
    distanceRef.current = distance;
    const wheelArr = [];
    const generateWheel = () => {
      for (
        let i = 0;
        i < data[handicapRef.current][distanceRef.current].onePutt;
        i++
      ) {
        wheelArr.push(1);
      }
      for (
        let i = 0;
        i < data[handicapRef.current][distanceRef.current].twoPutt;
        i++
      ) {
        wheelArr.push(2);
      }
      for (
        let i = 0;
        i < data[handicapRef.current][distanceRef.current].threePutt;
        i++
      ) {
        wheelArr.push(3);
      }
    };
    generateWheel();
    dataDistanceRef.current = wheelArr;
    setDataDistance(wheelArr);
    handleShuffle();
  }, [handicap, distance, handleShuffle]);

  return (
    <AppContext.Provider
      value={{
        handicap,
        distance,
        setHandicap,
        setDistance,
        handleSpin,
        handleShuffle,
        dataDistance,
        openModal,
        closeModal,
        afterModalOpen,
        modalIsOpen,
        colorPutt1,
        colorPutt2,
        colorPutt3,
        setColorPutt1,
        setColorPutt2,
        setColorPutt3,
        distanceRef,
        handicapRef,
        dataDistanceRef,
        landingValue,
        setLandingValue,
        isSpinning,
        setIsSpinning,
      }}
    >
      <div className="app">
        <div className="app-left">
          <UserOptions />
          <Settings />
        </div>
        <div className="app-right">
          <Wheel />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
