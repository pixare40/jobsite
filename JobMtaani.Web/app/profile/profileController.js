var app;
(function (app) {
    var profile;
    (function (profile) {
        var ProfileController = (function () {
            function ProfileController() {
            }
            return ProfileController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ProfileController', ProfileController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
