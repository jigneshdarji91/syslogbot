var QueryGenerator = require("./queryGenerator.js");
var SyslogDB = require("./db.js")

function validateIPaddress(ipaddress) {
    console.log("Validate IP address Input : ");
    console.log(ipaddress);
    for (i = 0; i < ipaddress.length; i++) {
        ip = ipaddress[i]
        ip = ip.replace(/[\\\["'\]]/g, "");
        console.log(ip);
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
            continue;
            console.log("Valid IP : " + ip)
        } else {
            console.log("Invalid IP : " + ip)
            return false;
        }
    }
    return true;

}


function checkCommandObject(obj) {
    if (obj.hasOwnProperty('add-server')) {
        if (obj.hasOwnProperty('ip')) {
            if (validateIPaddress(obj['ip'])) {
                return true;
            } else {
                console.log("ip address format invalid");
                return false;
            }
        } else {
            console.log("ip tag missing");
            return false;
        }
    } else if (obj.hasOwnProperty('delete-server')) {
        return true;
    } else {
        console.log("add-server or delete-server tag missing");
        return false;
    }
}

function shouldExecuteQuery(obj) {
    if (obj.hasOwnProperty('server')) {
        if (validateIPaddress(obj['server'])) {
            return true;
        } else {
            console.log("ip address format invalid");
            return false;
        }
    } else {
        console.log("server tag missing");
        return false;
    }

}

function validateUserAndExecuteQuery(obj, userName, logDbQuery, executeDBQuery) {
  console.log("Check if User is authorised");
  if (obj.hasOwnProperty('server')) {
    ipaddress = obj['server']
    for (i = 0; i < ipaddress.length; i++) {
        ipaddress[i] = ipaddress[i].replace(/[\\\["'\]]/g, "");
      }
      var query = QueryGenerator.generateSearchQuery(ipaddress, userName);
      SyslogDB.executeUserServerMappingQuery(query, ipaddress, function(result) {
          console.log("Is User Authorised? " + result);
          executeDBQuery(logDbQuery, result);
      });

  }
  else {
    return false;
  }
  return true;

}

module.exports = {
    checkCommandObject: checkCommandObject,
    shouldExecuteQuery: shouldExecuteQuery,
    validateUserAndExecuteQuery: validateUserAndExecuteQuery
}
