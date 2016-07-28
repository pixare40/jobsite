var app;
(function (app) {
    var services;
    (function (services) {
        var Profile = (function () {
            function Profile(isLoggedIn, username, token) {
                this.isLoggedIn = isLoggedIn;
                this.username = username;
                this.token = token;
            }
            return Profile;
        }());
        services.Profile = Profile;
        var CurrentUser = (function () {
            function CurrentUser($http, $cookies, $rootScope, $location) {
                var _this = this;
                this.$http = $http;
                this.$cookies = $cookies;
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.profile = new Profile(false, "", "");
                this.fetchTokenFromCookie();
                this.setUserInfo();
                this.$rootScope.$on(app.ValueObjects.NotificationsValueObject.USER_LOGGED_OUT, function (event) {
                    _this.removeUserCookie();
                });
            }
            CurrentUser.prototype.setProfile = function (username, token, isLoggedIn) {
                this.profile.isLoggedIn = isLoggedIn;
                this.profile.token = token;
                this.profile.username = username;
            };
            CurrentUser.prototype.getProfile = function () {
                return this.profile;
            };
            CurrentUser.prototype.getCurrentUserInfo = function () {
                return this.$http.get('/api/Account/GetAccountInfo', {
                    headers: { 'Authorization': 'Bearer ' + this.getProfile().token }
                });
            };
            CurrentUser.prototype.checkLogin = function () {
                this.fetchTokenFromCookie();
                this.setUserInfo();
            };
            CurrentUser.prototype.fetchTokenFromCookie = function () {
                var token = null;
                token = this.$cookies.get("authtoken");
                if (token == null) {
                }
                this.profile.token = token;
            };
            CurrentUser.prototype.setUserInfo = function () {
                var _this = this;
                if (this.profile.token == null) {
                    return;
                }
                this.getCurrentUserInfo().success(function (data, status) {
                    _this.profile.username = data.UserName;
                    _this.profile.isLoggedIn = true;
                    _this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.USER_LOGGED_IN, null);
                }).error(function (data, status) {
                    console.log("USER_LOGIN_FAILED");
                    if (status == 401) {
                        _this.$location.path("/login");
                    }
                    _this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.USER_LOGIN_FAILED, data);
                });
            };
            CurrentUser.prototype.removeUserCookie = function () {
                if (this.$cookies.get("authtoken") != null) {
                    this.$cookies.remove("authtoken");
                }
            };
            CurrentUser.$inject = ['$http', '$cookies', '$rootScope', '$location'];
            return CurrentUser;
        }());
        services.CurrentUser = CurrentUser;
        factory.$inject = ['$http', '$cookies', '$rootScope', '$location'];
        function factory($http, $cookies, $rootScope, $location) {
            return new CurrentUser($http, $cookies, $rootScope, $location);
        }
        angular
            .module('app.services')
            .factory('app.services.CurrentUser', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
