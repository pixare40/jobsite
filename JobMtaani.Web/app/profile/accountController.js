var app;
(function (app) {
    var profile;
    (function (profile) {
        var UserData = (function () {
            function UserData(FirstName, LastName, UserName, Location, Email, Password, ConfirmPassword, PhoneNumber, IDCardNumber, grant_type) {
                this.FirstName = FirstName;
                this.LastName = LastName;
                this.UserName = UserName;
                this.Location = Location;
                this.Email = Email;
                this.Password = Password;
                this.ConfirmPassword = ConfirmPassword;
                this.PhoneNumber = PhoneNumber;
                this.IDCardNumber = IDCardNumber;
                this.grant_type = grant_type;
            }
            return UserData;
        }());
        profile.UserData = UserData;
        var AccountController = (function () {
            function AccountController(accountService, currentUser, $location, $rootScope, $cookies, searchService) {
                this.accountService = accountService;
                this.currentUser = currentUser;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;
                this.searchService = searchService;
                this.userdata = new UserData("", "", "", "", "", "", "", "", "", "");
                this.isLoggedIn = this.currentUser.profile.isLoggedIn;
                this.setLocations();
            }
            AccountController.prototype.setLocations = function () {
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
                    _this.userdata = new UserData("", "", "", "", "", "", "", "", "", "");
                }).error(function (data, status) {
                });
            };
            AccountController.$inject = ['app.services.AccountService', 'app.services.CurrentUser', '$location', '$rootScope', '$cookies', 'app.services.SearchService'];
            return AccountController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.AccountController', AccountController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
