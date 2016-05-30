module app.payments {

    interface IPaymentsController {
        title: string;
    }

    class PaymentsController implements IPaymentsController {
        title: string;

        constructor() {
            this.title = 'Payments';
        }
    }

    angular
        .module('app.payments')
        .controller('app.payments.PaymentsController', PaymentsController);

}