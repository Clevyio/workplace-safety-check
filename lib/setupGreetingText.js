'use strict';
let Promise = require("bluebird");
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

/**
 * Setup the welcome message
 */
module.exports = () => {
  return request.post(process.env.GRAPH_API_BASE + '/me/thread_settings')
    .query({ access_token: process.env.APP_ACCESS_TOKEN })
    .send({
      "setting_type": "greeting",
      "greeting": {
        "text": process.env.SC_IDLE_INFO_MSG
      }
    })
    .then((res) => {
      console.log(res.text);
      return JSON.parse(res.text);
    })
    .catch((err) => {
      console.log("error setting the greeting text: ", err);
      return null;
    });
};