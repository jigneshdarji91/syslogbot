var mysql = require('mysql');

var logDB_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sa123',
  database : 'slackBotLog_db'
});

logDB_connection.connect();

var userDB_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sa123',
  database : 'slackBotUser_db'
});

userDB_connection.connect();

function getLogDBConnector() {
	return logDB_connection;
}

function getUserDBConnector() {
	return userDB_connection;
}

function connectToDb() {
	console.log('Connected to DB');
}

function executeLogQuery (query, resultHandler) {
	var db_connection = getLogDBConnector();
	//db_connection.connect();
	db_connection.query(query, function(err, rows, fields) {
  		if (!err){
    		var results = new Array(rows.length);
    		var arrayLength = rows.length;
    		for(var i = 0; i < arrayLength; i++){
    			var result = new Array(2);
    			result[0] = rows[i].server;
    			result[1] = rows[i].log_message;
    			results[i] = result;
    		}
    		resultHandler(results);
  		}
  		else{
  			console.log('Error Executing Query');
    		resultHandler(null);
  		}
	});
	//db_connection.end();
}

function executeServerInfoQuery (query, resultHandler) {
	var db_connection = getUserDBConnector();
	//db_connection.connect();
	db_connection.query(query, function(err, rows, fields) {
  		if (!err){
    		resultHandler('Success');
  		}
  		else
    		resultHandler('Error');
	});
	//db_connection.end();
}


module.exports = {
  getLogDBConnector: getLogDBConnector,
  getUserDBConnector: getUserDBConnector,
  executeLogQuery: executeLogQuery,
  executeServerInfoQuery: executeServerInfoQuery,
  connectToDb: connectToDb
}


