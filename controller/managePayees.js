var rest = require('../API/RestClient');


exports.displayPayees = function getAddress(session, area){
    var url = 'http://contosotables.azurewebsites.net/tables/payees';
    rest.getPayee(url, session, user, handleGetPayeeResponse)
};

function handleGetPayeeResponse(message, session, user) 
{
    var accountResponse = JSON.parse(message);
    var allPayees = [];
    for (var index in accountResponse) {
        var usernameReceived = accountResponse[index].user;
        var payees = accountResponse[index].payee;
       if (user.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(accountResponse.length - 1) {
                allPayees.push(payees);
            }
            else {
                allPayees.push(payees + ', ');
            }
       }
}
session.endDialog("You payees list: %s", allPayees);  
}
/*
exports.addPayee = function addPayee(session, user, favouritefood){
    var url = 'http://contosotables.azurewebsites.net/tables/payees';
    rest.addPayee(url, user, payee);
};




exports.deletePayee = function deletePayee(session,user,payee){
    var url  = 'http://contosotables.azurewebsites.net/tables/payees';


    rest.getPayee(url,session, user,function(message,session,user){
     var   allFoods = JSON.parse(message);

        for(var i in allFoods) {

            if (allFoods[i].payee === payee && allFoods[i].user === user) {

                console.log(allFoods[i]);

                rest.deletePayee(url,session,user,payee, allFoods[i].id ,handlePayeeResponse)

            }
        }


    });


};

function handlePayeeResponse(body,session,username, favouritefood){
    console.log('Done');
}
*/

