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
                this.$scope.$on("USER_LOGGED_IN", function (event, data) {
                    _this.isLoggedIn = _this.currentUser.getProfile().isLoggedIn;
                    _this.$location.path('/profile');
                    console.log("User logged in");
                });
            }
            LoginWidgetController.prototype.login = function () {
                var _this = this;
                this.userdata.grant_type = "password";
                this.accountService.login(this.userdata).success(function (data, status) {
                    _this.successString = "Welcome Back!";
                    _this.userdata.password = "";
                    _this.currentUser.setProfile(_this.userdata.username, data.access_token, true);
                    _this.$cookies.put("authtoken", data.access_token);
                    _this.isLoggedIn = true;
                    _this.$rootScope.$broadcast("USER_LOGGED_IN", null);
                    _this.$location.path('/profile');
                }).error(function (response, status) {
                    _this.errorString = null;
                    _this.userdata.password = "";
                    _this.isLoggedIn = false;
                    if (response.error_description) {
                        _this.errorString = response.error_description;
                    }
                });
            };
            LoginWidgetController.prototype.logout = function () {
                var _this = this;
                this.accountService.logout().success(function (data, status) {
                    _this.currentUser.setProfile("", "", false);
                    _this.isLoggedIn = false;
                    _this.successString = "Logout Succesful";
                    _this.userdata = new LoginModel("", "", "");
                    _this.$rootScope.$broadcast('USER_LOGGED_OUT', null);
                }).error(function (data, status) {
                });
            };
            return LoginWidgetController;
        }());
        LoginWidgetController.$inject = ['app.services.AccountService', 'app.services.CurrentUser', '$rootScope', '$scope', '$location', '$cookies'];
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
//# sourceMappingURL=loginWidget.js.map