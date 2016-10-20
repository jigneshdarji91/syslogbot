/* * * * * * * * * * * * * * * * * * * *
   Author: Aparna Patil(akpatil)
   Student ID: 20111339
 * * * * * * * * * * * * * * * * * * * */

var database = require("./db.js");

/**
 * Generates command to add server
 * @param {MessageObject} object 
 * @param {SlackUserName} user_name 
 * @return {Command} query
 */
/*function objectToAddCommand(object, user_name) {
    console.log("object: " + JSON.stringify(object));
    console.log("user_name: " + user_name);
    var table_name = "ServerInfo";// subject to change

    var query = "INSERT INTO " + table_name + " (userName, serverAlias, serverIp) VALUES (";
    query = query  +"'" +user_name+"'";
    for (var key in object) {

        if (object.hasOwnProperty(key)){
            if(key == 'type')
                continue;

            if(key == 'add-server'){
                ip = object[key]
                query = query + "," +object[key]+ "" 
            }  

            if(key == 'alias'){
                alias = object[key]
                query = query + "," +object[key]+ ");"
            }                        
          }
    }

    console.log("Final query is :"+query);
    database.executeServerInfoQuery(query, function(data){
      console.log(data);
    });    
    //return query;
}*/

/**
 * Generates command to delete server
 * @param {MessageObject} object 
 * @param {SlackUserName} user_name
 * @return {Command} query
*/
/*function objectToDeleteCommand(object, user_name) {
    console.log("object: " + JSON.stringify(object));
    var table_name = "ServerInfo";// subject to change

    var query = "DELETE FROM " + table_name + "WHERE userName='"+ user_name +"' AND serverAlias=";
    for (var key in object) {

        if (object.hasOwnProperty(key)){
            if(key == 'type')
                continue;

            if(key == 'alias'){
                query = query + "'" +object[key]+ "';" ;
            }         
          }
    }

    console.log("Final query is :"+query);
    database.executeServerInfoQuery(query, function(data){
      console.log(data);
    });
    //return query;
}*/

/**
 * Generates command to add/delete server
 * @param {MessageObject} object 
 * @param {SlackUserName} user_name
 * @return {QueryResult} result
 */
function objectToCommand(object, user_name) {
    if(object.hasOwnProperty('add-server')){
        console.log("object: " + JSON.stringify(object));
        console.log("user_name: " + user_name);
        var table_name = "ServerInfo";// subject to change

        var query = "INSERT INTO " + table_name + " (userName, serverAlias, serverIp) VALUES (";
        query = query  +"'" +user_name+"'";
        for (var key in object) {

            if (object.hasOwnProperty(key)){
                if(key == 'type')
                    continue;

                if(key == 'add-server'){
                    ip = object[key]
                    query = query + "," +object[key]+ "" 
                }  

                if(key == 'ip'){
                    alias = object[key]
                    query = query + "," +object[key]+ ");"
                }                        
              }
        }

        console.log("Final query is :"+query);
        database.executeServerInfoQuery(query, function(data){
          console.log(data);
        });    
        //return query;
    }
    else if(object.hasOwnProperty('delete-server')){
        console.log("object: " + JSON.stringify(object));
        var table_name = "ServerInfo";// subject to change

        var query = "DELETE FROM " + table_name + " WHERE userName='"+ user_name +"' AND serverAlias=";
        for (var key in object) {

            if (object.hasOwnProperty(key)){
                if(key == 'type')
                    continue;

                if(key == 'delete-server'){
                    query = query + object[key] ;
                }         
              }
        }

        console.log("Final query is :"+query);
        database.executeServerInfoQuery(query, function(data){
          console.log(data);
        });
        //return query;
    }   
}

module.exports = {
    objectToCommand: objectToCommand
}