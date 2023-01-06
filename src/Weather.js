import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";

import "./WeatherForecast.css";
import "./styles.css";

export default function Weather() {
  let [city, setCity] = useState("Lviv");
  let [loaded, setLoaded] = useState(false);

  let [weather, setWeather] = useState("null");

  let [unit, setUnit] = useState("celcius");
  let [unitForFeltTemp, setunitForFeltTemp] = useState("celcius");
  let [feltTemperature, setFeltTemperature] = useState(null);
  let [temperature, setTemperature] = useState(null);

  function FormattedDate(props) {
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekDay = weekDays[props.date.getDay()];

    let day = props.date.getDate();
    let month = props.date.getMonth() + 1;
    let year = props.date.getFullYear();
    let hours = props.date.getHours() % 12 || 12;
    let minutes = props.date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return (
      <div className="currentDate">
        <div className="date">
          <p>
            {month}/ {day}/ {year}
          </p>
        </div>
        <div className="currentTime">
          <p>
            {hours}:{minutes}
            {ampm}
          </p>
        </div>
        <div className="dayOfWeek">
          <p>{weekDay}</p>
        </div>
      </div>
    );
  }

  function displayWeather(response) {
    console.log(response.data);
    setTemperature(response.data.main.temp);
    setFeltTemperature(response.data.main.feels_like);
    setWeather({
      city: response.data.name,
      coordinates: response.data.coord,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      feltTemperature: response.data.main.feels_like,
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setLoaded(true);
  }

  function handleSearch(event) {
    event.preventDefault();

    search();
  }

  function search() {
    let apiKey = "3c3046eb3665ca592e70fff5ccda526b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
  }

  function searchCurrentLocation (props){
    let apiKey = "3c3046eb3665ca592e70fff5ccda526b";
    let lon = props.coords.longitude;
    let lat = props.coords.latitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayWeather);
  }

  function handleCurrentLocation(){
    navigator.geolocation.getCurrentPosition(searchCurrentLocation)
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function ShowFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function ShowCelsius(event) {
    event.preventDefault();
    setUnit("celcius");
  }

  function ShowFeltFahrenheit(event) {
    event.preventDefault();
    setunitForFeltTemp("fahrenheit");
  }

  function ShowFeltCelsius(event) {
    event.preventDefault();
    setunitForFeltTemp("celcius");
  }

  if (loaded) {
    return (
      <div className="header">
        <div className="row">
          <div className="col-4">
            <FormattedDate date={weather.date} />

            <div className="descriptionOfWeather">
              <p>{weather.description}</p>
            </div>
            <div className="img">
              <img
                src={weather.icon}
                alt={weather.description}
                id="icon"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="main col-8">
            <div>
              <div className="nameTown">
                <h1>{weather.city}</h1>
              </div>
              <div>
                <form id="form-search" onSubmit={handleSearch}>
                  <div className="row flex-start">
                    <input
                      type="search"
                      placeholder="Type a city..."
                      id="SearchEngine"
                      className="col-9 mb-3"
                      autoComplete="off"
                      onChange={updateCity}
                    />
                    <button
                      id="buttonSearch"
                      type="submit"
                      className="btn col-4"
                      title="Search"
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <button
                      id="buttonCurrent"
                      value="Current"
                      className="btn col-4"
                      title="Current location"
                      onClick={handleCurrentLocation}
                    >
                      <i className="fa-solid fa-magnifying-glass-location"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="tempGeneralCover">
              <div className="row">
                <div className="degrees col-1">
                  {unit === "celcius" ? (
                    <p id="dataDegrees">{Math.round(temperature)}</p>
                  ) : (
                    <p id="dataDegrees">
                      {Math.round((temperature * 9) / 5 + 32)}
                    </p>
                  )}
                </div>
                <div className="celsiusContainer col-1">
                  <a href="/" className="celsius" onClick={ShowCelsius}>
                    °C
                  </a>{" "}
                </div>
                <div id="slash" className="col-1">
                  <p>|</p>
                </div>

                <div className="fahrContainer col-1">
                  <a href="/" className="fahrenheit" onClick={ShowFahrenheit}>
                    {" "}
                    °F{" "}
                  </a>{" "}
                </div>
              </div>
            </div>

            <div className="description1">
              <div className="dataFeltTemp">
                <p className="feltTemp ">Felt temp.</p>{" "}
                {unitForFeltTemp === "celcius" ? (
                  <span id="feelsLike">{Math.round(feltTemperature)} </span>
                ) : (
                  <span id="feelsLike">
                    {Math.round((feltTemperature * 9) / 5 + 32)}
                  </span>
                )}
                <a href="/" className="celsius1" onClick={ShowFeltCelsius}>
                  {" "}
                  °C
                </a>{" "}
                <p className="slash1">|</p>{" "}
                <a
                  href="/"
                  className="fahrenheit1"
                  onClick={ShowFeltFahrenheit}
                >
                  °F
                </a>{" "}
              </div>
              <p className="otherInf">
                Atm. pressure:{" "}
                <span className="pressure"> {weather.pressure} </span> mb.
              </p>
              <p className="humidity">
                Humidity:{" "}
                <span className="dataHumidity"> {weather.humidity} </span> %
              </p>
              <p className="wind">
                Wind:{" "}
                <span className="dataWind"> {Math.round(weather.wind)} </span>{" "}
                km/h
              </p>
            </div>
          </div>
        </div>
        <WeatherForecast coordinates={weather.coordinates} />
      </div>
    );
  } else {
    search();
    return null;
  }
}