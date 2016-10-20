var Parser = require("./parser.js");
var QueryGenerator = require("./queryGenerator.js");
var SyslogDB = require("./db.js")
var Botkit = require('botkit');
//var childProcess = require("child_process");

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  //token: process.env.ALTCODETOKEN,
  token: 'xoxb-75374271524-fwzEOXBewL0QjlqakHot2z8k',
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
      console.log("query results: " + result);
      var response = 'Error finding the requested Data';
      if(result != null) {
        response = processResults(result);
        bot.reply(message, response);
      }
      bot.reply(message, response);
    });
  }
});

function processResults(results) {
  var responseMap = {};
  var response = 'Success';
  var arrayLength = results.length;
  for(var i = 0; i < arrayLength; i++){
      var result = results[i];
      if (responseMap[result[0]] != null) {
        responseMap[result[0]] = responseMap[result[0]] + "\n" + result[1];
      }
      else 
      {
        responseMap[result[0]] = result[1];
      }
    }

    for (var key in responseMap)
    {
        console.log('—' + key + ':' + responseMap[key]);
    }
    return response;
}