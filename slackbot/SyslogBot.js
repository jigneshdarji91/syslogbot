function parseMessage(message) {
  getMessageType(message);
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
