'use strict';
let Promise = require("bluebird");
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

const GRAPH_API_BASE = process.env.GRAPH_API_BASE;
const APP_ACCESS_TOKEN = process.env.APP_ACCESS_TOKEN;

const SC_IDLE_INFO_MSG = process.env.SC_IDLE_INFO_MSG;

/**
 * Setup the welcome message
 */
module.exports = () => {
  return request.post(GRAPH_API_BASE + '/me/thread_settings')
    .query({ access_token: APP_ACCESS_TOKEN })
    .send({
      "setting_type": "greeting",
      "greeting": {
        "text": SC_IDLE_INFO_MSG
      }
    })
    .then((res) => {
      console.log(res.text);
      return res.text;
    })
    .catch((err) => {
      console.log("error setting the greeting text: ", err);
      return null;
    });
};