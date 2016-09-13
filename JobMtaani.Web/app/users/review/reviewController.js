var app;
(function (app) {
    var users;
    (function (users) {
        var ReviewController = (function () {
            function ReviewController(reviewService, accountService, $routeParams, adService, $location) {
                this.reviewService = reviewService;
                this.accountService = accountService;
                this.$routeParams = $routeParams;
                this.adService = adService;
                this.$location = $location;
                this.initialise();
            }
            ReviewController.prototype.initialise = function () {
                this.rate = 3;
                this.max = 5;
                this.isReadonly = false;
                this.getAd();
                this.getUser();
            };
            ReviewController.prototype.initialiseRatingStates = function () {
                this.ratingStates.push(new app.models.RatingState("glyphicon-star", "glyphicon-star-empty"));
            };
            ReviewController.prototype.getAd = function () {
                var _this = this;
                this.adService.getAd(this.$routeParams.adId).success(function (data) {
                    _this.jobApplied = data;
                });
            };
            ReviewController.prototype.getUser = function () {
                var _this = this;
                this.accountService.getApplicantInfo(this.$routeParams.user).success(function (data) {
                    _this.user = data;
                });
            };
            ReviewController.prototype.saveReview = function () {
                var _this = this;
                this.review.ReviewFor = this.user.UserId;
                this.reviewService.saveReview(this.review).success(function () {
                    _this.successString = "Review Saved!";
                    _this.$location.path("/viewApplicant/" + _this.review.ReviewFor);
                });
            };
            ReviewController.prototype.isValidForm = function () {
                if (!this.review) {
                    return false;
                }
                else if (!this.review.ReviewText || !this.review.ReviewTitle) {
                    return false;
                }
                else {
                    return true;
                }
            };
            ReviewController.$inject = ["app.services.ReviewService", "app.services.AccountService", "$routeParams", "app.services.AdService", "$location"];
            return ReviewController;
        }());
        angular
            .module('app.users')
            .controller('app.users.ReviewController', ReviewController);
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
