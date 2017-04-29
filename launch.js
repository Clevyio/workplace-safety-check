'use strict';

let lib = require('./lib');
let Promise = require('bluebird');
let _ = require('lodash');
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

// load the configuration from an env file
lib.loadEnv(__dirname + '/.env.yml');

// message only users present in target groups or specific user IDs
// warning: max 10k users per group
let SC_TARGET_GROUPS = []; // ["group_id_1", "group_id_2", ...]
let SC_USERS = ["100014436152402"]; // ["user_id_1", "user_id_2", ...]

function launch() {

  /**
   * setup help button and greeting text
   */
  return lib.setupGetStartedButton()
    .then(() => {
      return lib.setupPersistentMenu()
    })

    /**
     * Setup the welcome message
     */
    .then(() => {
      return lib.setupGreetingText()
    })

    /**
     * find users in target groups and add them to array of users
     */
    .then(() => {
      return Promise.all(SC_TARGET_GROUPS.map((group_id) => {
          return lib.getGroupMembers(group_id)
            .then((members) => members.data);
        }))
        .then((data) => {
          // data is an array of arrays
          let merged = [].concat.apply([], data);

          // we only care about user IDs
          let group_users = merged.map((user) => user.id);

          // let's merge with SC_USERS
          let users = group_users.concat(SC_USERS);

          // it may contain duplicates
          let dedup = _.uniq(users);

          // return this array of users
          console.log("Notify following users:", JSON.stringify(dedup));
          return dedup;

        });
    })

    /**
     * EXTENSION: send the list of users to some database so you can check later who received the message or not
     */

    /**
     * send a notification to all targeted users
     */
    .then((users) => {
      return Promise.all(users.map((user_id) => {
          return lib.callSendAPI({
            "recipient": {
              "id": ""+user_id
            },
            "message": {
              "text": process.env.SC_ALERT_MSG.replace(/\\n/g, '\n'),
              "quick_replies": [
                {
                  "content_type": "text",
                  "title": process.env.SC_OK_BTN_TEXT,
                  "payload": "USER_OK"
                },
                {
                  "content_type": "text",
                  "title": process.env.SC_HELP_BTN_TEXT,
                  "payload": "USER_NEED_HELP"
                }
              ]
            }
          });
        }));
    });

};

launch();