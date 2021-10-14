import React, { useState, useEffect }  from 'react';
import ApiService from "../services/ApiService";
import { setBackgroundColor } from '../utils/background';
import Search from "./Search/Search";

function App() {
  const [latitude, setLatitude] = useState(false);
  const [longitude, setLongitude] = useState(false);
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherData(`?lattlong=${latitude},${longitude}`, false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (query !== '') {
      getWeatherData(`?query=${query}`, true);
    }
  }, [query]);

  const getWeatherData = (url, isSearch) => {
    ApiService.getWeather(`/api/location/search/${url}`)
      .then((data) => {
        if (!isSearch) {
          ApiService.getWeather(`/api/location/${data[0].woeid}/`)
            .then((data) => setWeatherData(data))
            .catch((err) => setError(err));
        } else {
          setWeatherData(data);
        }
      })
      .catch((err) => setError(err));
  }

  const onSubmit = (query) => {
    setQuery(query);
  };

  return (
    <>
      <Search onSubmit={onSubmit}/>
      {error && (
        <h3>{error.message}</h3>
      )}
      {weatherData && !query && (
        <div className="container" style={{
          backgroundColor: setBackgroundColor(weatherData.consolidated_weather[0].the_temp)
        }}>
          <img src={ApiService.getWeatherIcon(weatherData.consolidated_weather[0].weather_state_abbr)}
               alt={`${weatherData.consolidated_weather[0].weather_state_name}`}/>
        </div>
      )}
    </>
  );
}

export default App;
