import { createContext, useCallback, useEffect, useState } from "react";
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

  const [colorPutt1, setColorPutt1] = useState("#0e9ef1");
  const [colorPutt2, setColorPutt2] = useState("#0ba245");
  const [colorPutt3, setColorPutt3] = useState("#e42121");

  Modal.setAppElement("#root");
  // let subtitle;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }
  const afterModalOpen = () => {
    console.log('modal open')
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleSpin = () => {
    let wheel = document.querySelector(".wheel");
    let value = Math.ceil(Math.random() * 3600);
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);
  };

  const handleShuffle = useCallback(() => {
    // randomize the array,
    // wheel for given distance can look different every time
    // with same number one-putt, two-putt, three-putt sections
    dataDistance.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }, [dataDistance]);

  useEffect(() => {
    const wheelArr = [];
    const generateWheel = () => {
      if(dataDistance.length > 100) {
        dataDistance.length = 0;
      }

      for (let i = 0; i < data[handicap][distance].onePutt; i++) {
        wheelArr.push(1);
      }
      for (let i = 0; i < data[handicap][distance].twoPutt; i++) {
        wheelArr.push(2);
      }
      for (let i = 0; i < data[handicap][distance].threePutt; i++) {
        wheelArr.push(3);
      }
    }
    setDataDistance(wheelArr);
    generateWheel();
    handleShuffle();
    // dataDistance.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }, [distance, handicap]);

  // const handleColorPutt1Change = (color, e) => {
  //   document.querySelectorAll("putt1").forEach((wheelSection) => {
  //     wheelSection.style.backgroundColor = e.target.value;
  //     setColorPutt1(e.target.value);
  //   })
  // };

  console.log(colorPutt1, colorPutt2, colorPutt3);

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
