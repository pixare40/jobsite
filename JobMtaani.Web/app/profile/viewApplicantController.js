var app;
(function (app) {
    var profile;
    (function (profile) {
        var ViewApplicantController = (function () {
            function ViewApplicantController(reviewService, accountService, $routeParams) {
                this.reviewService = reviewService;
                this.accountService = accountService;
                this.$routeParams = $routeParams;
                this.initialiseData();
            }
            ViewApplicantController.prototype.initialiseData = function () {
                this.accountService.getApplicantInfo(this.$routeParams.userId).success(function (data) {
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