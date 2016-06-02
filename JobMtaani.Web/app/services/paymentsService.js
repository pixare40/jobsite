var app;
(function (app) {
    var services;
    (function (services) {
        var PaymentsService = (function () {
            function PaymentsService($http) {
                this.$http = $http;
            }
            PaymentsService.prototype.makePayment = function (payment) {
                return this.$http.post('/api/Payments/MakePayment', payment);
            };
            PaymentsService.prototype.getPayment = function (paymentId) {
                return this.$http.get('/api/Payments/GetPayment/' + paymentId);
            };
            PaymentsService.$inject = ['$http'];
            return PaymentsService;
        }());
        services.PaymentsService = PaymentsService;
        angular
            .module('app.services')
            .service('app.services.PaymentsService', PaymentsService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
