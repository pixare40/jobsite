var app;
(function (app) {
    var profile;
    (function (profile) {
        var EditProfileController = (function () {
            function EditProfileController(currentUser, accountService, $scope, $location, $rootScope, searchService) {
                var _this = this;
                this.currentUser = currentUser;
                this.accountService = accountService;
                this.$scope = $scope;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.searchService = searchService;
                this.setLocations();
                this.initialiseProfile();
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_INFO_AVAILABLE, function (event, data) {
                    _this.$location.path("/profile");
                });
            }
            EditProfileController.prototype.setLocations = function () {
                var _this = this;
                if (this.searchService.locations) {
                    this.locations = this.searchService.locations;
                }
                else {
                    this.searchService.getLocations().success(function (data) {
                        _this.locations = data;
                        _this.searchService.locations = data;
                    });
                }
            };
            EditProfileController.prototype.initialiseProfile = function () {
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
            EditProfileController.prototype.editProfile = function () {
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
            EditProfileController.$inject = ['app.services.CurrentUser', 'app.services.AccountService', '$scope', '$location', '$rootScope', 'app.services.SearchService'];
            return EditProfileController;
        }());
        angular
            .module("app.profile")
            .controller("app.profile.EditProfileController", EditProfileController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
