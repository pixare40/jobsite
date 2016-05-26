((): void => {
    'use strict';

    angular
        .module('app', [
            'app.core',
            'app.widgets',
            'app.blocks',
            'app.services',
            'app.layout',
            /*
            *feature areas
            */
            'app.dashboard',
            'app.ads',
            'app.profile',
            'app.users'
        ]);

})();