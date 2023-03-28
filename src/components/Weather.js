import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import './Weather.css';

class Weather extends Component {
  state = {
    cities: [
      { name: 'Santiago, Chile', id: 1 },
      { name: 'New York, USA', id: 2 },
      { name: 'Caracas, Venezuela', id: 3 },
      { name: 'Madrid, España', id: 4 },
      { name: 'Toronto, Canada', id: 5 },
      { name: 'Paris, Francia', id: 6 }
    ],
    selectedCity: null,
    weatherData: null,
    loading: true
  };

  componentDidMount() {
    this.getWeatherData(this.state.cities[0].name);
  }

  getWeatherData = (city) => {
    const API_KEY = 'c390381fe9a60f05cac4c37e0b045ad9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ weatherData: data, loading: false });
      });
  };

  handleCityChange = (event) => {
    const cityName = event.target.value;
    this.setState({ selectedCity: cityName, loading: true });
    this.getWeatherData(cityName);
  };

  render() {
    const { cities, selectedCity, weatherData, loading } = this.state;
  
    return (
      <div className="weather-container">
        <div className="dropdown">
          <select value={selectedCity} onChange={this.handleCityChange}>
            <option value="" disabled>
              Elige la ciudad
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        ) : (
          weatherData && (
            <div className="weather-card">
              <h1>Clima en {weatherData.name}:</h1>
              <p>Temperatura actual: {weatherData.main.temp}°C</p>
              <p>Descripción: {weatherData.weather[0].description}</p>
              <br />
            </div>
          )
        )}
      </div>
    );
  }
}

export default Weather;