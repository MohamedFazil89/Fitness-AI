import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { useDispatch } from 'react-redux'; // Import useDispatch for Redux actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { setUsername } from '../Redux/userSlice'; // Import setUsername action
import "./styles/DOB.css"

export default function DOB({ email }) { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup] = useState(true); 
    const [signupData, setSignupData] = useState({
        username: "",
        birth: {
            day: "",
            month: "",
            year: "",
        },
        Gender: ""
    });

    // Handle input changes
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

    // Handle form submission
    const handleDateOfBirthSubmit = async (e) => {
        e.preventDefault();
        if (isSignup) {
            try {
                const response = await axios.post("http://localhost:3001/BirthPost", {
                    username: signupData.username,
                    birth: {
                        day: signupData.birth.day,
                        month: signupData.birth.month,
                        year: signupData.birth.year,
                    },
                    Gender: signupData.Gender,
                    email: email,
                });
                dispatch(setUsername(signupData.username));
                alert(`Status: ${response.status}`);
                navigate("/dashboard");
            } catch (err) {
                console.error("Error during DOB submission:", err);
                if(err.response.status === 400){
                    alert("username already exist!")
                }else{
                alert("An error occurred while submitting your information. Please try again.");

                }
            }
        }
    };

    return (
        <form onSubmit={handleDateOfBirthSubmit} className="date-input-container">
            <section className="name-input-container">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    className="name-input"
                    value={signupData.username}
                    onChange={handleChange}
                />
                <input
                    name="Gender"
                    type="text"
                    placeholder="Gender"
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
                    max={31} 
                    required
                    className="date-input"
                    value={signupData.birth.day}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 2) {
                            handleChange(e);
                        }
                    }}
                />
                <input
                    name="month"
                    type="number"
                    required
                    placeholder="MM"
                    max={12} 
                    className="date-input"
                    value={signupData.birth.month}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 2) {
                            handleChange(e);
                        }
                    }}
                />
                <input
                    name="year"
                    type="number"
                    placeholder="YYYY"
                    required
                    max={9999} 
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
    );
}
