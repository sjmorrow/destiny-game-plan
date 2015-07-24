(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($state) {
        var vm = this;
        vm.submit = function() {
            vm.loading = true;
            $state.go('characters.views', {
                platform: vm.platform,
                displayName: vm.displayName
            });
        };
    }
})();