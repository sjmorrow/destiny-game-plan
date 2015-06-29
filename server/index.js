var express = require('express');
var url = require('url');
var cors = require('cors');
var app = express();
var http = require('http');

app.use(cors());

app.get('/membershipDetails/:membershipType/:displayName', function(req, res) {
//    var parts = url.parse(req.url, true);
    console.log(req.params);
    http.get('http://www.bungie.net/platform/destiny/searchDestinyPlayer/' + req.params.membershipType + '/' + req.params.displayName + '/', function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            res.json(parsed);
        });
    });
})

var server = app.listen(process.env.PORT || 3005, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
