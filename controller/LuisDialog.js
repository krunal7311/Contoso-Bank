var builder = require('botbuilder');
var food=require("./getaddress");
var userdetails=require("./getUser");

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/37869790-4aa9-40f2-a77e-ad2cca77cd82?subscription-key=268e389caeb54316bccb0b3fc279d22c&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('getAddress', [
        function requestarea(session, args, next) {
            session.dialogData.args = args || {};   
            var areaEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'area');
            if (areaEntity) {
                if(areaEntity.entity=="me")
                {
                     if (!session.conversationData["area"]) 
                     {
                             builder.Prompts.text(session, "Sure, I'll need your area name for that. Can you enter your area name please?");                
                            } 
                }
                else {
                    next(); // Skip if we already have this info.
               }
    }
        },
        function (session, results, next) {
            var usearea=results.response;
            var location={};
            if (results.response) {
                session.conversationData["area"] = results.response;
                location = usearea;
                // session.send('Finding branches near \'%s\'', usearea);                
            }
            else{
            // Pulls out the food entity from the session if it exists
            var areaEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'area');

            // Checks if the food entity was found
            if (areaEntity) {
          location = areaEntity.entity;
                //       session.send('Finding branches near \'%s\'', areaEntity.entity);
            } else {
                session.send("No area identified!!!");
            }
           //     food.sendFavouriteFood(session, session.conversationData["username"], foodEntity.entity); // <-- LINE WE WANT

        }
           session.send('Finding branches near \'%s\'', location);
        //    food.displayAddress(session, session.conversationData["area"]); 
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