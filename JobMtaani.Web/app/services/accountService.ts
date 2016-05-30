module app.services {

    export interface IAccountService {
    }

    export class AccountService {
    }


    angular
        .module('app.services')
        .service('app.services.AccountService', AccountService);
}