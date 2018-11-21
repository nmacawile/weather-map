# Weather Map

[Link to app](https://nmacawile.github.io/weather-map)

An app that shows the current weather and temperature of a location on the map. It utilizes OpenWeatherMap API to retrieve accurate weather data of any location all around the world. 

[Project page](https://www.theodinproject.com/lessons/weather-app)

## Features

- **Asynchronous search** makes use  of asynchronous JavaScript to show the query results as soon as the user stops typing.
- **User location** shows the current weather info on the user's detected location (requires permission).
- **Moveable marker** allows the user to drag the marker anywhere on the map and get the weather info at that location.

## Usage

Type the name of a city or an area on the search bar.

![1542802770486](/readme_images/1542802770486.png)

It will show you a list of places that fully match your query along with their country code.

![1542802794818](/readme_images/1542802794818.png)

Choose the name of the place from the list to locate it on the map.

![1542802820413](/readme_images/1542802820413.png)

To minimize ambiguity, you can append your query with a comma (`,`) followed by the 2-letter country code as such.

![1542803090956](/readme_images/1542803090956.png)

It is also possible to drag the map marker anywhere on the map to show the weather info at that point.

![1542803436001](/readme_images/1542803436001.png)

## Tools / Services used

- **[ParcelJS](https://parceljs.org/)** Easily setup a JavaScript project environment with minimal configuration. It has support for TypeScript, HMR, Sass, and DevServer out of the box.
- **[OpenWeatherMap](https://openweathermap.org/)** An easy to use weather API.
- **[Leaflet library](https://leafletjs.com/)** Provides a lightweight and convenient way to build a mapping app.
- **[OpenStreetMap](https://www.openstreetmap.org/)** A highly-detailed map that doesn't require API keys to use.