# Workplace Safety Check Custom Integration

This application emulates the missing Safety Check feature on Workplace by Facebook. It sends a message to all members of a list of groups within your community or a list of users directly and asks them whether they need help.

This custom integration also has hooks for saving the status of the request into a DB (alert sent, alert read, user is OK, user needs help) as well as notifying any given administrator of users requiring some help.

# Installation

1. clone this repository on a server that can run nodejs (tested with node 6.10.2). Alternatively, this project comes with a custom integration with the serverless that allows you to deploy code quickly in the cloud (tested on AWS Lambda).
2. run `npm install` to install all dependencies.
3. setup a custom integration in your Workplace admin panel with the following settings: `read content`, `manage groups`, `message any member`.
3. create a page webhook with the following callback URL `http://{hostname}/webhook`, and pick any string you want for `Verify Token`.
3. subscribe your webhook to `messages`, `message_deliveries`, `messaging_postbacks` and `message_reads`.
3. retrieve the App Secret and create and Access Token for your app.
3. give it a name and icon of your liking, then click Save.
3. create a custom `.env.yml` file based on `.env.example.yml` and edit accordingly to your parameters and needs.
4. in `launch.js`, setup the target groups and users for your safety check alert. You can add any number of group IDs as long as the number of users per group is smaller than 10k, and any number of single user IDs.

# Launching an alert

Once everything is correctly setup, launching an alert simply requires you to run `node launch`.  
The webhook (in `handler.js`) will handle any response for you.

# Extend the app

You can extend this app to your liking by saving user responses in a database or notifying managers that any user requires your assistance.

The places where you should add your custom code for this are documented. Search for `EXTENSION: ` in the code.

# Assistance

If you require any help in setting this up, you can open an issue or alternatively, contact us on github@clevy.io for getting help with custom integrations.

# About Clevy

Clevy is a French company based in Paris dedicated to providing employees of large companies with great tools they can use everyday. We are the makers of www.clevy.io, a chatbot solution that helps employees access and share information easily and reduce emails as well as interruptions in their workday. Contact us at contact@clevy.io for more information about Clevy!

# Contributing

Feel free to open pull requests for any bugfix or new features!