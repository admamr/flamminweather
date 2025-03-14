import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FlamminWeather.css";

const FlamminWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "adb885fffc5e595767dbd3303d0a3cd4";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(
        "Error fetching weather data",
        error.response?.data || error
      );
      setWeather(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  const getBackgroundVideo = () => {
    if (!weather) return process.env.PUBLIC_URL + "/weather/default.mp4";
    const mainWeather = weather.weather[0].main.toLowerCase();
    if (mainWeather.includes("cloud"))
      return process.env.PUBLIC_URL + "/weather/cloudy.mp4";
    if (mainWeather.includes("rain"))
      return process.env.PUBLIC_URL + "/weather/rainy.mp4";
    if (mainWeather.includes("clear"))
      return process.env.PUBLIC_URL + "/weather/sunny.mp4";
    if (mainWeather.includes("snow"))
      return process.env.PUBLIC_URL + "/weather/snowy.mp4";
    return process.env.PUBLIC_URL + "/weather/default.mp4";
  };

  return (
    <div className="weather-container">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="background-video"
        key={getBackgroundVideo()}
      >
        <source src={getBackgroundVideo()} type="video/mp4" />
      </video>

      {/* Weather UI */}
      <div className="weather-content">
        <h1>Flammin Weather</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeather}>Get Weather</button>
        {weather && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlamminWeather;
