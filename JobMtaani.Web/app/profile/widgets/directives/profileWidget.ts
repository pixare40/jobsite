module app.widgets {

    class ProfileWidgetController {
        title: string;
        userdata: app.domain.ProfileModel;
        successString: string;
        errorString: string;
        generalMessage: string;

        static $inject = ['app.services.CurrentUser', '$scope','$location']
        constructor(private currentUser: app.services.CurrentUser, private $scope: ng.IScope,
            private $location: ng.ILocationService) {

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
                this.userdata = data;
                this.successString = "Succesfully Obtained User Data";
                this.errorString = null;
            }).error((data) => {
                this.errorString = "Error Fetching User Data";
                this.successString = null;
            })
        }
    }

    export class ProfileWidget implements ng.IDirective {
        static instance() {
            return new ProfileWidget;
        }

        restrict = 'AE';
        controller = ProfileWidgetController;
        scope = {};
        controllerAs = 'vm';
        templateUrl = '/app/profile/widgets/templates/profileWidgetTemplate.html' 
    }

    angular.module('app.widgets')
        .directive('jmProfileWidget', ProfileWidget.instance);
}