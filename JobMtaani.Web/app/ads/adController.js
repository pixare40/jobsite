var app;
(function (app) {
    var ads;
    (function (ads) {
        var AdController = (function () {
            function AdController(adService, $routeParams, currentUser, $location) {
                this.adService = adService;
                this.$routeParams = $routeParams;
                this.currentUser = currentUser;
                this.$location = $location;
                this.renderAd();
            }
            AdController.prototype.renderAd = function () {
                var _this = this;
                this.adService.getAd(this.$routeParams.adId).success(function (data, status) {
                    if (_this.currentUser.currentUserId == data.AccountId) {
                        _this.$location.path("/viewAd/" + data.AdId);
                        return;
                    }
                    _this.ad = data;
                    _this.timelapse = _this.dateDiffInDays(_this.ad.DateCreated);
                    if (_this.ad.AdClosed) {
                        _this.errorMessage = "This ad has been closed";
                    }
                }).error(function (data) {
                    _this.errorMessage = "Error fetching Ad Data";
                });
            };
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
            AdController.prototype.dateDiffInDays = function (dateCreated) {
                var currentDate = new Date();
                var mydate = dateCreated;
                var adDateCreation = new Date(mydate);
                var _MS_PER_DAY = 1000 * 60 * 60 * 24;
                // Discard the time and time-zone information.
                var utc1 = Date.UTC(adDateCreation.getFullYear(), adDateCreation.getMonth(), adDateCreation.getDate());
                var utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                return Math.floor((utc2 - utc1) / _MS_PER_DAY);
            };
            AdController.$inject = ['app.services.AdService', '$routeParams', 'app.services.CurrentUser', '$location'];
            return AdController;
        }());
        angular
            .module('app.ads')
            .controller('app.ads.AdController', AdController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
