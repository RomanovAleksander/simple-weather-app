class ApiService {
  _url = 'https://www.metaweather.com';
  _prefix = 'https://cors-anywere.herokuapp.com/'

  errObj = (url, status) => {
    return {
      message: `Invalid request: ${url}, status ${status}`,
      status: status
    }
  }

  async fetchData(url, option) {
    const res = await fetch(`${this._prefix}${this._url}${url}`, option);
    if (!res.ok) {
      throw this.errObj(`${this._url}${url}`, res.status);
    }
    return res.json();
  }

  async getWeather(url) {
    return this.fetchData(url, {
      cors: 'no-cors'
    })
  }

  getWeatherIcon(weather_state_abbr) {
    return `${this._url}/static/img/weather/png/64/${weather_state_abbr}.png`;
  }
}

export default new ApiService();
