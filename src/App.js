import React, { useState } from "react";
import './App.css';
import Logo from "./assets/FLOGO.png";
import facebook from "./assets/devicon_facebook.png";
import Google from "./assets/devicon_google.png";
import LinkedIN from "./assets/devicon_linkedin.png";
import axios from "axios";
import { db, auth, provider } from "./firebase/firebase"; // Fix: 'provider' from firebase.js
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Google Auth
  const handleGAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        password: user.uid,
        email: user.email,
      });
      navigate("/Dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  // LinkedIn Auth (Placeholder)
  const handleLAuth = () => {
    console.log("LinkedIn oAuth");
  };

  // Facebook Auth (Placeholder)
  const handleFAuth = () => {
    console.log("FaceBook oAuth");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (signupData.password === signupData.confirmPassword) {
        try {
          const response = await axios.post("http://localhost:3001/addUser", {
            email: signupData.email, // Fix: use email
            password: signupData.password,
          });

          if (response.status === 201) {
            alert("User registered successfully!");
            navigate("/Dashboard")
          }
        } catch (err) {
          console.error("Error during signup:", err);
          if (err.response && err.response.data.error) {
            alert(err.response.data.error);
          } else {
            alert("Failed to sign up. Please try again.");
            setSignupData({
              email: "",
              password: "",
              confirmPassword: "",
            })
          }
        }
      } else {
        alert("Passwords do not match");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: signupData.email,
        password: signupData.password,
      });
      console.log('Login successful:', response.data);
      navigate("/Dashboard")
      alert(response.data)
    } catch (error) {
      console.error('Error during login:', error);
      alert("Not an user? SignUp")

    }
  };

  return (
    <div className="SignUp-container">
      <div className="Image-container">
        {/* Add any additional content or images here */}
      </div>
      <form onSubmit={isSignup ? handleSubmit : handleLogin} className="Form-container">
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
            name="email"
            placeholder="email"
            autoComplete="off"
            className="input"
            value={signupData.email}
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

          <button type="submit" className="SignUp-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="OAuth-container">
            <span className="Google" onClick={handleGAuth}>
              <img src={Google} alt="Google" className="Google" />
            </span>
            <span onClick={handleLAuth}>
              <img src={LinkedIN} alt="LinkedIn" className="Google" />
            </span>
            <span onClick={handleFAuth}>
              <img src={facebook} alt="Facebook" className="Google" />
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
