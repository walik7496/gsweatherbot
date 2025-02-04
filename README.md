= Telegram Weather Bot

This project is a simple Telegram bot that provides weather forecasts for a specified city using the OpenWeatherMap API. Users can interact with the bot to get a 5-day weather forecast for their city.

== Features

- **/start**: Welcomes the user and provides instructions.
- **/weather**: Displays a 5-day weather forecast for the user's selected city.
- **/city**: Allows the user to set their city for weather forecasts.

== Prerequisites

Before running the bot, make sure you have the following:

- A Telegram bot token. You can get one by talking to [BotFather](https://core.telegram.org/bots#botfather) on Telegram.
- An OpenWeatherMap API key. You can get one by signing up on [OpenWeatherMap](https://openweathermap.org/api).

== Configuration

1. **API Token**: Obtain your Telegram bot token and set it in the `apiToken` variable.
2. **API URL**: Set the correct API URL for your app in the `appUrl` variable.
3. **OpenWeatherMap API Key**: Set the `opapi` variable with your OpenWeatherMap API key.

[source, javascript]
----
var apiToken = "YOUR_TELEGRAM_BOT_TOKEN";
var opapi = "YOUR_OPENWEATHERMAP_API_KEY";
var appUrl = "YOUR_APP_URL";
var apiUrl = "https://api.telegram.org/bot" + apiToken;
var cityDataProperty = PropertiesService.getScriptProperties(); // Script properties for storing user's city data
----

== Functions

=== `setWebhook()`

Sets the webhook for your Telegram bot. This ensures that the bot listens for incoming messages.

=== `doPost(e)`

Handles incoming POST requests from Telegram. It processes messages from users and responds accordingly based on the command (`/weather`, `/start`, `/city`, or user-defined city name).

=== `doGet(e)`

Returns an error message for GET requests, as they are not allowed.

=== `getWeather(city)`

Fetches the 5-day weather forecast for the specified city using the OpenWeatherMap API. The response is parsed and returned as JSON.

== How to Deploy

1. Go to [Google Apps Script](https://script.google.com/).
2. Create a new project and paste your script.
3. Set up the webhook by calling `setWebhook()` after deploying the script.
4. Deploy the project as a web app with permissions to "Anyone" for accessibility.

== Example Usage

1. **Set your city**: Type `/city` and follow the instructions to set your city.
2. **Get the weather**: After setting your city, type `/weather` to receive a 5-day weather forecast for your city.

== Notes

- The bot stores user city data using Google Apps Script Properties.
- It uses the OpenWeatherMap API to fetch weather data.
- The bot responds with weather information (temperature, description, and date) for 5 days.

== License

This project is licensed under the MIT License.
