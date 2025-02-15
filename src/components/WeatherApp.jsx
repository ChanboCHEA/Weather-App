import React, { useState, useEffect } from "react";
import loadingGif from "../assets/images/loading.gif";
import sunny from "../assets/images/sunny.png";
import snowy from "../assets/images/snowy.png";
import rainy from "../assets/images/rainy.png";
import cloudy from "../assets/images/cloudy.png";

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const api_key = "b7470797dd193aba409537b8e6a1d8d1";

  useEffect(() => {
    const fectDefaultWeather = async () => {
      const defaultLocation = "Phnom Penh";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
      setLoading(false);
    };
    fectDefaultWeather();
  }, []);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(searchData);
        setLocation("");
      }
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  /*  const backgroundImages = {
    Clear: "linear-gradient(to right, #fab 07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5BC8FB, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #5BC8FB, #80eaff)",
  }; */

  const backgroundImages = {
    Clear: "linear-gradient(to right, #fab07c, #fcd283)",
    Clouds: "linear-gradient(to right, #87ceeb, #add8e6)",
    Rain: "linear-gradient(to right, #4682b4, #6495ed)",
    Snow: "linear-gradient(to right, #ffffff, #add8e6)",
    Haze: "linear-gradient(to right, #808080, #cccccc)",
    Mist: "linear-gradient(to right, #c0c0c0, #f0f8ff)",
  };

  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main]
    : "linear-gradient(to right, #f3b07c, #fcd283)";

  const currentDate = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const year = currentDate.getFullYear();

  const fromattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;

  return (
    <div className="container" style={{ backgroundImage }}>
      <div
        className="weather-app"
        style={{
          backgroundImage: backgroundImage,
        }}
      >
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        {loading ? (
          <img className="loader" src={loadingGif} alt="loading" />
        ) : data.notFound ? (
          <div className="not-found">Not-found 😥</div>
        ) : (
          <>
            <div className="weather">
              <img src={weatherImage} alt="suuny" />
              <div className="weather-type">
                {data.weather ? data.weather[0].main : null}
              </div>
              <div className="temp">
                {data.main ? `${Math.floor(data.main.temp)}°C` : null}
              </div>
            </div>
            <div className="weather-date">
              <p>{fromattedDate}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">
                  {data.main ? data.main.humidity : null} %
                </div>
              </div>
              <div className="wind">
                <div className="data-name">wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">
                  {data.wind ? data.wind.speed : null} km/h
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
