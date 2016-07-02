var app;
(function (app) {
    var profile;
    (function (profile) {
        var ProfileController = (function () {
            function ProfileController(currentUser, accountService, $scope, $location) {
                var _this = this;
                this.currentUser = currentUser;
                this.accountService = accountService;
                this.$scope = $scope;
                this.$location = $location;
                this.getUserInfo();
                this.title = 'User Profile';
                this.$scope.$on('USER_LOGGED_IN', function (event, data) {
                    _this.getUserInfo();
                });
                this.$scope.$on('USER_LOGGED_OUT', function (event, data) {
                    _this.$location.path('/home');
                });
            }
            ProfileController.prototype.getUserInfo = function () {
                var _this = this;
                this.currentUser.getCurrentUserInfo().success(function (data, status) {
                    _this.userdata = data;
                    _this.successString = "Succesfully Obtained User Data";
                    _this.errorString = null;
                }).error(function (data) {
                    _this.errorString = "Error Fetching User Data";
                    _this.successString = null;
                });
            };
            ProfileController.$inject = ['app.services.CurrentUser', 'app.services.AccountService', '$scope', '$location'];
            return ProfileController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ProfileController', ProfileController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
