var rest = require('/Volumes/Krunal/University/MSA/AdvancedTraining/Contoso-Bank/API/RestClient');


exports.displayAddress = function getAddress(session, area){
    var url = 'http://kcontoso.azurewebsites.net/tables/kcontoso';
    rest.getBranches(url, session, area, handleAddressResponse)
};


function handleAddressResponse(message, session, area) {
    var AddressResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in AddressResponse) {
        var areaReceived = AddressResponse[index].area;
        var Address = AddressResponse[index].Address;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (area.toLowerCase() === areaReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(AddressResponse.length - 1) {
                allFoods.push(Address);
            }
            else {
                allFoods.push(Address + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
 if(allFoods!="")
 {
    session.endDialog(" The address of the nearest branch to %s is: %s", area,allFoods);       
 }else{
    session.endDialog("No branch found");       
    
 }
}
