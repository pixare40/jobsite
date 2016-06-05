var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var AdService = (function () {
            function AdService($http, currentUser) {
                this.$http = $http;
                this.currentUser = currentUser;
            }
            AdService.prototype.getAd = function (adId) {
                return this.$http.get('/api/ads/GetAd/' + adId);
            };
            AdService.prototype.getAllAds = function () {
                return this.$http.get('/api/ads/GetAd/');
            };
            AdService.prototype.createAd = function (ad) {
                return this.$http.post('/api/ad/CreateAd', ad, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.$inject = ['$http', 'app.services.CurrentUser'];
            return AdService;
        }());
        services.AdService = AdService;
        angular
            .module('app.services')
            .service('app.services.AdService', AdService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
