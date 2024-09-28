import React from "react"
import './App.css';

import Logo from "./assets/FLOGO.png"

function App() {
  return (
    <div className="SignUp-container">
      <div className="Image-container">


      </div>
      <form action="/SignUp" method="POST" className="Form-container">
      <img src={Logo} alt="Logo" className="Logo" /> 
      <div className="Form-elements">
      <h1 className="Title">Sign <span>up</span></h1>
      <input 
      type="text" 
      placeholder="username" 
      autoComplete="false"
      className="input"
      />

      <input 
      type="password" 
      placeholder="password" 
      autoComplete="false"
      className="input"

      />

      <input 
      type="password" 
      placeholder="confirm password"
      autoComplete="false"
      className="input"

       />

      <input 
      type="date"
      placeholder="confirm password" 
      autoComplete="false"
      className="input-date"

      />


      <button type="submit" className="SignUp-btn">Sign Up</button>
      <span className="Circle"></span>
      <span className="Circle"></span>
      <span className="Circle"></span>

      <hr />
      <p className="Already-Account">Already have an account? <span>Login</span></p>

      </div>
      </form>
     
    </div>
  );
}

export default App;
