# UniWeather

UniWeather is a JavaScript library that unifies weather data from official APIs across the US, Canada, Mexico, and major European countries (Spain, France, Germany, UK, Italy, and Netherlands). It provides a seamless interface for fetching and normalizing weather information into a consistent format, making it easier to integrate global weather data into your applications.

## Features
- Fetch weather data from multiple countries using their official weather service APIs.
- Normalize diverse API responses into a unified format.
- Support for various countries with detailed error handling.
- Lightweight and easy-to-use interface for developers.

## Installation

```bash
npm install uniweather
```

## Usage

```javascript
import UniWeather from 'uniweather';

const apiKeys = {
  canada: 'your-canada-api-key',
  mexico: 'your-mexico-api-key',
  uk: 'your-uk-api-key',
};

const uniWeather = new UniWeather(apiKeys);

(async () => {
  try {
    const weatherData = await uniWeather.fetchWeather('US', '39.7456,-97.0892');
    console.log(weatherData);
  } catch (error) {
    console.error(error);
  }
})();
```

## Supported Countries

UniWeather currently supports the following countries:

### North America
- **United States (US):** Requires latitude and longitude in the format "latitude,longitude" (e.g., "39.7456,-97.0892").
- **Canada:** Requires latitude and longitude in the same format, with an API key.
- **Mexico:** Requires latitude and longitude in the same format, with an API key.

### Europe
- **Spain:** Specify the city name.
- **France:** Specify the city name.
- **Germany:** Specify the city name.
- **United Kingdom (UK):** Specify the city name, with an API key.
- **Italy:** Specify the city name.
- **Netherlands:** Specify the city name.

## API

### `fetchWeather(country, location)`
Fetches weather data for the specified country and location.

- **Parameters:**
  - `country` (string): The country code (e.g., "US", "Canada", "Mexico", "UK").
  - `location` (string): For US, Canada, and Mexico, it must be a string in the format "latitude,longitude" (e.g., "39.7456,-97.0892"). For European countries, it must be the city name.

- **Returns:**
  A normalized weather data object:
  ```javascript
  {
    temperature: <number>,
    conditions: <string>,
    location: <string>,
  }
  ```

### Error Handling
- Throws an error if the country is unsupported.
- Validates `location` format for latitude and longitude.
- Handles API response errors.

## Example Output

For a US location with coordinates `39.7456,-97.0892`:
```javascript
{
  temperature: 25,
  conditions: 'Clear skies',
  location: 'City Name',
}
```

## Contributions
Contributions are welcome! Please submit a pull request or create an issue if you encounter a bug or have a feature request.

## License
UniWeather is licensed under the MIT License.
