var slack = require('slack')
var Parser = require("./parser.js");
var QueryGenerator = require("./queryGenerator.js");
var CommandGenerator = require("./commandGenerator.js");
var Botkit = require('botkit');
var userName = '';

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
controller.hears('(.*)',['direct_mention', 'direct_message', 'weather'], function(bot,message) {

  // Function to get user name
  var getUserName = function(callback)
  {
    slack.users.info({
      token: process.env.ALTCODETOKEN,
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
    if (object.type == "query"
        || object.type == "monitor"
        || object.type == "summary"
        || object.type == "command") {

      console.log("userName before sending to command generator: ", userName)
      var botReply = CommandGenerator.objectToCommand(object, userName, function(results){
        //console.log('Result from database',results);
        bot.reply(message, results);
      });    
    }
  };

  getUserName( userName );     
});
