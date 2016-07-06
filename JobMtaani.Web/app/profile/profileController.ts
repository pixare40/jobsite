module app.profile {

    interface IProfileController {
    }

    class ProfileController implements IProfileController {
        
        active: string;

        static $inject = ['app.services.CurrentUser', 'app.services.AccountService','$scope','$location','$rootScope']
        constructor(private currentUser: app.services.CurrentUser,
            private accountService: app.services.AccountService, private $scope: ng.IScope,
            private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService) {



            this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'profile');
            this.active = "profile";
        }

        loadMessages(): void {
            this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'messages');
            this.active = "messages";
        }

        loadAds(): void {
            this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'ads');
            this.active = "ads";
        }

        loadProfile(): void {
            this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'profile');
            this.active = "profile";
        }

        loadDashboard(): void {
            this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, 'dashboard');
            this.active = "dashboard";
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ProfileController', ProfileController);

}