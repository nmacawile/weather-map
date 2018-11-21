import { appid } from './appid';
import { stringifyParams } from './stringify-params';

export class SearchService {
  static async search(q) {
    const url = 'https://api.openweathermap.org/data/2.5/find';
    const units = 'metric';
    const params = { q, appid, units };
    let results = [];

    try {
      if (q && q.length > 2) {
        const locationQuery = await fetch(url + stringifyParams(params));
        const locationData = await locationQuery.json();
        results = locationData.list;
      }
    } catch (error) {
      console.log(error);
    }
    return results;
  }

  static async latLong(lat, lon) {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const units = 'metric';
    const params = { lat, lon, appid, units };
    let result;

    try {
      const locationQuery = await fetch(url + stringifyParams(params));
      const locationData = await locationQuery.json();
      result = locationData;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
