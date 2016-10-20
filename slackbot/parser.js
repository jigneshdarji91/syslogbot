function parseMessage(message) {
  var object = {};
  var messageType = getMessageType(message);
  if (messageType == "none") {
    return null;
  }
  var fields = message.split(" ");
  for (i = 0; i < fields.length; i++) {
    console.log("Field: " + fields[i]);
    if (!isFieldMesssageType(fields[i])) {
      var type = fields[i].split("=");
      console.log("field split: " + type);
      var value = type[1];
      object[type[0]] = value;
    } else {
      object.type = messageType;
    }
  }

  console.log("Object: " + JSON.stringify(object))
  return object;
}

function isFieldMesssageType (field) {
  if (getMessageType(field) == "none") {
    return false;
  }
  return true;
}

function getMessageType (message) {
  if (isMessageTypeCommand(message)) {
    return "command";
  } else if (isMessageTypeQuery(message)) {
    return "query";
  } else if (isMessageTypeMonitor(message)){
    return "monitor"
  } else if (isMessageTypeSummary(message)) {
    return "summary";
  } else {
    return "none";
  }
}

function isMessageTypeCommand (message) {
  if (message.indexOf('manage') != -1) {
    return true;
  }
}

function isMessageTypeQuery (message) {
  if (message.indexOf('query') != -1) {
    return true;
  }
}

function isMessageTypeMonitor (message) {
  if (message.indexOf('monitor') != -1) {
    return true;
  }
}

function isMessageTypeSummary (message) {
  if (message.indexOf('summary') != -1) {
    return true;
  }
}

module.exports = {
  parseMessage: parseMessage,
  getMessageType: getMessageType
}
