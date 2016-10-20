var Parser = require("./parser.js");
var QueryGenerator = require("./queryGenerator.js");
var SyslogDB = require("./db.js")
var Botkit = require('botkit');
var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
//var options = {APIKey:'b76a3e3d71cddfff5f2dd70bf4d8ee4d'};
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
  //token: 'xoxb-75374271524-fwzEOXBewL0QjlqakHot2z8k',
}).startRTM()

// give the bot something to listen for.
//controller.hears('string or regex',['direct_message','direct_mention','mention'],function(bot,message) {
controller.hears('(.*)',['direct_mention', 'direct_message', 'weather'], function(bot,message) {
  console.log('Message: ' + message.match[0]);

  var object = Parser.parseMessage(message.match[0]);
  if (object.type == "query"
      || object.type == "monitor"
      || object.type == "summary") {
    var query = QueryGenerator.objectToQuery(object);
    SyslogDB.executeLogQuery(query, function(result) {
      console.log("query results: " + result)
    });
  }
});
