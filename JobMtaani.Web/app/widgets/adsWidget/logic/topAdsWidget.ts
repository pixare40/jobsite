module app.widgets {

    interface ITopAdsWidgetController {
    }


    class TopAdsWidgetController implements ITopAdsWidgetController {
        ads: app.domain.Ad[];
        loadingContainer: ng.IAugmentedJQuery;
        topAdsWidgetContainer: ng.IAugmentedJQuery;

        static $inject = ['app.services.AdService', 'app.services.CurrentUser', '$location', "$element"]
        constructor(private adService: app.services.AdService, private currentUser: app.services.CurrentUser, private $location: ng.ILocationService, private $element: ng.IAugmentedJQuery) {

            this.initialiseElements();
            this.getTopAds();
        }

        initialiseElements(): void {
            this.loadingContainer = this.$element.find(".loading-container");
            this.topAdsWidgetContainer = this.$element.find("top-ads-widget");
        }

        getTopAds() {
            this.showLoading();
            this.adService.getTopAds().success((data, status) => {
                this.hideLoading();
                this.ads = data;
            }).error(() => {
                console.log('Error Fetching Top Ads');
            });
        }

        goToAd(index: number) {
            var selectedAd: app.domain.Ad = this.ads[index];
            if (this.currentUser.getProfile().isLoggedIn) {
                this.currentUser.getCurrentUserInfo().success((data) => {
                    if (selectedAd.AccountId == data.UserId) {
                        this.goToPersonalAd(selectedAd.AdId);
                        return;
                    }
                    else {
                        this.goToViewAd(selectedAd.AdId);
                        return;
                    }
                }).error(() => {
                    this.goToViewAd(selectedAd.AdId);
                    return;
                });
            }
            else {
                this.goToViewAd(selectedAd.AdId);
            }
        }

        goToPersonalAd(adId: number) {
            this.$location.path("/viewAd/" + adId);
        }

        goToViewAd(adId: number): void {
            this.$location.path("/ad/" + adId);
        }

        showLoading(): void {
            this.loadingContainer.show();
            this.topAdsWidgetContainer.hide();
        }

        hideLoading(): void {
            this.loadingContainer.hide();
            this.topAdsWidgetContainer.show();
        }
    }

    export class TopAdsWidget implements ng.IDirective {
        static instance() {
            return new TopAdsWidget;
        }

        restrict = 'AE';
        controller = TopAdsWidgetController;
        controllerAs = 'vm';
        scope = {};
        templateUrl = '/app/widgets/adsWidget/templates/topAdsWidgetTemplate.html';
    }

    angular
        .module('app.widgets')
        .directive('jmTopAdsWidget', TopAdsWidget.instance);
}