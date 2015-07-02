(function() {
  'use strict';

  angular
    .module('destinyGamePlan')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
