'use strict';
let Promise = require("bluebird");
let request = require("superagent");
request = require("superagent-promise")(request, Promise);

/**
 * Call the Send API. The message data goes in the body.
 */
module.exports = function(group_id) {
  return request.get(process.env.GRAPH_API_BASE + '/' + group_id + '/members')
    .query({
      access_token: process.env.APP_ACCESS_TOKEN,
      limit: 10000,
    })
    .end()
    .then((res) => {
      return JSON.parse(res.text);
    })
    .catch((err) => {
      console.error("Failed calling Send API", err);
      throw JSON.stringify(err);
    });
  
};
