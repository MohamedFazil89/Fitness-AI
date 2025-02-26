import React, { useState, useEffect } from 'react';
import "./QuestionAssessment.css"

function QuestionAssessment() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); // Keep track of the selected option

    // Function to convert text to speech
    const speakResult = (text) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = 'en-US'; // Set language
        window.speechSynthesis.speak(speech);
    };

    useEffect(() => {
        fetch('http://localhost:3001/api/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
            })
            .catch(err => console.error('Error fetching questions:', err));
    }, []);

    const handleAnswerChange = (questionId, value) => {
        setAnswers({
            ...answers,
            [questionId]: value
        });
        setSelectedOption(value); // Store the selected option
    };

    const handleNext = () => {
        if (selectedOption !== null) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null); // Reset the selected option for the next question
            } else {
                handleSubmit();
            }
        } else {
            alert("Please select an option before proceeding.");
        }
    };

    const handleSubmit = () => {
        fetch('http://localhost:3001/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        })
            .then(res => res.json())
            .then(data => {
                const resultText = `Response: ${data.response}. Recommendation: ${data.recommendation}`;
                setResult(resultText);
                setSubmitted(true);

                // Voice over the result
                speakResult(resultText);
            })
            .catch(err => console.error('Error submitting answers:', err));
    };

    return (
        <div className="QuestionAssessment">
            <h1 className='MENTAL-TITLE'>Mental Health Assessment</h1>
            
            <div className="progress-bar">
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`progress-step ${index <= currentQuestionIndex ? 'completed' : ''}`}
                    >
                        <span className="step-number">{index + 1}</span>
                    </div>
                ))}
            </div>

            {!submitted ? (
                <form className='Q-form' onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    <div>
                        <p><strong>Question {currentQuestionIndex + 1}:</strong> {questions[currentQuestionIndex]?.question}</p>
                        <div className="options-grid">
                            {questions[currentQuestionIndex]?.options.map(opt => (
                                <label key={opt.value} className="radio-label">
                                    <input
                                        type="radio"
                                        name={`question_${questions[currentQuestionIndex].id}`}
                                        value={opt.value}
                                        checked={selectedOption === opt.value} // Ensure the selected option is reflected
                                        onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, opt.value)}
                                    />
                                    <span className="custom-radio"></span>
                                    {opt.text}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="button-container">
                        <button className='Q-btn' type="submit">{currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}</button>
                    </div>
                </form>
            ) : (
                result && (
                    <div className="result">
                        <h2>Result</h2>
                        <p>{result}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default QuestionAssessment;
