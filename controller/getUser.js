var rest = require('/Volumes/Krunal/University/MSA/AdvancedTraining/Contoso-Bank/API/RestClient');


exports.displayUser = function getUser(session, area){
    var url = 'http://kcontoso.azurewebsites.net/tables/userinfo';
    rest.getInfo(url, session, area, handleUserResponse)
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
session.send("Hi, %s. You have following accounts in our bank: %s", user, allAccounts);  
session.endDialog();              
}