module app.widgets {

    interface ITopAdsWidgetController {
    }


    class TopAdsWidgetController implements ITopAdsWidgetController {
        ads: app.domain.Ad[];

        static $inject = ['app.services.AdService', 'app.services.CurrentUser', '$location']
        constructor(private adService: app.services.AdService, private currentUser: app.services.CurrentUser, private $location: ng.ILocationService) {
            this.getTopAds();
        }

        getTopAds() {
            this.adService.getTopAds().success((data, status) => {
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