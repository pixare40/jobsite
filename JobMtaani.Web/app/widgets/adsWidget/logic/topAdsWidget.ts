module app.widgets {

    interface ITopAdsWidgetController {
    }


    class TopAdsWidgetController implements ITopAdsWidgetController {
        ads: app.domain.Ad[];

        static $inject = ['app.services.AdService']
        constructor(private adService: app.services.AdService) {
            this.getTopAds();
        }

        getTopAds() {
            this.adService.getTopAds().success((data, status) => {
                this.ads = data;
            }).error(() => {
                console.log('Error Fetching Top Ads');
            });
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