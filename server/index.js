var express = require('express');
var proxy = require('express-http-proxy');
var url = require('url');
var cors = require('cors');
var app = express();

app.use(cors());

app.use('/bungie', proxy('www.bungie.net', {
    forwardPath: function (req, res) {
        return url.parse(req.url).path;
    },
    intercept: function(rsp, data, req, res, callback) {
       // rsp - original response from the target
        //res.headers['Access-Control-Allow-Origin'] = '*';
        console.log(data.data.toJSON());
       data = JSON.parse(data.toString('utf8'));
       callback(null, JSON.stringify(data));
    },
}));

var server = app.listen(process.env.PORT || 3005, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
