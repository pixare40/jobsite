var app;
(function (app) {
    var profile;
    (function (profile) {
        var EmployerInfoController = (function () {
            function EmployerInfoController() {
            }
            return EmployerInfoController;
        }());
        angular
            .module('app.profile')
            .controller('app.profile.EmployerInfoController', EmployerInfoController);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
//# sourceMappingURL=employerInfoController.js.map