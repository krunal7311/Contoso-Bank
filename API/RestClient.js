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



exports.getPayee = function getData(url, session, user, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, user);
        }
    });
};



exports.addPayee = function sendData(url, user, payee, accountnumber){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "user" : user,
            "payee" : payee,
            "accountnumber": accountnumber
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};



exports.deletePayee = function deleteData(url,session, user ,payee, id, callback){
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
            console.log(body);
            callback(body,session,user, payee);
        }else {
            console.log(err);
            console.log(res);
        }
    })

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

    
exports.getCurrencyData = function getData(url, session, callback) {
    
        request.get(url, function(err, res, message) {
            if (err) {
                console.log(err);
            } else {
                callback(message, session);
            }
        });
    };
