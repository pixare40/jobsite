module app.payments {

    interface IPaymentsController {
        title: string;
    }

    class PaymentsController implements IPaymentsController {
        title: string;
        iframeUrl: string;
        errorMessage: string;
        successMessage: string;

        static $inject = ['app.services.CurrentUser', 'app.services.PaymentsService','$sce'];
        constructor(private currentUser: app.services.CurrentUser,
            private paymentsService: app.services.PaymentsService, private $sce: ng.ISCEService) {
            this.title = 'Payments';

            this.paymentsService.getPaymentUrl().success((data, status) => {
                this.iframeUrl = $sce.trustAsResourceUrl(data);
            }).error((data) => {
                this.errorMessage = data;
            });
        }
    }

    angular
        .module('app.payments')
        .controller('app.payments.PaymentsController', PaymentsController);

}