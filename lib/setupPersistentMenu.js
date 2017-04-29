'use strict';
let Promise = require("bluebird");
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

let GRAPH_API_BASE = process.env.GRAPH_API_BASE;
let APP_ACCESS_TOKEN = process.env.APP_ACCESS_TOKEN;

let SC_INFO_BTN_TEXT = process.env.SC_INFO_BTN_TEXT;

/**
 * Setup the persistent menu info button
 */
module.exports = () => {
  return request.post(GRAPH_API_BASE + '/me/messenger_profile')
    .query({ access_token: APP_ACCESS_TOKEN })
    .send({
      "persistent_menu":[
        {
          "locale":"default",
          "composer_input_disabled": true,
          "call_to_actions":[
            {
              "title": SC_INFO_BTN_TEXT,
              "type":"postback",
              "payload":"GET_INFO",
            }
          ]
        }
      ]
    })
    .then((res) => {
      console.log(res.text);
      return JSON.parse(res.text);
    })
    .catch((err) => {
      console.log("error setting the persistent menu info button: ", err);
      return null;
    });
};