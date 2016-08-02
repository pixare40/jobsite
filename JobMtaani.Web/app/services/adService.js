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
                return this.$http.post('/api/ad/GetAd/', adId);
            };
            AdService.prototype.getAllAds = function () {
                return this.$http.get('/api/ad/GetAds', {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.createAd = function (ad) {
                return this.$http.post('/api/ad/CreateAd', ad, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getPersonalAds = function () {
                return this.$http.get('/api/ad/GetPersonalAds', {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getAdsByCategory = function (categoryId) {
                return this.$http.post('/api/ad/GetByCategory', categoryId);
            };
            AdService.prototype.applyToAd = function (adId) {
                return this.$http.post('/api/ad/Apply', adId, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getTopAds = function () {
                return this.$http.get('/api/ad/GetTopAds');
            };
            AdService.prototype.search = function (searchModel) {
                return this.$http.post('/api/ad/Search', searchModel);
            };
            AdService.prototype.getAdDetails = function (adId) {
                return this.$http.post('/api/ad/GetAdDetails', adId, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.hireEmployee = function (adApplication) {
                return this.$http.post('/api/ad/HireEmployee', adApplication, {
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
//# sourceMappingURL=adService.js.map