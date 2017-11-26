var request = require('request')

exports.getAccount = function getUserAccount(url, session, user, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, user);
        }
    });
};
exports.getAddress = function getAddress(url, session, area, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, area);
        }
    });
};



