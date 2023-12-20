const TOKEN = import.meta.env.VITE_TOKEN;

const CITIES__BASE_URL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=`;
const WEATHER_BASE_URL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=`;
const FORECAST_BASE_URL = `http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=`;

export const searchCities = async (term) => {
  const response = await fetch(`${CITIES__BASE_URL}${term}`);
  const cities = await response.json();

  if (cities.length === 0) {
    window.alert('Nenhuma cidade encontrada');
  }

  return cities;
};

export const getWeatherByCity = async (cityURL) => {
  const response = await fetch(`${WEATHER_BASE_URL}${cityURL}`);
  const {
    location: { name, country },
    current: { temp_c: temp, condition },
  } = await response.json();

  return {
    temp,
    condition: condition.text,
    icon: condition.icon,
    country,
    name,
    url: cityURL,
  };
};

export const getForecastByCity = async (cityURL, days) => {
  const response = await fetch(`${FORECAST_BASE_URL}${cityURL}&days=${days}`);
  const { forecast: { forecastday } } = await response.json();

  return forecastday;
};
