var express = require('express');
var router = express.Router();
var bungie = require('./bungie-client.js');
var _ = require('underscore');

router.get('/membershipDetails/:membershipType/:displayName', function(req, res) {
    bungie.get('searchDestinyPlayer/' + req.params.membershipType + '/' + req.params.displayName + '/', function(err, bungieRes, data) {
        //TODO: Check for err AND check data for Bungie API Errors
        var userDetails = {
            name: data.Response[0].displayName,
            membershipId: data.Response[0].membershipId,
            membershipType: req.params.membershipType
        }
        res.json(userDetails);
    });
});

router.get('/characters/:membershipType/:membershipId', function(req, res) {
    bungie.get(req.params.membershipType + '/account/' + req.params.membershipId + '/', function(err, bungieRes, data) {
        //TODO: Check for err AND check data for Bungie API Errors
        var characters = [];
        _.each(data.Response.data.characters, function(character) {
            //TODO: Get class and race text from API instead of hashes
           characters.push({
               class: character.characterBase.classHash,
               race: character.characterBase.raceHash,
               level: character.characterLevel
           });
        });
        res.json(characters);
    });
});

module.exports = router;
