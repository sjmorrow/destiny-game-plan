(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .service('modalsService', modalsService);

    /** @ngInject */
    function modalsService($modal) {
        this.error = function (message) {
            $modal.open({
                templateUrl: 'app/components/modals/error.tmpl.html',
                controller: function($scope) {
                    $scope.message = message;
                }
            });
        }
    }
})();
