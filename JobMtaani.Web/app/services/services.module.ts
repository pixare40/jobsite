﻿((): void => {
    'use strict';

    angular
        .module('app.services', ["ngResource", "ngCookies"])
        .constant('appsettings',
        {
            serverPath: 'http://jobmtaani.co.ke'
        });

})();