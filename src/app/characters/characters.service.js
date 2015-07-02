(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .service('charactersService', charactersService);

    /** @ngInject */
    function charactersService($log, $resource, SERVICE_URL) {
        this.getCharacters = function(platform, membershipId) {
            return $resource(SERVICE_URL + '/characters/' + platform + '/' + membershipId).query();
        };
    }
})();
