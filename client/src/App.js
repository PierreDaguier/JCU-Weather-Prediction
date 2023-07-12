
import React from 'react';
import WeatherForm from './weatherForm';
import Documentation from './documentation';
import Navbar from './navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'antd'



function App() {
  
  const handleFormSubmit = async (weatherData) => {
    try {
      const response = await fetch('http://localhost:8080/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const prediction = await response.json();
      console.log('Prediction:', prediction);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  return (

    <Router>

      <div className="App">
        
        <div className="title-container">
          <img src="/JCU.png" alt="Logo" className="logo" />
          <h1>Just Curious University</h1>
        </div>
        
        <nav>
          
          
        </nav>
        <Navbar />
        <Routes>
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/" element={<WeatherForm onFormSubmit={handleFormSubmit} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

