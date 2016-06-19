var app;
(function (app) {
    var profile;
    (function (profile) {
        var UserData = (function () {
            function UserData(FirstName, LastName, UserName, Email, Password, ConfirmPassword, PhoneNumber, grant_type) {
                this.FirstName = FirstName;
                this.LastName = LastName;
                this.UserName = UserName;
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
            function AccountController(accountService, currentUser, $location) {
                this.accountService = accountService;
                this.currentUser = currentUser;
                this.$location = $location;
                this.message = "";
                this.userdata = new UserData("", "", "", "", "", "", "", "");
                this.isLoggedIn = this.currentUser.profile.isLoggedIn;
            }
            AccountController.prototype.registerUser = function () {
                var _this = this;
                this.userdata.ConfirmPassword = this.userdata.Password;
                this.accountService.register(this.userdata)
                    .success(function (data, status) {
                    _this.userdata.ConfirmPassword = "";
                    _this.message = "... Registration successful";
                    _this.login();
                })
                    .error(function (response, status) {
                    _this.isLoggedIn = false;
                    _this.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        _this.message += response.data.exceptionMessage;
                    // Validation errors
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            _this.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
            };
            AccountController.prototype.login = function () {
                var _this = this;
                this.userdata.UserName = this.userdata.Email;
                this.userdata.grant_type = "password";
                var loginModel = new app.widgets.LoginModel(this.userdata.UserName, this.userdata.Password, "password");
                this.accountService.login(loginModel).success(function (data, status) {
                    _this.message = "Login Succesful";
                    _this.userdata.Password = "";
                    _this.isLoggedIn = true;
                    _this.currentUser.setProfile(_this.userdata.UserName, data.access_token, true);
                    _this.$location.path('/home');
                }).error(function (response, status) {
                    _this.userdata.Password = "";
                    _this.message = response.statusText + "\r\n";
                    if (response.error_description)
                        _this.message += response.error_description;
                    if (response.error) {
                        _this.message += response.error;
                    }
                });
            };
            AccountController.prototype.logout = function () {
                var _this = this;
                this.accountService.logout().success(function (data, status) {
                    _this.isLoggedIn = false;
                    _this.currentUser.setProfile("", "", false);
                    _this.message = "Logout Succesful";
                    _this.userdata = new UserData("", "", "", "", "", "", "", "");
                }).error(function (data, status) {
                });
            };
            AccountController.$inject = ['app.services.AccountService', 'app.services.CurrentUser', '$location'];
            return AccountController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.AccountController', AccountController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
//# sourceMappingURL=accountController.js.map