(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, modalsService) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            //event.preventDefault();
            modalsService.error(error.data);
        });
    }

})();