var mysql = require('mysql');

var logDB_connection = mysql.createConnection({
    host: '35.163.142.248',
    user: 'root',
    password: 'syslogbot',
    database: 'slackBotLog_db'
});

logDB_connection.connect();

var userDB_connection = mysql.createConnection({
    host: '35.163.142.248',
    user: 'root',
    password: 'syslogbot',
    database: 'slackBotUser_db'
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

function executeLogQuery(query, resultHandler) {
    var db_connection = getLogDBConnector();
    //db_connection.connect();
    db_connection.query(query, function(err, rows, fields) {
        if (!err) {
            var results = new Array(rows.length);
            var arrayLength = rows.length;
            for (var i = 0; i < arrayLength; i++) {
                var result = new Array(2);
                result[0] = rows[i].server;
                result[1] = rows[i].log_message;
                results[i] = result;
            }
            resultHandler(results);
        } else {
            console.log('Error Executing Query');
            resultHandler(null);
        }
    });
    //db_connection.end();
}

function executeServerInfoQuery(query, isInsert, resultHandler) {
    var db_connection = getUserDBConnector();
    db_connection.query(query, function(err, rows, fields) {
        console.log(rows);
        if (!err) {
            if (rows.affectedRows == 0 && !isInsert) {
                resultHandler('Error');
            } else {
                resultHandler('Success');
            }
        } else {
            if (err.code == 'ER_DUP_ENTRY') {
                resultHandler('ER_DUP_ENTRY');
            } else {
                resultHandler('Error');
            }
        }
    });
}


function executeUserServerMappingQuery(query, resultHandler) {
    var db_connection = getUserDBConnector();
    db_connection.query(query, function(err, rows, fields) {
        
    });
}


module.exports = {
    getLogDBConnector: getLogDBConnector,
    getUserDBConnector: getUserDBConnector,
    executeLogQuery: executeLogQuery,
    executeServerInfoQuery: executeServerInfoQuery,
    connectToDb: connectToDb,
    executeUserServerMappingQuery: executeUserServerMappingQuery
}
