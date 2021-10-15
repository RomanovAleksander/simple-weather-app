import React, { useState, useEffect }  from 'react';
import ApiService from '../services/ApiService';
import { setBackgroundColor } from '../utils/background';
import Search from './Search/Search';
import CityItem from './CityItem/CityItem';

function App() {
  const [latitude, setLatitude] = useState(false);
  const [longitude, setLongitude] = useState(false);
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherData(`?lattlong=${latitude},${longitude}`);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (query !== '') {
      getWeatherData(`?query=${query}`);
    }
  }, [query]);

  const getWeatherData = (url) => {
    ApiService.getWeather(`/api/location/search/${url}`)
      .then((data) => {
        ApiService.getWeather(`/api/location/${data[0].woeid}/`)
          .then((data) => {
            setWeatherData(data);
            setTemp(data.consolidated_weather[0].the_temp);
            setError(null);
          })
          .catch((err) => setError(err));
      })
      .catch((err) => setError(err));
  }

  const onSubmit = (query) => {
    setWeatherData(null);
    setQuery(query);
  };

  const handleClick = (title) => {
    setQuery('');
    getWeatherData(`?query=${title}`);
  };

  const handleChange = (event) => {
    setTemp(event.target.value);
  };

  return (
    <>
      <Search onSubmit={onSubmit}/>
      {error && (
        <div className="container">
          <h3>Ops... Something went wrong</h3>
        </div>
      )}
      {weatherData && !query && (
        <div className="container" style={{
          backgroundColor: setBackgroundColor(parseFloat(temp))
        }}>
          <img src={ApiService.getWeatherIcon(weatherData.consolidated_weather[0].weather_state_abbr)}
               alt={`${weatherData.consolidated_weather[0].weather_state_name}`}/>
          {temp && (
            <div className="slider-container">
              <label className="label">
                Temperature: {Math.round(parseFloat(temp))} °С
              </label>
              <input
                className="slider"
                type="range"
                min="-60"
                max="60"
                value={temp}
                onChange={handleChange}
                step="1"
              />
            </div>
          )}
        </div>
      )}
      {weatherData && query && (
        <CityItem city={weatherData} handleClick={handleClick}/>
      )}
    </>
  );
}

export default App;
