var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var AdsWidgetController = (function () {
            function AdsWidgetController(adService, $location) {
                this.adService = adService;
                this.$location = $location;
                this.currentPage = 1;
                this.maxSize = 6;
                this.getTotalAds();
                this.pageChanged();
            }
            AdsWidgetController.prototype.getTotalAds = function () {
                var _this = this;
                this.adService.getTotalUserAds(false).success(function (data) {
                    _this.totalItems = data;
                }).error(function () {
                    _this.errorMessage = "Error fetching ads, Check Connection";
                });
            };
            AdsWidgetController.prototype.pageChanged = function () {
                var _this = this;
                this.adService.getPageAds(this.currentPage, false).success(function (data) {
                    _this.ads = data;
                    if (data.length == 0) {
                        _this.generalMessage = "No Job Listings found at this time, please check back later";
                    }
                }).error(function () {
                    _this.errorMessage = "Error fetching ads, Check Connection";
                });
            };
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
//# sourceMappingURL=adsWidget.js.map