/* * * * * * * * * * * * * * * * * * * *
   Author: Aparna Patil(akpatil)
   Student ID: 20111339
 * * * * * * * * * * * * * * * * * * * */

var database = require("./db.js");
var Validator = require("./validator.js");
var queryResult = '';

/**
 * Generates command to add/delete server
 * @param {MessageObject} object
 * @param {SlackUserName} user_name
 * @return {QueryResult} result
 */
function objectToCommand(object, user_name, resultHandler) {
    if (object.hasOwnProperty('add-server') && Validator.checkCommandObject(object)) {
        console.log("object: " + JSON.stringify(object));
        console.log("user_name: " + user_name);
        var table_name = "ServerInfo"; // subject to change

        var query = "INSERT INTO " + table_name + " (userName, serverAlias, serverIp) VALUES (";
        query = query + "'" + user_name + "'";
        for (var key in object) {

            if (object.hasOwnProperty(key)) {
                if (key == 'type')
                    continue;
                if (key == 'add-server') {
                    //ip = object[key]
                    query = query + "," + object[key] + ""
                }
                if (key == 'ip') {
                    //alias = object[key]
                    query = query + "," + object[key] + ");"
                }
            }
        }

        console.log("Final query is :" + query);
        database.executeServerInfoQuery(query, true, function(data) {
            console.log(data);
            if (data === 'Success') {
                resultHandler('Server added successfully.');
            } else if (data === 'ER_DUP_ENTRY') {
                resultHandler('Error:  Server entry already present for the User. Please try deleting the entry before adding a new one.');
            }
            else {
                resultHandler('Error adding server.');
            }
        });
    } else if (object.hasOwnProperty('delete-server') && Validator.checkCommandObject(object)) {
        console.log("object: " + JSON.stringify(object));
        var table_name = "ServerInfo"; // subject to change

        var query = "DELETE FROM " + table_name + " WHERE userName='" + user_name + "' AND serverAlias=";
        for (var key in object) {

            if (object.hasOwnProperty(key)) {
                if (key == 'type')
                    continue;

                if (key == 'delete-server') {
                    query = query + object[key];
                }
            }
        }
        console.log("Final query is :" + query);
        database.executeServerInfoQuery(query, false, function(data) {
            console.log(data);
            if (data === 'Success')
                resultHandler('Server deleted successfully.');
            else
                resultHandler('Error deleting server.');
        });
    } else {
        console.log("Command Query doesn't have right paramters.");
        resultHandler('Please Check. Error in Query Format.');
        return;
    }
}

module.exports = {
    objectToCommand: objectToCommand
}
