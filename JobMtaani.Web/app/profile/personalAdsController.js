var app;
(function (app) {
    var profile;
    (function (profile) {
        var PersonalAdsController = (function () {
            function PersonalAdsController() {
            }
            return PersonalAdsController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.PersonalAdsController', PersonalAdsController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
