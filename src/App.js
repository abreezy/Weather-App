import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

    
    // input where it takes values from user 
    // useState hook to update value stored
    // if input is invalid send request for default URL

    const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=2381fcb06c0ff5e970f0d9f6ae95aabd&units=metric`

    // const [inputValue, setInputValue] = useState("")
    const [newData, setNewData] = useState({fetchData})

    function fetchData(inputValue){
      if(inputValue){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=2381fcb06c0ff5e970f0d9f6ae95aabd&units=metric`).then((response) =>{
          setNewData(response.data)
        }).catch((err)=>{
          if(err.response.status === 400){
            alert("invalid city")
          }
        })
      } else {
        axios.get(defaultUrl).then((response) => {
          setNewData(response.data)
        })
      }
    }
    useEffect(() => {
      fetchData()
    }, [])

    function handleInput(e){
      if (e.key === "Enter"){
        // setInputValue(e.target.value)
        fetchData(e.target.value)
      }
    }

  return (
    <div>
      <input
        placeholder="Enter City"
        onKeyDown={handleInput}
      />
      { newData ? <h1>{newData.name}</h1> : <h1></h1> }
      { newData.sys ? <h2>{newData.sys.country}</h2> : <h2></h2>}
      { newData.main ? <h1>Temp: {newData.main.temp}oC</h1> : <h1></h1> }
      { newData.main ? <h1>Feels Like: {newData.main.feels_like}oC</h1> : <h1></h1> }
      { newData.main ? <h1>Humidity: {newData.main.humidity}%</h1> : <h1></h1> }
      {newData.weather ? <h2>{newData.weather[0].main}</h2> : <h2></h2>}
      {newData.weather ? <h2>{newData.weather[0].description}</h2> : <h2></h2>}
      { newData.weather ? <img src={`https://openweathermap.org/img/wn/${newData.weather[0].icon}@2x.png`} /> : null }
    </div>
  )
}

export default App