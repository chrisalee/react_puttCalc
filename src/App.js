import { createContext, useEffect, useRef, useState } from "react";
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
    let wheel = document.querySelector(".wheel");
    let value = Math.ceil(Math.random() * 3600);
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);
  };

  const handleShuffle = () => {
    dataDistance.sort(() => (Math.random() > 0.5 ? 1 : -1));
  };

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
    dataDistanceRef.current = wheelArr;
    setDataDistance(wheelArr);
    generateWheel();
    // handleShuffle();
  }, [handicap, distance]);

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
