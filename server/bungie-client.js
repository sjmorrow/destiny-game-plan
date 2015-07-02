var request = require('request-json');
var baseUrl = 'http://www.bungie.net/platform/destiny/';
var bungie = request.createClient(baseUrl);
bungie.headers['X-API-Key'] = '5c71e24004714755b2bf2c12c9ed512b';
module.exports = bungie;
