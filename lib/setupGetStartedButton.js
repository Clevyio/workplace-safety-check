'use strict';
let Promise = require("bluebird");
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

/**
 * Setup get started button
 */
module.exports = () => {
  return request.post(process.env.GRAPH_API_BASE + '/me/thread_settings')
    .query({ access_token: process.env.APP_ACCESS_TOKEN })
    .send({
      "setting_type":"call_to_actions",
      "thread_state":"new_thread",
      "call_to_actions":[
        {
          "payload":"GET_STARTED"
        }
      ]
    })
    .then((res) => {
      console.log(res.text);
      return JSON.parse(res.text);
    })
    .catch((err) => {
      console.log("error setting the get started button: ", err);
      return null;
    });
};
