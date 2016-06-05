module app.ads {
    'use strict';

    interface IAdsController {
        title: string;
        ad: app.domain.Ad;
    }

    class AdsController implements IAdsController {
        title: string
        message: string;
        ad: app.domain.Ad;

        static $inject = ['app.services.AdService']
        constructor(private adService: app.services.AdService) {
            this.title = 'Ads ';
            this.ad = new app.domain.Ad("", "", [], "", "", false, "");
        }

        createAd(): void {
            this.adService.createAd(this.ad).success(
                (data, status) => {
                    this.message = "Ad Created Succesfully";
                }).error(
                (data)=>{
                    this.message = "Error";
                });
        }
    }

    angular
        .module('app.ads')
        .controller('app.ads.AdsController', AdsController);

}