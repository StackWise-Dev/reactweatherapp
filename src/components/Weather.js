import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import sun from "../images/clear.png";
import clouds from "../images/clouds.png";
import haze from "../images/haze.png";
import rain from "../images/rain.png";
import partial from "../images/cloudsun.png";
import smoke from "../images/smoke.png";

export default function Weather() {
  let [input, setInput] = useState(null);
  let [search, setSearch] = useState("rawalpindi");
  let [weatherCondition, setWeatherCondition] = useState("");
  let [weatherImage, setWeatherImage] = useState();

  let inputEvent = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      let data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=422635aabcd517643f69a45207e4c3bf`
      );
      let jsonData = data.json();
      let wCondition = jsonData;
      jsonData.then((readData) => setInput(readData.main));
      wCondition.then((weatherData) =>
        setWeatherCondition(weatherData.weather[0].main)
      );

      let check = weatherCondition;
      console.log(weatherCondition);
      if (check === "Clear") {
        setWeatherImage(sun);
      } else if (check === "Clouds") {
        setWeatherImage(clouds);
      } else if (check === "Haze") {
        setWeatherImage(haze);
      } else if (check === "Smoke") {
        setWeatherImage(smoke);
      } else if (check === "Rain") {
        setWeatherImage(rain);
      } else if (check === "Partly Cloudy") {
        setWeatherImage(partial);
      } else {
        setWeatherImage(sun);
      }
    }
    getData();
  }, [search, weatherCondition]);

  return (
    <>
      <img src={weatherImage} alt="sun" className="top-icon" />
      <div className="col-6 main-wrapper shadow-lg p-4 rounded-5">
        <input
          type="search"
          name="search"
          id="search"
          onChange={inputEvent}
          placeholder="Enter city name"
          className="w-100 mt-5 rounded-2 p-3 border-0 shadow"
        />

        {!input ? (
          <p>Sorry! No data found</p>
        ) : (
          <>
            <div className="weather-info mt-5 pt-2 d-flex flex-column align-items-center">
              <i className="fa-sharp fa-solid fa-location-dot"></i>
              <h6 className="mt-2"> {search} </h6>
              <h1>{input.temp} °C</h1>
              <p>{weatherCondition}</p>
            </div>
            <div className="col-10 mx-auto mt-3 text-center">
              <p>Feels Like: {input.feels_like}</p>
              <p>Humidity: {input.humidity}</p>
              <p>Minimum temp: {input.temp_min}</p>
              <p>Maximym temp: {input.temp_max}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
