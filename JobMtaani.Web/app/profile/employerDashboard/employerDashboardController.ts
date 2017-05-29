module app.profile {

    interface IEmployerDashBoardController {

    }

    class EmployerDashBoardController implements IEmployerDashBoardController {
        constructor() {
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.EmployerDashBoardController', EmployerDashBoardController);
}