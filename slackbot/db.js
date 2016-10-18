var mysql      = require('mysql');

var logDB_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sa123',
  database : 'slackBotLog_db'
});

var userDB_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sa123',
  database : 'slackBotUser_db'
});

function getLogDBConnector() {
	return logDB_connection;
}

function getUserDBConnector() {
	return userDB_connection;
}

function executeQuery (db_connection, query) {
	db_connection.connect();
	db_connection.query(query, function(err, rows, fields) {
  		if (!err)
    		console.log('The solution is: ', rows);
  		else
    		console.log('Error while performing Query.');
	});
	db_connection.end();
}

executeQuery(getLogDBConnector() , 'SELECT server_ip, log_message from LogInfo')

