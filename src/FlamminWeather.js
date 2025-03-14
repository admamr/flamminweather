import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FlamminWeather.css";

const FlamminWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [backgroundVideo, setBackgroundVideo] = useState(
    `${process.env.PUBLIC_URL}/weather/default.mp4`
  );
  const API_KEY = "adb885fffc5e595767dbd3303d0a3cd4";

  useEffect(() => {
    if (weather) {
      const mainWeather = weather.weather[0].main.toLowerCase();
      let newVideo = `${process.env.PUBLIC_URL}/weather/default.mp4`;

      if (mainWeather.includes("cloud"))
        newVideo = `${process.env.PUBLIC_URL}/weather/cloudy.mp4`;
      else if (mainWeather.includes("rain"))
        newVideo = `${process.env.PUBLIC_URL}/weather/rainy.mp4`;
      else if (mainWeather.includes("clear"))
        newVideo = `${process.env.PUBLIC_URL}/weather/sunny.mp4`;
      else if (mainWeather.includes("snow"))
        newVideo = `${process.env.PUBLIC_URL}/weather/snowy.mp4`;

      setBackgroundVideo(newVideo);
    }
  }, [weather]);

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

  return (
    <div className="weather-container">
      {/* Video Background */}
      <video
        key={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src={backgroundVideo} type="video/mp4" />
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
