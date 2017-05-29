var app;
(function (app) {
    var services;
    (function (services) {
        var BaseService = (function () {
            function BaseService() {
            }
            return BaseService;
        }());
        BaseService.$inject = ['$rootScope'];
        services.BaseService = BaseService;
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=baseService.js.map