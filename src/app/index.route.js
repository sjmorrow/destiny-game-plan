(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/login/login.tmpl.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('characters', {
                url: '/:platform/:displayName',
                templateUrl: 'app/characters/characters.tmpl.html',
                controller: 'CharacterCtrl',
                controllerAs: 'characters',
                resolve: {
                    characters: function($q, loginService, charactersService, $stateParams) {
                        var deferred = $q.defer();
                        loginService.getMembershipDetails($stateParams.platform, $stateParams.displayName).$promise.then(function(data) {
                            charactersService.getCharacters(data.membershipType, data.membershipId).$promise.then(function(characters) {
                                deferred.resolve(characters);
                            });
                        });
                        return deferred.promise;
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/');
    }

})();