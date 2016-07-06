var app;
(function (app) {
    var profile;
    (function (profile) {
        var ProfileController = (function () {
            function ProfileController(currentUser, accountService, $scope, $location, $rootScope) {
                var _this = this;
                this.currentUser = currentUser;
                this.accountService = accountService;
                this.$scope = $scope;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.getUserInfo();
                this.title = 'User Profile';
                this.$scope.$on('USER_LOGGED_IN', function (event, data) {
                    _this.getUserInfo();
                });
                this.$scope.$on('USER_LOGGED_OUT', function (event, data) {
                    _this.$location.path('/home');
                });
            }
            ProfileController.prototype.loadMessages = function () {
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'messages');
                this.active = "messages";
            };
            ProfileController.prototype.loadAds = function () {
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'ads');
                this.active = "ads";
            };
            ProfileController.prototype.loadProfile = function () {
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'profile');
                this.active = "profile";
            };
            ProfileController.prototype.loadDashboard = function () {
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'dashboard');
                this.active = "dashboard";
            };
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
            ProfileController.$inject = ['app.services.CurrentUser', 'app.services.AccountService', '$scope', '$location', '$rootScope'];
            return ProfileController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ProfileController', ProfileController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
