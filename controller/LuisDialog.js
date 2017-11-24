var builder = require('botbuilder');
var food=require("./getaddress");

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/37869790-4aa9-40f2-a77e-ad2cca77cd82?subscription-key=268e389caeb54316bccb0b3fc279d22c&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('welcome', function (session, args) {
        
                 session.send("Hi there, I'm the genie. How can I help you today ? ");
             
     }).triggerAction({
         matches: 'welcome'
     });

    
     bot.dialog('getAddress', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                session.send("No food identified! Please try again");
        
        }
        },
        function (session, results, next) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite foods");
                food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            
        }
    ]).triggerAction({
        matches: 'getAddress'
    });

}