(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController() {
        var vm = this;
        vm.characters = [
            {class:'Titan',race:'Human Male',level:34,emblem:'assets/images/characters/emblem.jpg',emblemBackground:'assets/images/characters/emblem_bg.jpg'},
            {class:'Hunter',race:'Human Male',level:34,emblem:'assets/images/characters/emblem.jpg',emblemBackground:'assets/images/characters/emblem_bg.jpg'},
            {class:'Warlock',race:'Human Male',level:34,emblem:'assets/images/characters/emblem.jpg',emblemBackground:'assets/images/characters/emblem_bg.jpg'}
        ];
    }
})();