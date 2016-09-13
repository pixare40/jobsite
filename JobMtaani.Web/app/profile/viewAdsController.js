var app;
(function (app) {
    var profile;
    (function (profile) {
        var ViewAdController = (function () {
            function ViewAdController() {
            }
            return ViewAdController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ViewAdController', ViewAdController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
