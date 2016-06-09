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
                    _this.message = "Error Fetching Categories";
                });
                this.ad = new app.domain.Ad("", "", "", [], 3, "", false, "");
                if (this.adService.categoryJobs !== null || this.adService.categoryJobs.length < 1) {
                    this.categoryAds = this.adService.categoryJobs;
                }
                else {
                    this.categoryAds = null;
                }
            }
            AdsController.prototype.createAd = function () {
                var _this = this;
                this.adService.createAd(this.ad).success(function (data, status) {
                    _this.message = "Ad Created Succesfully";
                }).error(function (data) {
                    _this.message = "Error";
                });
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