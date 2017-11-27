var rest = require('../API/RestClient');


exports.displayAddress = function getAddress(session, area){
    var url = 'http://contosotables.azurewebsites.net/tables/kcontoso';
    rest.getAddress(url, session, area, handleAddressResponse)
};

function handleAddressResponse(message, session, area) 
{
    var addressResponse = JSON.parse(message);
    var allAddress = []; 
    for (var index in addressResponse) {
        var usernameReceived = addressResponse[index].area;
        var address = addressResponse[index].address;
     if (area.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all addresses unless last one
           if(addressResponse.length - 1) {
                allAddress.push(address);
            }
            else {
                allAddress.push(address + ', ');
            }
       }
}
session.send("Nearest branch to  %s is: %s", area, allAddress); 
}
