var app;
(function (app) {
    var ads;
    (function (ads) {
        'use strict';
        var AdsController = (function () {
            function AdsController(adService) {
                this.adService = adService;
                this.title = 'Ads ';
                this.ad = new app.domain.Ad("", "", [], "", "", false, "");
            }
            AdsController.prototype.createAd = function () {
                var _this = this;
                this.adService.createAd(this.ad).success(function (data, status) {
                    _this.message = "Ad Created Succesfully";
                }).error(function (data) {
                    _this.message = "Error";
                });
            };
            AdsController.$inject = ['app.services.AdService'];
            return AdsController;
        }());
        angular
            .module('app.ads')
            .controller('app.ads.AdsController', AdsController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
