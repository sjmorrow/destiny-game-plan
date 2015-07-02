(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .service('loginService', loginService);

    /** @ngInject */
    function loginService($log, $resource, SERVICE_URL) {
        this.getMembershipDetails = function(platform, displayName) {
            return $resource(SERVICE_URL + '/membershipDetails/' + platform + '/' + displayName).get();
        };
    }
})();
