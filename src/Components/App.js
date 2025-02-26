import React, { useState } from 'react';
import './App.css';
import QuestionAssessment from './components/QuestionAssessment';
import FaceRecognition from './components/FaceRecognition';

function App() {
  const [currentView, setCurrentView] = useState('');

  const handleFaceRecognition = () => {
    setCurrentView('faceRecognition');
  };

  const handleQuestionAssessment = () => {
    setCurrentView('questionAssessment');
  };

  return (
    <div className="App">
      <h1>Choose an Assessment Method</h1>
      <div className="button-container">
        <button onClick={handleQuestionAssessment}>Question-based Assessment</button>
        <br></br>
        <button onClick={handleFaceRecognition}>Face Recognition-based Emotion Analysis</button>
      </div>

      {currentView === 'faceRecognition' && <FaceRecognition />}
      {currentView === 'questionAssessment' && <QuestionAssessment />}
    </div>
  );
}

export default App;
