var app;
(function (app) {
    var services;
    (function (services) {
        var BaseService = (function () {
            function BaseService() {
            }
            BaseService.$inject = ['$rootScope'];
            return BaseService;
        }());
        services.BaseService = BaseService;
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=baseService.js.map