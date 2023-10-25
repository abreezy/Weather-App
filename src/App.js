import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import './App.css'; // Import your app-specific CSS
import Button from './Button';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const API_KEY = process.env.REACT_APP_API_KEY
  const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`;
  const [newData, setNewData] = useState({});

  const fetchData = (inputValue) => {
    const apiUrl = inputValue
      ? `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`
      : defaultUrl;

    axios.get(apiUrl)
      .then((response) => {
        setNewData(response.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert('Invalid city');
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      fetchData(e.target.value);
    }
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="flex justify-between items-center space-x-4 my-4">
        <Button isDarkMode={isDarkMode} toggleMode={toggleMode} />
        <Switch
          onChange={toggleMode}
          checked={isDarkMode}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={24}
          width={50}
          height={24}
          onColor="#111827"
          offColor="#319795"
          className="custom-switch"
        />
      </div>
      <button>
        Toggle Dark Mode
      </button>
      <input
        className={`input ${isDarkMode ? 'text-white bg-gray-800' : 'text-gray-800 bg-white'}`} 
        placeholder="Enter City"
        onKeyDown={handleInput}
      />
      {newData ? <h1 className="header">{newData.name}</h1> : <h1>Unknown</h1>}
      {newData.sys ? <h2 className="subheader">{newData.sys.country}</h2> : <h2>Unknown</h2>}
      {newData.main ? <p className="weather-data">Temp: {newData.main.temp}°C</p> : <p>Unknown</p>}
      {newData.main ? <p className="weather-data">Feels Like: {newData.main.feels_like}°C</p> : <p>Unknown</p>}
      {newData.main ? <p className="weather-data">Humidity: {newData.main.humidity}%</p> : <p>Unknown</p>}
      {newData.weather ? <h2 className="subheader">{newData.weather[0].main}</h2> : <h2>Unknown</h2>}
      {newData.weather ? (
        <img
          className="weather-image"
          src={`https://openweathermap.org/img/wn/${newData.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      ) : null}
    </div>
  );
}

export default App;