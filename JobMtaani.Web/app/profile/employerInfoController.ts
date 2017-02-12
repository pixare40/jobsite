module app.profile {

    interface IEmployerInfoController {
    }

    class EmployerInfoController implements IEmployerInfoController {
        constructor() {
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.EmployerInfoController', EmployerInfoController);
}