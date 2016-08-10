module app.widgets {

    class AdsWidgetController {

        errorMessage: string;
        successMessage: string;
        generalMessage: string;
        ads: app.domain.Ad[];
        totalItems: number;
        currentPage: number;
        maxSize: number;

        static $inject = ['app.services.AdService', '$location']
        constructor(private adService: app.services.AdService, private $location: ng.ILocationService) {
            this.currentPage = 1;
            this.maxSize = 6;

            this.getTotalAds();
            this.pageChanged();
        }

        getTotalAds(): void {
            this.adService.getTotalUserAds(false).success((data) => {
                this.totalItems = data;
            }).error(() => {
                this.errorMessage = "Error fetching ads, Check Connection";
            })
        }

        pageChanged(): void {
            this.adService.getPageAds(this.currentPage, false).success((data) => {
                this.ads = data;
                if (data.length == 0) {
                    this.generalMessage = "No Job Listings found at this time, please check back later";
                }
            }).error(() => {
                this.errorMessage = "Error fetching ads, Check Connection";
            })
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