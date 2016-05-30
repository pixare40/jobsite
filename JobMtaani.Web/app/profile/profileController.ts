module app.profile {

    interface IProfileController {
        title: string;
    }

    class ProfileController implements IProfileController {
        title: string;

        constructor() {
            this.title = 'User Profile'
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ProfileController', ProfileController);

}