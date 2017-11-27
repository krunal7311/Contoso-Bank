var rest = require('../API/RestClient');


exports.displayAddress = function getAddress(session, area){
    var url = 'http://contosotables.azurewebsites.net/tables/kcontoso';
    rest.getAddress(url, session, area, handleAddressResponse)
};

function handleAddressResponse(message, session, area) 
{
    var addressResponse = JSON.parse(message);
    var allAddress = []; 
    var allPhoneNumbers = [];
    for (var index in addressResponse) {
        var usernameReceived = addressResponse[index].area;
        var address = addressResponse[index].address;
        var phoneNumbers = addressResponse[index].phonenumber;
     if (area.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all addresses unless last one
           if(addressResponse.length - 1) {
                allAddress.push(address);
                allPhoneNumbers.push(phoneNumbers);
            }
            else {
                allAddress.push(address + ', ');
                allPhoneNumbers.push(phoneNumbers + ', ');
                
            }
       }
}
session.send("Nearest branch to  %s is: %s", area, allAddress); 
session.endDialog("Phone number: %s",allPhoneNumbers);
}
