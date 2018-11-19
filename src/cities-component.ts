import { CityComponent } from './city-component';

export class CitiesComponent {
  citiesContainer: HTMLElement;
  citiesList: HTMLElement;
  cities: CityComponent[];
  highlighted = -1;
  hidden = true;

  constructor() {
    this.citiesContainer = document.getElementById('cities-component');

    document.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('city-item')) {
        e.preventDefault();
        this.highlight(+target.dataset['index']);
        this.loadHiglighted();
      }
    });
  }

  show() {
    this.citiesContainer.classList.remove('hidden');
    this.hidden = false;
  }

  hide() {
    this.citiesContainer.classList.add('hidden');
    this.hidden = true;
  }

  clear() {
    if (this.citiesList) {
      this.citiesContainer.removeChild(this.citiesList);
      this.highlighted = -1;
      this.citiesList = null;
    }
  }

  build(cities: any[]) {
    this.clear();

    this.cities = cities.map((city, i) => {
      return new CityComponent(city, i);
    });

    if (this.cities.length) {
      this.citiesList = document.createElement('ul');
      this.citiesList.className = 'cities-list';
      this.citiesContainer.append(this.citiesList);

      this.highlighted = 0;
      this.cities[0].highlight();

      this.cities.forEach(cityComponent => {
        this.citiesList.appendChild(cityComponent.city);
      });
    }
  }

  keyboardNavigate(command: string) {
    if (this.hidden) this.show();
    else {
      if (command === 'down') {
        this.highlight(this.highlighted + 1);
      } else if (command === 'up') {
        this.highlight(this.highlighted - 1);
      } else if (command === 'enter') {
        this.loadHiglighted();
      }
    }
  }

  highlight(index: number) {
    if (index >= 0 && index < this.cities.length) {
      this.cities[this.highlighted].unhighlight();
      this.highlighted = index;
      this.cities[this.highlighted].highlight();
    }
  }

  loadHiglighted() {
    if (this.highlighted >= 0 && this.highlighted < this.cities.length) {
      this.hide();
      this.cities[this.highlighted].moveMapMarker();
    } else console.log('nope');
  }
}
