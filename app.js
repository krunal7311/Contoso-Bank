var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '0b6817fd-886c-4d11-a3d4-963fb0e66859',
    appPassword: 'tyuemCN49:%#lzEGXCS745]'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});
luis.startDialog(bot);