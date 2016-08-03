var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var LoginModel = (function () {
            function LoginModel(username, password, grant_type) {
                this.username = username;
                this.password = password;
                this.grant_type = grant_type;
            }
            return LoginModel;
        }());
        widgets.LoginModel = LoginModel;
        var LoginWidgetController = (function () {
            function LoginWidgetController(accountService, currentUser, $rootScope, $scope, $location, $cookies) {
                var _this = this;
                this.accountService = accountService;
                this.currentUser = currentUser;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$location = $location;
                this.$cookies = $cookies;
                this.isLoggedIn = this.currentUser.getProfile().isLoggedIn;
                this.$scope.$on("USER_LOGGED_IN", function (event, data) {
                    _this.isLoggedIn = _this.currentUser.getProfile().isLoggedIn;
                });
                if (this.isLoggedIn) {
                    this.$location.path('/profile');
                }
            }
            LoginWidgetController.prototype.login = function () {
                var _this = this;
                this.userdata.grant_type = "password";
                this.accountService.login(this.userdata).success(function (data, status) {
                    _this.loginMessage = "Welcome Back!";
                    _this.userdata.password = "";
                    _this.currentUser.setProfile(_this.userdata.username, data.access_token, true);
                    _this.$cookies.put("authtoken", data.access_token);
                    _this.isLoggedIn = true;
                    _this.$rootScope.$broadcast("USER_LOGGED_IN", null);
                    _this.$location.path('/profile');
                }).error(function (response, status) {
                    _this.userdata.password = "";
                    _this.isLoggedIn = false;
                    _this.loginMessage = response.statusText + "\r\n";
                    if (response.error_description)
                        _this.loginMessage += response.error_description;
                    if (response.error) {
                        _this.loginMessage += response.error;
                    }
                });
            };
            LoginWidgetController.prototype.logout = function () {
                var _this = this;
                this.accountService.logout().success(function (data, status) {
                    _this.currentUser.setProfile("", "", false);
                    _this.isLoggedIn = false;
                    _this.loginMessage = "Logout Succesful";
                    _this.userdata = new LoginModel("", "", "");
                    _this.$rootScope.$broadcast('USER_LOGGED_OUT', null);
                }).error(function (data, status) {
                });
            };
            LoginWidgetController.$inject = ['app.services.AccountService', 'app.services.CurrentUser', '$rootScope', '$scope', '$location', '$cookies'];
            return LoginWidgetController;
        }());
        var LoginWidget = (function () {
            function LoginWidget() {
                this.restrict = 'AE';
                this.controller = LoginWidgetController;
                this.controllerAs = 'vm';
                this.templateUrl = '/app/widgets/loginWidget/loginWidgetTemplate.html';
            }
            LoginWidget.instance = function () {
                return new LoginWidget;
            };
            return LoginWidget;
        }());
        widgets.LoginWidget = LoginWidget;
        angular
            .module('app.widgets')
            .directive('jmLoginWidget', LoginWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
