module app.profile {

    interface IPersonalAdsCOntroller {
    }

    class PersonalAdsController implements IPersonalAdsCOntroller {

        constructor() {
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.PersonalAdsController', PersonalAdsController);

}