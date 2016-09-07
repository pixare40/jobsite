module app.profile {

    interface IProfileController {
    }

    class ProfileController implements IProfileController {
        constructor() {
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ProfileController', ProfileController);

}