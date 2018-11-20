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
    MapMarker.moveToLocation(this.data);
  }

  private createLink() {
    const link = document.createElement('a');
    link.href = "#";
    link.className = 'city-item';
    link.textContent = `${this.data.name}, ${this.data.sys.country}`;
    return link;
  }
}