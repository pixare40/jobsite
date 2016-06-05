(function () {
    'use strict';
    angular
        .module('app.services', ["ngResource"])
        .constant('appsettings', {
        serverPath: 'http://localhost:53039'
    });
})();
