var app;
(function (app) {
    var payments;
    (function (payments) {
        var PaymentsController = (function () {
            function PaymentsController(currentUser, paymentsService, $sce) {
                var _this = this;
                this.currentUser = currentUser;
                this.paymentsService = paymentsService;
                this.$sce = $sce;
                this.title = 'Payments';
                this.paymentsService.getPaymentUrl().success(function (data, status) {
                    _this.iframeUrl = $sce.trustAsResourceUrl(data);
                }).error(function (data) {
                    _this.errorMessage = data;
                });
            }
            PaymentsController.$inject = ['app.services.CurrentUser', 'app.services.PaymentsService', '$sce'];
            return PaymentsController;
        }());
        angular
            .module('app.payments')
            .controller('app.payments.PaymentsController', PaymentsController);
    })(payments = app.payments || (app.payments = {}));
})(app || (app = {}));
//# sourceMappingURL=paymentsController.js.map