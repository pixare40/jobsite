module app.profile {

    interface IProfileController {
        title: string;
    }

    class ProfileController implements IProfileController {
        title: string;
        userdata: app.domain.ProfileModel;
        successString: string;
        errorString: string;
        generalMessage: string;
        active: string;

        static $inject = ['app.services.CurrentUser', 'app.services.AccountService','$scope','$location','$rootScope']
        constructor(private currentUser: app.services.CurrentUser,
            private accountService: app.services.AccountService, private $scope: ng.IScope,
            private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService) {

            this.getUserInfo();
            this.title = 'User Profile'
            this.$scope.$on('USER_LOGGED_IN', (event, data) => {
                this.getUserInfo();
            });

            this.$scope.$on('USER_LOGGED_OUT', (event, data) => {
                this.$location.path('/home');
            });
            
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

        getUserInfo(): void {
            this.currentUser.getCurrentUserInfo().success((data, status) => {
                this.userdata = data;
                this.successString = "Succesfully Obtained User Data";
                this.errorString = null;
            }).error((data) => {
                this.errorString = "Error Fetching User Data";
                this.successString = null;
            })
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ProfileController', ProfileController);

}