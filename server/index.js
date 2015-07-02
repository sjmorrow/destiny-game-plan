var express = require('express');
var cors = require('cors');
var app = express();
var routes = require('./routes.js');

app.use(cors());
app.use('/', routes);

var server = app.listen(process.env.PORT || 3005, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Destiny Game Plan Server listening at http://%s:%s', host, port);
});
