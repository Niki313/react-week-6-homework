import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";

import "./WeatherForecast.css";
import "./styles.css";

export default function Header() {
  let [city, setCity] = useState(" ");
  let [message, setMessage] = useState("Lviv");
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
      "Saturday"
    ];
    let weekDay = weekDays[props.date.getDay()];

    let day = props.date.getDate();
    let month = props.date.getMonth() + 1;
    let year = props.date.getFullYear();
    let hours = props.date.getHours() % 12 || 12;
    let minutes = props.date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

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
      <div class="currentDate">
        <div class="date">
          <p>
            {month}/ {day}/ {year}
          </p>
        </div>
        <div class="currentTime">
          <p>
            {hours}:{minutes}
            {ampm}
          </p>
        </div>
        <div class="dayOfWeek">
          <p>{weekDay}</p>
        </div>
      </div>
    );
  }

  function displayWeather(response) {
    console.log(response.data);
    setLoaded(true);
    setTemperature(response.data.main.temp);
    setFeltTemperature(response.data.main.feels_like);
    setWeather({
      coordinates: response.data.coord,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      feltTemperature: response.data.main.feels_like,
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    setMessage(city);
    let apiKey = "3c3046eb3665ca592e70fff5ccda526b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
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
      <div class="header">
        <div class="row">
          <div class="col-4">
            <FormattedDate date={weather.date} />

            <div class="descriptionOfWeather">
              <p>{weather.description}</p>
            </div>
            <div class="img">
              <img
                src={weather.icon}
                alt={weather.description}
                id="icon"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="main col-8">
            <div>
              <div class="nameTown">
                <h1>{message}</h1>
              </div>
              <div>
                <form id="form-search" onSubmit={handleSearch}>
                  <div class="row flex-start">
                    <input
                      type="search"
                      placeholder="Type a city..."
                      id="SearchEngine"
                      class="col-9 mb-3"
                      autocomplete="off"
                      onChange={updateCity}
                    />
                    <button
                      id="buttonSearch"
                      type="submit"
                      class="btn col-4"
                      title="Search"
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <button
                      id="buttonCurrent"
                      type="submit"
                      value="Current"
                      class="btn col-4"
                      title="Current location"
                    >
                      <i class="fa-solid fa-magnifying-glass-location"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="tempGeneralCover">
              <div class="row">
                <div class="degrees col-1">
                  {unit === "celcius" ? (
                    <p id="dataDegrees">{Math.round(temperature)}</p>
                  ) : (
                    <p id="dataDegrees">
                      {Math.round((temperature * 9) / 5 + 32)}
                    </p>
                  )}
                </div>
                <div class="celsiusContainer col-1">
                  <a href="/" class="celsius" onClick={ShowCelsius}>
                    °C
                  </a>{" "}
                </div>
                <div id="slash" class="col-1">
                  <p>|</p>
                </div>

                <div class="fahrContainer col-1">
                  <a href="/" class="fahrenheit" onClick={ShowFahrenheit}>
                    {" "}
                    °F{" "}
                  </a>{" "}
                </div>
              </div>
            </div>

            <div class="description1">
              <div class="dataFeltTemp">
                <p class="feltTemp ">Felt temp.</p>{" "}
                {unitForFeltTemp === "celcius" ? (
                  <span id="feelsLike">{Math.round(feltTemperature)} </span>
                ) : (
                  <span id="feelsLike">
                    {Math.round((feltTemperature * 9) / 5 + 32)}
                  </span>
                )}
                <a href="/" class="celsius1" onClick={ShowFeltCelsius}>
                  {" "}
                  °C
                </a>{" "}
                <p class="slash1">|</p>{" "}
                <a href="/" class="fahrenheit1" onClick={ShowFeltFahrenheit}>
                  °F
                </a>{" "}
              </div>
              <p class="otherInf">
                Atm. pressure:{" "}
                <span class="pressure"> {weather.pressure} </span> mb.
              </p>
              <p class="humidity">
                Humidity: <span class="dataHumidity"> {weather.humidity} </span>{" "}
                %
              </p>
              <p class="wind">
                Wind: <span class="dataWind"> {Math.round(weather.wind)} </span>{" "}
                km/h
              </p>
            </div>
            <WeatherForecast coordinates={weather.coordinates} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="header">
        <div class="row">
          <div class="col-4">
            <div class="currentDate">
              <div class="date">
                <p>12/12/2022</p>
              </div>
              <div class="currentTime">
                <p>09:05</p>
              </div>
              <div class="dayOfWeek">
                <p>Sunday</p>
              </div>
            </div>
            <div class="descriptionOfWeather">
              <p>Overcast Clouds</p>
            </div>
            <div class="img">
              <img
                src="http://openweathermap.org/img/wn/10d@2x.png"
                alt="icon weather"
                id="icon"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="main col-8">
            <div>
              <div class="nameTown">
                <h1>{message}</h1>
              </div>
              <div>
                <form id="form-search" onSubmit={handleSearch}>
                  <div class="row flex-start">
                    <input
                      type="search"
                      placeholder="Type a city..."
                      id="SearchEngine"
                      class="col-9 mb-3"
                      autocomplete="off"
                      onChange={updateCity}
                    />
                    <button
                      id="buttonSearch"
                      type="submit"
                      class="btn col-4"
                      title="Search"
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <button
                      id="buttonCurrent"
                      type="submit"
                      value="Current"
                      class="btn col-4"
                      title="Current location"
                    >
                      <i class="fa-solid fa-magnifying-glass-location"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="tempGeneralCover">
              <div class="row">
                <div class="degrees col-1">
                  <p id="dataDegrees">0</p>
                </div>
                <div class="celsiusContainer col-1">
                  <a href="/" class="celsius" onClick={ShowCelsius}>
                    °C
                  </a>{" "}
                </div>
                <div id="slash" class="col-1">
                  <p>|</p>
                </div>

                <div class="fahrContainer col-1">
                  <a href="/" class="fahrenheit" onClick={ShowFahrenheit}>
                    {" "}
                    °F{" "}
                  </a>{" "}
                </div>
              </div>
            </div>

            <div class="description1">
              <div class="dataFeltTemp">
                <p class="feltTemp ">Felt temp.</p>{" "}
                <span id="feelsLike">0 </span>{" "}
                <a href="/" class="celsius1" onClick={ShowCelsius}>
                  {" "}
                  °C
                </a>{" "}
                <p class="slash1">|</p>{" "}
                <a href="/" class="fahrenheit1" onClick={ShowFahrenheit}>
                  °F
                </a>{" "}
              </div>
              <p class="otherInf">
                Atm. pressure: <span class="pressure"> 960 </span> mb.
              </p>
              <p class="humidity">
                Humidity: <span class="dataHumidity"> 15 </span> %
              </p>
              <p class="wind">
                Wind: <span class="dataWind"> 1 </span> km/h
              </p>
            </div>
            <WeatherForecast />
          </div>
        </div>
      </div>
    );
  }
}
