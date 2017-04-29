'use strict';
let Promise = require("bluebird");
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

/**
 * Setup the persistent menu info button
 */
module.exports = () => {
  return request.post(process.env.GRAPH_API_BASE + '/me/messenger_profile')
    .query({ access_token: process.env.APP_ACCESS_TOKEN })
    .send({
      "persistent_menu":[
        {
          "locale":"default",
          "composer_input_disabled": true,
          "call_to_actions":[
            {
              "title": process.env.SC_INFO_BTN_TEXT,
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