var app;
(function (app) {
    var ads;
    (function (ads) {
        'use strict';
        var AdsController = (function () {
            function AdsController(adService, categoryService) {
                var _this = this;
                this.adService = adService;
                this.categoryService = categoryService;
                this.title = 'Ads ';
                this.categoryService.getAllCategories().success(function (data, status) {
                    _this.categories = data;
                }).error(function (data) {
                    _this.errorString = "Error Fetching Categories";
                });
                if (this.adService.categoryJobs !== null || this.adService.categoryJobs.length < 1) {
                    this.adList = this.adService.categoryJobs;
                }
                else {
                    this.adList = null;
                }
            }
            AdsController.prototype.createAd = function () {
                var _this = this;
                this.adService.createAd(this.ad).success(function (data, status) {
                    _this.successString = "Ad Created Succesfully";
                }).error(function (data) {
                    _this.errorString = "Error creating ad, please fill all the fields required";
                });
            };
            AdsController.prototype.isValidForm = function () {
                if (!this.ad) {
                    return false;
                }
                if (this.ad.AdTitle && this.ad.AdDescription && this.ad.AdLocation) {
                    return true;
                }
                else {
                    return false;
                }
            };
            AdsController.$inject = ['app.services.AdService', 'app.services.CategoryService'];
            return AdsController;
        }());
        angular
            .module('app.ads')
            .controller('app.ads.AdsController', AdsController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
//# sourceMappingURL=adsController.js.map