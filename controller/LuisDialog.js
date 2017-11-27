var builder = require('botbuilder');
var getAddress=require("./getaddress");
var userdetails=require("./getUser");
var getTransactions=require("./getTransactions")
exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8d91389d-1f2d-49d4-a961-d79b7b52e241?subscription-key=dfc5411a96604a3ca280f41051ece8a8&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('getAddress', [
        function requestarea(session, args, next) {
            session.dialogData.args = args || {};   
            var areaEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'area');
       //     if (areaEntity) {
                if (!session.conversationData["area"]) 
                     {
                        if(areaEntity.entity=="me")
                        {
                            
                             builder.Prompts.text(session, "Sure, I'll need your area name for that. Can you enter your area name please?");                
                            } 
                            else {
                                next(); // Skip if we already have this info.
                           }
                } else {
                    next(); // Skip if we already have this info.
               }     
  //  }
        },

        function (session, results, next) {
            var usearea=results.response;
            var location={};
            if (results.response) {
                session.conversationData["area"] = results.response;
                location = usearea;

            }
            else{
            var areaEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'area');

            // Checks if the area entity was found
            if (areaEntity) {
          location = areaEntity.entity;
            } else {
                session.send("No area identified!!!");
            }
        }
        session.send('Finding branches near \'%s\'', location);
         getAddress.displayAddress(session, location); 
         delete session.conversationData["area"];
         }
        
    ]).triggerAction({
        matches: 'getAddress'
    });

//Get user account types 
     bot.dialog('getUser', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["user"]) {
                builder.Prompts.text(session, "Sure, Could I have your username please"); 
                next();               
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
                if (results.response) {
                    session.conversationData["user"] = results.response;
                   //session.send("Retrieving your account information for %s", session.conversationData["user"] );                    
                }

                userdetails.displayUser(session, session.conversationData["user"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            
        }
    ]).triggerAction({
        matches: 'GetUserAccount'
    });
    
//Get user transactions
bot.dialog('getTransactions', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["user"]) {
            builder.Prompts.text(session, "Sure, Could I have your username please");  
           // session.endDialog("Retrieving your account information for %s", results.response);               
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results) {

            if (results.response) {
                session.endDialog("Retrieving your transactions %s", results.response);
            }

 //           getTransactions.displayTransactions(session, session.conversationData["user"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
        
    }
]).triggerAction({
    matches: 'getTransactions'
});

bot.dialog('logout', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["user"]) { //See if there is any active login session
            session.endDialog("You are not logged in currently.");                
        } else {
            next(); 
        }
    },
    function (session, results, next) {
              delete session.conversationData["user"]; //delete session for the user
            session.endDialog("You have been logged out");
        
    }
]).triggerAction({
    matches: 'logout'
});

bot.dialog('help', [
    function (session, args) {
        var endOfLine = require('os').EOL;              
            session.endDialog("Here is what I can do: "+endOfLine+'\nType something like:'+endOfLine+'\n"My accounts" to get your account information'+endOfLine+'\n"My transactions" to get your transactions'+endOfLine+'\n"Branches near Glenfield/ me" to get information about the closest branch'+endOfLine+'\n"Logout" to log off');                        
    },
   
]).triggerAction({
    matches: 'help'
});


bot.dialog('bye', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (session.conversationData["user"]) { //See if there is any active login session
            session.endConversation("You have been logged out. Thanks, have a great day!");                
        } else {
            next(); 
        }
    },
    function (session, results, next) {

        session.endDialog('Thank you, Have a great day!');
    }
]).triggerAction({
    matches: 'bye'
});

bot.dialog('welcome', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["user"]) { //See if there is any active login session
            session.send("Hi, I am your personal banking bot. Type 'help' if you need any assistance.");                
        } else {
            next(); 
        }
    },
    function (session, results, next) {

        session.send("Hi %s, I am your personal banking bot. Type 'help' if you need any assistance.",session.conversationData["user"] );
    }
]).triggerAction({
    matches: 'welcome'
});

}