var slack = require('slack')
var Parser = require("./parser.js");
var QueryGenerator = require("./queryGenerator.js");
var CommandGenerator = require("./commandGenerator.js");
var Botkit = require('botkit');
var SyslogDB = require("./db.js")
var userName = '';
//var childProcess = require("child_process");

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  //token: process.env.ALTCODETOKEN,
  //token: 'xoxb-75374271524-fwzEOXBewL0QjlqakHot2z8k',
  token: 'xoxb-94215756851-njVdzQfDvGlb9eQJHDy4dG1D',
}).startRTM()

// give the bot something to listen for.
//controller.hears('string or regex',['direct_message','direct_mention','mention'],function(bot,message) {
controller.hears('(.*)',['direct_mention', 'direct_message', 'weather'], function(bot,message) {

  // Function to get user name
  var getUserName = function(callback)
  {
    slack.users.info({
      //token: process.env.ALTCODETOKEN,
      token: 'xoxb-94215756851-njVdzQfDvGlb9eQJHDy4dG1D',
      //token: 'xoxb-75374271524-fwzEOXBewL0QjlqakHot2z8k',
      user: message.user
    }, (err, data) => {
      if (err) throw err
      userName = data.user.name;
      callback(userName);
    });
  }

  var userName = function( username ) {
    console.log("User Name: " + username);
    var object = Parser.parseMessage(message.match[0]);
    console.log('here type is:', object.type)
    if (object.type == "command") {

      //console.log("userName before sending to command generator: ", userName)
      var botReply = CommandGenerator.objectToCommand(object, userName, function(results){
        //console.log('Result from database',results);
        bot.reply(message, results);
      });
    } else if (object.type == "query"
      || object.type == "monitor"
      || object.type == "summary") {
      var query = QueryGenerator.objectToQuery(object);
      SyslogDB.executeLogQuery(query, function(result) {
        console.log("query results: " + result);
        var response = 'Error finding the requested Data';
        if(result != null) {
          response = processResults(result);
          //bot.reply(message, response);
        }
        bot.reply(message, response);
      });
    }
    else if (object.type == "none"){
      bot.reply(message, "Hello! I cannot understand what you want.");
    }
  };
  //SyslogDB.connectToDb();
  getUserName( userName );
});

function processResults(results) {
  var responseMap = {};
  var response = '';
  var arrayLength = results.length;
  for(var i = 0; i < arrayLength; i++){
      var result = results[i];
      if (responseMap[result[0]] != null) {
        responseMap[result[0]] = responseMap[result[0]] + "\n" + result[1];
        //console.log('—' + result[0] + ':' + result[1]);
      }
      else
      {
        responseMap[result[0]] = result[1];
      }
    }

    var a = 0;

    for (var key in responseMap)
    {
      if(a == 0) {
        response = response +"*"+key + "* :\n" +responseMap[key];
      }
      else{
        response = response +"\n*"+key + "* :\n"+responseMap[key];
      }
      console.log('—' + key + ':' + responseMap[key]);
      a = a +1;
    }
    return response;
}
