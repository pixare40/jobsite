var app;
(function (app) {
    var services;
    (function (services) {
        var AccountService = (function () {
            function AccountService() {
            }
            return AccountService;
        }());
        services.AccountService = AccountService;
        angular
            .module('app.services')
            .service('app.services.AccountService', AccountService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=accountService.js.map