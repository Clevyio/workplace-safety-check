'use strict';

let lib = require('./lib');

module.exports.webhook = (event, context, callback) => {
  
  if (event.method === 'GET') {
    // facebook app verification
    if (event.query['hub.verify_token'] === process.env.APP_VERIFY_TOKEN && event.query['hub.challenge']) {
      return callback(null, parseInt(event.query['hub.challenge']));
    } else {
      return callback('Invalid token');
    }
  }
  
  else if (event.method === 'POST' && event.body.object === "page") {
  
    // security check: verify that this call comes from facebook
    lib.verifyRequestSignature(event.headers, event.body);
    
    event.body.entry.forEach((entry) => {
      
      if (entry.messaging) {
        entry.messaging.forEach((msg) => {
          console.log("msg", JSON.stringify(msg));
          
          let sender_id = msg.sender.id;
  
          /**
           * only handle plain text requests
           */
          if (msg.message && msg.message.text && !msg.message.quick_reply) {
            console.log("MSG MESSAGE", msg.message);
            return lib.sendTextMessage(sender_id, process.env.USER_ANY_TEXT_RESPONSE)
              .then((data) => callback(null, data))
              .then((err) => callback(err));
          }

          /**
           * delivery event (save in database that the user received the message)
           * EXTENSION: in this hook, you can save in a database who received the message but didn't read it yet
           */
          else if (msg.delivery) {
            console.log("MSG DELIVERED", msg.delivery);
            return callback(null, msg.delivery);
          }

          /**
           * read event (save in database that the user read the message)
           * EXTENSION: in this hook, you can save in a database who read the message but didn't reply yet
           */
          else if (msg.read) {
            console.log("MSG READ", msg.read);
            return callback(null, msg.read);
          }

          /**
           * the user requests information (get started button or persistent menu)
           */
          else if (msg.postback) {
            console.log("MSG POSTBACK", msg.postback);
            return lib.handlePostbacks(sender_id, msg.postback.payload)
          }

          /**
           * the user says they are OK or need help.
           * EXTENSION: save the user's answer to the safety check event
           * EXTENSION: send a message to an admin if a user clicks USER_NEED_HELP
           */
          else if (msg.message.quick_reply) {
            console.log("MSG QUICK_REPLY", msg.message.quick_reply);
            return lib.handlePostbacks(sender_id, msg.message.quick_reply.payload)
          }
        });
      }
      
    });
  }
  
};
