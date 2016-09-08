var app;
(function (app) {
    var profile;
    (function (profile) {
        var UserData = (function () {
            function UserData(FirstName, LastName, UserName, Location, Email, Password, ConfirmPassword, PhoneNumber, grant_type) {
                this.FirstName = FirstName;
                this.LastName = LastName;
                this.UserName = UserName;
                this.Location = Location;
                this.Email = Email;
                this.Password = Password;
                this.ConfirmPassword = ConfirmPassword;
                this.PhoneNumber = PhoneNumber;
                this.grant_type = grant_type;
            }
            return UserData;
        }());
        profile.UserData = UserData;
        var AccountController = (function () {
            function AccountController(accountService, currentUser, $location, $rootScope, $cookies) {
                this.accountService = accountService;
                this.currentUser = currentUser;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;
                this.userdata = new UserData("", "", "", "", "", "", "", "", "");
                this.isLoggedIn = this.currentUser.profile.isLoggedIn;
            }
            AccountController.prototype.registerUser = function () {
                var _this = this;
                this.errorMessage = null;
                this.successMessage = null;
                this.userdata.ConfirmPassword = this.userdata.Password;
                this.userdata.UserName = this.userdata.PhoneNumber;
                this.accountService.register(this.userdata)
                    .success(function (data, status) {
                    _this.userdata.ConfirmPassword = "";
                    _this.successMessage = "... Registration successful";
                    _this.login();
                })
                    .error(function (response, status) {
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
            AccountController.prototype.login = function () {
                var _this = this;
                this.errorMessage = null;
                this.successMessage = null;
                this.userdata.grant_type = "password";
                var loginModel = new app.widgets.LoginModel(this.userdata.UserName, this.userdata.Password, "password");
                this.accountService.login(loginModel).success(function (data, status) {
                    _this.userdata.Password = "";
                    _this.currentUser.setProfile(_this.userdata.UserName, data.access_token, true);
                    _this.$cookies.put("authtoken", data.access_token);
                    _this.isLoggedIn = true;
                    _this.$rootScope.$broadcast("USER_LOGGED_IN", null);
                    _this.$location.path('/profile');
                }).error(function (response, status) {
                    _this.errorMessage = "";
                    _this.userdata.Password = "";
                    _this.errorMessage = response.statusText + "\r\n";
                    if (response.error_description)
                        _this.errorMessage += response.error_description;
                    if (response.error) {
                        _this.errorMessage += response.error;
                    }
                });
            };
            AccountController.prototype.logout = function () {
                var _this = this;
                this.errorMessage = null;
                this.successMessage = null;
                this.accountService.logout().success(function (data, status) {
                    _this.isLoggedIn = false;
                    _this.currentUser.setProfile("", "", false);
                    _this.successMessage = "Logout Succesful";
                    _this.userdata = new UserData("", "", "", "", "", "", "", "", "");
                }).error(function (data, status) {
                });
            };
            AccountController.$inject = ['app.services.AccountService', 'app.services.CurrentUser', '$location', '$rootScope', '$cookies'];
            return AccountController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.AccountController', AccountController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
