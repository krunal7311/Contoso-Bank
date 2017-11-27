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
            //Add a comma after all favourite foods unless last one
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
     var   allFoods = JSON.parse(message);

        for(var i in allFoods) {

            if (allFoods[i].payee === payee && allFoods[i].user === user) {

                console.log(allFoods[i]);

                rest.deletePayee(url,session,user,payee, allFoods[i].id ,handlePayeeResponse)

            }
        }


    });


};

function handlePayeeResponse(body,session,user, payee){
    console.log('Done');
}


