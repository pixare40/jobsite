var app;
(function (app) {
    var profile;
    (function (profile) {
        var LoginController = (function () {
            function LoginController() {
            }
            return LoginController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.LoginController', LoginController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
