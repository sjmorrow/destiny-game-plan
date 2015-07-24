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
        if(!data || !data.Response || data.Response.length === 0) {
            res.status(404).send('No player found');
        } else {
            var userDetails = {
                name: data.Response[0].displayName,
                membershipId: data.Response[0].membershipId,
                membershipType: req.params.membershipType
            }
            res.json(userDetails);
        }
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

router.get('/activities/:membershipType/:membershipId/:characterId', function(req, res) {
    bungie.get(req.params.membershipType + '/account/' + req.params.membershipId + '/character/' + req.params.characterId + '/activities?definitions=true', function(err, bungieRes, data) {
        var activities = data.Response.definitions.activities;
        var activityTypes = data.Response.definitions.activityTypes;
        var incompleteActivities = [];
        
        _.each(data.Response.data.available, function(activity) {
            if (!activity.isCompleted) {
                activity.activity = activities[activity.activityHash];
                activity.type = activityTypes[activity.activity.activityTypeHash];
                if (activity.activity.activityLevel > 0 && activity.type.identifier !== 'ACTIVITY_TYPE_STRIKE_PLAYLIST'
                        && activity.type.identifier !== 'ACTIVITY_TYPE_STRIKE'
                        && activity.type.identifier !== 'ACTIVITY_TYPE_EXPLORE') {
                    incompleteActivities.push({
                        name: activity.activity.activityName,
                        type: activity.type.activityTypeName,
                        description: activity.activity.activityDescription,
                        level: activity.activity.activityLevel,
                        typeIdentifier: activity.type.identifier,
                        activity: activity
                    });
                }
                
            }
        });
        
        res.json(incompleteActivities);
    });
});

module.exports = router;
