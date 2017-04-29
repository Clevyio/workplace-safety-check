'use strict';

let sendTextMessage = require('./sendTextMessage');

const USER_IS_OK_RESPONSE = process.env.USER_IS_OK_RESPONSE;
const USER_NEED_HELP_RESPONSE = process.env.USER_NEED_HELP_RESPONSE;
const SC_IDLE_INFO_MSG = process.env.SC_IDLE_INFO_MSG;

module.exports = function(sender_id, payload) {
  switch(payload) {
    case 'GET_STARTED':
      return sendTextMessage(sender_id, SC_IDLE_INFO_MSG);
      break;
    case 'GET_INFO':
      return sendTextMessage(sender_id, SC_IDLE_INFO_MSG);
      break;
    case 'USER_OK':
      return sendTextMessage(sender_id, USER_IS_OK_RESPONSE);
      break;
    case 'USER_NEED_HELP':
      return sendTextMessage(sender_id, USER_NEED_HELP_RESPONSE);
      break;
    default:
      break;
  }
}