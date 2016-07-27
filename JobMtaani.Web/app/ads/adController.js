var app;
(function (app) {
    var ads;
    (function (ads) {
        var AdController = (function () {
            function AdController(adService, $routeParams, currentUser) {
                var _this = this;
                this.adService = adService;
                this.$routeParams = $routeParams;
                this.currentUser = currentUser;
                this.adService.getAd($routeParams.adId).success(function (data, status) {
                    _this.ad = data;
                }).error(function (data) {
                    _this.errorMessage = "Error fetching Ad Data";
                });
            }
            AdController.prototype.applyForJob = function () {
                var _this = this;
                if (!this.currentUser.profile.isLoggedIn) {
                    this.errorMessage = "Please Login First to Apply for this job";
                }
                else {
                    this.adService.applyToAd(this.ad.AdId).success(function (data, status) {
                        _this.successMessage = "Succesfully Applied to Ad";
                    }).error(function (data) {
                        _this.errorMessage = "An Error was encountered applying to the ad";
                    });
                }
            };
            AdController.$inject = ['app.services.AdService', '$routeParams', 'app.services.CurrentUser'];
            return AdController;
        }());
        angular
            .module('app.ads')
            .controller('app.ads.AdController', AdController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
//# sourceMappingURL=adController.js.map