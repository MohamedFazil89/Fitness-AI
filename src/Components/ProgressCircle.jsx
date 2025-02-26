import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./styles/ProgressCircle.css"
import Muscle from "../assets/dashboardAssets/muscle.png"
const ProgressCircle = ({ value }) => {
  return (
    <div style={{ position:"relative", width: 80, height: 80 }}>
      <CircularProgressbar
        value={value}
        strokeWidth={10}
        styles={buildStyles({
          strokeLinecap: "round",
          pathColor: `url(#gradient)`,
          trailColor: "#1E2A33",
          backgroundColor: "transparent",
        })}
      />
       <div className="icon-overlay">
        {/* <FaDumbbell size={25} color="#AAA" /> */}
        <img src={Muscle} alt="" style={{
            width: "50%",
        }}/>

      </div>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
         
        </defs>
      </svg>
    
    </div>
  );
};

export default ProgressCircle;
