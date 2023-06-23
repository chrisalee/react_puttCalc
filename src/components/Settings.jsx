import React, { useContext } from "react";
import { AppContext } from "../App";
import Modal from "react-modal";

const Settings = () => {
  const { closeModal, afterModalOpen, modalIsOpen, colorPutt1, colorPutt2, colorPutt3, setColorPutt1, setColorPutt2, setColorPutt3 } = useContext(AppContext);

  // const ref = useRef(null);

  const modalStyle = {
    content: {
      top: "50%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "var(--clr-grey-10)",
      padding: "70px",
      zIndex: "100",
      border: "3px solid var(--clr-black)",
    },
  };

  return (
    <div className="settings-container">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterModalOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="settings"
      >
        <h2>Settings</h2>
        <button onClick={closeModal} className="settings-closBTN">
          X
        </button>
        <form action="" className="settings-form">
          <div className="form-select">
            <label htmlFor="colorPutt1">1-putt:</label>
            <input
              type="color"
              id="colorPutt1"
              name="colorPutt1"
              value={colorPutt1}
              onChange={(e) => {
                setColorPutt1(e.target.value);
              }}
            />
          </div>
          <div className="form-select">
            <label htmlFor="colorPutt2">2-putt:</label>
            <input
              type="color"
              id="colorPutt2"
              name="colorPutt2"
              value={colorPutt2}
              onChange={(e) => {
                setColorPutt2(e.target.value);
              }}
            />
          </div>
          <div className="form-select">
            <label htmlFor="colorPutt3">3-putt:</label>
            <input
              type="color"
              id="colorPutt3"
              name="colorPutt3"
              value={colorPutt3}
              onChange={(e) => {
                e.stopPropagation();
                setColorPutt3(e.target.value);
              }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Settings;
