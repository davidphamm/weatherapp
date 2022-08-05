import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e772cf700edbae29a0e39efe9a70bea5`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year} `
  }

  return (
    <div className="app">
      <div className="search">
        <input 
          value = { location }
          onChange = { event => setLocation(event.target.value) }
          onKeyPress = { searchLocation }
          placeholder = 'Enter Location'
          type = "text" />
      </div>

      {(typeof data.main != "undefined") ? (
        <>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}, {data.sys.country}</p>
            </div>
            <div className="date">
              { dateBuilder(new Date()) }
            </div>
            <div className="temp">
              <h1>{data.main.temp}℉</h1>
            </div>
            <div className="description">
              <p>{data.weather[0].main}</p>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like}℉</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed} MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
        </>
        ) : ('')}
    </div>
  );
}

export default App;
