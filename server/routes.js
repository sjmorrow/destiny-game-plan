var express = require('express');
var router = express.Router();
var bungie = require('./bungie-client.js');
var bnet = 'http://www.bungie.net';
var _ = require('underscore');
var definitionsCache = {
    races: {},
    genders: {},
    classes: {}
};

function merge(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;    
}

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

function processCharacters(data, res) {
    var characters = [];
    _.each(data, function(character) {
        characters.push({
            id : character.characterBase.characterId,
            class: definitionsCache.classes[character.characterBase.classHash].className,
            race: definitionsCache.races[character.characterBase.raceHash].raceName,
            gender: definitionsCache.genders[character.characterBase.genderHash].genderName,
            level: character.characterLevel,
            emblem: bnet + character.emblemPath
        });        
    });
    res.json(characters);
}

router.get('/characters/:membershipType/:membershipId', function(req, res) {
    bungie.get(req.params.membershipType + '/account/' + req.params.membershipId + '/', function(err, bungieRes, data) {
        //TODO: Check for err AND check data for Bungie API Errors
        //TODO: Clean up this function
        var processed = false;
        
        // If the definitions cache does not contain the character hashes
        data.Response.data.characters.every(function(character) {
            if (!definitionsCache.classes.hasOwnProperty(character.characterBase.classHash) 
                    || !definitionsCache.races.hasOwnProperty(character.characterBase.raceHash)
                    || !definitionsCache.genders.hasOwnProperty(character.characterBase.genderHash)) {
                console.log('Fetching needed data...');
                bungie.get(req.params.membershipType + '/account/' + req.params.membershipId + '/?definitions=true', function(err, bungieRes, data2) {                    
                    definitionsCache.races = merge(definitionsCache.races, data2.Response.definitions.races);
                    definitionsCache.genders = merge(definitionsCache.genders, data2.Response.definitions.genders);
                    definitionsCache.classes = merge(definitionsCache.classes, data2.Response.definitions.classes);

                    processCharacters(data.Response.data.characters, res);
                });                
                processed = true;
                return false;
            }
        });
        
        if (!processed) {
            processCharacters(data.Response.data.characters, res);
        }
    });
});

module.exports = router;
