var app;
(function (app) {
    var payments;
    (function (payments) {
        var PaymentsController = (function () {
            function PaymentsController() {
                this.title = 'Payments';
            }
            return PaymentsController;
        }());
        angular
            .module('app.payments')
            .controller('app.payments.PaymentsController', PaymentsController);
    })(payments = app.payments || (app.payments = {}));
})(app || (app = {}));
//# sourceMappingURL=paymentsController.js.map