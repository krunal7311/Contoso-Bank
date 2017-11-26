var rest = require('/Volumes/Krunal/University/MSA/AdvancedTraining/Contoso-Bank/API/RestClient');


exports.displayAddress = function getAddress(session, area){
    var url = 'http://kcontoso.azurewebsites.net/tables/kcontoso';
    rest.getAddress(url, session, area, handleAddressResponse)
};

function handleAddressResponse(message, session, area) 
{
    var accountResponse = JSON.parse(message);
    var allAddress = []; 
    for (var index in accountResponse) {
        var usernameReceived = accountResponse[index].area;
        var address = accountResponse[index].Address;
     if (area.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
           if(accountResponse.length - 1) {
                allAddress.push(address);
            }
            else {
                allAddress.push(address + ', ');
            }
       }
}
session.endDialog("Nearest branch to  %s is: %s", area, allAddress);  
}
