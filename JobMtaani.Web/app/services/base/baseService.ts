module app.services {
    export interface IBaseService {
    }

    export class BaseService {

        static $inject = ['$rootScope']
        constructor() {
        }

    }
}