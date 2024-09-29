import React, { useState } from "react";
import './App.css';
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

function App() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [getDate, setGetDate] = useState(true);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    birth: { day: "", month: "", year: "" },
    username: "",
    Gender: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setSignupData((prevData) => {
      if (['day', 'month', 'year'].includes(name)) {
        return {
          ...prevData,
          birth: {
            ...prevData.birth,
            [name]: value,
          },
        };
      }
      
      return {
        ...prevData,
        [name]: value,
      };
    });
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
      // navigate("/Dashboard"); 
      setGetDate(false);
    } catch (err) {
      console.log("Google Authentication Error:", err);
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
      setGetDate(false);
    } catch (err) {
      console.log("Twitter Authentication Error:", err);
    }  };

  const handleFAuth =  async () => {
    try {
      const result = await signInWithPopup(auth, Provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log("User: ", user);
      console.log("Access Token: ", token);
      setGetDate(false)

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.error("Error during Facebook login", errorCode, errorMessage, email, credential);
    }  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (signupData.password === signupData.confirmPassword) {
        try {
          const response = await axios.post("http://localhost:3001/addUser", {
            email: signupData.email,
            password: signupData.password,
          });

          if (response.status === 201) {
            alert("User registered successfully!");
            // navigate("/Dashboard");
            setGetDate(false);

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
            });
          }
        }
      } else {
        alert("Passwords do not match.");
      }
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: signupData.email,
        password: signupData.password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        // navigate("/Dashboard"); 
        setGetDate(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("Not registered? Please sign up.");
    }
  };

  // date of birth

  const handleDateOfBirthSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {

        await setDoc(
          doc(db, "users", user.uid),
          { birthDate: signupData.birth },
          { merge: true }
        );

        alert("Date of Birth updated successfully!");
        navigate("/Dashboard");

      } catch (err) {
        console.log("Error saving date of birth:", err);
      }
    }
  };


  return (
    <div className="SignUp-container">
      <div className="Image-container">
        {/* Add any additional content or images here */}
      </div>
      {getDate || !isSignup ? (
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
      ) : (
        <form onSubmit={handleDateOfBirthSubmit} className="date-input-container">
          <section className="name-input-container">
            <input
              name="username"
              type="text"
              placeholder="username"
              required
              className="name-input"
              value={signupData.username}
              onChange={handleChange}
              />
              <input
              name="Gender"
              type="text"
              placeholder="name"
              required
              className="gender-input"
              value={signupData.Gender}
              onChange={handleChange}
             />


          </section>
          <div className="date-container">

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
                if (value.length <= 2) {
                  handleChange(e);
                }
              }} />
            <input
              name="month"
              type="number"
              required
              placeholder="MM"
              maxLength={2}
              className="date-input"
              value={signupData.birth.month}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 2) {
                  handleChange(e);
                }
              }} />
            <input
              name="year"
              type="number"
              placeholder="YYYY"
              required
              maxLength={4}
              className="date-input"
              value={signupData.birth.year}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 4) {
                  handleChange(e);
                }
              }}
            />
          </div>
          <button type="submit" className="Date-btn">Submit</button>
        </form>
      )}
    </div>
  );
}


export default App;
