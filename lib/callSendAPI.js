'use strict';
let Promise = require("bluebird");
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

const GRAPH_API_BASE = process.env.GRAPH_API_BASE;
const APP_ACCESS_TOKEN = process.env.APP_ACCESS_TOKEN;

/**
 * Call the Send API. The message data goes in the body.
 */
module.exports = function(messageData) {
  return request.post(GRAPH_API_BASE + '/me/messages')
    .query({ access_token: APP_ACCESS_TOKEN })
    .send(messageData)
    .end()
    .then((res) => {
      console.log("Successfully called Send API", res.text);
      return JSON.parse(res.text);
    })
    .catch((err) => {
      console.error("Failed calling Send API", err.response.error);
      return null;
    });
  
};
