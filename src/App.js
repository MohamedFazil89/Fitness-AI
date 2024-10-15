import React, { useState } from "react";
import './App.css';
import ReactDOM from "react-dom";
import Logo from "./assets/FLOGO.png";
import facebook from "./assets/devicon_facebook.png";
import Google from "./assets/devicon_google.png";
import LinkedIN from "./assets/devicon_linkedin.png";
import axios from "axios";
import { db, auth, provider, Provider, TProvider } from "./firebase/firebase"; // Fix: 'provider' from firebase.js
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUsername } from './Redux/userSlice';
import DOB from "./Components/DOB";

function App({ DOBState }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [isSignup, setIsSignup] = useState(true);
  const [GetDate, setGetDate] = useState(true)
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  sessionStorage.setItem("Status", isSignup)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Status send

  const sendDataToBackend = async () => {
    try {
      // Send a POST request to your backend
      const response = await axios.post('http://localhost:3001/getStatus', {
        Status: isSignup,
      }, {
        withCredentials: true, 
      });
  
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };


  // Status end


  

  // Google Auth
  const handleGAuth = async (e) => {
    e.preventDefault()
    // setGetDate(false)
    try {
      // This will initiate Google login flow in a new tab/window
      window.location.href = "http://localhost:3001/auth/google";
      sendDataToBackend()
    } catch (error) {
      console.error('Google Auth failed:', error);
    }
  };

  const handleGLoginAuth = async (e) => {
    e.preventDefault()
    try {
      // This will initiate Google login flow in a new tab/window
      window.location.href = "http://localhost:3001/auth/google/";
      sendDataToBackend()
    } catch (error) {
      console.error('Google Auth failed:', error);
    }
  };
  

  const handleLAuth = async () => {
    try {
      const result = await signInWithPopup(auth, TProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        password: user.uid,
        email: user.email,
      });
      // navigate("/Dashboard"); 
    } catch (err) {
      console.log("Twitter Authentication Error:", err);
    }
  };

  const handleFAuth = async () => {
    try {
      const result = await signInWithPopup(auth, Provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log("User: ", user);
      console.log("Access Token: ", token);

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.error("Error during Facebook login", errorCode, errorMessage, email, credential);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/addUser", {
        email: signupData.email,
        password: signupData.password,
      });

      if (response.status === 200) {
        alert("User registered successfully!");
        dispatch(setUsername(signupData.email));
        setGetDate(false)
      }
    } catch (err) {
      console.error("Error during signup:", err);
      if (err.response && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/login', {
        email: signupData.email,
        password: signupData.password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        dispatch(setUsername(response.data.email || signupData.email));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.status === 404) {
        alert("User not found. Please sign up.");
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (isSignup) {
      handleSignup(e);
    } else {
      handleLogin(e);
    }
  };

  // date of birth

  // const handleDateOfBirthSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isSignup) {
  //     try {
  //       const response = await axios.post("http://localhost:3001/BirthPost", {
  //         username: signupData.username,
  //         birth: {
  //           day: signupData.birth.day,
  //           month: signupData.birth.month,
  //           year: signupData.birth.year,
  //         },
  //         Gender: signupData.Gender,
  //         email: signupData.email,
  //       });
  //       dispatch(setUsername(signupData.username))
  //       alert(response.status);
  //       navigate("/Dashboard");
  //     } catch (err) {
  //       console.log(err);
  //       alert(err);
  //     }
  //   }
  // };


  return (
    <div className="SignUp-container">
      <div className="Image-container">
        {/* Add any additional content or images here */}
      </div>

      {GetDate ? <form onSubmit={isSignup ? handleSubmit : handleLogin} className="Form-container">
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
            required
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="off"
            className="input"
            value={signupData.password}
            onChange={handleChange}
            required
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
              required
            />
          )}

          <button type="submit" className="SignUp-btn" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>


          <div className="OAuth-container">
            <span className="Google" onClick={ isSignup ? handleGAuth : handleGLoginAuth}>
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
      </form> : <DOB email={signupData.email}/> }

    </div>
  );
}


export default App;
