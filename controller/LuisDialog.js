var builder = require('botbuilder');
var getAddress=require("./getaddress");
var userdetails=require("./getUser");
var getTransactions=require("./getTransactions")
var managePayees=require("./managePayees")
var currencyConversion = require('./getExchange');
exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8d91389d-1f2d-49d4-a961-d79b7b52e241?subscription-key=dfc5411a96604a3ca280f41051ece8a8&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);





//Help
bot.dialog('help', [
    function (session, args) {
        var endOfLine = require('os').EOL;              
            session.endDialog("Here is what I can do: "+endOfLine+'\nType something like:'+endOfLine+'\n"My accounts" to get your account information'+endOfLine+'\n"My transactions" to get your transactions'+endOfLine+'\n"Branches near Glenfield/ me" to get information about the closest branch'+endOfLine+'\n"Logout" to log off');                        
    },
   
]).triggerAction({
    matches: 'help'
});

//User exits
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

//User enters
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



//Logout
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
bot.dialog('GetUserAccount', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["user"]) {
            builder.Prompts.text(session, "Sure, Could I have your username please");                
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {

            if (results.response) {
                session.conversationData["user"] = results.response;
            }

            session.send("Checking your account types...");
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
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {

            if (results.response) {
                session.conversationData["user"] = results.response;
            }

            session.send("Retrieving your transactions");
            getTransactions.displayTransactions(session, session.conversationData["user"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
        
    }
]).triggerAction({
    matches: 'getTransactions'
});

//Show Payees
bot.dialog('displayPayee', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["user"]) {
            builder.Prompts.text(session, "Sure, Could I have your username please");                
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {

            if (results.response) {
                session.conversationData["user"] = results.response;
            }

            session.send("Retrieving your payees...");
            managePayees.displayPayees(session, session.conversationData["user"]);   // <---- THIS LINE HERE IS WHAT WE NEED 
        
    }
]).triggerAction({
    matches: 'displayPayee'
});

//Add Payees
bot.dialog('addPayees', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["user"]) {
            builder.Prompts.text(session, "Sure, Could I have your username please");                
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {
       // if (!isAttachment(session)) {
            if (results.response) {
                session.conversationData["user"] = results.response;
              //  session.send('Adding new payee for:  \'%s\'', session.conversationData["user"]);          
           }
            // Pulls out payee entity from the session if it exists
            var payeeEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'payee');

            // Checks if the payee entity was found
            if (payeeEntity) {
            session.conversationData["payee"] = payeeEntity.entity;
            next();            
                //    session.send('Added new Payee:  \'%s\'', payeeEntity.entity);
            //    managePayees.addPayee(session, session.conversationData["user"], payeeEntity.entity); // <-- LINE WE WANT
            } else {
                builder.Prompts.text(session,"Okay, what would be the payee name?");
            }
        },
        function(session,results,next)
        {
            if (results.response) {
                session.send('Creating new payee...');      

                session.conversationData["payee"] = results.response;
           }
   
           builder.Prompts.text(session,'Now enter the payees account number', session.conversationData["payee"]);           
        },
        function(session,results,next)
        {
            if (results.response) {
                session.send('Adding account number...');                           
                session.conversationData["accountnumber"] = results.response;
           }
           session.send('Created new payee:  %s with account number %s', session.conversationData["payee"], session.conversationData["accountnumber"] );
           managePayees.addPayee(session,session.conversationData["user"], session.conversationData["payee"], session.conversationData["accountnumber"]);
        }
   // }
   
]).triggerAction({
    matches: 'addPayees'
});

//Delete Payees
bot.dialog('deletePayee', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["user"]) {
            builder.Prompts.text(session, "Sure, Could I have your username please");                
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {
       // if (!isAttachment(session)) {
            if (results.response) {
                session.conversationData["user"] = results.response;
              //  session.send('Adding new payee for:  \'%s\'', session.conversationData["user"]);          
           }
            // Pulls out payee entity from the session if it exists
            var payeeEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'payee');

            // Checks if the payee entity was found
            if (payeeEntity) {
            session.conversationData["payee"] = payeeEntity.entity;
            session.send("deleting %s",  session.conversationData["payee"])
            next();            
                //    session.send('Added new Payee:  \'%s\'', payeeEntity.entity);
            //    managePayees.addPayee(session, session.conversationData["user"], payeeEntity.entity); // <-- LINE WE WANT
            } else {
                builder.Prompts.text(session,"Okay, which payee do you want me to delete?");
            }
        },
        function(session,results,next)
        {
            if (results.response) {
                session.conversationData["payee"] = results.response;
                session.send('Deleting the payee %s', session.conversationData["payee"]);      
                next();
           } else 
           {
               next();
           }
   
         //  builder.Prompts.text(session,'Now enter the account number', session.conversationData["payee"]);           
        },
        function(session,results,next)
        {
          //  if (results.response) {
            //    session.send('Adding account number...');                           
              //  session.conversationData["accountnumber"] = results.response;
    //       }
           session.send('Deleted the payee : %s', session.conversationData["payee"] );
           managePayees.deletePayee(session,session.conversationData["user"], session.conversationData["payee"]);
        }
   // }
   
]).triggerAction({
    matches: 'deletePayee'
});


//Exchange Rates
bot.dialog('ExchangeRate',[ function(session, args, next) {
    
            if (session.message && session.message.value) {
                var base = session.message.value.base;
                var conversion = session.message.value.conversion;
                var currency = session.message.value.currency;
                session.send("from %s",base);
                session.send("to %s",conversion);
                session.send("value %s",currency);
                currencyConversion.displayConversions(session, base, conversion, currency);
                for (var symbolValue in jsonResponse) {
                    var keyValue = jsonResponse[symbolValue]; 
                    session.send("The value of 1 " + conversions.base + " is " + keyValue + " " + symbolValue);
                }
            } else {
               next();
            }
        },
           function (session,args){
            session.dialogData.args = args || {};
            var adaptiveCard = currencyConversion.displayConversions(session);
            var msg = new builder.Message(session).addAttachment(adaptiveCard)
            session.send(msg);
        }
    ]).triggerAction({
            matches: 'ExchangeRate'
    });
    


}