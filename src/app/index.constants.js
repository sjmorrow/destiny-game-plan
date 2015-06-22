/* global malarkey:false, toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('destinyGamePlan')
        .constant('malarkey', malarkey)
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('samApiKey', '5c71e24004714755b2bf2c12c9ed512b');
})();