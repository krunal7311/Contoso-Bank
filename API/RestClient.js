var request = require('request')

exports.getAddress = function getData(url, session, area, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, area);
        }
    });
};