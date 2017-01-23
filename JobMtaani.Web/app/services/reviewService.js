var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var ReviewService = (function () {
            function ReviewService($http, currentUser) {
                this.$http = $http;
                this.currentUser = currentUser;
            }
            ReviewService.prototype.getReview = function (userId) {
                return this.$http.get("/api/review/GetReview?uid=" + userId, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            ReviewService.prototype.getUserReviews = function (userId, page) {
                return this.$http.get("/api/review/GetReviews?uid=" + userId + "&page=" + page, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            ReviewService.prototype.saveReview = function (review) {
                return this.$http.post("/api/review/SaveReview", review, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            ReviewService.$inject = ['$http', 'app.services.CurrentUser'];
            return ReviewService;
        }());
        services.ReviewService = ReviewService;
        angular
            .module('app.services')
            .service('app.services.ReviewService', ReviewService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=reviewService.js.map