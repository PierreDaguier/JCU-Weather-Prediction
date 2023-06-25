import React from 'react';
import WeatherForm from './weatherForm';

function App() {
  const handleFormSubmit = (weatherData) => {
    console.log(weatherData);
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
      <div className="App">
        <h1>Weather Predictor</h1>
        <WeatherForm onFormSubmit={handleFormSubmit} />
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Weather Predictor</h1>
      <WeatherForm onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
