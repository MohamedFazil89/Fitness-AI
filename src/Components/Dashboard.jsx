import React, { useState } from "react";
import "./styles/Dashboard.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import ProgressCircle from "./ProgressCircle";
import MentalHealth from "../assets/dashboardAssets/session.png"
import Session from "../assets/dashboardAssets/session.png"
import Watch from "../assets/dashboardAssets/bi_watch.png"
import Fire from "../assets/dashboardAssets/fire.png"
import Physical from "../assets/dashboardAssets//physicalHealth.png"
import DataBar from "../assets/dashboardAssets/databar.png"
import DownArrow from "../assets/dashboardAssets/DownArrow.png"
import Challenge from "../assets/dashboardAssets//challenges.png"
import FaceRecognition from "./FaceRecognition";
import QuestionAssessment from "./QuestionAssessment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [Camera, setCamera] = useState(false);
  const [CurrentView, setCurrentView] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState("OCT 15 - 21");
  const [isOpen, setIsOpen] = useState(false);
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Activity",
        data: [3, 5, 8, 6, 7, 5, 2],
        backgroundColor: ["#FFFFFF", "#FFFFFF", "#3DB1D6", "#205C70", "#FFFFFF", "#E2DBFF", "#FFFFFF"],
      },
    ],
  };
  const dateRanges = [
    "OCT 1 - 7",
    "OCT 8 - 14",
    "OCT 15 - 21",
    "OCT 22 - 28",
    "OCT 29 - NOV 4",
  ];

  const handelCameraOpen = () => {
    setCamera(!Camera);
  }

  const questionAssessment = () => {
    setCurrentView("QuestionAssessment")
  }
  const faceRecognition = () => {
    setCurrentView("FaceRecognition");
  }

  return (
    <div className="dashboard">
      <p style={{ textAlign: "center" }}>Analytics</p>
      <p style={{ textAlign: "left" }}>live status</p>

      <div className="subdashboard">
        <div className="sidebar">
          <div className="score-card" style={{
            display: "flex"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column"
            }}>
              <h3>Score</h3>
              <div className="text">73%</div>
            </div>

            {/* <div className="circle"></div> */}
            <ProgressCircle value={73} />
          </div>
          <div className="stats">
            <p className="p" onClick={handelCameraOpen}>
              <img src={MentalHealth} alt="" className="Sessions-img" />
              Mental Health <span>12/25</span></p>
            <p className="p">
              <img src={Physical} alt="" className="Sessions-img" />
              Physical Health <span>22/25</span></p>
            <p className="p">
              <img src={Session} alt="" className="Sessions-img" />

              Sessions <span>12/25</span></p>
            <p className="p">
              <img src={Challenge} alt="" className="Sessions-img" />

              Challenge <span>23/25</span></p>
          </div>
        </div>
        <div className="analytics">
          <div className="chart-container">
            <div className="charttop">
              <p className="Top-ele">
                <span style={{ display: "flex" }} className="left"><img src={DataBar} alt="" className="Data" />
                  Data</span>
                <div className="dropdown">
                  {/* Button */}
                  <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
                    <span>{selectedDateRange}</span>
                    <span className="arrow">&#9662;</span> {/* Downward triangle symbol */}
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <ul className="dropdown-menu">
                      {dateRanges.map((range, index) => (
                        <li
                          key={index}
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedDateRange(range);
                            setIsOpen(false);
                          }}
                        >
                          {range}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </p>

            </div>
            <div className="chart">

              <Bar data={data}  />
            </div>
          </div>
          <div className="stats-cards">
            <div className="burned">
              <img src={Fire} alt="" className="Icon" />

              <p>282 Kcal Remaining</p>
              <p>Average</p>
              <h3>Burned</h3>
            </div>
            <div className="remaining">
              <img src={Fire} alt="" className="Icon" />

              <p>282 Kcal Remaining</p>
              <p>Average</p>
              <h3>Burned</h3>
            </div>
          </div>
        </div>
        <div className="tracker">
          <img src={Watch} alt="" />
          <p>Your tracker</p>
          <button className="connect-btn">Connect</button>
        </div>
      </div>
      {Camera ? <div className="EmotionAnalyses">
        <span className="Close" onClick={handelCameraOpen}>X</span>
        <div className="btn-container" style={{ bottom: `5rem` }}>

          <button onClick={faceRecognition} className='Optionbth'>FaceRecognition</button>
          <button onClick={questionAssessment} className='Optionbth'>QuestionAssessment</button>
        </div>

        {CurrentView === "FaceRecognition" && <FaceRecognition />}
        {CurrentView === "QuestionAssessment" && <QuestionAssessment />}


      </div> : ""}
    </div>
  );
};

export default Dashboard;
