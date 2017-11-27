var rest = require('../API/RestClient');
var builder = require('botbuilder');


exports.displayUser = function getUser(session, user){
    var url = 'http://kcontoso.azurewebsites.net/tables/userinfo';
    rest.getAccount(url, session, user, handleUserResponse)
};


function handleUserResponse(message, session, user) 
{
    var accountResponse = JSON.parse(message);
    var allAccounts = [];
    for (var index in accountResponse) {
        var usernameReceived = accountResponse[index].user;
        var accounts = accountResponse[index].account;
       if (user.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(accountResponse.length - 1) {
                allAccounts.push(accounts);
            }
            else {
                allAccounts.push(accounts + ', ');
            }
       }
}
session.endDialog("Hi, %s. You have following accounts in our bank: %s", user, allAccounts);  
}