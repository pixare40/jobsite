var app;
(function (app) {
    var services;
    (function (services) {
        var PaymentsService = (function () {
            function PaymentsService($http, currentUser) {
                this.$http = $http;
                this.currentUser = currentUser;
            }
            PaymentsService.prototype.getPaymentUrl = function () {
                return this.$http.get('/api/Payment/GetPaymentUrl', {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            PaymentsService.prototype.makePayment = function (payment) {
                return this.$http.post('/api/Payment/MakePayment', payment);
            };
            PaymentsService.prototype.getPayment = function (paymentId) {
                return this.$http.get('/api/Payment/GetPayment/' + paymentId);
            };
            return PaymentsService;
        }());
        PaymentsService.$inject = ['$http', 'app.services.CurrentUser'];
        services.PaymentsService = PaymentsService;
        angular
            .module('app.services')
            .service('app.services.PaymentsService', PaymentsService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=paymentsService.js.map