import React, { useState } from "react";
import './App.css';
import Google from "./assets/google.png";
import Logo from "./assets/FLOGO.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

function App() {
  const [isSignup, setIsSignup] = useState(true);
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    birth: { day: "", month: "", year: "" }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in signupData.birth) {
      setSignupData((prevData) => ({
        ...prevData,
        birth: {
          ...prevData.birth,
          [name]: value
        }
      }));
    } else {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Auths

  // GAuth
  const handleGAuth = () =>{
    console.log("Google oAuth");
    
  }

  // LAuth
  const handleLAuth = () =>{
    console.log("LinkedIn oAuth");
    
  }

  // FAuth
  const handleFAuth = () =>{
    console.log("FaceBook oAuth");
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (signupData.password === signupData.confirmPassword) {
        console.log(signupData);

      }else{
        alert("Passwords do not match");
      }
    }
  };

  return (
    <div className="SignUp-container">
      <div className="Image-container">
        {/* Add any additional content or images here */}
      </div>
      <form onSubmit={handleSubmit} className="Form-container">
        <img src={Logo} alt="Logo" className="Logo" />
        <div className="Form-elements">
          {isSignup ? (
            <p className="Title">
              SIGN <span style={{ color: "rgb(0, 191, 255)" }}>UP</span>
            </p>
          ) : (
            <p className="Title">
              LOG<span style={{ color: "rgb(0, 191, 255)" }}>IN</span>
            </p>
          )}
          <input
            type="text"
            name="username"
            placeholder="username"
            autoComplete="off"
            className="input"
            value={signupData.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="off"
            className="input"
            value={signupData.password}
            onChange={handleChange}
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              autoComplete="off"
              className="input"
              value={signupData.confirmPassword}
              onChange={handleChange}
            />
          )}

          {isSignup && (
            <div className="date-input-container">
              <input
                name="day"
                type="number"
                placeholder="DD"
                maxLength={2}
                required
                className="date-input"
                value={signupData.birth.day}
                onChange={(e) => {
                  const value = e.target.value;
                  // Limit to 2 digits
                  if (value.length <= 2) {
                    handleChange(e);
                  }
                }} />
              <input
                name="month"
                type="number"
                required
                placeholder="MM"
                maxLength="2"
                className="date-input"
                value={signupData.birth.month}
                onChange={(e) => {
                  const value = e.target.value;
                  // Limit to 2 digits
                  if (value.length <= 2) {
                    handleChange(e);
                  }
                }} />
              <input
                name="year"
                type="number"
                placeholder="YYYY"
                required
                maxLength="4"
                className="date-input"
                value={signupData.birth.year}
                onChange={(e) => {
                  const value = e.target.value;
                  // Limit to 2 digits
                  if (value.length <= 4) {
                    handleChange(e);
                  }
                }} />
            </div>
          )}

          <button type="submit" className="SignUp-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="OAuth-container">
            <span className="Google" onClick={handleGAuth}>
              <img src={Google} alt="Google" className="Google" />
            </span>
            <span onClick={handleLAuth}>
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </span>
            <span onClick={handleFAuth}>
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </span>
          </div>

          <span className="line">
            <hr /> or <hr />
          </span>

          {isSignup ? (
            <p className="Already-Account">
              Already have an account?{" "}
              <span onClick={() => setIsSignup(!isSignup)}>Login</span>
            </p>
          ) : (
            <p className="Already-Account">
              Create your own account?{" "}
              <span onClick={() => setIsSignup(!isSignup)}>Sign Up</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
