var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var AdService = (function () {
            function AdService($resource) {
                this.$resource = $resource;
            }
            AdService.prototype.getAdResource = function () {
                return this.$resource('/api/ads/:adId');
            };
            AdService.prototype.getAllAds = function () {
                return [
                    {
                        adId: "1",
                        accountId: "1",
                        adApplicants: [],
                        categoryId: "House Helps",
                        adLocation: "Nairobi",
                        adClosed: false,
                        adDescription: "Looking for house girl to take care of my baby, must have good recommendations from stakeholders and clean fingernails"
                    }
                ];
            };
            AdService.$inject = ['$resource'];
            return AdService;
        }());
        services.AdService = AdService;
        angular
            .module('app.services')
            .service('app.services.AdService', AdService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
