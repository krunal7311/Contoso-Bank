var rest = require('../API/Restclient');

exports.displayPayees = function displayPayees(session, username){
    var url = 'http://contosotables.azurewebsites.net/tables/payees';
    rest.getPayee(url, session, user, handlePayeeResponse)
};

exports.addPayee = function addPayee(session, username, favouritefood){
    var url = 'http://contosotables.azurewebsites.net/tables/payees';
    rest.addPayee(url, user, payee);
};


function handlePayeeResponse(message, session, username) {
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        var usernameReceived = favouriteFoodResponse[index].user;
        var favouritefood = favouriteFoodResponse[index].payee;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
                allFoods.push(favouritefood);
            }
            else {
                allFoods.push(favouritefood + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("Your payees are : %s", allFoods);                
    
}


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


