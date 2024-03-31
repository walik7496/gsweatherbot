// Configuration
var apiToken = "token";
var opapi = "api";
var appUrl = "appurl";
var apiUrl = "https://api.telegram.org/bot" + apiToken;
var cityDataProperty = PropertiesService.getScriptProperties(); // Script properties for storing user's city data

// Set webhook
function setWebhook() {
  var url = apiUrl + "/setwebhook?url=" + appUrl;
  var res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

// Handle webhook
function doPost(e) {
  var webhookData = JSON.parse(e.postData.contents);
  var from = webhookData.message.from.id;
  var text = webhookData.message.text;
  var sendText = "";

  if (text === "/weather") {
    var city = cityDataProperty.getProperty(from); // Get user's city
    if (city) {
      try {
        var weatherData = getWeather(city); // Get weather data for 5 days
        sendText = "Weather forecast in the city " + city + " for 5 days:\n";
        for (var i = 0; i < weatherData.list.length; i += 8) { // Skip every 8 entries to get 5 days forecast
          var forecast = weatherData.list[i];
          var date = new Date(forecast.dt * 1000);
          sendText += "Date: " + date.toDateString() + ", Description: " + forecast.weather[0].description + ", Temperature: " + forecast.main.temp + "°C\n";
        }
      } catch (error) {
        sendText = "Failed to get weather data.";
      }
    } else {
      sendText = "Please enter the /city command first to set the city.";
    }
  } else if (text === "/start") {
    sendText = "Type /weather to get the weather, or set your city using the /city command.";
  } else if (text === "/city") {
    sendText = "Please enter the name of your city:";
  } else if (text.length > 1 && text !== "/start" && text !== "/weather" && text !== "/city") {
    cityDataProperty.setProperty(from, text); // Set user's city
    sendText = "City installed successfully!";
  }

  var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + encodeURIComponent(sendText);
  var opts = { "muteHttpExceptions": true };
  UrlFetchApp.fetch(url, opts).getContentText();
}

function doGet(e) {
  return ContentService.createTextOutput("Method GET not allowed");
}

// Function to get weather data from OpenWeatherMap API
function getWeather(city) {
  var units = "metric"; // Units for temperature (can be 'metric', 'imperial', or 'standard')
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + opapi;
  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response.getContentText());
}
