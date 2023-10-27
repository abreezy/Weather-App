import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import './App.css'; 
import Button from './Button';

function App() {
  const [isDarkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true'); // variable for setting checking dark mode and using last saved preference
  const [savedCities, setSavedCities] = useState([]) // variable for storing saved cities
  const maxSavedCities = 4; // Maximum number of saved cities
  // function to toggle dark mode 
  const toggleMode = () => {
    setDarkMode(!isDarkMode);
  };

  // Retrieving the API key and pulling data from the API. London set as default city
  const API_KEY = process.env.REACT_APP_API_KEY
  const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`;
  const [newData, setNewData] = useState({});

  const fetchData = (inputValue) => {
    const apiUrl = inputValue
      ? `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`
      : defaultUrl;
    // axios used to handle HTTP requests from the browser 
    axios.get(apiUrl)
      .then((response) => {
        setNewData(response.data);

        // Update the list of saved cities
        if (!savedCities.includes(inputValue)) {
          // Limit the saved cities to a maximum of 4
          if (savedCities.length >= maxSavedCities) {
            const newSavedCities = [...savedCities];
            newSavedCities.shift(); // Remove the oldest saved city
            newSavedCities.push(inputValue);
            setSavedCities(newSavedCities);
          } else {
            setSavedCities([...savedCities, inputValue]);
          }
        }
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
 
  // Function to capitalize the first word and not show punctuation in the recent searches
  function capitalizeFirstLetter(string) {
    // Split the string at the first punctuation mark and capitalize the first part
    const parts = string.split(/[.,;!?]/);
    const firstPart = parts[0].trim(); // Get the first part and remove leading/trailing spaces
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
  }

  return (
    // classname centered-card is used to center the entire card on the middle of the page
    <div className={`centered-card ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> 
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
              offColor="#747e91"
              className={`custom-switch ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
            />
        </div>
        <h1 className="weather-data">
          Toggle Dark Mode
        </h1>
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
        <div className="saved-cities">
          <p className="weather-data">Recent searches</p>
          {savedCities.map((city) => (
          <button key={city} onClick={() => fetchData(city)}
          className={`saved-city-button ${isDarkMode ? 'saved-city-button-dark' : 'saved-city-button-light'}`}
          >
            {city ? capitalizeFirstLetter(city) : ''}
            </button>
            ))}
            </div>
      </div>
    </div>
  );
}

export default App;