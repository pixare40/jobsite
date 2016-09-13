var app;
(function (app) {
    var ads;
    (function (ads) {
        var AdApplicationController = (function () {
            function AdApplicationController(adService, $routeParams, currentUser, $location) {
                this.adService = adService;
                this.$routeParams = $routeParams;
                this.currentUser = currentUser;
                this.$location = $location;
                this.initialiseView();
            }
            AdApplicationController.prototype.initialiseView = function () {
                if (!this.currentUser.getProfile().isLoggedIn) {
                    this.$location.path("/login");
                    return;
                }
                this.getApplicationData();
            };
            AdApplicationController.prototype.getApplicationData = function () {
                var _this = this;
                var applicationId = this.$routeParams.applicationId;
                this.adService.getAdApplication(applicationId).success(function (data) {
                    _this.adApplication = data;
                }).error(function () {
                    _this.errorString = null;
                    _this.errorString = "Error fetching application, check your connection";
                });
            };
            AdApplicationController.prototype.withdrawApplication = function () {
                var _this = this;
                var applicationId = this.$routeParams.applicationId;
                this.adService.withdrawAdApplication(applicationId).success(function (data) {
                    _this.successString = "Succesfully withdrew your application";
                    _this.getApplicationData();
                }).error(function () {
                    _this.errorString = null;
                    _this.errorString = "Error withdrawing application, please check your connection";
                });
            };
            AdApplicationController.$inject = ["app.services.AdService", "$routeParams", "app.services.CurrentUser", "$location"];
            return AdApplicationController;
        }());
        angular
            .module("app.ads")
            .controller("app.ads.AdApplicationController", AdApplicationController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
