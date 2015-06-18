(function() {
  'use strict';

  angular
    .module('destinyGamePlan')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
