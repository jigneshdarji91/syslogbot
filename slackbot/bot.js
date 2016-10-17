
var Botkit = require('botkit');
var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
var forecast = new Forecast(options);

//var childProcess = require("child_process");

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.ALTCODETOKEN,
}).startRTM()

// give the bot something to listen for.
//controller.hears('string or regex',['direct_message','direct_mention','mention'],function(bot,message) {
controller.hears('weather',['mention', 'direct_mention'], function(bot,message) {
    console.log('someone mentioned me! Yay!');
    getWeather(function(w) {
        bot.reply(message, w);
    });
});

// example for calling weather api
function getWeather(callback)
{
    var latitude = "48.208579"
    var longitude = "16.374124"
    var message = "Hey, @git_bot The weather is "
    forecast.get(latitude, longitude, function (err, res, data) 
    {
        console.log('message generated: ' + message);
        if (err) throw err;
        //console.log('res: ' + JSON.stringify(res));
        //console.log('data: ' + JSON.stringify(data));
        w = data.currently.summary + " and feels like " +
        data.currently.apparentTemperature;
        message = message + w;
        console.log('message generated: ' + message);
        callback(message);
    });
}
