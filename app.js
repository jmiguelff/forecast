window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone= document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/e0b2c4a105da0da2d5752520b9e41541/${lat},${long}`;

      // Get data from the API
      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from API
          let celsius = (temperature - 32) * (5/9); 

          temperatureDegree.textContent = Math.floor(celsius);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          
          // Set Icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === '°F') {
              temperatureSpan.textContent = '°C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = '°F';
              temperatureDegree.textContent = Math.floor(temperature);
            }
          });
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});