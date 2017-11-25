var builder = require('botbuilder');
var food=require("./getaddress");
var userdetails=require("./getUser");

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/37869790-4aa9-40f2-a77e-ad2cca77cd82?subscription-key=268e389caeb54316bccb0b3fc279d22c&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

     bot.dialog('getAddress', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["area"]) {
                builder.Prompts.text(session, "Enter you area name.");                
            } else {
next();        
        }
        },
        function (session, results, next) {

                if (results.response) {
                    session.conversationData["area"] = results.response;
                
                }
                session.send("Finding nearest branch");
                food.displayAddress(session, session.conversationData["area"]);  
                
        }
    ]).triggerAction({
        matches: 'getAddress'
    });



   

     bot.dialog('getUser', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["user"]) {
                builder.Prompts.text(session, "Could I have your username please");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {

                if (results.response) {
                    session.conversationData["user"] = results.response;
                }

                session.send("Retrieving your account information");
                userdetails.displayUser(session, session.conversationData["user"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            
        }
    ]).triggerAction({
        matches: 'GetUserAccount'
    });
    

}