import React, { useState, useEffect }  from 'react';
import ApiService from "./services/ApiService";
import { setBackgroundColor } from './utils/background';

function App() {
  const [latitude, setLatitude] = useState(false);
  const [longitude, setLongitude] = useState(false);
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
      ApiService.getWeather(`/api/location/search/?lattlong=${latitude},${longitude}`)
        .then((data) => {
          ApiService.getWeather(`/api/location/${data[0].woeid}/`)
            .then((data) => setWeatherData(data))
            .catch((err) => setError(err));
        })
        .catch((err) => setError(err));
    }
  }, [latitude, longitude]);

  return (
    <>
      {error && (
        <h3>{error.message}</h3>
      )}
      {weatherData && (
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
