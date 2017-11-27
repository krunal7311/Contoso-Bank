var rest = require('../API/RestClient');


exports.displayPayees = function getPayee(session, user){
    var url = 'http://contosotables.azurewebsites.net/tables/payees';
    rest.getPayee(url, session, user, handleGetPayeeResponse)
};

function handleGetPayeeResponse(message, session, user) 
{
    var payeeResponse = JSON.parse(message);
    var allPayees = [];
    for (var index in payeeResponse) {
        var usernameReceived = payeeResponse[index].user;
        var payees = payeeResponse[index].payee;
       if (user.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all payees unless last one
            if(payeeResponse.length - 1) {
                allPayees.push(payees);
            }
            else {
                allPayees.push(payees + ', ');
            }
       }
}
session.endDialog("Your payees list: %s", allPayees);  
}



exports.addPayee = function addPayee(session, user, payee, accountnumber){
    var url = 'http://contosotables.azurewebsites.net/tables/payees';
    rest.addPayee(url, user, payee, accountnumber);
};




exports.deletePayee = function deletePayee(session,user,payee){
    var url  = 'http://contosotables.azurewebsites.net/tables/payees';


    rest.getPayee(url,session, user,function(message,session,user){
     var   allPayees = JSON.parse(message);

        for(var i in allPayees) {

            if (allPayees[i].payee === payee && allPayees[i].user === user) {

                console.log(allPayees[i]);

                rest.deletePayee(url,session,user,payee, allPayees[i].id ,handlePayeeResponse)

            }
        }


    });


};

function handlePayeeResponse(body,session,user, payee){
    console.log('Done');
}


