import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import "./FaceRecognition.css"

function FaceRecognition() {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  

  // Function to convert text to speech
  const speakResult = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US'; // Set language
    window.speechSynthesis.speak(speech);
  };
  const capture = async () => {
    if (!webcamRef.current) {
      console.error("Webcam is not initialized.");
      setResult("Webcam not ready. Try again.");
      return;
    }
  
    const capturedImageSrc = webcamRef.current.getScreenshot();
    if (!capturedImageSrc) {
      console.error("Failed to capture image.");
      setResult("Error capturing image. Please try again.");
      return;
    }
  
    setImageSrc(capturedImageSrc); // Set the captured image for display
  
    try {
      const response = await axios.post('http://localhost:3001/api/face-recognition', {
        image: capturedImageSrc,
      });
  
      if (!response.data || typeof response.data !== 'object') {
        throw new Error("Invalid response from server");
      }
  
      console.log('Emotion analysis result:', response.data);
  
      // Ensure the response has all expected fields before setting result
      const { emotion, response: apiResponse, recommendation } = response.data;
      if (!emotion || !apiResponse || !recommendation) {
        throw new Error("Missing data in response");
      }
  
      const resultText = `Detected Emotion: ${emotion}. Response: ${apiResponse}. Recommendation: ${recommendation}`;
      setResult(resultText);
  
      // Voice over the result
      speakResult(resultText);
    } catch (error) {
      console.error('Error submitting face data:', error);
      setResult("Error processing face data.");
    }
  };
  

  return (
    <div style={{ 
    display: "flex",
    textAlign: 'center',
    flexDirection: "column",
    justifyContent: "center"  }}>
      <h2>Face Recognition-based Emotion Analysis</h2>
      <div className="result-output">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={340}
      />
      {imageSrc && (
        <div style={{ marginTop: '20px' }}>
          <h3>Captured Image:</h3>
          <img src={imageSrc} alt="Captured" width={640} height={340} />
        </div>
      )}
      </div>
      <button onClick={capture} style={{ width: "fit-content"}} className='Q-btn'>Analyze Emotion</button>
      
      {result && <div style={{ marginTop: '20px', fontSize: '18px', whiteSpace: 'pre-line' }}>{result}</div>}
    </div>
  );
};

export default FaceRecognition;
