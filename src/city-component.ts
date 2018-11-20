import { MapMarker } from './map-marker';

export class CityComponent {
  city: HTMLElement;
  link: HTMLElement;
  constructor(private data: any, index: number) {
    this.city = document.createElement('li');
    this.link = this.createLink();
    this.link.tabIndex = -1;
    this.link.dataset['index'] = String(index);
    this.city.appendChild(this.link);
  }

  highlight() {
    this.link.classList.add('highlighted');
  }

  unhighlight() {
    this.link.classList.remove('highlighted');
  }

  moveMapMarker() {
    MapMarker.moveTo(
      this.data.coord.lat,
      this.data.coord.lon,
      this.popupTemplate(),
    );
  }

  private createLink() {
    const link = document.createElement('a');
    link.href = "#";
    link.className = 'city-item';
    link.textContent = `${this.data.name}, ${this.data.sys.country}`;
    return link;
  }

  private popupTemplate() {
    return `
    <div class="popup">
      <h3 class="popup-header">
        ${this.data.name}, ${this.data.sys.country}
        <img src="https://openweathermap.org/images/flags/${this.data.sys.country.toLowerCase()}.png">
      </h3>
      <div class="popup-weather-main">
        <div class="popup-weather-img">
          <img src="https://openweathermap.org/img/w/${this.data.weather[0].icon}.png">
        </div>
        <h4 class="popup-temp"><span class="value">${this.data.main.temp}</span>
        <span class="unit">°C</span></h4>
      </div>
      <div class="popup-weather-desc">${this.data.weather[0].description.toUpperCase()}</div>
    </div>
    `
  }
}