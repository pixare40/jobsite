module app.ads {
    'use strict';

    interface IAdsController {
        title: string;
        ads: app.domain.IAd[];
    }

    class AdsController implements IAdsController {
        title: string
        ads: app.domain.IAd[];

        static $inject = ['app.services.AdService']
        constructor(private adService: app.services.AdService) {
            this.title = 'Ads ';
            this.ads = adService.getAllAds();
        }
    }

    angular
        .module('app.ads')
        .controller('app.ads.AdsController', AdsController);

}