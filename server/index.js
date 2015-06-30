var express = require('express');
var url = require('url');
var cors = require('cors');
var app = express();
var http = require('http');

var baseUrl = 'http://www.bungie.net/platform/destiny/';

app.use(cors());

function parseResponse(response, callback) {
    // Continuously update stream with data
    var body = '';
    response.on('data', function(d) {
        body += d;
    });
    response.on('end', function() {
        callback(JSON.parse(body));
    });
}

app.get('/membershipDetails/:membershipType/:displayName', function(req, res) {
    http.get(baseUrl + 'searchDestinyPlayer/' + req.params.membershipType + '/' + req.params.displayName + '/', function(response) {
        parseResponse(response, function(json) {
            res.json(json);
        });
    });
});

app.get('/characters/:membershipType/:membershipId', function(req, res) {    
    http.get(baseUrl + req.params.membershipType + '/account/' + req.params.membershipId + '/', function(response) {
        parseResponse(response, function(json) {
            res.json(json);
        });    
    });
});

var server = app.listen(process.env.PORT || 3005, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
