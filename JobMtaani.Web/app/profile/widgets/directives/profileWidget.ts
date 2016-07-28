module app.widgets {

    class ProfileWidgetController {
        title: string;
        userdata: app.domain.ProfileModel;
        successString: string;
        errorString: string;
        generalMessage: string;
        gettingUserInfo: Boolean;

        static $inject = ['app.services.CurrentUser', '$scope','$location', '$rootScope']
        constructor(private currentUser: app.services.CurrentUser, private $scope: ng.IScope,
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

        getUserInfo(): void {
            if (this.gettingUserInfo) {
                return;
            }

            this.gettingUserInfo = true;
            this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.SHOW_LOADING, null);
            this.currentUser.getCurrentUserInfo().success((data, status) => {
                this.userdata = data;
                this.successString = "Succesfully Login";
                this.errorString = null;
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.HIDE_LOADING, null);
                this.gettingUserInfo = false;
            }).error((data, status) => {
                if (status == 401) {
                    this.$location.path('login');
                    return;
                }
                this.errorString = "Error Fetching User Data";
                this.successString = null;
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.HIDE_LOADING, null);
                this.gettingUserInfo = false;
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