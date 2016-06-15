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
            function CurrentUser($http) {
                this.$http = $http;
                this.profile = new Profile(false, "", "");
            }
            CurrentUser.prototype.setProfile = function (username, token, isLoggedIn) {
                this.profile = new Profile(isLoggedIn, username, token);
            };
            CurrentUser.prototype.getProfile = function () {
                return this.profile;
            };
            CurrentUser.prototype.getCurrentUserInfo = function () {
                return this.$http.get('/api/Account/GetAccountInfo', {
                    headers: { 'Authorization': 'Bearer ' + this.getProfile().token }
                });
            };
            CurrentUser.$inject = ['$http', '$scope'];
            return CurrentUser;
        }());
        services.CurrentUser = CurrentUser;
        factory.$inject = ['$http'];
        function factory($http) {
            return new CurrentUser($http);
        }
        angular
            .module('app.services')
            .factory('app.services.CurrentUser', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=currentUser.js.map