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
            AdService.prototype.closeAd = function (adId) {
                return this.$http.post('/api/ad/CloseAd', adId, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getNewsFeed = function () {
                return this.$http.get('/api/ad/GetNewsFeed', {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getLocalAds = function () {
                return this.$http.get('/api/ad/GetLocalJobs', {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.reopenAd = function (adId) {
                return this.$http.post("/api/ad/ReopenAd", adId, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getPageAds = function (pageNumber, forUser) {
                return this.$http.get("/api/ad/GetPageAds?pageNumber=" + pageNumber + "&userOwned=" + forUser, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getTotalUserAds = function (forUser) {
                return this.$http.get("/api/ad/GetTotalUserAds?forUser=" + forUser, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.getAdApplication = function (adApplicationId) {
                return this.$http.get("/api/ad/GetApplicationDetails?applicationId=" + adApplicationId, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AdService.prototype.withdrawAdApplication = function (applicationid) {
                return this.$http.get("/api/ad/WithdrawAdApplication?applicationId=" + applicationid, {
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