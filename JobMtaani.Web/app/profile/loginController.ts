module app.profile {

    interface ILoginController {
    }

    class LoginController implements ILoginController {

        constructor() {
        }

    }

    angular
        .module('app.profile')
        .controller('app.profile.LoginController', LoginController);
}