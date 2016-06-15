module app.profile {

    interface IProfileController {
        title: string;
    }

    class ProfileController implements IProfileController {
        title: string;
        userData: any;
        successString: string;
        errorString: string;

        static $inject = ['app.services.CurrentUser', 'app.services.AccountService','$scope','$location']
        constructor(private currentUser: app.services.CurrentUser,
            private accountService: app.services.AccountService, private $scope: ng.IScope, private $location: ng.ILocationService) {

            this.getUserInfo();
            this.title = 'User Profile'
            this.$scope.$on('USER_LOGGED_IN', (event, data) => {
                this.getUserInfo();
            });

            this.$scope.$on('USER_LOGGED_OUT', (event, data) => {
                this.$location.path('/home');
            });
            
        }

        getUserInfo(): void {
            this.currentUser.getCurrentUserInfo().success((data, status) => {
                this.userData = data;
                this.successString = "Succesfully Obtained User Data";
            }).error((data) => {
                this.errorString = "Error Fetching User Data";
            })
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ProfileController', ProfileController);

}