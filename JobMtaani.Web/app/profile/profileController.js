var app;
(function (app) {
    var profile;
    (function (profile) {
        var ProfileController = (function () {
            function ProfileController(currentUser, accountService, $scope, $location, $rootScope) {
                this.currentUser = currentUser;
                this.accountService = accountService;
                this.$scope = $scope;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'profile');
                this.active = "profile";
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
            ProfileController.$inject = ['app.services.CurrentUser', 'app.services.AccountService', '$scope', '$location', '$rootScope'];
            return ProfileController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ProfileController', ProfileController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
