export function createPopupFrom(data: any) {
  let header = '';
  if (data.sys && data.sys.country)
    header = 
      `<h3 class="popup-header">
         ${data.name}, ${data.sys.country}
         <img src="https://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png">  
       </h3>`
  let template;
  try {
    template = `
    <div class="popup">    
      ${header}   
      <div class="popup-weather-main">
        <div class="popup-weather-img">
          <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        </div>
        <h4 class="popup-temp"><span class="value">${data.main.temp}</span>
        <span class="unit">°C</span></h4>
      </div>
      <div class="popup-weather-desc">${data.weather[0].description.toUpperCase()}</div>
    </div>
    `;
  } catch(error) {
    template = `
      <i class="fas fa-exclamation"></i>
      There was a problem.`;
  }
  return template;
}