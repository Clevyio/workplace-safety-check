'use strict';

let crypto = require('crypto');

/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
module.exports = (headers, body) => {
  let signature = headers["X-Hub-Signature"];
  
  if (!signature) {
    throw new Error("Couldn't validate the request signature.");
  } else {
    let elements = signature.split('=');
    let method = elements[0];
    let signatureHash = elements[1];
    
    let expectedHash = crypto.createHmac(method, process.env.APP_SECRET).update(JSON.stringify(body)).digest('hex');
    if (signatureHash !== expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
};
