import React, { useContext } from "react";
import data from "../data";
import { AppContext } from "../App.js";
import { Icon } from "@iconify/react";

const UserOptions = () => {
  const {
    handicap,
    distance,
    handleSpin,
    // handleShuffle,
    setHandicap,
    setDistance,
    openModal,
    distanceRef,
    handicapRef,
  } = useContext(AppContext);

  const handicapList = Object.keys(data);
  const distanceList = Object.keys(data.pro);

  return (
    <div className="options-container">
      <div className="options">
        <div className="options-handicap">
          <label htmlFor="handicap">Handicap: </label>
          <select
            value={handicap}
            name="handicap"
            id="handicap"
            onChange={(e) => setHandicap(e.target.value)}
          >
            {handicapList.map((hdc) => (
              <option
                className="options-hdc"
                value={hdc}
                key={hdc}
                ref={handicapRef}
              >
                {hdc}
              </option>
            ))}
          </select>
        </div>
        <div className="options-distance">
          <label htmlFor="distance">Distance: </label>
          <select
            value={distance}
            name="distance"
            id="distance"
            onChange={(e) => setDistance(e.target.value)}
          >
            {distanceList.map((dist) => (
              <option
                className="options-dist"
                value={dist}
                key={dist}
                ref={distanceRef}
              >
                {dist}
              </option>
            ))}
          </select>
        </div>
        <button className="option-settings" onClick={openModal}>
          <Icon icon="ic:round-settings" />
        </button>
        {/* <button className="option-shuffleWheel" onClick={() => handleShuffle}>Shuffle Wheel</button> */}
        <button className="option-spin" onClick={handleSpin}>
          SPIN
        </button>
      </div>
    </div>
  );
};

export default UserOptions;
