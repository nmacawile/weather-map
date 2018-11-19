export class Debouncer {
  private static timeout: number;

  static debounce(fn, delay) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => fn(), delay);
  }
}