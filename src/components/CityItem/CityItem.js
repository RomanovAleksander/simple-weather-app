import React from 'react';
import ApiService from '../../services/ApiService';
import './cityItem.scss';

export default function CityItem({ city, handleClick }) {
  return (
    <div className="city-item" key={city.woeid}>
      <img src={ApiService.getWeatherIcon(city.consolidated_weather[0].weather_state_abbr)}
           alt={`${city.consolidated_weather[0].weather_state_name}`}/>
      <div className="wrapper">
        <div className="title green">
          {city.title}, {city.parent.title}
          <span className="weather"> {city.consolidated_weather[0].weather_state_name}</span>
        </div>
        <div className="temp-container">
          <span
            className="temp">{city.consolidated_weather[0].the_temp.toString().substring(0, 4)} °С</span> temperature
          from
          {city.consolidated_weather[0].min_temp} to {city.consolidated_weather[0].max_temp} °С
        </div>
        <div>
          Geo coords {''}
          <span className="green coords" onClick={() => handleClick(city.title)}>
            [{city.parent.latt_long}]
          </span>
        </div>
      </div>
    </div>
  )
};
