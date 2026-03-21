# Weather Application

A client-side weather app that fetches real-time weather data and 5-day forecasts for cities using the SheCodes Weather API.

## Features
- Search weather by city name
- Displays current temperature, humidity, wind speed, and weather condition
- 5-day forecast
- Celsius / Fahrenheit unit conversion
- Responsive design with Bootstrap 5

## Tech Stack
- **HTML5 / CSS3 / JavaScript (ES6)**
- **Parcel Bundler v1** (build tool)
- **Axios** (HTTP requests via CDN)
- **Bootstrap 5.3.3** (styling via CDN)
- **SheCodes Weather API** (weather data)

## Project Structure
```
.
├── index.html          # App entry point
├── package.json        # Dependencies and scripts
└── src/
    ├── index.js        # Main JS logic (API, DOM, unit conversion)
    ├── styles.css      # Custom CSS
    └── img/            # Background images
```

## Development
- `npm install` — Install dependencies
- `npm start` — Start Parcel dev server on port 5000 (0.0.0.0)
- `npm run build` — Build production bundle into `dist/`

## Deployment
- **Type:** Static site
- **Build command:** `npm run build`
- **Public directory:** `dist/`
