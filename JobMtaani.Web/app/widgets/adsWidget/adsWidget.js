var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var AdsWidgetController = (function () {
            function AdsWidgetController(adService, $location) {
                var _this = this;
                this.adService = adService;
                this.$location = $location;
                adService.getAllAds().success(function (data, status) {
                    _this.ads = data;
                })
                    .error(function (data) {
                    _this.errorMessage = "Error fetching ads, Check Connection";
                });
            }
            AdsWidgetController.prototype.goToAd = function (adId) {
                this.$location.path('/ad/' + adId);
            };
            AdsWidgetController.$inject = ['app.services.AdService', '$location'];
            return AdsWidgetController;
        }());
        var AdsWidget = (function () {
            function AdsWidget() {
                this.restrict = 'AE';
                this.controller = AdsWidgetController;
                this.controllerAs = 'vm';
                this.templateUrl = '/app/widgets/adsWidget/adsWidgetTemplate.html';
            }
            AdsWidget.instance = function () {
                return new AdsWidget;
            };
            return AdsWidget;
        }());
        widgets.AdsWidget = AdsWidget;
        angular
            .module('app.widgets')
            .directive('jmAdsWidget', AdsWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
