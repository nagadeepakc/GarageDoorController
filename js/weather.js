$(document).ready(function() {

  getWeather();

  // update every 6 minutes
  setInterval( function(){
     getWeather();
     console.log('refreshing data');
  }, 360000);

  // simpleWeather.js
  function getWeather() {
    $.simpleWeather({
      location: '23285 Fallen Hills Dr. Ashburn, VA',
      unit: 'f',
      success: function(weather) {
        html = '<h5>It\'s currently ' + weather.temp + '&deg;' + weather.units.temp + ' and ' + (weather.currently).toLowerCase() + ' in ' + weather.city + ', ' + weather.region + '.</h5><br>';
        $("#weather").html(html);
      },
      error: function(error) {
        $("#weather").html('<h5>Couldn\'t fetch data. Check console.');
        console.log(error);
      }
    });
  }

});
