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
            function CurrentUser() {
                this.profile = new Profile(false, "", "");
            }
            CurrentUser.prototype.setProfile = function (username, token) {
                this.profile = new Profile(true, username, token);
            };
            CurrentUser.prototype.getProfile = function () {
                return this.profile;
            };
            return CurrentUser;
        }());
        services.CurrentUser = CurrentUser;
        factory.$inject = [];
        function factory() {
            return new CurrentUser();
        }
        angular
            .module('app.services')
            .factory('app.services.CurrentUser', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
