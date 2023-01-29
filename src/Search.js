import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function showTemp(response) {
    setLoaded(true);
    console.log(response);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios.get(url).then(showTemp);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="SearchBody">
        <div className="Wrapper">
          {form}
          <h2>{city}</h2>
          <ul className="list">
            <li>Current Temperature: {weather.temperature}°C</li>
            <li>Conditions: {weather.description}</li>
            <li> Humidity: {weather.humidity}%</li>
            <li> Wind: {weather.wind} km/h</li>
            <li>
              <img src={weather.icon} alt="weather icon" />
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="SearchBody">
        <div className="Wrapper">
          {form}
          <h2>New York</h2>
          <ul className="list">
            <li>Current Temperature:20°C</li>
            <li>Conditions:Sunny </li>
            <li> Humidity: 30%</li>
            <li> Wind: 2km/h</li>
          </ul>
        </div>
      </div>
    );
  }
}
