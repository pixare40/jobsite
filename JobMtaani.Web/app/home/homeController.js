var app;
(function (app) {
    var home;
    (function (home) {
        var HomeController = (function () {
            function HomeController(currentUser, accountService, $scope, $rootScope, $location) {
                var _this = this;
                this.currentUser = currentUser;
                this.accountService = accountService;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.isLoggedIn = false;
                this.$scope.$on('USER_LOGGED_IN', function (event, data) {
                    _this.isLoggedIn = true;
                });
                this.$scope.$on('USER_LOGGED_OUT', function (event, data) {
                    _this.isLoggedIn = false;
                });
            }
            HomeController.prototype.createJob = function () {
                if (!this.currentUser.profile.isLoggedIn) {
                    this.$location.path('/login');
                }
                else {
                    this.$location.path('/createad');
                }
            };
            HomeController.prototype.logOut = function () {
                var _this = this;
                this.accountService.logout().success(function () {
                    _this.currentUser.setProfile("", "", false);
                    _this.$rootScope.$broadcast('USER_LOGGED_OUT', null);
                    _this.isLoggedIn = false;
                }).error(function () {
                    console.error("Error Logging Out");
                });
            };
            HomeController.prototype.applyForJob = function () {
            };
            HomeController.$inject = ['app.services.CurrentUser', 'app.services.AccountService', '$scope', '$rootScope', '$location'];
            return HomeController;
        }());
        angular
            .module('app.home')
            .controller('app.home.HomeController', HomeController);
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
