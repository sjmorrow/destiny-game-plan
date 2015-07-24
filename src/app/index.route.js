(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.tmpl.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('characters', {
                abstract: true,
                template: '<span ui-view="list"></span><span ui-view="settings"></span>',
                url: '/:platform/:displayName',
                resolve: {
                    characters: function($q, loginService, charactersService, $stateParams) {
                        var deferred = $q.defer();
                        loginService.getMembershipDetails($stateParams.platform, $stateParams.displayName).$promise.then(function(data) {
                            charactersService.getCharacters(data.membershipType, data.membershipId).$promise.then(function(characters) {
                                deferred.resolve(characters);
                            }, function(response) {
                                deferred.reject(response);
                            });
                        }, function(response) {
                            deferred.reject(response);
                        });
                        return deferred.promise;
                    }
                }
            })
            .state('characters.views', {
                url: '/characters',
                views: {
                    list: {
                        templateUrl: 'app/characters/characters.tmpl.html',
                        controller: 'CharacterCtrl',
                        controllerAs: 'characters',
                    },
                    settings: {
                        templateUrl: 'app/settings/settings.tmpl.html',
                        controller: 'SettingsCtrl',
                        controllerAs: 'settings'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/');
    }

})();