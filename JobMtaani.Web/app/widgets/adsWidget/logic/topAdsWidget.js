var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var TopAdsWidgetController = (function () {
            function TopAdsWidgetController(adService) {
                this.adService = adService;
                this.getTopAds();
            }
            TopAdsWidgetController.prototype.getTopAds = function () {
                var _this = this;
                this.adService.getTopAds().success(function (data, status) {
                    _this.ads = data;
                }).error(function () {
                    console.log('Error Fetching Top Ads');
                });
            };
            TopAdsWidgetController.$inject = ['app.services.AdService'];
            return TopAdsWidgetController;
        }());
        var TopAdsWidget = (function () {
            function TopAdsWidget() {
                this.restrict = 'AE';
                this.controller = TopAdsWidgetController;
                this.controllerAs = 'vm';
                this.scope = {};
                this.templateUrl = '/app/widgets/adsWidget/templates/topAdsWidgetTemplate.html';
            }
            TopAdsWidget.instance = function () {
                return new TopAdsWidget;
            };
            return TopAdsWidget;
        }());
        widgets.TopAdsWidget = TopAdsWidget;
        angular
            .module('app.widgets')
            .directive('jmTopAdsWidget', TopAdsWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
