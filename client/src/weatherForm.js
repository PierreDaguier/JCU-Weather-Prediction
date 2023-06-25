import React, { useState } from 'react';

function WeatherForm() {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [windGustDir, setWindGustDir] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [evaporation, setEvaporation] = useState('');
    const [sunshine, setSunshine] = useState('');
    const [windGustSpeed, setWindGustSpeed] = useState('');
    const [windSpeed9am, setWindSpeed9am] = useState('');
    const [windSpeed3pm, setWindSpeed3pm] = useState('');
    const [humidity9am, setHumidity9am] = useState('');
    const [humidity3pm, setHumidity3pm] = useState('');
    const [pressure9am, setPressure9am] = useState('');
    const [pressure3pm, setPressure3pm] = useState('');
    const [cloud9am, setCloud9am] = useState('');
    const [cloud3pm, setCloud3pm] = useState('');
    const [temp9am, setTemp9am] = useState('');
    const [temp3pm, setTemp3pm] = useState('');
    const [windDir9am, setWindDir9am] = useState('');
    const [windDir3pm, setWindDir3pm] = useState('');

const [rainToday, setRainToday] = useState('');
  const [prediction, setPrediction] = useState(null);

  const submitForm = (event) => {
    event.preventDefault();
    // console.log(JSON.stringify({ date,location, windGustDir, windDir9am, windDir3pm, rainToday,minTemp, maxTemp, rainfall, evaporation, sunshine, windGustSpeed, windSpeed9am, windSpeed3pm, humidity9am, humidity3pm, pressure9am, pressure3pm, cloud9am, cloud3pm, temp9am, temp3pm }));

    fetch("http://localhost:8080/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        date,
        location, 
        windGustDir, 
        windDir9am, 
        windDir3pm, 
        rainToday,
        minTemp: parseFloat(minTemp), 
        maxTemp: parseFloat(maxTemp), 
        rainfall: parseFloat(rainfall),  
        evaporation: parseFloat(evaporation), 
        sunshine: parseFloat(sunshine), 
        windGustSpeed: parseFloat(windGustSpeed), 
        windSpeed9am: parseFloat(windSpeed9am), 
        windSpeed3pm: parseFloat(windSpeed3pm), 
        humidity9am: parseFloat(humidity9am), 
        humidity3pm: parseFloat(humidity3pm), 
        pressure9am: parseFloat(pressure9am), 
        pressure3pm: parseFloat(pressure3pm), 
        cloud9am: parseFloat(cloud9am), 
        cloud3pm: parseFloat(cloud3pm), 
        temp9am: parseFloat(temp9am), 
        temp3pm: parseFloat(temp3pm),

        })
    })
    .then(response => response.json())
    .then(data => setPrediction(data.result))
    .catch(error => console.log(error));

    setMinTemp('');
    setMaxTemp('');
    setRainfall('');
    setEvaporation('');
    setSunshine('');
    setWindGustSpeed('');
    setWindSpeed9am('');
    setWindSpeed3pm('');
    setHumidity9am('');
    setHumidity3pm('');
    setPressure9am('');
    setPressure3pm('');
    setCloud9am('');
    setCloud3pm('');
    setTemp9am('');
    setTemp3pm('');
  };

  return (
    <div>

  <div>
    <form onSubmit={submitForm}>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          location={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <label>
        Minimum Temperature:
        <input
          type="number"
          value={minTemp}
          onChange={(e) => setMinTemp(e.target.value)}
          required
        />
      </label>
      <label>
        Maximum Temperature:
        <input
          type="number"
          value={maxTemp}
          onChange={(e) => setMaxTemp(e.target.value)}
          required
        />
      </label>
      <label>
        Rainfall:
        <input
          type="number"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          required
        />
      </label>
      <label>
        Evaporation:
        <input
          type="number"
          value={evaporation}
          onChange={(e) => setEvaporation(e.target.value)}
          required
        />
      </label>
      <label>
        Sunshine:
        <input
          type="number"
          value={sunshine}
          onChange={(e) => setSunshine(e.target.value)}
          required
        />
      </label>
      <label>
        Wind Gust Direction:
        <select value={windGustDir} onChange={(e) => setWindGustDir(e.target.value)} required>
          <option value="">Select...</option>
          <option value="N">N</option>
          <option value="NE">NE</option>
          <option value="E">E</option>
          <option value="SE">SE</option>
          <option value="S">S</option>
          <option value="SW">SW</option>
          <option value="W">W</option>
          <option value="NW">NW</option>

        </select>
      </label>
      <label>
        Wind Gust Speed:
        <input
          type="number"
          value={windGustSpeed}
          onChange={(e) => setWindGustSpeed(e.target.value)}
          required
        />
      </label>

      <label>
  Wind Direction at 9am:
  <select value={windDir9am} onChange={(e) => setWindDir9am(e.target.value)} required>
          <option value="">Select...</option>
          <option value="N">N</option>
          <option value="NE">NE</option>
          <option value="E">E</option>
          <option value="SE">SE</option>
          <option value="S">S</option>
          <option value="SW">SW</option>
          <option value="W">W</option>
          <option value="NW">NW</option>

        </select>
</label>
<label>
  Wind Direction at 3pm:
  <select value={windDir3pm} onChange={(e) => setWindDir3pm(e.target.value)} required>
          <option value="">Select...</option>
          <option value="N">N</option>
          <option value="NE">NE</option>
          <option value="E">E</option>
          <option value="SE">SE</option>
          <option value="S">S</option>
          <option value="SW">SW</option>
          <option value="W">W</option>
          <option value="NW">NW</option>

        </select>
</label>
<label>
  Humidity at 9am:
  <input
    type="number"
    value={humidity9am}
    onChange={(e) => setHumidity9am(e.target.value)}
    required
  />
</label>
<label>
  Humidity at 3pm:
  <input
    type="number"
    value={humidity3pm}
    onChange={(e) => setHumidity3pm(e.target.value)}
    required
  />
</label>
<label>
  Pressure at 9am:
  <input
    type="number"
    value={pressure9am}
    onChange={(e) => setPressure9am(e.target.value)}
    required
  />
</label>
<label>
  Pressure at 3pm:
  <input
    type="number"
    value={pressure3pm}
    onChange={(e) => setPressure3pm(e.target.value)}
    required
  />
</label>
<label>
  Cloud cover at 9am:
  <input
    type="number"
    value={cloud9am}
    onChange={(e) => setCloud9am(e.target.value)}
    required
  />
</label>
<label>
  Cloud cover at 3pm:
  <input
    type="number"
    value={cloud3pm}
    onChange={(e) => setCloud3pm(e.target.value)}
    required
  />
</label>
<label>
  Temperature at 9am:
  <input
    type="number"
    value={temp9am}
    onChange={(e) => setTemp9am(e.target.value)}
    required
  />
</label>
<label>
  Temperature at 3pm:
  <input
    type="number"
    value={temp3pm}
    onChange={(e) => setTemp3pm(e.target.value)}
    required
  />
</label>
<label>
  Rain Today:
  <input
    type="text"
    value={rainToday}
    onChange={(e) => setRainToday(e.target.value)}
    required
  />
</label>
      <button type="submit">Predict</button>
    </form>
    {prediction && <p>The weather prediction is: {prediction===true?"Rain tomorrow":"No Rain tomorrow"}</p>}
  </div>
    </div>
  );
}

export default WeatherForm;
