(function() {
    'use strict';

    angular
        .module('destinyGamePlan')
        .service('bungieApi', bungieApi);
    
    /** @ngInject */
    function bungieApi($log, samApiKey) {
        
        var baseUrl = 'https://www.bungie.net/platform/destiny/';
        var membershipType = 'tigerxbox';
        var displayName = 'xxcoastermanxx';
        
        function searchDestinyPlayer() {
            $.ajax({
                url: baseUrl + 'searchdestinyplayer/' + membershipType + '/' + displayName,
                headers: {
                    'X-API-Key' : samApiKey
                }
            }).done(function(data){
                $log.debug(data);
            });
        }
        
        function hello() {
            $log.debug('hello');
        }
        
        this.hello = hello;
        this.searchDestinyPlayer = searchDestinyPlayer;
    }
})();
