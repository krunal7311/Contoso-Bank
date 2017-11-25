var rest = require('/Volumes/Krunal/University/MSA/AdvancedTraining/Contoso-Bank/API/RestClient');


exports.displayAddress = function getAddress(session, area){
    var url = 'http://kcontoso.azurewebsites.net/tables/kcontoso';
    rest.getInfo(url, session, area, handleFavouriteFoodResponse)
};


function handleFavouriteFoodResponse(message, session, area) {
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        var areaReceived = favouriteFoodResponse[index].area;
        var Address = favouriteFoodResponse[index].Address;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (area.toLowerCase() === areaReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
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
    session.send(" The address of the nearest branch to %s is: %s", area,allFoods);   
    session.endDialog();    
 }else{
    session.send("No branch found");       
    session.endDialog();
    
 }
}
