var app;
(function (app) {
    var profile;
    (function (profile) {
        var PersonalAdsWidgetController = (function () {
            function PersonalAdsWidgetController(adService, currentUser, $location) {
                this.adService = adService;
                this.currentUser = currentUser;
                this.$location = $location;
                if (this, currentUser.getProfile().isLoggedIn) {
                    this.getAds();
                }
                else {
                    this.$location.path('/home');
                }
            }
            PersonalAdsWidgetController.prototype.getAds = function () {
                var _this = this;
                this.adService.getPersonalAds().success(function (data, status) {
                    _this.ads = data;
                }).error(function () {
                    _this.errorMessage = "Error Fetching Data";
                });
            };
            PersonalAdsWidgetController.prototype.viewAd = function (adId) {
                this.$location.path("/viewAd/" + adId);
            };
            PersonalAdsWidgetController.$inject = ['app.services.AdService', 'app.services.CurrentUser', '$location'];
            return PersonalAdsWidgetController;
        }());
        var PersonalAdsWidget = (function () {
            function PersonalAdsWidget() {
                this.restrict = 'AE';
                this.controller = PersonalAdsWidgetController;
                this.controllerAs = 'vm';
                this.scope = {};
                this.templateUrl = '/app/profile/widgets/templates/personalAdsWidgetTemplate.html';
            }
            PersonalAdsWidget.instance = function () {
                return new PersonalAdsWidget;
            };
            return PersonalAdsWidget;
        }());
        profile.PersonalAdsWidget = PersonalAdsWidget;
        angular
            .module('app.profile')
            .directive('jmPersonalAdsWidget', PersonalAdsWidget.instance);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
//# sourceMappingURL=personalAdsWidget.js.map