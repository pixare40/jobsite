var app;
(function (app) {
    var profile;
    (function (profile) {
        var ProfileController = (function () {
            function ProfileController() {
                this.title = 'User Profile';
            }
            return ProfileController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.ProfileController', ProfileController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
//# sourceMappingURL=profileController.js.map