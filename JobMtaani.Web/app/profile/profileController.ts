module app.profile {

    interface IProfileController {
    }

    class ProfileController implements IProfileController {
        
        active: string;

        static $inject = ['app.services.CurrentUser', 'app.services.AccountService','$scope','$location','$rootScope']
        constructor(private currentUser: app.services.CurrentUser,
            private accountService: app.services.AccountService, private $scope: ng.IScope,
            private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService) {
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ProfileController', ProfileController);

}