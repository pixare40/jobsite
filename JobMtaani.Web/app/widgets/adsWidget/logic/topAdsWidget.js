var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var TopAdsWidgetController = (function () {
            function TopAdsWidgetController(adService, currentUser, $location) {
                this.adService = adService;
                this.currentUser = currentUser;
                this.$location = $location;
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
            TopAdsWidgetController.prototype.goToAd = function (index) {
                var _this = this;
                var selectedAd = this.ads[index];
                if (this.currentUser.getProfile().isLoggedIn) {
                    this.currentUser.getCurrentUserInfo().success(function (data) {
                        if (selectedAd.AccountId == data.UserId) {
                            _this.goToPersonalAd(selectedAd.AdId);
                            return;
                        }
                    }).error(function () {
                        _this.goToViewAd(selectedAd.AdId);
                        return;
                    });
                }
                else {
                    this.goToViewAd(selectedAd.AdId);
                }
            };
            TopAdsWidgetController.prototype.goToPersonalAd = function (adId) {
                this.$location.path("/viewAd/" + adId);
            };
            TopAdsWidgetController.prototype.goToViewAd = function (adId) {
                this.$location.path("/ad/" + adId);
            };
            TopAdsWidgetController.$inject = ['app.services.AdService', 'app.services.CurrentUser', '$location'];
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
