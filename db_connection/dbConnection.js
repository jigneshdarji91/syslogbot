var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '35.163.142.248',
  user     : 'root',
  password : 'syslogbot',
  port     : '3306',
  database : 'slackBotLog_db'
});

var insertQuery = "INSERT INTO LogInfo VALUES ('10.10.10.12','ERROR','mysqld','2016-10-18 00:24:56','Nov  10 10:51:24 chaves [ERROR] sshd[19540]: Invalid insertion');"
	connection.query(insertQuery, function(err2, rows2) {
  	console.log('Record inserted successfully.');
});

var selectQuery = "select * from LogInfo where log_level='ERROR';"
	connection.query(selectQuery, function(err1, servers) {
  	console.log(servers);
});


