﻿module app.widgets {



    class AdsWidgetController {

        errorMessage: string;
        successMessage: string;
        ads: app.domain.Ad[];

        static $inject = ['app.services.AdService', '$location']
        constructor(private adService: app.services.AdService, private $location: ng.ILocationService) {
            adService.getAllAds().success(
                (data, status) => {
                    this.ads = data;
                })
                .error((data) => {
                    this.errorMessage = "Error fetching ads, Check Connection";
                });
        }

        goToAd(adId: number) {
            this.$location.path('/ad/' + adId);
        }

    }

    export class AdsWidget implements ng.IDirective {
        static instance() {
            return new AdsWidget;
        }

        restrict = 'AE';
        controller = AdsWidgetController;
        controllerAs = 'vm';
        templateUrl = '/app/widgets/adsWidget/adsWidgetTemplate.html' 
    }

    angular
        .module('app.widgets')
        .directive('jmAdsWidget', AdsWidget.instance);

}