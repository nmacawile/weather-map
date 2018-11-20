import { Debouncer } from './debouncer';
import { CitiesComponent } from './cities-component';
import { SearchService } from './search-service';

export class SearchComponent {
  searchform: HTMLFormElement;
  searchInput: HTMLElement;
  citiesComponent: CitiesComponent;
  typing = false;

  statusIndicator: HTMLElement;

  constructor() {
    this.citiesComponent = new CitiesComponent();
    this.searchform = document.getElementById('search-form') as HTMLFormElement;
    this.searchform.addEventListener('submit', e => e.preventDefault());
    this.searchInput = this.searchform['q'] as HTMLInputElement;

    this.searchInput.addEventListener('input', e => {
      this.citiesComponent.show();
      this.search((e.target as HTMLInputElement).value);
    });

    document.addEventListener('click', () => this.citiesComponent.hide());

    this.searchInput.addEventListener('click', e => {
      e.stopPropagation();
      this.citiesComponent.show();
    });

    this.searchInput.addEventListener('focus', () => this.citiesComponent.show());

    this.searchInput.addEventListener('keydown', e => {
      const command = this.mapKeyToCommand(e);
      if (command && !this.typing)
        this.citiesComponent.keyboardNavigate(command);
    });

    this.statusIndicator = document.getElementById('status');
  }

  showStatus(text, icon = '') {
    this.statusIndicator.classList.remove('hidden');
    let i = ''
    if (icon !== '') {
      i = `<i class='fas fa-${icon}'></i> `
    }

    this.statusIndicator.innerHTML = i + text;
  }

  hideStatus() {
    this.statusIndicator.classList.add('hidden');
  }

  search(query: string) {
    this.showStatus('User is typing...', 'keyboard');
    this.typing = true;
    Debouncer.debounce(async () => {
      this.showStatus('Loading...', 'spinner fa-spin');
      const cities = await SearchService.search(query);
      this.citiesComponent.build(cities);
      cities.length ?  this.hideStatus() : this.showStatus('No results found.', 'times');
      this.typing = false;
    }, 500);
  }

  private mapKeyToCommand(e) {
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13)
      e.preventDefault();

    let command;
    switch (e.keyCode) {
      case 40:
        command = 'down';
        break;
      case 38:
        command = 'up';
        break;
      case 13:
        command = 'enter';
    }
    return command;
  }
}
