import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Documentation from './documentation';
import Navbar from './navbar';
import WeatherForm from './weatherForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="grain-overlay" />

        <header className="app-header">
          <div className="brand-block">
            <img src="/JCU.png" alt="Just Curious University logo" className="brand-logo" />
            <div>
              <p className="brand-kicker">AI Weather Intelligence</p>
              <h1>Just Curious University</h1>
            </div>
          </div>
          <Navbar />
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<WeatherForm />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
