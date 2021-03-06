var app;
(function (app) {
    var services;
    (function (services) {
        var AccountService = (function () {
            function AccountService($http, currentUser) {
                this.$http = $http;
                this.currentUser = currentUser;
            }
            AccountService.prototype.register = function (userdata) {
                return this.$http.post("/api/Account/Register", userdata);
            };
            AccountService.prototype.login = function (userdata) {
                return this.$http.post("/Token", userdata, {
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
            AccountService.prototype.logout = function () {
                return this.$http.post("/api/Account/Logout", {}, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AccountService.prototype.updateUserDetails = function (updatedDetails) {
                return this.$http.post("/api/Account/UpdateAccountDetails", updatedDetails, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            AccountService.prototype.getApplicantInfo = function (userId) {
                return this.$http.get("/api/Account/GetApplicantInfo?uid=" + userId, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            return AccountService;
        }());
        AccountService.$inject = ['$http', 'app.services.CurrentUser'];
        services.AccountService = AccountService;
        angular
            .module('app.services')
            .service('app.services.AccountService', AccountService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=accountService.js.map