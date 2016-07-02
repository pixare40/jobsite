var app;
(function (app) {
    var services;
    (function (services) {
        var MessagingService = (function () {
            function MessagingService($http, currentUser) {
                this.$http = $http;
                this.currentUser = currentUser;
            }
            MessagingService.prototype.getSentMessages = function () {
                return this.$http.get("/api/message/GetSentMessages", {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            MessagingService.prototype.getRecievedMessages = function () {
                return this.$http.get("/api/message/GetReceivedMessages", {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            MessagingService.prototype.sendMessage = function (message) {
                return this.$http.post("/api/message/GetReceivedMessages", message, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            MessagingService.$inject = ['$http', 'currentUser'];
            return MessagingService;
        }());
        services.MessagingService = MessagingService;
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
