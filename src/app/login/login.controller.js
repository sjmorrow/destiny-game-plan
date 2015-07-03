(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($state) {
        var vm = this;
        vm.submit = function() {
            $state.go('characters', {
                platform: vm.platform,
                displayName: vm.displayName
            });
        };
    }
})();