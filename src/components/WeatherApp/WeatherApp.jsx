import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import pressure_icon from '../assets/pressure.png';
import feels from '../assets/feels.svg';

const WeatherApp = () => {

    const [weatherData, setWeatherData] = useState(
        {
            icon: '04d',
            main: 'Berlin',
            temp: 20,
            humidity: 74,
            pressure: 1015,
            feels_like: '-7',
            wind: 5,
        }
    );

    let api_key = '7f918177e620c068c5a8f3ce377dcb72';

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');

        if(element[0].value !== '') {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setWeatherData({
                    icon: data.weather[0].icon,
                    main: data.name,
                    temp: Math.floor(data.main.temp),
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    feels_like: data.main.feels_like,
                    wind: Math.floor(data.wind.speed),
                })
            })
        }
        else {
            return 0;
        }
    }
    
    return (
        <div className="container">
            <div className='top-bar'>
                <input type="text" className="cityInput" placeholder='Search'/>
                <div className="search-icon" onClick={() => {search()}}>
                    <img src={search_icon} alt=''/>
                </div>
            </div>
            <div className="weather-image">
                <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt='' />
            </div>
            <div className="weather-temp">{weatherData.temp}°C</div>
            <div className="weather-location">{weatherData.main}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity} %</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-percent">{weatherData.wind} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
                {/* <div className="element">
                    <img src={pressure_icon} alt="" className="icon" />
                    <div className="data">
                        <div className='pressure-percent'>{weatherData.pressure} hPa</div>
                        <div className="text">Pressure</div>
                    </div>
                </div> */}
                {/* <div className="element">
                    <img src={feels} alt="" className="icon" />
                    <div className="data">
                        <div className="feels-percent">{weatherData.feels_like}°C</div>
                        <div className="text">Feels Like</div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default WeatherApp