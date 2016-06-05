var app;
(function (app) {
    var profile;
    (function (profile) {
        var UserData = (function () {
            function UserData(username, email, password, confirmPassword, grant_type) {
                this.username = username;
                this.email = email;
                this.password = password;
                this.confirmPassword = confirmPassword;
                this.grant_type = grant_type;
            }
            return UserData;
        }());
        profile.UserData = UserData;
        var AccountController = (function () {
            function AccountController(accountService, currentUser) {
                this.accountService = accountService;
                this.currentUser = currentUser;
                this.message = "";
                this.userdata = new UserData("", "", "", "", "");
                this.isLoggedIn = this.currentUser.profile.isLoggedIn;
            }
            AccountController.prototype.registerUser = function () {
                var _this = this;
                this.userdata.confirmPassword = this.userdata.password;
                this.accountService.register(this.userdata)
                    .success(function (data, status) {
                    _this.userdata.confirmPassword = "";
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
                this.userdata.username = this.userdata.email;
                this.userdata.grant_type = "password";
                this.accountService.login(this.userdata).success(function (data, status) {
                    _this.message = "Login Succesful";
                    _this.userdata.password = "";
                    _this.isLoggedIn = true;
                    _this.currentUser.setProfile(_this.userdata.username, data.access_token);
                }).error(function (response, status) {
                    _this.userdata.password = "";
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
                    _this.currentUser.setProfile("", "");
                    _this.message = "Logout Succesful";
                    _this.userdata = new UserData("", "", "", "", "");
                }).error(function (data, status) {
                });
            };
            AccountController.$inject = ['app.services.AccountService', 'app.services.CurrentUser'];
            return AccountController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.AccountController', AccountController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
