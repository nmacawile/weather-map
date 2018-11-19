export function stringifyParams(rawParams: object, allowBlanks: boolean = false) {
  let stringParams: String[] = [];
  for (let key in rawParams) {
    let value = rawParams[key];
    if ((value && value !== '') || allowBlanks)
      stringParams.push(`${key}=${value}`);
  }
  return '?' + stringParams.join('&');
}