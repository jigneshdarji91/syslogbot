var mysql      = require('mysql');
<<<<<<< f9ea320513ea313e7703bcf755a2a00dcda43508

=======
>>>>>>> db.js
var logDB_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sa123',
  database : 'slackBotLog_db'
});

<<<<<<< f9ea320513ea313e7703bcf755a2a00dcda43508
var userDB_connection = mysql.createConnection({
=======
var logDB_connection = mysql.createConnection({
>>>>>>> db.js
  host     : 'localhost',
  user     : 'root',
  password : 'sa123',
  database : 'slackBotUser_db'
});

<<<<<<< f9ea320513ea313e7703bcf755a2a00dcda43508
function getLogDBConnector() {
	return logDB_connection;
}

function getUserDBConnector() {
	return userDB_connection;
}
=======
>>>>>>> db.js

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

<<<<<<< f9ea320513ea313e7703bcf755a2a00dcda43508
executeQuery(getLogDBConnector() , 'SELECT server_ip, log_message from LogInfo')
=======
'SELECT server_ip, log_message from LogInfo'
>>>>>>> db.js

