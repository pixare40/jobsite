var app;
(function (app) {
    var ads;
    (function (ads) {
        'use strict';
        var AdsController = (function () {
            function AdsController(adService, categoryService, searchService) {
                var _this = this;
                this.adService = adService;
                this.categoryService = categoryService;
                this.searchService = searchService;
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
                this.setLocations();
            }
            AdsController.prototype.setLocations = function () {
                var _this = this;
                if (this.searchService.locations) {
                    this.locations = this.searchService.locations;
                }
                else {
                    this.searchService.getLocations().success(function (data) {
                        _this.locations = data;
                        _this.searchService.locations = data;
                    });
                }
            };
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
                if (this.ad.AdTitle && this.ad.AdDescription && this.ad.AdLocation && this.ad.ApproximateWage) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return AdsController;
        }());
        AdsController.$inject = ['app.services.AdService', 'app.services.CategoryService', 'app.services.SearchService'];
        angular
            .module('app.ads')
            .controller('app.ads.AdsController', AdsController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
//# sourceMappingURL=adsController.js.map