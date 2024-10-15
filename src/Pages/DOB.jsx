import React, { useState, useEffect } from 'react';
import axios from "axios"
import "../App.css"
import DOBCom from '../Components/DOB';

function DOB() {
 const [email, setEmail] = useState("");

 useEffect(() => {
  const fetchUserEmail = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user', {
        withCredentials: true // Include session cookies
      });
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  fetchUserEmail();
}, []);
 


  


  return (
    <div className="SignUp-container">
      <div className="Image-container">
        {/* Add any additional content or images here */}
      </div>

    <DOBCom email={email} /> 

    </div>
  );
}


export default DOB;
