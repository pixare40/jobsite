﻿module app.profile {

    class PersonalAdsWidgetController {

        ads: app.domain.Ad[];
        errorMessage: string;

        static $inject = ['app.services.AdService', 'app.services.CurrentUser', '$location'];
        constructor(private adService: app.services.AdService, private currentUser: app.services.CurrentUser, private $location: ng.ILocationService) {
            if (this, currentUser.getProfile().isLoggedIn) {
                this.getAds();
            }
            else {
                this.$location.path('/home');
            }
        }

        getAds(): void {
            this.adService.getPersonalAds().success((data, status) => {
                this.ads = data;
            }).error(() => {
                this.errorMessage = "Error Fetching Data";
            })
        }

        editAd(): void {
        }
    }

    export class PersonalAdsWidget {

        static instance() {
            return new PersonalAdsWidget;
        }

        restrict = 'AE';
        controller = PersonalAdsWidgetController;
        controllerAs = 'vm';
        scope = {};
        templateUrl = '/app/profile/widgets/templates/personalAdsWidgetTemplate.html';
    }

    angular
        .module('app.profile')
        .directive('jmPersonalAdsWidget', PersonalAdsWidget.instance);

}