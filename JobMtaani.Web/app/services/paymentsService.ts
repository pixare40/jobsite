module app.services {

    export interface IPaymentsService {
        makePayment(payment: app.domain.Payment): ng.IHttpPromise<app.domain.Payment>;
        getPayment(paymentId: string): ng.IHttpPromise<app.domain.Payment>;
    }


    export class PaymentsService implements IPaymentsService {

        static $inject = ['$http','app.services.CurrentUser']
        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {
        }

        getPaymentUrl(): ng.IHttpPromise<string> {
            return this.$http.get('/api/Payment/GetPaymentUrl', {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        makePayment(payment: app.domain.Payment): ng.IHttpPromise<app.domain.Payment> {
            return this.$http.post('/api/Payment/MakePayment', payment);
        }

        getPayment(paymentId: string): ng.IHttpPromise<app.domain.Payment> {
            return this.$http.get('/api/Payment/GetPayment/' + paymentId);
        }
    }

    angular
        .module('app.services')
        .service('app.services.PaymentsService', PaymentsService);

}