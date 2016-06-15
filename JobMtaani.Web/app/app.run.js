(function () {
    'use strict';
    angular
        .module('app')
        .run(run);
    run.$inject['$rootScope',
        '$cookies',
        'currentUser'];
    function run($rootScope, $cookies, currentUser) {
        $rootScope.$on('$rootChangeError', function () {
        });
        currentUser.userId = $cookies.userId;
    }
})();
