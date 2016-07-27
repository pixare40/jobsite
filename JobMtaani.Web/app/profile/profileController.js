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
            }
            ProfileController.$inject = ['app.services.CurrentUser', 'app.services.AccountService', '$scope', '$location', '$rootScope'];
            return ProfileController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ProfileController', ProfileController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
