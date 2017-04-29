'use strict';

let sendTextMessage = require('./sendTextMessage');

module.exports = function(sender_id, payload) {
  switch(payload) {
    case 'GET_STARTED':
      return sendTextMessage(sender_id, process.env.SC_IDLE_INFO_MSG);
      break;
    case 'GET_INFO':
      return sendTextMessage(sender_id, process.env.SC_IDLE_INFO_MSG);
      break;
    case 'USER_OK':
      return sendTextMessage(sender_id, process.env.USER_IS_OK_RESPONSE);
      break;
    case 'USER_NEED_HELP':
      return sendTextMessage(sender_id, process.env.USER_NEED_HELP_RESPONSE);
      break;
    default:
      break;
  }
}