var app;
(function (app) {
    var profile;
    (function (profile) {
        var PersonalAdsWidgetController = (function () {
            function PersonalAdsWidgetController(adService, currentUser, $location) {
                this.adService = adService;
                this.currentUser = currentUser;
                this.$location = $location;
                this.currentPage = 1;
                this.maxSize = 6;
                if (this, currentUser.getProfile().isLoggedIn) {
                    this.getTotalUserAds();
                    this.pageChanged();
                }
                else {
                    this.$location.path('/home');
                }
            }
            PersonalAdsWidgetController.prototype.getAds = function () {
                var _this = this;
                this.adService.getPersonalAds().success(function (data, status) {
                    _this.ads = data;
                }).error(function (data, status) {
                    if (status == 401) {
                        _this.$location.path("/login");
                        return;
                    }
                    _this.errorMessage = "Error Fetching Data";
                });
            };
            PersonalAdsWidgetController.prototype.getTotalUserAds = function () {
                var _this = this;
                this.adService.getTotalUserAds(true).success(function (data) {
                    _this.totalItems = data;
                });
            };
            PersonalAdsWidgetController.prototype.pageChanged = function () {
                var _this = this;
                this.adService.getPageAds(this.currentPage, true).success(function (data, status) {
                    _this.ads = data;
                }).error(function () {
                    _this.errorMessage = "Error fetching page data, please check you internet connection";
                });
            };
            PersonalAdsWidgetController.prototype.viewDetails = function (adId) {
                this.$location.path("/viewAd/" + adId);
            };
            PersonalAdsWidgetController.prototype.nullifyMessages = function () {
                this.errorMessage = null;
                this.successMessage = null;
            };
            PersonalAdsWidgetController.prototype.reopenAd = function (adId) {
                var _this = this;
                this.nullifyMessages();
                this.adService.reopenAd(adId).success(function () {
                    _this.getAds();
                    _this.successMessage = "Success Re-Opening Advert";
                }).error(function () {
                    _this.errorMessage = "Error closing ad";
                });
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
