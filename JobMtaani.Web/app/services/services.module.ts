((): void => {
    'use strict';

    angular
        .module('app.services', ["ngResource"])
        .constant('appsettings',
        {
            serverPath: 'http://jobmtaani.co.ke'
        });

})();