import 'normalize.css';
import { appid } from './appid';

const searchform = document.getElementById('search-form') as HTMLFormElement;

searchform.addEventListener('submit', async e => {
  e.preventDefault();
  console.log('loading');

  const url = 'https://api.openweathermap.org/data/2.5/find';
  const q = searchform['q'].value;
  const units = 'metric';
  const params = { q, appid, units };

  try {
    if (q) {
      const locationQuery = await fetch(url + stringifyParams(params));
      const locationData = await locationQuery.json();
      console.log(locationData.list);
    }
  } catch (error) {
    console.log(error);
  }
  console.log('done!!');
});

function stringifyParams(rawParams: object, allowBlanks: boolean = false) {
  let stringParams: String[] = [];
  for (let key in rawParams) {
    let value = rawParams[key];
    if ((value && value !== '') || allowBlanks)
      stringParams.push(`${key}=${value}`);
  }
  return '?' + stringParams.join('&');
}
