import React, { useState } from 'react';
import questions from "./APIs/QuestionList"
import "./Styles/Questions.css";

function Questions() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

    const handleOptionClick = (option, index) => {
        setResponses({
            ...responses,
            [questions[currentQuestionIndex].id]: option,
        });
        setSelectedOptionIndex(index); // Track the index of the selected option
    };

    const handleNextClick = () => {
        // Check if an option has been selected
        if (selectedOptionIndex === null) {
            alert('Please select an option before proceeding.');
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOptionIndex(null);
        } else {
            console.log("All responses:", responses);

            // You might want to handle the submission or display a summary here
        }
    };

    return (
        <div className="dashboard-container">
            <section className="Question-ask-container">
                <h3 className='Question-text'>
                    <span>{currentQuestionIndex + 1}</span> <br />
                    {questions[currentQuestionIndex].question}
                </h3>
                <ul className='Options-container'>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <li
                            key={option}
                            style={{
                                backgroundColor: selectedOptionIndex === index ? 'orange' : 'transparent',
                            }}
                            onClick={() => handleOptionClick(option, index)}
                            className='Options'
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                <button onClick={handleNextClick} className='Next-Button'>
                    {currentQuestionIndex + 1 === questions.length ? "Get My Plan" : "Next"}
                </button>
            </section>
        </div>
    );
}

export default Questions;
