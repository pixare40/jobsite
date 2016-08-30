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
                this.initialiseProfile();
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_INFO_AVAILABLE, function (event, data) {
                    _this.$location.path("/profile");
                });
            }
            ProfileController.prototype.initialiseProfile = function () {
                var _this = this;
                if (!this.currentUser.getProfile().isLoggedIn) {
                    this.$location.path("/login");
                    return;
                }
                this.currentUser.getCurrentUserInfo().success(function (data) {
                    _this.userdata = data;
                }).error(function () {
                    _this.errorMessage = "Error fetching your details, please check your internet connection";
                });
            };
            ProfileController.prototype.editProfile = function () {
                var _this = this;
                this.userdata.UserName = this.userdata.PhoneNumber;
                this.accountService.updateUserDetails(this.userdata).success(function () {
                    _this.errorMessage = null;
                    _this.successMessage = "Succesfully updated your details";
                }).error(function (response) {
                    _this.errorMessage = "";
                    _this.isLoggedIn = false;
                    // Validation errors
                    if (response.ModelState) {
                        for (var key in response.ModelState) {
                            _this.errorMessage += response.ModelState[key] + "\r\n";
                        }
                    }
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
//# sourceMappingURL=profileController.js.map