'use strict';

let lib = require('./lib');

// load the configuration from an env file (remove if you are using serverless CLI)
lib.loadEnv(__dirname + '/.env.yml');

// message only users present in target groups or specific user IDs
// warning: max 10k users per group
let SC_TARGET_GROUPS = []; // ["group_id_1", "group_id_2", ...]
let SC_TARGET_USERS = ["100014436152402"]; // ["user_id_1", "user_id_2", ...]

function run() {
  return lib.launchAlert(SC_TARGET_GROUPS, SC_TARGET_USERS)
}

module.exports.run = run;

// if not using SLS CLI (sls invoke local -f launch) run this function directly
if (process.argv.indexOf('invoke') === -1) {
  run();
}