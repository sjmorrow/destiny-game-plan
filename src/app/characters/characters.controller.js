(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .controller('CharacterCtrl', CharactersCtrl);

    /** @ngInject */
    function CharactersCtrl($log, characters) {
        var vm = this;
        vm.characters = [];
        $.each(characters, function(i, character) {
            character.emblemBackground = 'assets/images/characters/emblem_bg.jpg';
            vm.characters.push(character);
        });
    }
})();