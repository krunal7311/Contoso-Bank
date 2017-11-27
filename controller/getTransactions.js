var rest = require('../API/RestClient');
var builder = require('botbuilder');

exports.displayTransactions = function getTransactions(session, user){
    var url = 'http://kcontoso.azurewebsites.net/tables/contosoTransactions';
    rest.getAccount(url, session, user, handleTransactionResponse)
};


function handleTransactionResponse(message, session, user) 
{
    var accountResponse = JSON.parse(message);
    var allAccounts = [];
    var allAmounts = [];
    for (var index in accountResponse) {
        var usernameReceived = accountResponse[index].user;
        var transaction = accountResponse[index].transaction;
        var amount = accountResponse[index].Amount;
    //   if (user.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
         //   if(accountResponse.length - 1) {
           //     allAccounts.push(transaction,amount);
            
           //     allAmounts.push(amount);
//}
         //  else {
          //      allAccounts.push(transaction,amount,'\n');
           //     allAmounts.push(amount + ',');
            //}
      // }
       
}
session.endDialog("Your spendings are : %s ", usernameReceived); 
}