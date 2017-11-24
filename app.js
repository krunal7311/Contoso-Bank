
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "1afb6c32-3208-414d-ac86-0e79a3ec614a",
    appPassword: "bhKVAN691{lfmkgQME10@-?"
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());
session.send("Hello, welcome to the app");

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You sent the message: %s", session.message.text);
});