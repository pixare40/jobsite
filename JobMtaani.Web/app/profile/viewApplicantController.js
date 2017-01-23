var app;
(function (app) {
    var profile;
    (function (profile) {
        var ViewApplicantController = (function () {
            function ViewApplicantController(reviewService, accountService, $routeParams) {
                this.reviewService = reviewService;
                this.accountService = accountService;
                this.$routeParams = $routeParams;
                this.currentPage = 1;
                this.maxSize = 6;
                this.initialiseData();
            }
            ViewApplicantController.prototype.initialiseData = function () {
                var _this = this;
                this.accountService.getApplicantInfo(this.$routeParams.user).success(function (data) {
                    _this.setUserDetails(data);
                    _this.pageChanged();
                });
            };
            ViewApplicantController.prototype.setUserDetails = function (userDetails) {
                this.applicantDetails = userDetails;
            };
            ViewApplicantController.prototype.showEmptyContainer = function () {
                if (!this.reviews || this.reviews.length < 1) {
                    return true;
                }
                else {
                    return false;
                }
            };
            ViewApplicantController.prototype.getNumber = function (times) {
                var newArray = new Array(times);
                return newArray;
            };
            ViewApplicantController.prototype.pageChanged = function () {
                var _this = this;
                this.reviewService.getUserReviews(this.applicantDetails.UserId, this.currentPage).success(function (data) {
                    _this.totalItems = data.TotalReviews;
                    _this.reviews = data.Reviews;
                });
            };
            ViewApplicantController.$inject = ["app.services.ReviewService", "app.services.AccountService", "$routeParams"];
            return ViewApplicantController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ViewApplicantController', ViewApplicantController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
//# sourceMappingURL=viewApplicantController.js.map