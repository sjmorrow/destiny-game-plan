(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .controller('SettingsCtrl', SettingsCtrl);

    /** @ngInject */
    function SettingsCtrl($state) {
        var vm = this;
        vm.player = $state.params;
    }
})();