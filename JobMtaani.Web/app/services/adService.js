var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var AdService = (function () {
            function AdService($http) {
                this.$http = $http;
            }
            AdService.prototype.getAd = function (adId) {
                return this.$http.get('/api/ads/GetAd/' + adId);
            };
            AdService.prototype.getAllAds = function () {
                return this.$http.get('/api/ads/GetAd/');
            };
            AdService.prototype.createAd = function (ad) {
                return this.$http.post('/api/ads/CreateAd', ad);
            };
            AdService.$inject = ['$http'];
            return AdService;
        }());
        services.AdService = AdService;
        angular
            .module('app.services')
            .service('app.services.AdService', AdService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=adService.js.map