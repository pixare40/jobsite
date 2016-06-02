var app;
(function (app) {
    var services;
    (function (services) {
        var AccountService = (function () {
            function AccountService($http) {
                this.$http = $http;
            }
            AccountService.prototype.register = function (userdata) {
                return this.$http.post("http://localhost:53039/api/Account/Register", userdata);
            };
            AccountService.prototype.login = function (userdata) {
                return this.$http.post("http://localhost:53039/Token", userdata, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data, headersGetter) {
                        var str = [];
                        for (var d in data)
                            str.push(encodeURIComponent(d) + "=" +
                                encodeURIComponent(data[d]));
                        return str.join("&");
                    }
                });
            };
            AccountService.$inject = ['$http'];
            return AccountService;
        }());
        services.AccountService = AccountService;
        angular
            .module('app.services')
            .service('app.services.AccountService', AccountService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
