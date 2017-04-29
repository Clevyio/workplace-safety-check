'use strict';
let callSendAPI = require('./callSendAPI');

/**
 * Send a text message using the Send API.
 */
module.exports = function(recipientId, messageText) {

  let messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
  return callSendAPI(messageData);
};