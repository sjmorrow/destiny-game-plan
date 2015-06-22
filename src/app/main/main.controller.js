(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .controller('MainController', MainController);

    /** @ngInject */
<<<<<<< Updated upstream
    function MainController($timeout, bungieApi, webDevTec, toastr) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1434656302275;
        vm.showToastr = showToastr;

        activate();

        function activate() {
            getWebDevTec();
            $timeout(function () {
                vm.classAnimation = 'rubberBand';
            }, 4000);
            bungieApi.searchDestinyPlayer();
        }

        function showToastr() {
            toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            vm.classAnimation = '';
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function (awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }
=======
    function MainController() {
        var vm = this;
        vm.characters = [
            {class:'Titan',race:'Human Male',level:34,emblem:'assets/images/characters/emblem.jpg',emblemBackground:'assets/images/characters/emblem_bg.jpg'}
        ];
>>>>>>> Stashed changes
    }
})();