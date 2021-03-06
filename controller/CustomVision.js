var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/cd3f8032-f5e1-428f-b127-f2b1f08366f3/url?iterationId=9f3f341d-644a-4abf-8a9a-98ed19dd3ee8',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '998c42bf3534444ab88e4fa8c664e13c'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}