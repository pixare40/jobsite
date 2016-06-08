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
                if (!this.currentUser.profile.isLoggedIn) {
                    this.errorMessage = "Please Login First to Apply for this job";
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