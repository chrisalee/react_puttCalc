import React, { useContext } from "react";
import data from "../data.js";
import { AppContext } from "../App.js";

const Wheel = () => {
  const { distance, handicap, handleSpin, dataDistance, handleShuffle,  colorPutt1, colorPutt2, colorPutt3 } = useContext(AppContext);
  handleShuffle();

  // const [putt1, putt2, putt3] = [colorPutt1, colorPutt2, colorPutt3];
  
  return (
    <div className="wheel-body">
      <div className="wheel-container">
        <div className="spin-btn" onClick={handleSpin}>
          <h2>Click to Spin</h2>
          <h5>{distance} feet from hole</h5>
          <p>1-putt: {data[handicap][distance].onePutt}%</p>
          <p>2-putt: {data[handicap][distance].twoPutt}%</p>
          <p>3-putt: {data[handicap][distance].threePutt}%</p>
        </div>
        <div className="wheel">
          {dataDistance.map((currVal, idx) => (
            <div className={`wheel-number putt${currVal}}`} style={{ "--i": idx, backgroundColor: `${currVal === 1 ? colorPutt1 : currVal === 2 ? colorPutt2 : colorPutt3}` }} key={idx}>
              <span>{currVal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Wheel;
