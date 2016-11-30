/* * * * * * * * * * * * * * * * * * * *
   Author: Prathamesh Ghanekar(pghanek)
   Student ID: 200110766
 * * * * * * * * * * * * * * * * * * * */

/*this function generates a mySQL query from message object*/
function objectToQuery(object) {
    console.log("object: " + JSON.stringify(object));
    var table_name = "LogInfo"; // subject to change
    var first_entry = 1;
    var count_flag = 0;
    var limit;

    var query = "SELECT * FROM " + table_name + " WHERE ";
    for (var key in object) {

        if (object.hasOwnProperty(key)) {
            if (key == 'type')
                continue;

            if (key == 'count') {
                count_flag = 1;
                limit = object['count'];
                continue;
            }

            if (key == 'server' || key == 'log_level') {
                if (!first_entry) {
                    query = query + " AND ";
                }
                first_entry = 0;
                query = query + key + " IN (";
                for (i = 0; i < object[key].length; i++) {
                    object[key][i] = object[key][i].replace(/[\\\["'\]]/g, "")
                    query = query + "\"" + object[key][i] + "\"";
                    if (i != object[key].length - 1) {
                        query = query + " , ";
                    }
                }
                query = query + ") "
            }
        }
    }

    if (count_flag) {
        query = query + " LIMIT " + limit;
    }

    console.log("Final query is :" + query);
    return query;
}

module.exports = {
    objectToQuery: objectToQuery
}
