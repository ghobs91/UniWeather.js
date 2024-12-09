// UniWeather.js

class UniWeather {
  constructor(apiKeys) {
    this.apiKeys = apiKeys;
  }

  async fetchWeather(country, location) {
    if (typeof location !== "string" || !location.includes(",")) {
      throw new Error(
        'Location must be a string in the format "latitude,longitude" (e.g., "39.7456,-97.0892").',
      );
    }
    switch (country.toLowerCase()) {
      case "us":
        return this.fetchUSWeather(location);
      case "canada":
        return this.fetchCanadaWeather(location);
      case "mexico":
        return this.fetchMexicoWeather(location);
      case "europe":
        return this.fetchEuropeWeather(location);
      default:
        throw new Error(`Unsupported country: ${country}`);
    }
  }

  async fetchUSWeather(location) {
    const url = `https://api.weather.gov/points/${location}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch US weather data");
    }
    const data = await response.json();
    return this.normalizeUSWeather(data);
  }

  normalizeUSWeather(data) {
    return {
      temperature: data.properties.temperature.value,
      conditions: data.properties.weather,
      location: data.properties.relativeLocation.properties.city,
    };
  }

  async fetchCanadaWeather(location) {
    const url = `https://api.weather.gc.ca/city/${location}?apiKey=${this.apiKeys.canada}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Canada weather data");
    }
    const data = await response.json();
    return this.normalizeCanadaWeather(data);
  }

  normalizeCanadaWeather(data) {
    return {
      temperature: data.current.temperature,
      conditions: data.current.condition,
      location: data.location,
    };
  }

  async fetchMexicoWeather(location) {
    const url = `https://api.mexicoweather.mx/data/${location}?key=${this.apiKeys.mexico}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Mexico weather data");
    }
    const data = await response.json();
    return this.normalizeMexicoWeather(data);
  }

  normalizeMexicoWeather(data) {
    return {
      temperature: data.temp.actual,
      conditions: data.weather.description,
      location: data.city,
    };
  }

  async fetchEuropeWeather(location) {
    const country = location.country.toLowerCase();
    switch (country) {
      case "spain":
        return this.fetchSpainWeather(location.city);
      case "france":
        return this.fetchFranceWeather(location.city);
      case "germany":
        return this.fetchGermanyWeather(location.city);
      case "uk":
        return this.fetchUKWeather(location.city);
      case "italy":
        return this.fetchItalyWeather(location.city);
      case "netherlands":
        return this.fetchNetherlandsWeather(location.city);
      default:
        throw new Error(`Unsupported European country: ${country}`);
    }
  }

  async fetchSpainWeather(city) {
    const url = `https://api.spainweather.es/city/${city}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Spain weather data");
    }
    const data = await response.json();
    return this.normalizeSpainWeather(data);
  }

  normalizeSpainWeather(data) {
    return {
      temperature: data.current.temperature,
      conditions: data.current.conditions,
      location: data.city,
    };
  }

  async fetchFranceWeather(city) {
    const url = `https://api.meteofrance.fr/city/${city}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch France weather data");
    }
    const data = await response.json();
    return this.normalizeFranceWeather(data);
  }

  normalizeFranceWeather(data) {
    return {
      temperature: data.current.temperature,
      conditions: data.current.weather_description,
      location: data.city,
    };
  }

  async fetchGermanyWeather(city) {
    const url = `https://api.dwd.de/weather/${city}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Germany weather data");
    }
    const data = await response.json();
    return this.normalizeGermanyWeather(data);
  }

  normalizeGermanyWeather(data) {
    return {
      temperature: data.current.temp,
      conditions: data.current.conditions,
      location: data.city,
    };
  }

  async fetchUKWeather(city) {
    const url = `https://api.metoffice.gov.uk/location/${city}?key=${this.apiKeys.uk}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch UK weather data");
    }
    const data = await response.json();
    return this.normalizeUKWeather(data);
  }

  normalizeUKWeather(data) {
    return {
      temperature: data.current.temperature,
      conditions: data.current.weather_conditions,
      location: data.city,
    };
  }

  async fetchItalyWeather(city) {
    const url = `https://api.meteo.it/city/${city}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Italy weather data");
    }
    const data = await response.json();
    return this.normalizeItalyWeather(data);
  }

  normalizeItalyWeather(data) {
    return {
      temperature: data.current.temp,
      conditions: data.current.weather,
      location: data.city,
    };
  }

  async fetchNetherlandsWeather(city) {
    const url = `https://api.knmi.nl/city/${city}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Netherlands weather data");
    }
    const data = await response.json();
    return this.normalizeNetherlandsWeather(data);
  }

  normalizeNetherlandsWeather(data) {
    return {
      temperature: data.current.temp,
      conditions: data.current.conditions,
      location: data.city,
    };
  }
}

// Usage Example
// const uniWeather = new UniWeather({
//   canada: 'your-canada-api-key',
//   mexico: 'your-mexico-api-key',
//   uk: 'your-uk-api-key'
// });
// uniWeather.fetchWeather('US', '39.7456,-97.0892').then(console.log).catch(console.error);

export default UniWeather;
