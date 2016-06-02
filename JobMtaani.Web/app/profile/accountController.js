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
            }
            AccountController.prototype.isLoggedIn = function () {
                return this.currentUser.profile.isLoggedIn;
            };
            AccountController.prototype.registerUser = function () {
                this.userdata.confirmPassword = this.userdata.password;
                this.accountService.register(this.userdata)
                    .success(function (data) {
                    this.confirmPassword = "";
                    this.message = "... Registration successful";
                    this.login();
                })
                    .error(function (response) {
                    this.isLoggedIn = false;
                    this.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        this.message += response.data.exceptionMessage;
                    // Validation errors
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            this.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
            };
            AccountController.prototype.login = function () {
                this.userdata.username = this.userdata.email;
                this.userdata.grant_type = "password";
                this.accountService.login(this.userdata).success(function (data) {
                    this.message = "";
                    this.password = "";
                    this.currentUser.setProfile(this.userData.userName, data.access_token);
                }).error(function (response) {
                    this.password = "";
                    this.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        this.message += response.data.exceptionMessage;
                    if (response.data.error) {
                        this.message += response.data.error;
                    }
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
